import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getSessionUser } from "@/lib/auth/session";
import { supabaseConfigured } from "@/lib/supabase/env";
import { BoardManager } from "@/components/admin/BoardManager";

export const metadata: Metadata = { title: "Board 관리" };
export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  if (!supabaseConfigured) {
    return (
      <section className="py-24">
        <Container>
          <p className="text-muted">Supabase가 설정되지 않았습니다.</p>
        </Container>
      </section>
    );
  }

  const session = await getSessionUser();
  if (!session) redirect("/login");
  if (session.profile?.role !== "admin") {
    return (
      <section className="py-24">
        <Container>
          <p className="text-muted">관리자만 접근할 수 있습니다.</p>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageHero
        kicker="Admin · Board"
        index="B"
        title="Board 관리"
        description="갤러리·뉴스·이벤트 콘텐츠를 작성하고 관리합니다."
      />
      <section className="py-16 md:py-20">
        <Container>
          <BoardManager />
        </Container>
      </section>
    </>
  );
}
