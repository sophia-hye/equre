import "@/app/studio-home.css";
import Link from "next/link";
import type { Messages } from "@/lib/i18n/messages";

type Studio = Messages["studio"];

/** 사업 부문(Education Mentoring / Business Consulting) 카드 섹션.
 *  홈과 /divisions 페이지가 공유한다. detailed=true 면 카드 위에 상세 설명을 노출. */
export function DivisionsSection({
  m,
  detailed = false,
}: {
  m: Studio;
  detailed?: boolean;
}) {
  const pillars = [
    { id: "mentoring", pn: m.p1pn, h3: m.p1h3, kr: m.p1kr, blurb: m.p1blurb, rows: m.p1rows, hold: "", cta: m.p1cta, page: "/divisions/education" },
    { id: "consulting", pn: m.p2pn, h3: m.p2h3, kr: m.p2kr, blurb: m.p2blurb, rows: m.p2rows, hold: m.hold, cta: m.p2cta, page: "/divisions/business" },
  ];

  return (
    <section className="plans" id="divisions">
      <div className="wrap">
        <div className="plans-head reveal">
          <p className="eyebrow">{m.tag}</p>
          <h2 className="plans-title">{m.plansTitle}</h2>
          <p className="plans-lede">{m.plansLede}</p>
          {detailed && <p className="plans-desc">{m.plansDesc}</p>}
        </div>
        <div className="plan-grid">
          {pillars.map((p) => (
            <div className="plan-card reveal" id={p.id} key={p.id}>
              <div className="pn">{p.pn}</div>
              <h3>{p.h3}</h3>
              <div className="kr">{p.kr}</div>
              <p className="blurb" dangerouslySetInnerHTML={{ __html: p.blurb }} />
              <ul className="feat">
                {p.rows.map((r) => (
                  <li key={r.cn}>
                    <span className="ck" aria-hidden="true">✓</span>
                    <span className="cn">{r.cn}</span>
                    <span className={r.t ? "ch t" : "ch"}>{r.ch}</span>
                  </li>
                ))}
              </ul>
              <div className="plan-foot">
                {p.hold && <p className="hold">{p.hold}</p>}
                <Link className="plan-btn" href={p.page}>{p.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
