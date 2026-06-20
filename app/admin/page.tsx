import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser, type Profile } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/env";
import { MemberTable, type MemberApp } from "@/components/admin/MemberTable";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "회원 관리" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const m = (await getMessages()).admin;

  if (!supabaseConfigured) {
    return (
      <Section title={m.title}>
        <p className="text-muted">{m.notConfigured}</p>
      </Section>
    );
  }

  const session = await getSessionUser();
  if (!session) redirect("/login");
  if (session.profile?.role !== "admin") {
    return (
      <Section title={m.title}>
        <p className="text-muted">{m.noAccess}</p>
      </Section>
    );
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("equre_profiles")
    .select(
      "id, email, name, role, phone, contact_type, contact_value, user_type, age_group, gender, region, language, interests, referral, marketing_consent, created_at"
    )
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
        kicker={m.kicker}
        index={m.membersCount.replace("{n}", String(members.length))}
        title={m.title}
        description={m.desc}
      />
      <section className="py-16 md:py-20">
        <Container>
          <MemberTable initialMembers={members} currentUserId={session.id} />
        </Container>
      </section>
    </>
  );
}

function Section({
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
