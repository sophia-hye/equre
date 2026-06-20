import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Reveal } from "@/components/ui/Reveal";
import { getMessages } from "@/lib/i18n/server";

export async function CrewSection() {
  const m = (await getMessages()).crew;
  const steps = [
    { label: m.s1t, caption: m.s1c },
    { label: m.s2t, caption: m.s2c },
    { label: m.s3t, caption: m.s3c },
    { label: m.s4t, caption: m.s4c },
  ];

  return (
    <section id="crew" className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker={m.kicker}
            index="06"
            title={m.title}
            description={m.desc}
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
