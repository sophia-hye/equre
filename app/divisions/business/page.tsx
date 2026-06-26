import type { Metadata } from "next";
import { DivisionDetail } from "@/components/divisions/DivisionDetail";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Business Consulting",
  description:
    "eqüre Business Consulting — 자본·시장진입·전략·브랜드·디지털 성장 컨설팅.",
};

export default async function Page() {
  const m = (await getMessages()).studio;
  return (
    <>
      <DivisionDetail
        m={m}
        pn={m.p2pn}
        h3={m.p2h3}
        kr={m.p2kr}
        blurb={m.p2blurb}
        rows={m.p2rows}
      />
    </>
  );
}
