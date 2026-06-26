import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { boardItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Board",
  description: "Gallery, News, Events — eqüre 소식을 한곳에서.",
};

export default function BoardPage() {
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
    </>
  );
}
