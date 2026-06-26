import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

type Track = {
  num: string;
  title: string;
  kr: string;
  sub: string;
  meta: string;
  desc: string;
  points: readonly string[];
};

/** Discovery → Elite 5트랙 여정 섹션. 각 트랙은 상세 페이지로 연결된다.
 *  basePath = 분야 경로(예: "/programs/tennis"), 트랙 링크는 basePath/{slug}. */
export function TracksSection({
  title,
  desc,
  tracks,
  basePath,
  kicker = "Tracks",
  index = "01",
}: {
  title: string;
  desc: string;
  tracks: readonly Track[];
  basePath: string;
  kicker?: string;
  index?: string;
}) {
  return (
    <section className="border-b border-line-strong py-24 md:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            kicker={kicker}
            index={index}
            title={title}
            description={desc}
          />
        </Reveal>
        <div className="mt-16 border-t border-line-strong">
          {tracks.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <Link
                href={`${basePath}/${t.title.toLowerCase()}`}
                className="group grid gap-5 border-b border-line py-9 transition-colors hover:bg-bg-soft md:grid-cols-[5rem_1fr] md:gap-10"
              >
                <div className="font-display text-4xl font-black leading-none text-accent/30 md:text-5xl">
                  {t.num}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {t.title}
                    </h3>
                    <span className="text-sm text-muted">
                      {t.kr} · {t.sub}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-accent">
                      {t.meta}
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {t.desc}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {t.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-ink"
                      >
                        <span className="text-accent">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-block text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
