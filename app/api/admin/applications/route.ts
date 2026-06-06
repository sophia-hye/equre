import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/** POST — 특정 회원에게 신청서 작성 요청 생성 (admin only). */
export async function POST(request: NextRequest) {
  const session = await getSessionUser();
  if (session?.profile?.role !== "admin") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const userId = body?.userId;
  if (!userId) {
    return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });
  }

  const admin = createAdminClient();

  // 이미 진행 중(requested/submitted)인 신청서가 있으면 중복 생성 방지
  const { data: existing } = await admin
    .from("equre_applications")
    .select("id, status")
    .eq("user_id", userId)
    .in("status", ["requested", "submitted"])
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "이미 진행 중인 신청서가 있습니다.", id: existing.id },
      { status: 409 }
    );
  }

  const { data, error } = await admin
    .from("equre_applications")
    .insert({ user_id: userId, status: "requested" })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id });
}
