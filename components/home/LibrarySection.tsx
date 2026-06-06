import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BookShelf, type Book } from "@/components/ui/BookShelf";
import { Reveal } from "@/components/ui/Reveal";

/** Brand themes rendered as a typographic bookshelf (terracotta duotone spines). */
const books: Book[] = [
  { title: "PLAN B", author: "eqüre", year: "2026", height: 318, width: 60, bg: "#ecdcc9" },
  { title: "CURE & GROW", author: "Manifesto", height: 296, width: 50, bg: "#e0b79a" },
  { title: "BURNOUT", author: "Recovery", height: 344, width: 64, bg: "#26221b", dark: true },
  { title: "ADMISSION", author: "Data", year: "N.A.", height: 286, width: 48, bg: "#d68a64" },
  { title: "RESILIENCE", height: 360, width: 54, bg: "#c2492b", dark: true },
  { title: "SOBER BAR", author: "Hannam", height: 300, width: 50, bg: "#ecdcc9", tilt: -3 },
  { title: "PEER MENTOR", height: 330, width: 58, bg: "#9c3a20", dark: true },
  { title: "A HISTORY", author: "eqüre", year: "2026", height: 274, width: 68, bg: "#e0b79a" },
];

export function LibrarySection() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="The eqüre Library"
            index="07"
            title="우리가 다루는 이야기, 한 권의 서가로"
            description="입시 데이터부터 번아웃 회복, 피어 멘토링까지 — equre가 청소년과 함께 써 내려가는 주제들을 한 권의 책처럼 모았습니다."
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16">
            <BookShelf books={books} />
            <p className="mt-5 label text-faint">
              eqüre Archive — 2026 Collection
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
