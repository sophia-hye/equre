import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

type CTASectionProps = {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
};

export function CTASection({
  title,
  description,
  buttonLabel,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="border-t border-line-strong bg-ink text-bg">
      <Container className="py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-bg md:text-6xl">
              {title}
            </h2>
            {description && (
              <p className="mt-7 max-w-xl leading-relaxed text-faint md:text-lg">
                {description}
              </p>
            )}
            <div className="mt-10">
              <Button href={buttonHref} withArrow>
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
