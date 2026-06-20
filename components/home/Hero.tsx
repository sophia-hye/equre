import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getMessages } from "@/lib/i18n/server";

export async function Hero() {
  const msgs = await getMessages();
  const m = msgs.hero;
  const c = msgs.common;

  return (
    <section className="relative overflow-hidden border-b border-line-strong">
      {/* top meta row */}
      <div className="border-b border-line">
        <Container className="flex items-center justify-between py-3">
          <span className="label text-muted">{m.metaLeft}</span>
          <span className="label hidden text-muted sm:inline">
            {m.metaCenter}
          </span>
          <span className="label text-muted">2026</span>
        </Container>
      </div>

      {/* decorative flowing line, upper right */}
      <svg
        className="pointer-events-none absolute -right-10 top-0 hidden h-[480px] w-[420px] lg:block"
        viewBox="0 0 420 480"
        fill="none"
        aria-hidden
      >
        <path
          d="M420 40 C 300 60, 320 180, 240 200 S 120 240, 180 330 S 360 420, 280 470"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
        <circle cx="240" cy="200" r="5" fill="var(--color-accent)" />
      </svg>

      <Container className="relative py-20 md:py-28 lg:py-32">
        <p className="font-display text-2xl font-semibold tracking-tight text-accent md:text-3xl">
          {m.tag}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-semibold uppercase leading-[0.98] tracking-tight text-ink/85 sm:text-6xl lg:text-7xl">
          {m.title1}
          <br />
          {m.title2pre}
          <span className="text-accent">{m.title2accent}</span>
          {m.title2post}
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {m.body}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button href="/contact" withArrow>
              {c.freeConsult}
            </Button>
            <Button href="/programs" variant="secondary">
              {c.viewPrograms}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
