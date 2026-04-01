import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const url = new URL(req.url);
  const poemId = url.searchParams.get("id");
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

      if (poemId) {
        let query = supabaseAdmin.from("poems").select("*").eq("id", poemId);
        if (!isAdmin) query = query.eq("published", true);
        const { data, error } = await query.single();
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
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
      const { data, error } = await supabaseAdmin.from("poems").insert(body).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "PUT") {
      if (!poemId) throw new Error("ID required");
      const body = await req.json();
      const { data, error } = await supabaseAdmin
        .from("poems")
        .update(body)
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
