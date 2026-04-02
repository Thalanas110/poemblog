import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "poem"
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesSlug(title: string, slug: string) {
  return slugify(title) === slug;
}

async function createUniqueSlug(
  supabaseAdmin: ReturnType<typeof createClient>,
  title: string,
  excludeId?: string,
) {
  const baseSlug = slugify(title);
  let query = supabaseAdmin.from("poems").select("id, slug").ilike("slug", `${baseSlug}%`);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;
  if (error) throw error;

  const slugPattern = new RegExp(`^${escapeRegExp(baseSlug)}(?:-(\\d+))?$`);
  let maxSuffix = 0;
  let baseTaken = false;

  for (const poem of data ?? []) {
    const match = poem.slug?.match(slugPattern);
    if (!match) continue;

    if (!match[1]) {
      baseTaken = true;
      continue;
    }

    maxSuffix = Math.max(maxSuffix, Number(match[1]));
  }

  if (!baseTaken) {
    return baseSlug;
  }

  return `${baseSlug}-${maxSuffix + 1}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const url = new URL(req.url);
  const poemId = url.searchParams.get("id");
  const poemSlug = url.searchParams.get("slug");
  const method = req.method;

  try {
    // Check if user is admin via JWT
    let isAdmin = false;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        const { data: roles } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single();
        isAdmin = !!roles;
      }
    }

    if (method === "GET") {
      // Stats endpoint
      const statsParam = url.searchParams.get("stats");
      if (statsParam === "true" && isAdmin) {
        const { data, error } = await supabaseAdmin.from("poems").select("published");
        if (error) throw error;
        const total = data.length;
        const published = data.filter((p: { published: boolean }) => p.published).length;
        return new Response(JSON.stringify({ total, published, drafts: total - published }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (poemId || poemSlug) {
        let query = supabaseAdmin.from("poems").select("*");
        if (poemSlug) {
          try {
            query = query.eq("slug", poemSlug);
            const { data, error } = await query.single();
            if (!error && data) {
              return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }
          } catch {
            // Fall through to title-based lookup below.
          }

          const { data: poems, error } = await supabaseAdmin.from("poems").select("*");
          if (error) throw error;

          const match = (poems ?? []).find((poem) => matchesSlug(poem.title, poemSlug));
          if (match) {
            return new Response(JSON.stringify(match), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          throw new Error("Poem not found");
        } else {
          query = query.eq("id", poemId);
          if (!isAdmin) query = query.eq("published", true);
          const { data, error } = await query.single();
          if (error) throw error;
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      const allParam = url.searchParams.get("all");
      let query = supabaseAdmin.from("poems").select("*").order("created_at", { ascending: false });
      if (!isAdmin || allParam !== "true") {
        query = query.eq("published", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "POST") {
      const body = await req.json();
      const payload = { ...body, slug: await createUniqueSlug(supabaseAdmin, body.title) };
      const { data, error } = await supabaseAdmin.from("poems").insert(payload).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "PUT") {
      if (!poemId) throw new Error("ID required");
      const body = await req.json();
      const { data: currentPoem, error: currentPoemError } = await supabaseAdmin
        .from("poems")
        .select("title, slug")
        .eq("id", poemId)
        .single();

      if (currentPoemError) throw currentPoemError;

      const payload =
        body.title && body.title !== currentPoem.title
          ? { ...body, slug: await createUniqueSlug(supabaseAdmin, body.title, poemId) }
          : body;
      const { data, error } = await supabaseAdmin
        .from("poems")
        .update(payload)
        .eq("id", poemId)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      if (!poemId) throw new Error("ID required");
      const { error } = await supabaseAdmin.from("poems").delete().eq("id", poemId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
