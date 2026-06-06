import { Container } from "@/components/ui/Container";
import { TOCList } from "@/components/ui/TOCList";
import { SpecTable } from "@/components/ui/SpecTable";
import { Reveal } from "@/components/ui/Reveal";

const toc = [
  { label: "Introduction", href: "#intro" },
  { label: "Programs", href: "/programs" },
  { label: "About eqüre", href: "/about" },
  { label: "Space & Sober Bar", href: "/space" },
  { label: "The eqüre Crew", href: "#crew" },
  { label: "Contact", href: "/contact" },
];

const spec = [
  {
    label: "THE PRODUCT",
    value:
      "엘리트 청소년을 위한 입시 컨설팅과 멘탈 케어를 결합한 글로벌 웰니스 교육 허브.",
  },
  {
    label: "THE MODEL",
    value:
      "이성(E·데이터 기반 입학 로드맵)과 감성(Q·심리 치유)을 결합한 하이브리드 케어.",
  },
  {
    label: "THE PROBLEM",
    value:
      "단 하나의 길에 매몰된 청소년에게는 실패를 받칠 플랜 B도, 심리적 방어막도 없다.",
  },
  {
    label: "THE GOAL",
    value:
      "실패를 회복으로 바꾸고, 아이들이 글로벌 웰니스 리더로 자립하도록 돕는 사회적 안전망.",
  },
];

export function ContentsSection() {
  return (
    <section id="intro" className="border-b border-line-strong py-20 md:py-28">
      <Container>
        {/* index line */}
        <Reveal>
          <div className="mb-10 flex items-baseline justify-between border-b border-line-strong pb-4">
            <span className="label text-ink">01 — Contents</span>
            <span className="index-num text-sm">/ 06</span>
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="label mb-6 text-muted">Index</p>
            <TOCList items={toc} />
          </Reveal>

          <Reveal delay={120}>
            <p className="label mb-6 text-muted">Overview</p>
            <SpecTable rows={spec} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
