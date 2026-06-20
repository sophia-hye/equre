import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import type { ApplicationData } from "@/lib/application/fields";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { optionLabel } from "@/lib/profile/options";

export const metadata: Metadata = { title: "마이페이지" };
export const dynamic = "force-dynamic";

type Application = {
  id: string;
  status: "requested" | "submitted" | "sent";
  data: ApplicationData;
  requested_at: string;
  submitted_at: string | null;
  sent_at: string | null;
};

export default async function MyPage() {
  const m = (await getMessages()).mypage;
  const locale = await getLocale();

  const STATUS_LABEL: Record<Application["status"], string> = {
    requested: m.statusRequested,
    submitted: m.statusSubmittedReview,
    sent: m.statusSent,
  };

  if (!supabaseConfigured) {
    return (
      <Wrap title={m.title}>
        <p className="text-muted">{m.notConfigured}</p>
      </Wrap>
    );
  }

  const session = await getSessionUser();
  if (!session) redirect("/login");

  const admin = createAdminClient();
  const { data } = await admin
    .from("equre_applications")
    .select("id, status, data, requested_at, submitted_at, sent_at")
    .eq("user_id", session.id)
    .order("requested_at", { ascending: false });

  const apps = (data ?? []) as Application[];
  const active = apps.find((a) => a.status !== "sent") ?? null;
  const memberName = session.profile?.name || m.defaultName;

  const rows = [
    { k: m.email, v: session.email },
    { k: m.phone, v: session.profile?.phone },
    {
      k: m.altContact,
      v: session.profile?.contact_value
        ? `${
            session.profile.contact_type
              ? optionLabel(session.profile.contact_type, locale)
              : ""
          } ${session.profile.contact_value}`.trim()
        : null,
    },
    {
      k: m.userType,
      v: session.profile?.user_type
        ? optionLabel(session.profile.user_type, locale)
        : null,
    },
    {
      k: m.ageGroup,
      v: session.profile?.age_group
        ? optionLabel(session.profile.age_group, locale)
        : null,
    },
    {
      k: m.region,
      v: session.profile?.region
        ? optionLabel(session.profile.region, locale)
        : null,
    },
    {
      k: m.language,
      v: session.profile?.language
        ? optionLabel(session.profile.language, locale)
        : null,
    },
    {
      k: m.interests,
      v: session.profile?.interests?.length
        ? session.profile.interests
            .map((it) => optionLabel(it, locale))
            .join(", ")
        : null,
    },
  ];

  return (
    <>
      <PageHero
        kicker={m.kicker}
        title={m.greeting.replace("{name}", memberName)}
        description={m.desc}
      />
      <section className="py-12 md:py-16">
        <Container>
          {/* 회원 상태 카드 */}
          <div className="mb-12 border border-line-strong bg-bg-soft p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-accent px-3 py-1 text-xs font-semibold text-white">
                {m.badgeMember}
              </span>
              {session.profile?.role === "admin" && (
                <span className="border border-line-strong px-3 py-1 text-xs font-semibold text-ink">
                  {m.badgeAdmin}
                </span>
              )}
              <span className="font-display text-lg font-bold tracking-tight">
                {m.joined.replace("{name}", memberName)}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{m.statusNote}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
              {rows.map((row) => (
                <div key={row.k}>
                  <dt className="label text-faint">{row.k}</dt>
                  <dd className="mt-1 text-sm text-ink">{row.v || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>

          {apps.length === 0 && (
            <div className="border border-line bg-bg-soft p-10 text-center">
              <p className="font-display text-lg font-semibold">
                {m.noAppTitle}
              </p>
              <p className="mt-2 text-sm text-muted">{m.noAppDesc}</p>
            </div>
          )}

          {active && (
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="bg-accent px-3 py-1 text-xs font-medium text-white">
                  {STATUS_LABEL[active.status]}
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {m.appTitle}
                </h2>
              </div>

              {active.status === "submitted" ? (
                <>
                  <p className="mb-8 text-sm text-muted">{m.submittedNote}</p>
                  <ApplicationForm
                    applicationId={active.id}
                    initialData={active.data}
                    readOnly
                  />
                </>
              ) : (
                <ApplicationForm
                  applicationId={active.id}
                  initialData={active.data}
                />
              )}
            </div>
          )}

          {!active && apps.length > 0 && (
            <div className="border border-line bg-bg-soft p-10 text-center">
              <p className="font-display text-lg font-semibold">
                {m.sentDoneTitle}
              </p>
              <p className="mt-2 text-sm text-muted">{m.sentDoneDesc}</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function Wrap({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-24">
      <Container>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
