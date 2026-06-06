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

export const metadata: Metadata = { title: "지원서 상세" };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  requested: "작성 요청됨",
  submitted: "제출 완료",
  sent: "발송 완료",
};

export default async function AdminApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
        kicker="Admin / Application"
        index={STATUS_LABEL[app.status] ?? app.status}
        title={profile?.name || "지원자"}
        description={profile?.email || ""}
      />
      <section className="py-12 md:py-16">
        <Container>
          <Link
            href="/admin"
            className="label text-muted transition-colors hover:text-ink"
          >
            ← 회원 관리로
          </Link>

          {!submitted ? (
            <p className="mt-8 border border-line bg-bg-soft p-10 text-center text-muted">
              아직 회원이 지원서를 제출하지 않았습니다. (상태: 작성 요청됨)
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
                제출된 내용
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
