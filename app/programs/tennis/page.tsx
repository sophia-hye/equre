import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { TracksSection } from "@/components/programs/TracksSection";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Tennis — Education Mentoring",
  description:
    "테니스 특기 입시 멘토링 — Discovery부터 Elite까지 5가지 트랙.",
};

export default async function Page() {
  const m = (await getMessages()).programsPage;
  return (
    <>
      <PageHero
        kicker="Education · Tennis"
        index="B"
        title="Tennis"
        description={m.tennisDesc}
      />
      <TracksSection
        title={m.tracksTitle}
        desc={m.tracksDesc}
        tracks={m.tracks}
        basePath="/programs/tennis"
      />
      <CTASection
        title={m.ctaTitle}
        description={m.ctaDesc}
        buttonLabel={m.ctaBtn}
        buttonHref="/contact"
      />
    </>
  );
}
