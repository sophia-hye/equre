import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getMessages } from "@/lib/i18n/server";

export async function ProblemSection() {
  const m = (await getMessages()).problem;
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-alert" aria-hidden />
                <span className="label text-alert">{m.kicker}</span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight md:text-[2.75rem]">
                {m.title1}
                <span className="italic text-muted">{m.title2}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl leading-relaxed text-muted md:text-lg">
                {m.body}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
