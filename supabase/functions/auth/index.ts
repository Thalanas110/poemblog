import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "login") {
      const { email, password } = await req.json();
      // Use service role to verify credentials via admin API
      const { data: { users }, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
      if (listErr) throw listErr;

      const user = users?.find((u) => u.email === email);
      if (!user) throw new Error("Invalid login credentials");

      // Sign in using a temporary anon client - use the apikey from request header
      const anonKey = req.headers.get("apikey") || "";
      const supabaseAnon = createClient(supabaseUrl, anonKey);
      const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check admin role
      const { data: role } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .single();

      return new Response(
        JSON.stringify({
          session: data.session,
          user: data.user,
          isAdmin: !!role,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "check-admin") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) throw new Error("No auth");

      // Use service role client to get user from JWT
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) throw new Error("Invalid token");

      const { data: role } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      return new Response(JSON.stringify({ isAdmin: !!role, user }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Unknown action", { status: 400, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
