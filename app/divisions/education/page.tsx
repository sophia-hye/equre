import "@/app/studio-home.css";
import type { Metadata } from "next";
import { EducationCategories } from "@/components/divisions/EducationCategories";
import { StudioCta } from "@/components/home/StudioCta";
import { RevealInit } from "@/components/home/RevealInit";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Education Mentoring",
  description:
    "eqüre Education Mentoring — Tennis·Art 두 분야, 각 분야 Discovery부터 Elite까지 5가지 트랙.",
};

export default async function Page() {
  const msgs = await getMessages();
  const m = msgs.studio;
  const p = msgs.programsPage;

  const cats = [
    { label: "Tennis", sub: p.tennisSub, desc: p.tennisDesc, href: "/programs/tennis" },
    { label: "Art", sub: p.artSub, desc: p.artDesc, href: "/programs/art" },
  ];
  return (
    <>
      <div className="studio-home" id="top">
        <section className="plans">
          <div className="wrap">
            <div className="plans-head reveal">
              <p className="eyebrow">{m.p1pn}</p>
              <h2 className="plans-title">{m.p1h3}</h2>
              <p className="detail-kr">{m.p1kr}</p>
              <p
                className="plans-lede"
                dangerouslySetInnerHTML={{ __html: m.p1blurb }}
              />
            </div>
          </div>
        </section>

        <EducationCategories
          title={p.catTitle}
          desc={p.catDesc}
          ctaLabel={p.catCta}
          cats={cats}
          tracks={p.tracks}
        />

        <StudioCta m={m} />
        <RevealInit />
      </div>
    </>
  );
}
