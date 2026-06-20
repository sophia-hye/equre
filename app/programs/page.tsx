import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { MemberGate } from "@/components/MemberGate";
import { IconRoute, IconPulseHeart } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "북미 입학사정관 데이터 기반 입시 로드맵과 심리 치유를 결합한 프리미엄 컨설팅, 글로벌 피어 멘토링.",
};

const coreCards = [
  {
    icon: <IconRoute width={24} height={24} />,
    title: "입학 로드맵",
    points: [
      "북미 대학 스포츠/일반 전형 전략",
      "10년 경력 입학사정관 데이터 기반",
      "개인 맞춤 진학 타임라인 설계",
    ],
  },
  {
    icon: <IconPulseHeart width={24} height={24} />,
    title: "심리 치유 / 멘탈 케어",
    points: [
      "번아웃 회복 세션",
      "개인 맞춤 멘탈 케어 프로그램",
      "흔들리지 않는 멘탈리티 구축",
    ],
  },
];

const mentorSteps = [
  { label: "진행 방식", caption: "회복·성공한 선배와 1:1 / 그룹 멘토링" },
  { label: "대상", caption: "비슷한 아픔을 겪는 후배 청소년" },
  { label: "기대 효과", caption: "치유와 성장의 선순환, 글로벌 네트워크" },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        kicker="Programs"
        index="B"
        title="데이터와 치유를 결합한 완벽한 플랜 B"
        description="안정적인 컨설팅과 깊은 멘탈 케어, 그리고 선배가 후배를 이끄는 피어 멘토링까지. equre의 핵심 프로그램입니다."
      />

      {/* Core */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Core"
              index="01"
              title="입시 & 멘탈 컨설팅"
              description="프리미엄 컨설팅으로 안정적인 진학을 설계하고, 심리 치료 세션으로 마음을 회복합니다."
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
              title="글로벌 피어 멘토"
              description="회복과 진학에 성공한 선배가 후배를 직접 이끄는 멘토로 성장합니다. 치유와 성장의 선순환을 완성합니다."
            />
            <div className="mt-16">
              <ProcessSteps steps={mentorSteps} />
            </div>
          </MemberGate>
        </Container>
      </section>

      <CTASection
        title="플랜 B, 지금 시작하세요"
        description="간단한 상담으로 우리 아이에게 맞는 프로그램을 함께 찾아드립니다."
        buttonLabel="상담으로 시작하기"
        buttonHref="/contact"
      />
    </>
  );
}
