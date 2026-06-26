import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";

type Track = {
  num: string;
  title: string;
  kr: string;
  sub: string;
  meta: string;
  desc: string;
  detail: string;
  points: readonly string[];
};

/** 단일 트랙(Discovery/Decision/…) 상세 페이지 본문. 분야(Tennis/Art) 컨텍스트와 함께 렌더. */
export function TrackDetail({
  discipline,
  disciplineHref,
  backLabel,
  track,
  cta,
}: {
  discipline: string;
  disciplineHref: string;
  backLabel: string;
  track: Track;
  cta: { title: string; desc: string; btn: string };
}) {
  return (
    <>
      <PageHero
        kicker={`${discipline} · Track ${track.num}`}
        index={track.num}
        title={track.title}
        description={track.sub}
      />

      <section className="border-b border-line-strong py-20 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
            {/* meta column */}
            <div>
              <p className="label text-faint">{track.kr}</p>
              <p className="mt-3 font-display text-sm font-semibold uppercase tracking-wide text-accent">
                {track.meta}
              </p>
              <Link
                href={disciplineHref}
                className="mt-10 inline-block text-sm text-muted transition-colors hover:text-ink"
              >
                ← {backLabel}
              </Link>
            </div>

            {/* detail column */}
            <div>
              <p className="text-lg leading-relaxed text-ink md:text-xl">
                {track.detail}
              </p>
              <ul className="mt-10 border-t border-line-strong">
                {track.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-b border-line py-4 text-sm text-ink"
                  >
                    <span className="text-accent">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title={cta.title}
        description={cta.desc}
        buttonLabel={cta.btn}
        buttonHref="/contact"
      />
    </>
  );
}
