import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JourneyPath, type JourneyStep } from "@/components/ui/JourneyPath";
import { Reveal } from "@/components/ui/Reveal";
import { getMessages } from "@/lib/i18n/server";

export async function ProcessSection() {
  const m = (await getMessages()).process;
  const steps: JourneyStep[] = [
    { title: m.s1t, body: m.s1b, note: m.s1n },
    { title: m.s2t, body: m.s2b, note: m.s2n },
    { title: m.s3t, body: m.s3b, note: m.s3n },
    { title: m.s4t, body: m.s4b, note: m.s4n },
  ];

  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker={m.kicker}
            index="01"
            title={m.title}
            description={m.desc}
          />
        </Reveal>
        <div className="mt-16">
          <JourneyPath steps={steps} />
        </div>
      </Container>
    </section>
  );
}
