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
      .maybeSingle();
    profile = (data as Profile) ?? null;

    // 다른 출처(예: GCM)로 가입해 equre_profiles 행이 없는 사용자 → 첫 equre 로그인 시
    // 최소 프로필을 자동 생성(lazy backfill). role/source/created_at 등은 컬럼 기본값.
    if (!profile) {
      const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
      const { data: created } = await admin
        .from("equre_profiles")
        .upsert(
          {
            id: user.id,
            email: user.email ?? null,
            name: typeof meta.name === "string" ? meta.name : null,
          },
          { onConflict: "id" }
        )
        .select("*")
        .maybeSingle();
      profile = (created as Profile) ?? null;
    }
  } catch {
    profile = null;
  }

  return { id: user.id, email: user.email, profile };
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSessionUser();
  return session?.profile?.role === "admin";
}
