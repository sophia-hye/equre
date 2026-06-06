import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";

export function SpacePreview() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="label text-ink">Space Branding / 05</span>
            </div>
            <h2 className="font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight md:text-6xl">
              &ldquo;병원이나 학원이 아닌,
              <br />
              <span className="italic text-accent">힙한 아지트.</span>&rdquo;
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-muted md:text-lg">
              노출 콘크리트와 네온이 어우러진 SEOULITE HANNAM. Sober Bar와 Tech
              Showroom을 갖춘 프리미엄 웰니스 라이프스타일 공간.
            </p>
            <Link
              href="/space"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <span className="link-underline">공간 둘러보기</span>
              <IconArrowRight
                width={16}
                height={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* terracotta-duotone textured panel */}
          <div className="lg:col-span-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-line-strong"
              style={{
                background:
                  "linear-gradient(135deg, #e7d2bf 0%, #d68a64 45%, #c2492b 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0 1px, transparent 1px 56px)",
                }}
                aria-hidden
              />
              <span className="absolute bottom-5 left-5 label text-white/90">
                SEOULITE HANNAM — Sober Bar & Showroom
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
