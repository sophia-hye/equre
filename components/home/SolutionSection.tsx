import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { IconRoute, IconPulseHeart } from "@/components/ui/icons";

const pillars = [
  {
    tag: "E — 이성",
    title: "데이터",
    desc: "10년 경력 북미 입학사정관의 데이터를 기반으로 한 정밀한 입학 로드맵.",
    icon: <IconRoute width={26} height={26} />,
  },
  {
    tag: "Q — 감성",
    title: "치유",
    desc: "깊은 심리 치유와 멘탈 케어로 흔들리지 않는 멘탈리티를 세웁니다.",
    icon: <IconPulseHeart width={26} height={26} />,
  },
];

export function SolutionSection() {
  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker="eqüre's Solution"
            index="03"
            title="가장 강력하고 견고한 사회적 안전망"
            description="단 하나의 길이 무너졌을 때 아이들을 다시 일으켜 세우는 Social Safety Net. 이성과 감성을 결합해 압도적인 플랜 B를 설계합니다."
          />
        </Reveal>

        <div className="mt-16 grid border-t border-line-strong md:grid-cols-2 md:divide-x md:divide-line">
          {pillars.map((p, i) => (
            <Reveal key={p.tag} delay={i * 120}>
              <div className="border-b border-line py-9 md:border-b-0 md:px-10 md:first:pl-0">
                <div className="flex items-center justify-between">
                  <span className="text-accent">{p.icon}</span>
                  <span className="label text-faint">{p.tag}</span>
                </div>
                <h3 className="mt-8 font-display text-4xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
            아이들이 실패를 딛고{" "}
            <span className="italic text-accent">글로벌 웰니스 리더</span>로
            자립하도록 돕는 것, 이것이 equre가 창출하는 본질적 가치입니다.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
