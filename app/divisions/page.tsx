import "@/app/studio-home.css";
import type { Metadata } from "next";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { StudioCta } from "@/components/home/StudioCta";
import { RevealInit } from "@/components/home/RevealInit";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "eqüre의 두 전문 분야 — Education Mentoring & Business Consulting.",
};

export default async function DivisionsPage() {
  const m = (await getMessages()).studio;
  return (
    <div className="studio-home" id="top">
      <DivisionsSection m={m} detailed />
      <StudioCta m={m} />
      <RevealInit />
    </div>
  );
}
