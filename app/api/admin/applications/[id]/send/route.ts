import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderApplicationHtml, sendEmail } from "@/lib/email";
import { validateEmail } from "@/components/auth/authStyles";
import type { ApplicationData } from "@/lib/application/fields";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

const ERR = {
  ko: {
    forbidden: "권한이 없습니다.",
    invalidEmail: "올바른 이메일을 입력해 주세요.",
    notFound: "신청서를 찾을 수 없습니다.",
    notSubmitted: "아직 제출되지 않은 신청서입니다.",
    sendFail: "이메일 전송 실패",
    applicant: "지원자",
    subject: (name: string) => `[eqüre] ${name} 님의 지원서`,
  },
  en: {
    forbidden: "You do not have permission.",
    invalidEmail: "Please enter a valid email.",
    notFound: "Application not found.",
    notSubmitted: "This application has not been submitted yet.",
    sendFail: "Failed to send email",
    applicant: "Applicant",
    subject: (name: string) => `[eqüre] Application from ${name}`,
  },
} as const;

/** POST — 제출된 신청서 내용을 특정 이메일로 발송 (admin only). */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const locale = await getLocale();
  const t = ERR[locale === "en" ? "en" : "ko"];

  const session = await getSessionUser();
  if (session?.profile?.role !== "admin") {
    return NextResponse.json({ error: t.forbidden }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const to = String(body?.email ?? "").trim();
  if (!validateEmail(to)) {
    return NextResponse.json({ error: t.invalidEmail }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: app, error } = await admin
    .from("equre_applications")
    .select("id, status, data, user_id")
    .eq("id", id)
    .single();

  if (error || !app) {
    return NextResponse.json({ error: t.notFound }, { status: 404 });
  }
  if (app.status === "requested") {
    return NextResponse.json({ error: t.notSubmitted }, { status: 400 });
  }

  const { data: profile } = await admin
    .from("equre_profiles")
    .select("name, email")
    .eq("id", app.user_id)
    .single();

  const applicantName = profile?.name || t.applicant;

  const html = renderApplicationHtml(
    {
      applicantName,
      applicantEmail: profile?.email || "",
      data: app.data as ApplicationData,
    },
    locale
  );

  try {
    await sendEmail(
      {
        to,
        subject: t.subject(applicantName),
        html,
      },
      locale
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : t.sendFail },
      { status: 500 }
    );
  }

  await admin
    .from("equre_applications")
    .update({ status: "sent", sent_to: to, sent_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ ok: true });
}
