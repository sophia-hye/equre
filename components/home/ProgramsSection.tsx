import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { IconRoute, IconPeers, IconGlass } from "@/components/ui/icons";
import { getMessages } from "@/lib/i18n/server";

export async function ProgramsSection() {
  const m = (await getMessages()).programs;
  const items = [
    {
      index: "01",
      icon: <IconRoute width={24} height={24} />,
      title: m.c1t,
      body: m.c1b,
      href: "/programs",
    },
    {
      index: "02",
      icon: <IconPeers width={24} height={24} />,
      title: m.c2t,
      body: m.c2b,
      href: "/programs",
    },
    {
      index: "03",
      icon: <IconGlass width={24} height={24} />,
      title: m.c3t,
      body: m.c3b,
      href: "/space",
    },
  ];

  return (
    <section className="border-b border-line-strong bg-bg-soft py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionTitle kicker={m.kicker} index="04" title={m.title} />
        </Reveal>
        <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <FeatureCard
                index={item.index}
                icon={item.icon}
                title={item.title}
                href={item.href}
              >
                {item.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
