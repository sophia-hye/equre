import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StatStrip } from "@/components/ui/StatStrip";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { SpacePreview } from "@/components/home/SpacePreview";
import { CrewSection } from "@/components/home/CrewSection";
import { UntangleSection } from "@/components/home/UntangleSection";
import { CTASection } from "@/components/ui/CTASection";

const stats = [
  { value: "10년+", label: "북미 대학 입학사정관 경력 기반의 입시 데이터" },
  { value: "E + Q", label: "이성(데이터)과 감성(치유)을 결합한 케어 모델" },
  { value: "Plan B", label: "실패를 회복으로 바꾸는 사회적 안전망 설계" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <StatStrip stats={stats} />
      <ProblemSection />
      <SolutionSection />
      <ProgramsSection />
      <SpacePreview />
      <CrewSection />
      <UntangleSection />
      <CTASection
        title="Are you ready to CURE & GROW?"
        description="재단의 철학과 맞닿은 가장 완벽한 사회적 파트너십, eqüre가 함께 만들어가겠습니다."
        buttonLabel="무료 상담 신청하기"
        buttonHref="/contact"
      />
    </>
  );
}
