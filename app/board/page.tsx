import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { boardItems } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Board",
  description: "Gallery, News, Events — eqüre 소식을 한곳에서.",
};

export default async function BoardPage() {
  const msgs = await getMessages();
  return (
    <>
      <PageHero
        kicker="Board"
        index="C"
        title="Board"
        description="Gallery, News, Events — eqüre의 소식과 기록을 한곳에서 만나보세요."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {boardItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col border border-line-strong p-8 transition-colors hover:border-accent hover:bg-bg-soft"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
                <span className="mt-8 inline-block text-lg text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="멤버가 되어 더 많은 이야기를 만나보세요"
        description="eqüre 멤버는 갤러리·뉴스·이벤트와 커뮤니티에 가장 먼저 닿습니다."
        buttonLabel={msgs.common.signup}
        buttonHref="/signup"
      />
    </>
  );
}
