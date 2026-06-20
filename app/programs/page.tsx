import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { MemberGate } from "@/components/MemberGate";
import { IconRoute, IconPulseHeart } from "@/components/ui/icons";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "북미 입학사정관 데이터 기반 입시 로드맵과 심리 치유를 결합한 프리미엄 컨설팅, 글로벌 피어 멘토링.",
};

export default async function ProgramsPage() {
  const m = (await getMessages()).programsPage;
  const coreCards = [
    {
      icon: <IconRoute width={24} height={24} />,
      title: m.c1t,
      points: [m.c1p1, m.c1p2, m.c1p3],
    },
    {
      icon: <IconPulseHeart width={24} height={24} />,
      title: m.c2t,
      points: [m.c2p1, m.c2p2, m.c2p3],
    },
  ];
  const mentorSteps = [
    { label: m.st1t, caption: m.st1c },
    { label: m.st2t, caption: m.st2c },
    { label: m.st3t, caption: m.st3c },
  ];

  return (
    <>
      <PageHero
        kicker="Programs"
        index="B"
        title={m.heroTitle}
        description={m.heroDesc}
      />

      {/* Core */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Core"
              index="01"
              title={m.coreTitle}
              description={m.coreDesc}
            />
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {coreCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="border-t border-line-strong pt-7">
                  <div className="text-accent">{card.icon}</div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                    {card.title}
                  </h3>
                  <ul className="mt-6 space-y-3.5">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Peer Mentoring (members only) */}
      <section className="bg-bg-soft py-24 md:py-28">
        <Container>
          <MemberGate>
            <SectionTitle
              kicker="Peer Mentoring"
              index="02"
              title={m.peerTitle}
              description={m.peerDesc}
            />
            <div className="mt-16">
              <ProcessSteps steps={mentorSteps} />
            </div>
          </MemberGate>
        </Container>
      </section>

      <CTASection
        title={m.ctaTitle}
        description={m.ctaDesc}
        buttonLabel={m.ctaBtn}
        buttonHref="/contact"
      />
    </>
  );
}
