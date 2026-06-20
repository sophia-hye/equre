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
import { getMessages } from "@/lib/i18n/server";

export default async function HomePage() {
  const m = await getMessages();
  const stats = [
    { value: m.stats.s1v, label: m.stats.s1l },
    { value: m.stats.s2v, label: m.stats.s2l },
    { value: m.stats.s3v, label: m.stats.s3l },
  ];

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
        title={m.homeCta.title}
        description={m.homeCta.desc}
        buttonLabel={m.common.freeConsultArrow}
        buttonHref="/contact"
      />
    </>
  );
}
