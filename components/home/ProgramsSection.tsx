import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { IconRoute, IconPeers, IconGlass } from "@/components/ui/icons";

const items = [
  {
    index: "01",
    icon: <IconRoute width={24} height={24} />,
    title: "Core — 입시 & 멘탈",
    body: "북미권 대학 스포츠/일반 전형의 체계적인 진학 로드맵과 심리 치료 세션을 결합한 프리미엄 컨설팅.",
    href: "/programs",
  },
  {
    index: "02",
    icon: <IconPeers width={24} height={24} />,
    title: "Peer Mentoring",
    body: "회복과 진학에 성공한 선배가 후배를 직접 이끄는 글로벌 피어 멘토. 치유와 성장의 선순환 구조.",
    href: "/programs",
  },
  {
    index: "03",
    icon: <IconGlass width={24} height={24} />,
    title: "Space — Sober Bar",
    body: "병원도 학원도 아닌 힙한 아지트. 무알콜 바와 Tech Showroom을 갖춘 프리미엄 웰니스 공간.",
    href: "/space",
  },
];

export function ProgramsSection() {
  return (
    <section className="border-b border-line-strong bg-bg-soft py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="What We Do"
            index="04"
            title="데이터와 치유, 공간을 잇는 하이브리드 허브"
          />
        </Reveal>
        <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <FeatureCard
                index={item.index}
                icon={item.icon}
                title={item.title}
                href={item.href}
              >
                {item.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
