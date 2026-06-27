import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { profileItems } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Profile",
  description: "eqüre 소개 — 팀과 멘토진.",
};

export default async function ProfilePage() {
  const m = (await getMessages()).pages;
  return (
    <>
      <PageHero
        kicker="Profile"
        index="E"
        title={m.profileTitle}
        description={m.profileDesc}
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
                  {item.href === "/team" ? m.teamLabel : item.label}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {item.href === "/team" ? m.teamDesc : item.desc}
                </p>
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
