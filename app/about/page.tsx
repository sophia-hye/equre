import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SplitBlock } from "@/components/ui/SplitBlock";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "About",
  description:
    "eqüre는 이성(데이터)과 감성(치유)을 결합해 엘리트 청소년을 위한 사회적 안전망을 만듭니다.",
};

export default async function AboutPage() {
  const msgs = await getMessages();
  const m = msgs.about;
  const identity = [
    { glyph: "E+Q", label: m.id1, desc: m.id1d },
    { glyph: "∞", label: m.id2, desc: m.id2d },
    { glyph: "⚓", label: m.id3, desc: m.id3d },
    { glyph: "ü", label: m.id4, desc: m.id4d },
  ];

  return (
    <>
      <PageHero
        kicker="About eqüre"
        index="A"
        title={m.heroTitle}
        description={m.heroDesc}
      />

      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="The Problem"
              index="01"
              title={m.problemTitle}
              description={m.problemDesc}
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line-strong bg-bg-soft py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Our Solution"
              index="02"
              title={m.solutionTitle}
              description={m.solutionDesc}
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <SplitBlock
            media={
              <Reveal>
                <div className="flex aspect-square items-center justify-center border border-line-strong bg-ink">
                  <span className="font-display text-7xl font-black lowercase tracking-tight text-bg">
                    eq&uuml;re
                  </span>
                </div>
              </Reveal>
            }
          >
            <Reveal>
              <SectionTitle
                kicker="Brand Identity"
                index="03"
                title={m.brandTitle}
                description={m.brandDesc}
              />
              <ul className="mt-10 border-t border-line-strong">
                {identity.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-baseline gap-6 border-b border-line py-5"
                  >
                    <span className="w-16 shrink-0 font-display text-2xl font-bold text-accent">
                      {item.glyph}
                    </span>
                    <div>
                      <p className="font-medium text-ink">{item.label}</p>
                      <p className="mt-1 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </SplitBlock>
        </Container>
      </section>

      <section className="bg-bg-soft py-16">
        <Container>
          <Reveal>
            <p className="label text-muted">Company</p>
            <p className="mt-4 font-display text-xl font-bold tracking-tight md:text-2xl">
              {m.companyTitle}
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Are you ready to CURE & GROW?"
        buttonLabel={msgs.common.freeConsult}
        buttonHref="/contact"
      />
    </>
  );
}
