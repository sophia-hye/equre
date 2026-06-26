import type { Messages } from "@/lib/i18n/messages";

type Studio = Messages["studio"];

/** 스튜디오 톤의 하단 CTA. 홈과 /divisions 페이지가 공유한다. */
export function StudioCta({ m }: { m: Studio }) {
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <p className="eyebrow">{m.tag}</p>
        <h2>
          {m.ctaTitle1}
          <br />
          <span className="terra">{m.ctaTitle2}</span>
        </h2>
        <p>{m.ctaP}</p>
        <a className="btn" href="https://ig.me/m/equre.us">
          {m.ctaBtn}
        </a>
      </div>
    </section>
  );
}
