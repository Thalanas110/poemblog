import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || ANON_KEY}`,
    apikey: ANON_KEY,
  };
}

export interface Poem {
  id: string;
  title: string;
  content: string;
  author: string;
  excerpt: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function uploadPoemImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("poem-images")
    .upload(fileName, file, { upsert: true });
  if (error) throw new Error("Failed to upload image");
  const { data } = supabase.storage.from("poem-images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function fetchPoemStats(): Promise<{
  total: number;
  published: number;
  drafts: number;
}> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/poems?stats=true`, { headers });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchPoems(all = false): Promise<Poem[]> {
  const headers = await getAuthHeaders();
  const url = `${SUPABASE_URL}/functions/v1/poems${all ? "?all=true" : ""}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch poems");
  return res.json();
}

export async function fetchPoem(id: string): Promise<Poem> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/poems?id=${id}`, { headers });
  if (!res.ok) throw new Error("Failed to fetch poem");
  return res.json();
}

export async function createPoem(poem: Partial<Poem>): Promise<Poem> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/poems`, {
    method: "POST",
    headers,
    body: JSON.stringify(poem),
  });
  if (!res.ok) throw new Error("Failed to create poem");
  return res.json();
}

export async function updatePoem(id: string, poem: Partial<Poem>): Promise<Poem> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/poems?id=${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(poem),
  });
  if (!res.ok) throw new Error("Failed to update poem");
  return res.json();
}

export async function deletePoem(id: string): Promise<void> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/poems?id=${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete poem");
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/auth?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  // Set session locally
  if (data.session) {
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }
  return data;
}

export async function checkAdmin(): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return false;

  const headers = await getAuthHeaders();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/auth?action=check-admin`, { headers });
  if (!res.ok) return false;
  const data = await res.json();
  return data.isAdmin;
}

export async function logout() {
  await supabase.auth.signOut();
}
