import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { label: "실패", caption: "단 하나의 길이 무너진 순간" },
  { label: "회복 · 치유", caption: "심리 케어와 멘탈 회복" },
  { label: "진학 성공", caption: "데이터 기반 플랜 B 실현" },
  { label: "피어 멘토", caption: "후배를 이끄는 글로벌 멘토" },
];

export function CrewSection() {
  return (
    <section id="crew" className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="The eqüre Crew"
            index="06"
            title="치유와 성장이 다음 세대로 이어지는 선순환"
            description="회복한 선배가 후배를 직접 이끄는 글로벌 피어 멘토로 성장하며, equre 크루는 페스티벌 앰배서더로 활동합니다."
          />
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-16">
            <ProcessSteps steps={steps} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
