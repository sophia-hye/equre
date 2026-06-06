import { Container } from "./Container";

type Stat = {
  value: string;
  label: string;
};

type StatStripProps = {
  stats: Stat[];
};

export function StatStrip({ stats }: StatStripProps) {
  return (
    <section className="border-y border-line-strong bg-bg-soft">
      <Container>
        <dl className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-line py-10 sm:border-b-0 sm:px-9 sm:first:pl-0"
            >
              <dt className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
