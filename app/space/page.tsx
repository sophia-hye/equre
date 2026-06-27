import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { IconGlass, IconDevice } from "@/components/ui/icons";
import { SeouliteLocations } from "@/components/space/SeouliteLocations";
import { site } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Space",
  description:
    "병원이나 학원이 아닌 힙한 아지트. Sober Bar와 Tech Showroom을 갖춘 SEOULITE HANNAM 프리미엄 웰니스 공간.",
};

export default async function SpacePage() {
  const m = (await getMessages()).spacePage;
  const zones = [
    {
      icon: <IconGlass width={26} height={26} />,
      name: m.z1name,
      desc: m.z1desc,
      tags: [m.z1t1, m.z1t2, m.z1t3],
    },
    {
      icon: <IconDevice width={26} height={26} />,
      name: m.z2name,
      desc: m.z2desc,
      tags: [m.z2t1, m.z2t2, m.z2t3],
    },
  ];

  return (
    <>
      <PageHero
        kicker="Space Branding"
        index="C"
        title={m.heroTitle}
        description={m.heroDesc}
      />

      {/* banner — SEOULITE HANNAM 사진 (그라데이션은 폴백) */}
      <section className="border-b border-line-strong">
        <div
          className="relative aspect-[16/7] w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #e7d2bf 0%, #d68a64 45%, #c2492b 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/main-clay.png"
            alt={`${site.location} — ${m.banner}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            aria-hidden
          />
          <Container className="relative flex h-full items-end py-8">
            <span className="label text-white/90">
              {site.location} — {m.banner}
            </span>
          </Container>
        </div>
      </section>

      {/* Zones */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle kicker="Space" index="01" title={m.zonesTitle} />
          </Reveal>
          <div className="mt-16 grid border-t border-line-strong md:grid-cols-2 md:divide-x md:divide-line">
            {zones.map((zone, i) => (
              <Reveal key={zone.name} delay={i * 100}>
                <div className="border-b border-line py-9 md:border-b-0 md:px-10 md:first:pl-0">
                  <div className="text-accent">{zone.icon}</div>
                  <h3 className="mt-7 font-display text-3xl font-bold tracking-tight text-accent">
                    {zone.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {zone.desc}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {zone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="bg-bg-soft py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Location"
              index="02"
              title={site.location}
              description={m.locationDesc}
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-14">
              <SeouliteLocations />
            </div>
          </Reveal>
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
