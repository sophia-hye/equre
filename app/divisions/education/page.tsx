import type { Metadata } from "next";
import { SubNav } from "@/components/layout/SubNav";
import { DivisionDetail } from "@/components/divisions/DivisionDetail";
import { educationSubNav } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Education Mentoring",
  description:
    "eqüre Education Mentoring — 입시 컨설팅과 멘탈 케어를 결합한 차세대 멘토링.",
};

export default async function Page() {
  const m = (await getMessages()).studio;
  return (
    <>
      <SubNav title={m.p1h3} items={educationSubNav} />
      <DivisionDetail
        m={m}
        pn={m.p1pn}
        h3={m.p1h3}
        kr={m.p1kr}
        blurb={m.p1blurb}
        rows={m.p1rows}
      />
    </>
  );
}
