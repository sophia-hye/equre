import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser, type Profile } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { MemberTable, type MemberApp } from "@/components/admin/MemberTable";

export const metadata: Metadata = { title: "회원 관리" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!supabaseConfigured) {
    return (
      <Section>
        <p className="text-muted">
          Supabase가 설정되지 않았습니다. <code>.env.local</code> 을 구성한 뒤
          다시 시도해 주세요.
        </p>
      </Section>
    );
  }

  const session = await getSessionUser();
  if (!session) redirect("/login");
  if (session.profile?.role !== "admin") {
    return (
      <Section>
        <p className="text-muted">접근 권한이 없습니다. 관리자만 이용할 수 있습니다.</p>
      </Section>
    );
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("equre_profiles")
    .select("id, email, name, role, created_at")
    .order("created_at", { ascending: false });

  const profiles = (data ?? []) as Profile[];

  // 회원별 최신(진행 중 우선) 지원서 매핑
  const { data: appsData } = await admin
    .from("equre_applications")
    .select("id, user_id, status, requested_at")
    .order("requested_at", { ascending: false });

  const latestByUser = new Map<string, MemberApp>();
  for (const a of appsData ?? []) {
    if (!latestByUser.has(a.user_id)) {
      latestByUser.set(a.user_id, { id: a.id, status: a.status });
    }
  }

  const members = profiles.map((p) => ({
    ...p,
    application: latestByUser.get(p.id) ?? null,
  }));

  return (
    <>
      <PageHero
        kicker="Admin"
        index={`${members.length} members`}
        title="회원 관리"
        description="가입한 회원을 조회하고 권한을 변경하거나 삭제할 수 있습니다."
      />
      <section className="py-16 md:py-20">
        <Container>
          <MemberTable initialMembers={members} currentUserId={session.id} />
        </Container>
      </section>
    </>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-24">
      <Container>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          회원 관리
        </h1>
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
