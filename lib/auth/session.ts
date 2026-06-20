import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";

export type Profile = {
  id: string;
  email: string | null;
  name: string | null;
  role: "admin" | "user";
  phone: string | null;
  contact_type: string | null;
  contact_value: string | null;
  user_type: string | null;
  age_group: string | null;
  gender: string | null;
  region: string | null;
  language: string | null;
  interests: string[] | null;
  referral: string | null;
  marketing_consent: boolean | null;
  created_at: string;
};

export type SessionUser = {
  id: string;
  email: string | undefined;
  profile: Profile | null;
};

/** Current authenticated user + profile (role), or null. Server only. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!supabaseConfigured) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  let profile: Profile | null = null;
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("equre_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = (data as Profile) ?? null;
  } catch {
    profile = null;
  }

  return { id: user.id, email: user.email, profile };
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSessionUser();
  return session?.profile?.role === "admin";
}
