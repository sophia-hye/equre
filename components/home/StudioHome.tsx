import type { Messages } from "@/lib/i18n/messages";
import { RevealInit } from "@/components/home/RevealInit";

type Studio = Messages["studio"];

export function StudioHome({ m }: { m: Studio }) {
  const pillars = [
    { id: "mentoring", pn: m.p1pn, h3: m.p1h3, kr: m.p1kr, blurb: m.p1blurb, rows: m.p1rows, hold: "" },
    { id: "consulting", pn: m.p2pn, h3: m.p2h3, kr: m.p2kr, blurb: m.p2blurb, rows: m.p2rows, hold: m.hold },
  ];

  return (
    <div className="studio-home" id="top">
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

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="topline">
            <span>{m.domain}</span>
            <span>{m.metaCenter}</span>
            <span>{m.est}</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            {m.tag}
          </p>
          <h1 className="display">
            {m.heroTitle1}
            <br />
            <span className="l2">{m.heroTitle2}</span>
          </h1>
          <p className="lede" dangerouslySetInnerHTML={{ __html: m.lede }} />
        </div>
        <svg className="hero-line" viewBox="0 0 340 560" fill="none" aria-hidden="true">
          <path
            d="M300,12 C250,80 330,150 300,210 C272,266 200,250 214,318 C226,376 320,372 300,440 C286,492 230,500 250,548"
            stroke="#C05A3B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="214" cy="318" r="4" fill="#C05A3B" />
          <circle cx="250" cy="548" r="4" fill="#C05A3B" />
        </svg>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">{m.studioNum}</span>
            <h2>{m.studioH2}</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy reveal">
              <p>{m.aboutP1}</p>
              <p>{m.aboutP2}</p>
              <p dangerouslySetInnerHTML={{ __html: m.aboutP3 }} />
              <p>
                {m.aboutP4pre}
                <span className="human">{m.aboutHuman}</span>
                {m.aboutP4post}
              </p>
            </div>
            <div className="panel reveal">
              <div className="card">
                <div className="mk">
                  eqüre<span className="dot">.</span>
                </div>
                <div className="sub">{m.cardSub}</div>
                <div className="rule" />
                <div className="eq">E + Q</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <div className="pillars">
        <div className="wrap">
          {pillars.map((p) => (
            <div className="pillar" id={p.id} key={p.id}>
              <div className="pillar-top">
                <div className="reveal">
                  <div className="pn">{p.pn}</div>
                  <h3>{p.h3}</h3>
                  <div className="kr">{p.kr}</div>
                </div>
                <p className="blurb reveal" dangerouslySetInnerHTML={{ __html: p.blurb }} />
              </div>
              <div className="cat-list reveal">
                {p.rows.map((r) => (
                  <div className="cat-row" key={r.cn}>
                    <span className="cn">{r.cn}</span>
                    <span className={r.t ? "ch t" : "ch"}>{r.ch}</span>
                  </div>
                ))}
              </div>
              {p.hold && (
                <p className="hold reveal">
                  {p.hold} &nbsp;<a href="#contact">↗</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
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

      <RevealInit />
    </div>
  );
}
