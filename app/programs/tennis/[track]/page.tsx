import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackDetail } from "@/components/programs/TrackDetail";
import { getMessages } from "@/lib/i18n/server";

const SLUGS = ["discovery", "decision", "direction", "academic", "elite"];

export function generateStaticParams() {
  return SLUGS.map((track) => ({ track }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const title = track.charAt(0).toUpperCase() + track.slice(1);
  return { title: `${title} — Tennis` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const m = (await getMessages()).programsPage;
  const t = m.tracks.find((x) => x.title.toLowerCase() === track);
  if (!t) notFound();

  return (
    <TrackDetail
      discipline="Tennis"
      disciplineHref="/programs/tennis"
      backLabel="All Tennis tracks"
      track={t}
      cta={{ title: m.ctaTitle, desc: m.ctaDesc, btn: m.ctaBtn }}
    />
  );
}
