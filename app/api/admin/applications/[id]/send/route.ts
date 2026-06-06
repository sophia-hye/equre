import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderApplicationHtml, sendEmail } from "@/lib/email";
import { validateEmail } from "@/components/auth/authStyles";
import type { ApplicationData } from "@/lib/application/fields";

export const dynamic = "force-dynamic";

/** POST — 제출된 신청서 내용을 특정 이메일로 발송 (admin only). */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (session?.profile?.role !== "admin") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const to = String(body?.email ?? "").trim();
  if (!validateEmail(to)) {
    return NextResponse.json({ error: "올바른 이메일을 입력해 주세요." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: app, error } = await admin
    .from("equre_applications")
    .select("id, status, data, user_id")
    .eq("id", id)
    .single();

  if (error || !app) {
    return NextResponse.json({ error: "신청서를 찾을 수 없습니다." }, { status: 404 });
  }
  if (app.status === "requested") {
    return NextResponse.json(
      { error: "아직 제출되지 않은 신청서입니다." },
      { status: 400 }
    );
  }

  const { data: profile } = await admin
    .from("equre_profiles")
    .select("name, email")
    .eq("id", app.user_id)
    .single();

  const html = renderApplicationHtml({
    applicantName: profile?.name || "지원자",
    applicantEmail: profile?.email || "",
    data: app.data as ApplicationData,
  });

  try {
    await sendEmail({
      to,
      subject: `[eqüre] ${profile?.name || "지원자"} 님의 지원서`,
      html,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "이메일 전송 실패" },
      { status: 500 }
    );
  }

  await admin
    .from("equre_applications")
    .update({ status: "sent", sent_to: to, sent_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ ok: true });
}
