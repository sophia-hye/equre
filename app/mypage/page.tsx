import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import type { ApplicationData } from "@/lib/application/fields";

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

const STATUS_LABEL: Record<Application["status"], string> = {
  requested: "작성 요청됨",
  submitted: "제출 완료 (검토 중)",
  sent: "발송 완료",
};

export default async function MyPage() {
  if (!supabaseConfigured) {
    return (
      <Wrap>
        <p className="text-muted">Supabase가 설정되지 않았습니다. (.env.local)</p>
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

  return (
    <>
      <PageHero
        kicker="My Page"
        title={`안녕하세요, ${session.profile?.name || "회원"}님`}
        description="요청된 지원서를 작성하고 제출하실 수 있습니다."
      />
      <section className="py-12 md:py-16">
        <Container>
          {/* 회원 상태 카드 */}
          <div className="mb-12 border border-line-strong bg-bg-soft p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-accent px-3 py-1 text-xs font-semibold text-white">
                회원
              </span>
              {session.profile?.role === "admin" && (
                <span className="border border-line-strong px-3 py-1 text-xs font-semibold text-ink">
                  관리자
                </span>
              )}
              <span className="font-display text-lg font-bold tracking-tight">
                {session.profile?.name || "회원"}님 · 가입 완료
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              equre의 전체 콘텐츠를 이용하실 수 있는 회원 상태입니다.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
              {[
                { k: "이메일", v: session.email },
                { k: "휴대폰", v: session.profile?.phone },
                {
                  k: "추가 연락처",
                  v: session.profile?.contact_value
                    ? `${session.profile.contact_type ?? ""} ${session.profile.contact_value}`.trim()
                    : null,
                },
                { k: "사용자 유형", v: session.profile?.user_type },
                { k: "연령대", v: session.profile?.age_group },
                { k: "거주 지역", v: session.profile?.region },
                { k: "선호 언어", v: session.profile?.language },
                {
                  k: "관심사",
                  v: session.profile?.interests?.length
                    ? session.profile.interests.join(", ")
                    : null,
                },
              ].map((row) => (
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
                요청된 지원서가 없습니다
              </p>
              <p className="mt-2 text-sm text-muted">
                관리자가 지원서 작성을 요청하면 이곳에 표시됩니다.
              </p>
            </div>
          )}

          {active && (
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="bg-accent px-3 py-1 text-xs font-medium text-white">
                  {STATUS_LABEL[active.status]}
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  국제학생 전형 지원서
                </h2>
              </div>

              {active.status === "submitted" ? (
                <>
                  <p className="mb-8 text-sm text-muted">
                    제출이 완료되었습니다. 관리자 검토 후 안내드립니다. 내용은
                    아래에서 확인할 수 있습니다.
                  </p>
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
                발송 완료된 지원서가 있습니다
              </p>
              <p className="mt-2 text-sm text-muted">
                추가 요청이 있으면 이곳에 표시됩니다.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-24">
      <Container>
        <h1 className="font-display text-3xl font-bold tracking-tight">마이페이지</h1>
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
