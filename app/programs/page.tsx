import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { MemberGate } from "@/components/MemberGate";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Tennis·Art 두 분야, 각 분야 Discovery부터 Elite까지 5가지 트랙. 입시 전략과 멘탈 케어를 결합한 eqüre 프로그램.",
};

export default async function ProgramsPage() {
  const m = (await getMessages()).programsPage;
  const disciplines = [
    { label: "Tennis", sub: m.tennisSub, desc: m.tennisDesc, href: "/programs/tennis" },
    { label: "Art", sub: m.artSub, desc: m.artDesc, href: "/programs/art" },
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

      {/* By discipline */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="By Discipline"
              index="01"
              title={m.catTitle}
              description={m.catDesc}
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {disciplines.map((d, i) => (
              <Reveal key={d.href} delay={i * 100}>
                <Link
                  href={d.href}
                  className="group flex h-full flex-col border border-line-strong p-8 transition-colors hover:border-accent hover:bg-bg-soft"
                >
                  <p className="label text-faint">Education</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                    {d.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{d.sub}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {d.desc}
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-line pt-5">
                    {m.tracks.map((t) => (
                      <li
                        key={t.title}
                        className="flex items-baseline gap-3 text-sm"
                      >
                        <span className="font-display text-xs font-semibold text-accent">
                          {t.num}
                        </span>
                        <span className="flex-1 text-ink">
                          {t.title}
                          <span className="ml-2 text-muted">{t.kr}</span>
                        </span>
                        <span className="shrink-0 text-right text-xs text-faint">
                          {t.meta}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-block text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                    {m.catCta} →
                  </span>
                </Link>
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
