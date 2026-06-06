import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JourneyPath, type JourneyStep } from "@/components/ui/JourneyPath";
import { Reveal } from "@/components/ui/Reveal";

const steps: JourneyStep[] = [
  {
    title: "30분 디스커버리 콜로 시작합니다",
    body: "지금의 상황과 고민, 목표를 편하게 나눕니다. 무엇이 무너졌고 무엇을 원하는지부터 듣습니다.",
    note: "편하게 이야기 나눠요",
  },
  {
    title: "북미 입학사정관 데이터로 로드맵을 설계합니다",
    body: "10년 경력의 데이터를 기반으로 스포츠·일반 전형의 현실적인 진학 경로를 그립니다.",
    note: "모든 결정엔 근거가 있어요",
  },
  {
    title: "깊은 심리 치유와 멘탈 케어를 병행합니다",
    body: "번아웃을 회복하고 흔들리지 않는 멘탈리티를 세웁니다. 마음부터 단단하게.",
    note: "마음부터 단단하게",
  },
  {
    title: "글로벌 웰니스 리더로 자립합니다",
    body: "회복한 선배는 후배를 이끄는 피어 멘토가 되어, 치유와 성장을 다음 세대로 잇습니다.",
    note: "다음 세대로 이어져요",
  },
];

export function ProcessSection() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="( eqüre ) Work Process"
            index="01"
            title="실패를 회복으로 바꾸는 네 단계"
            description="입시와 멘탈을 따로 보지 않습니다. 하나의 흐름으로 이어진 equre의 플랜 B 설계 과정입니다."
          />
        </Reveal>
        <div className="mt-16">
          <JourneyPath steps={steps} />
        </div>
      </Container>
    </section>
  );
}
