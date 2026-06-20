import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { SendForm } from "@/components/admin/SendForm";
import type { ApplicationData } from "@/lib/application/fields";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "지원서 상세" };
export const dynamic = "force-dynamic";

export default async function AdminApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const m = (await getMessages()).admin;
  const STATUS_LABEL: Record<string, string> = {
    requested: m.detailRequested,
    submitted: m.detailSubmitted,
    sent: m.detailSent,
  };

  if (!supabaseConfigured) redirect("/admin");
  const session = await getSessionUser();
  if (!session) redirect("/login");
  if (session.profile?.role !== "admin") redirect("/");

  const { id } = await params;
  const admin = createAdminClient();
  const { data: app } = await admin
    .from("equre_applications")
    .select("id, status, data, user_id, requested_at, submitted_at, sent_to, sent_at")
    .eq("id", id)
    .single();

  if (!app) notFound();

  const { data: profile } = await admin
    .from("equre_profiles")
    .select("name, email")
    .eq("id", app.user_id)
    .single();

  const submitted = app.status !== "requested";

  return (
    <>
      <PageHero
        kicker={m.detailKicker}
        index={STATUS_LABEL[app.status] ?? app.status}
        title={profile?.name || m.applicant}
        description={profile?.email || ""}
      />
      <section className="py-12 md:py-16">
        <Container>
          <Link
            href="/admin"
            className="label text-muted transition-colors hover:text-ink"
          >
            {m.backToMembers}
          </Link>

          {!submitted ? (
            <p className="mt-8 border border-line bg-bg-soft p-10 text-center text-muted">
              {m.notSubmittedYet}
            </p>
          ) : (
            <>
              <div className="mt-8 mb-10">
                <SendForm
                  applicationId={app.id}
                  defaultEmail={app.sent_to ?? ""}
                  alreadySentTo={app.sent_to}
                />
              </div>

              <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
                {m.submittedContent}
              </h2>
              <ApplicationForm
                applicationId={app.id}
                initialData={app.data as ApplicationData}
                readOnly
              />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
