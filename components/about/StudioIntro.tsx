import "@/app/studio-home.css";
import type { Messages } from "@/lib/i18n/messages";
import { RevealInit } from "@/components/home/RevealInit";

type Studio = Messages["studio"];

/** 홈에서 옮겨온 스튜디오 인트로 + 사업부 카드 + About 본문.
 *  .studio-home 스코프 CSS를 그대로 재사용한다. 카드는 홈의 Pillars(#mentoring,
 *  #consulting)로 연결된다. */
export function StudioIntro({ m }: { m: Studio }) {
  return (
    <div className="studio-home">
      {/* INTRO */}
      <section className="intro-lead">
        <div className="wrap">
          <div className="about-topline">
            <span>{m.domain}</span>
            <span>{m.metaCenter}</span>
            <span>{m.est}</span>
          </div>
          <div className="about-intro reveal">
            <p className="eyebrow">{m.tag}</p>
            <h1 className="display">
              {m.heroTitle1}
              <br />
              <span className="l2">{m.heroTitle2}</span>
            </h1>
            <p className="lede" dangerouslySetInnerHTML={{ __html: m.lede }} />
          </div>
        </div>
      </section>

      {/* DIVISIONS — clickable cards */}
      <section className="divisions">
        <div className="wrap">
          <div className="div-grid">
            <a className="div-card" href="/#mentoring">
              <span className="dc-pn">{m.p1pn}</span>
              <h2 className="dc-title">{m.p1h3}</h2>
              <span className="dc-kr">{m.p1kr}</span>
              <span className="dc-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="div-card" href="/#consulting">
              <span className="dc-pn">{m.p2pn}</span>
              <h2 className="dc-title">{m.p2h3}</h2>
              <span className="dc-kr">{m.p2kr}</span>
              <span className="dc-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* STUDIO ABOUT */}
      <section>
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

      <RevealInit />
    </div>
  );
}
