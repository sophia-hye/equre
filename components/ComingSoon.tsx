import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { getMessages } from "@/lib/i18n/server";

type ComingSoonProps = {
  kicker: string;
  title: string;
};

export async function ComingSoon({ kicker, title }: ComingSoonProps) {
  const m = await getMessages();
  return (
    <>
      <PageHero kicker={kicker} title={title} description={m.comingSoon.heroDesc} />
      <section className="py-20 md:py-28">
        <Container>
          <div className="border border-line-strong bg-bg-soft p-12 text-center md:p-16">
            <p className="font-display text-2xl font-bold tracking-tight">
              {m.comingSoon.title}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              {m.comingSoon.body}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact" withArrow>
                {m.common.consult}
              </Button>
              <Button href="/" variant="secondary">
                {m.common.home}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
