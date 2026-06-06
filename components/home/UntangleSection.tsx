import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { UntanglePath } from "@/components/ui/UntanglePath";
import { Reveal } from "@/components/ui/Reveal";

export function UntangleSection() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="( eqüre ) The Untangling"
            index="07"
            title="엉킨 길도, 결국 풀립니다"
            description="막막함과 번아웃으로 엉켜버린 길을 함께 한 가닥씩 풀어, 다시 또렷한 한 방향으로 이어 드립니다."
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16">
            {/* end labels */}
            <div className="mb-4 flex items-center justify-between">
              <span className="hand rotate-2">막막함 · 번아웃</span>
              <span className="label text-ink">회복 · 자립 →</span>
            </div>

            <UntanglePath />

            <p className="mt-4 text-sm leading-relaxed text-muted">
              왼쪽의 엉킨 매듭에서 오른쪽의 또렷한 길로 — equre가 함께 걷는 회복의
              궤적입니다.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
