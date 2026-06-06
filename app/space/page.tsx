import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { IconGlass, IconDevice } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Space",
  description:
    "병원이나 학원이 아닌 힙한 아지트. Sober Bar와 Tech Showroom을 갖춘 SEOULITE HANNAM 프리미엄 웰니스 공간.",
};

const zones = [
  {
    icon: <IconGlass width={26} height={26} />,
    name: "Sober Bar",
    desc: "무알콜 음료와 글루텐프리 스낵을 즐기며 대기하는 학부모·선수 전용 휴식 공간. 식음료 수익화와 커뮤니티 체류를 동시에.",
    tags: ["무알콜 음료", "글루텐프리 스낵", "학부모 라운지"],
  },
  {
    icon: <IconDevice width={26} height={26} />,
    name: "Tech Showroom",
    desc: "첨단 스포츠 과학 및 웰니스 멘탈케어 기기를 체험하는 팝업 전시 공간. 하이엔드 브랜드의 B2B 브리핑 무대.",
    tags: ["스포츠 과학", "웰니스 기기", "B2B 팝업"],
  },
];

export default function SpacePage() {
  return (
    <>
      <PageHero
        kicker="Space Branding"
        index="C"
        title="Sober Bar & Showroom"
        description="“병원이나 학원이 아닌, 힙한 아지트.” 노출 콘크리트와 메탈 소재, 네온 조명으로 스트리트 플래그십 스토어 같은 감각적 만족감과 소속감을 제공합니다."
      />

      {/* duotone banner */}
      <section className="border-b border-line-strong">
        <div
          className="relative aspect-[16/7] w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #e7d2bf 0%, #d68a64 45%, #c2492b 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0 1px, transparent 1px 64px)",
            }}
            aria-hidden
          />
          <Container className="relative flex h-full items-end py-8">
            <span className="label text-white/90">
              {site.location} — 테니스 코트 內 프리미엄 웰니스 공간
            </span>
          </Container>
        </div>
      </section>

      {/* Zones */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="공간 활용 계획"
              index="01"
              title="프리미엄 웰니스 라이프스타일을 직접 체험하는 공간"
            />
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
              description="테니스 코트 內에 자리한 프리미엄 웰니스 공간. 글로벌 생태계로 확장하는 equre의 플래그십 거점입니다."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 flex h-[280px] items-center justify-center border border-line-strong bg-surface label text-faint">
              MAP — 위치 정보 확정 후 연동
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="공간이 궁금하신가요?"
        description="방문 예약과 B2B 팝업·대관 문의를 환영합니다."
        buttonLabel="방문 / 대관 문의"
        buttonHref="/contact"
      />
    </>
  );
}
