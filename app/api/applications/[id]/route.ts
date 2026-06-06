import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

/** PATCH — 회원 본인이 신청서를 저장/제출. RLS로 본인+미발송만 허용. */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseConfigured) {
    return NextResponse.json({ error: "Supabase 미설정" }, { status: 500 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const data = body?.data ?? {};
  const submit = body?.action === "submit";

  const patch: Record<string, unknown> = { data };
  if (submit) {
    patch.status = "submitted";
    patch.submitted_at = new Date().toISOString();
  }

  // RLS: auth.uid() = user_id AND status <> 'sent'
  const { error } = await supabase
    .from("equre_applications")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
