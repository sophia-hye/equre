import "server-only";
import {
  APPLICATION_SECTIONS,
  fieldLabel,
  sectionTitle,
  type ApplicationData,
} from "./application/fields";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const MAIL_FROM = process.env.MAIL_FROM ?? "eqüre <onboarding@resend.dev>";

export const emailConfigured = Boolean(RESEND_API_KEY);

type Loc = "ko" | "en";

const EMAIL_TEXT: Record<Loc, {
  heading: string;
  applicant: string;
  yes: string;
  no: string;
  footer: string;
  notConfigured: string;
  sendFail: string;
}> = {
  ko: {
    heading: "eqüre — 지원서",
    applicant: "지원자",
    yes: "예",
    no: "아니오",
    footer: "본 메일은 eqüre 관리자에 의해 발송되었습니다.",
    notConfigured:
      "이메일이 설정되지 않았습니다. .env.local에 RESEND_API_KEY (및 MAIL_FROM)를 추가하세요.",
    sendFail: "이메일 전송 실패",
  },
  en: {
    heading: "eqüre — Application Form",
    applicant: "Applicant",
    yes: "Yes",
    no: "No",
    footer: "This email was sent by an eqüre administrator.",
    notConfigured:
      "Email is not configured. Add RESEND_API_KEY (and MAIL_FROM) to .env.local.",
    sendFail: "Failed to send email",
  },
};

type SendArgs = { to: string; subject: string; html: string };

/** Send an email via Resend HTTP API (no SDK dependency). Server only. */
export async function sendEmail({ to, subject, html }: SendArgs, locale: Loc = "ko") {
  const text = EMAIL_TEXT[locale];
  if (!RESEND_API_KEY) {
    throw new Error(text.notConfigured);
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: MAIL_FROM, to, subject, html }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`${text.sendFail}: ${detail}`);
  }
  return res.json();
}

/** Render a submitted application as an HTML email body. */
export function renderApplicationHtml(
  opts: {
    applicantName: string;
    applicantEmail: string;
    data: ApplicationData;
  },
  locale: Loc = "ko"
) {
  const { applicantName, applicantEmail, data } = opts;
  const text = EMAIL_TEXT[locale];

  const sections = APPLICATION_SECTIONS.map((section) => {
    const rows = section.fields
      .map((f) => {
        const raw = data?.[f.key];
        const value =
          f.type === "checkbox"
            ? raw
              ? text.yes
              : text.no
            : (raw as string) || "—";
        return `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;background:#faf8f3;font-weight:600;width:42%;vertical-align:top">${escapeHtml(
            fieldLabel(f, locale)
          )}</td>
          <td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(
            String(value)
          )}</td>
        </tr>`;
      })
      .join("");
    return `<h3 style="margin:24px 0 8px;font-size:15px">${escapeHtml(
      sectionTitle(section, locale)
    )}</h3>
      <table style="border-collapse:collapse;width:100%;font-size:13px">${rows}</table>`;
  }).join("");

  return `<div style="font-family:Arial,'Apple SD Gothic Neo',sans-serif;color:#222;max-width:680px;margin:auto">
    <h2 style="color:#c2492b">${escapeHtml(text.heading)}</h2>
    <p style="font-size:13px;color:#555">${escapeHtml(
      text.applicant
    )}: <strong>${escapeHtml(applicantName)}</strong> (${escapeHtml(
    applicantEmail
  )})</p>
    ${sections}
    <p style="margin-top:28px;font-size:12px;color:#999">${escapeHtml(
      text.footer
    )}</p>
  </div>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
