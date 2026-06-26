import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { TracksSection } from "@/components/programs/TracksSection";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Art — Education Mentoring",
  description: "예술·실기 입시 멘토링 — Discovery부터 Elite까지 5가지 트랙.",
};

export default async function Page() {
  const m = (await getMessages()).programsPage;
  return (
    <>
      <PageHero
        kicker="Education · Art"
        index="B"
        title="Art"
        description={m.artDesc}
      />
      <TracksSection title={m.tracksTitle} desc={m.tracksDesc} tracks={m.tracks} />
      <CTASection
        title={m.ctaTitle}
        description={m.ctaDesc}
        buttonLabel={m.ctaBtn}
        buttonHref="/contact"
      />
    </>
  );
}
