import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Business Program",
  description:
    "eqüre Business Consulting Program — 자본·시장진입·브랜드·디지털까지 원스톱 크로스보더 컨설팅 프로그램.",
};

export default async function BusinessProgramPage() {
  const m = (await getMessages()).studio;

  return (
    <>
      <PageHero
        kicker="Program"
        index={m.p2pn}
        title={m.p2h3}
        description={m.p2blurb}
      />

      {/* Service areas */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Service Areas"
              index="01"
              title={m.p2kr}
            />
          </Reveal>
          <div className="mt-14 border-t border-line-strong">
            {m.p2rows.map((row) => (
              <Reveal key={row.cn}>
                <div className="flex items-center justify-between gap-6 border-b border-line py-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-accent" aria-hidden>
                      ✓
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                      {row.cn}
                    </h3>
                  </div>
                  <p
                    className={`shrink-0 text-right text-sm ${
                      row.t ? "text-accent" : "text-faint"
                    }`}
                  >
                    {row.ch}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={`${m.ctaTitle1} ${m.ctaTitle2}`}
        description={m.ctaP}
        buttonLabel={m.ctaBtn}
        buttonHref="/contact"
      />
    </>
  );
}
