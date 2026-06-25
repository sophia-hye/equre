import type { Messages } from "@/lib/i18n/messages";
import { RevealInit } from "@/components/home/RevealInit";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { StudioCta } from "@/components/home/StudioCta";

type Studio = Messages["studio"];

export function StudioHome({ m }: { m: Studio }) {
  return (
    <div className="studio-home" id="top">
      {/* TOPLINE */}
      <div className="topbar">
        <div className="wrap">
          <div className="about-topline">
            <span>{m.domain}</span>
            <span>{m.metaCenter}</span>
            <span>{m.est}</span>
          </div>
        </div>
      </div>

      {/* TOP POSTER */}
      <section className="poster-hero">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home-poster.png"
            alt="eqüre — The Way Maker. Pave the Way, Light the Life."
            width={3240}
            height={3240}
          />
        </div>
      </section>

      <DivisionsSection m={m} />

      <StudioCta m={m} />

      <RevealInit />
    </div>
  );
}
