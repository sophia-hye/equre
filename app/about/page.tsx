import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SplitBlock } from "@/components/ui/SplitBlock";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "equre는 이성(데이터)과 감성(치유)을 결합해 엘리트 청소년을 위한 사회적 안전망을 만듭니다.",
};

const identity = [
  {
    glyph: "E+Q",
    label: "이성과 감성의 결합",
    desc: "데이터를 상징하는 E와 마음을 상징하는 Q가 만납니다.",
  },
  {
    glyph: "∞",
    label: "무한한 잠재력",
    desc: "두 알파벳이 이어져 무한대의 가능성을 이룹니다.",
  },
  {
    glyph: "⚓",
    label: "견고한 닻",
    desc: "결코 흔들리지 않는 닻(Anchor), 견고한 멘탈리티.",
  },
  {
    glyph: "ü",
    label: "북유럽 감성",
    desc: "우믈라우트로 더한 프리미엄 웰니스의 세련미.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About eqüre"
        index="A"
        title="실패를 회복으로 바꾸는 사회적 안전망"
        description="단 하나의 길에 매몰된 청소년들이 다시 일어설 수 있도록, equre는 이성과 감성을 결합한 완벽한 플랜 B를 설계합니다."
      />

      {/* Problem */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="The Problem"
              index="01"
              title="플랜 B가 없는 아이들"
              description="엘리트 스포츠 입시에 매몰된 청소년들은 단 하나의 길이 무너지면 심리적 방어막 없이 극심한 번아웃에 노출됩니다. 우리 사회에는 이들을 보호할 안전망이 부족합니다."
            />
          </Reveal>
        </Container>
      </section>

      {/* Solution */}
      <section className="border-b border-line-strong bg-bg-soft py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Our Solution"
              index="02"
              title="이성과 감성을 결합한 압도적인 플랜 B"
              description="10년 경력 북미 입학사정관의 데이터(이성)와 깊은 심리 치유(감성)를 결합합니다. 아이들이 실패를 딛고 글로벌 웰니스 리더로 자립하도록 돕는 것이 equre의 본질적 가치입니다."
            />
          </Reveal>
        </Container>
      </section>

      {/* Brand Identity */}
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
                title="이성과 감성의 완벽한 결합"
                description="단순한 교육기관을 넘어선 프리미엄 웰니스 라이프스타일 브랜드. 로고에는 equre의 철학이 담겨 있습니다."
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

      {/* Company */}
      <section className="bg-bg-soft py-16">
        <Container>
          <Reveal>
            <p className="label text-muted">Company</p>
            <p className="mt-4 font-display text-xl font-bold tracking-tight md:text-2xl">
              {site.legalNameFull}
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Are you ready to CURE & GROW?"
        buttonLabel="무료 상담 신청"
        buttonHref="/contact"
      />
    </>
  );
}
