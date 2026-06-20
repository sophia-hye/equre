import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { UntanglePath } from "@/components/ui/UntanglePath";
import { Reveal } from "@/components/ui/Reveal";
import { getMessages } from "@/lib/i18n/server";

export async function UntangleSection() {
  const m = (await getMessages()).untangle;
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker={m.kicker}
            index="07"
            title={m.title}
            description={m.desc}
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <span className="hand rotate-2">{m.start}</span>
              <span className="label text-ink">{m.end}</span>
            </div>

            <UntanglePath />

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {m.caption}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
