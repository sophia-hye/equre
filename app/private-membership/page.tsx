import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/ui/CTASection";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Private Membership",
  description:
    "eqüre 멤버만 누리는 혜택과, 멤버 커뮤니티가 함께 만들어온 기록.",
};

const benefits = [
  {
    title: "Full library access",
    desc: "입시 데이터·리포트·가이드 등 eqüre 라이브러리 전체를 열람합니다.",
  },
  {
    title: "Peer mentoring network",
    desc: "같은 길을 걸어온 선배와 1:1로 연결되고, 직접 피어 멘토로 성장합니다.",
  },
  {
    title: "Priority space access",
    desc: "SEOULITE HANNAM — Sober Bar 라운지와 Tech Showroom 우선 예약.",
  },
  {
    title: "Members-only events",
    desc: "비공개 세미나·입시 브리핑·커뮤니티 나이트에 멤버 우선 초대.",
  },
  {
    title: "Priority consultation",
    desc: "디스커버리 콜과 1:1 세션을 우선 순위로 예약합니다.",
  },
  {
    title: "Mental care resources",
    desc: "프로그램 이후에도 이어지는 정기 체크인과 웰니스 리소스.",
  },
];

const history = [
  {
    date: "2026 · Spring",
    title: "Founding Members' Discovery Day",
    desc: "첫 멤버들이 모인 디스커버리 데이 — 커뮤니티의 시작.",
  },
  {
    date: "2026 · Summer",
    title: "Sober Bar opening meetup",
    desc: "SEOULITE HANNAM Sober Bar 라운지 오프닝 나이트, 멤버 모임.",
  },
  {
    date: "2026 · Summer",
    title: "Peer Mentor Cohort 1",
    desc: "첫 피어 멘토 기수가 트레이닝을 마치고 후배 멘토링을 시작.",
  },
  {
    date: "2026 · Fall",
    title: "Members-only admissions seminar",
    desc: "멤버와 학부모를 위한 비공개 북미 입시 브리핑.",
  },
  {
    date: "2026 · Winter",
    title: "Community Night",
    desc: "학생·학부모·멘토가 함께한 시즌 커뮤니티 모임.",
  },
];

export default async function Page() {
  const msgs = await getMessages();

  return (
    <>
      <PageHero
        kicker="Private Membership"
        index="M"
        title="By members, for members."
        description="eqüre 멤버만 누리는 혜택과, 멤버 커뮤니티가 함께 만들어온 기록을 모았습니다."
      />

      {/* Benefits */}
      <section className="border-b border-line-strong py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Benefits"
              index="01"
              title="멤버만 누리는 혜택"
              description="멤버십은 콘텐츠 열람을 넘어, 공간·네트워크·우선권까지 닿습니다."
            />
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="border-t border-line-strong pt-6">
                  <span className="label text-accent">Members only</span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Community history */}
      <section className="bg-bg-soft py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionTitle
              kicker="Community History"
              index="02"
              title="함께 만들어온 기록"
              description="멤버 커뮤니티가 모이고, 나누고, 성장해온 순간들."
            />
          </Reveal>
          <div className="mt-16 border-t border-line-strong">
            {history.map((h, i) => (
              <Reveal key={h.title + i} delay={i * 60}>
                <div className="grid gap-3 border-b border-line py-8 md:grid-cols-[160px_1fr] md:gap-10">
                  <div className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
                    {h.date}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Become a member"
        description="가입 후 멤버 전용 혜택과 커뮤니티에 함께하세요."
        buttonLabel={msgs.common.signup}
        buttonHref="/signup"
      />
    </>
  );
}
