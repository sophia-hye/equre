import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { profileItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile",
  description: "eqüre 소개 — 팀과 멘토진.",
};

export default function ProfilePage() {
  return (
    <>
      <PageHero
        kicker="Profile"
        index="E"
        title="Profile"
        description="eqüre를 이끄는 팀과 멘토진을 소개합니다."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {profileItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col border border-line-strong p-8 transition-colors hover:border-accent hover:bg-bg-soft"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
                <span className="mt-8 inline-block text-lg text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
