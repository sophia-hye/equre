import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { IconRoute, IconPulseHeart } from "@/components/ui/icons";
import { getMessages } from "@/lib/i18n/server";

export async function SolutionSection() {
  const m = (await getMessages()).solution;
  const pillars = [
    {
      tag: m.p1tag,
      title: m.p1title,
      desc: m.p1desc,
      icon: <IconRoute width={26} height={26} />,
    },
    {
      tag: m.p2tag,
      title: m.p2title,
      desc: m.p2desc,
      icon: <IconPulseHeart width={26} height={26} />,
    },
  ];

  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            kicker={m.kicker}
            index="03"
            title={m.title}
            description={m.desc}
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
            {m.closing1}
            <span className="italic text-accent">{m.closingAccent}</span>
            {m.closing2}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
