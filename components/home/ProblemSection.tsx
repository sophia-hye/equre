import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSection() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-alert" aria-hidden />
                <span className="label text-alert">The Problem / 02</span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight md:text-[2.75rem]">
                단 하나의 길만 보고 달려온 아이들이 무너졌을 때, 우리 사회는
                이들을 받칠{" "}
                <span className="italic text-muted">
                  플랜 B도, 심리적 방어막도 갖고 있지 않습니다.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl leading-relaxed text-muted md:text-lg">
                엘리트 스포츠 입시에 매몰된 청소년들은 실패의 순간 극심한 번아웃에
                그대로 노출됩니다. 회복을 도울 구조가 없다는 것, 그것이 우리가
                풀어야 할 문제입니다.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
