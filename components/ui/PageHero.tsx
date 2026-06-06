import { ReactNode } from "react";
import { Container } from "./Container";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  description?: string;
  index?: string;
};

export function PageHero({ kicker, title, description, index }: PageHeroProps) {
  return (
    <section className="border-b border-line-strong">
      <Container className="py-20 md:py-28">
        <div className="mb-8 flex items-center gap-4">
          <span className="label text-ink">{kicker}</span>
          {index && (
            <>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="index-num text-sm">{index}</span>
            </>
          )}
        </div>
        <h1 className="max-w-4xl font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
