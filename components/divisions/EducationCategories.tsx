import Link from "next/link";

type Cat = { label: string; sub: string; desc: string; href: string };

/** Education Mentoring 하위 분야(Tennis / Art) 카드. 각 카드에 5개 트랙명을 노출하고
 *  분야별 상세 페이지로 연결한다. 홈 plan-card 스타일 재사용. */
export function EducationCategories({
  title,
  desc,
  ctaLabel,
  cats,
  trackNames,
}: {
  title: string;
  desc: string;
  ctaLabel: string;
  cats: Cat[];
  trackNames: readonly string[];
}) {
  return (
    <section className="plans" id="disciplines">
      <div className="wrap">
        <div className="plans-head reveal">
          <h2 className="plans-title">{title}</h2>
          <p className="plans-lede">{desc}</p>
        </div>
        <div className="plan-grid">
          {cats.map((c) => (
            <div className="plan-card reveal" key={c.label}>
              <div className="pn">Education</div>
              <h3>{c.label}</h3>
              <div className="kr">{c.sub}</div>
              <p className="blurb">{c.desc}</p>
              <ul className="feat">
                {trackNames.map((t, i) => (
                  <li key={t}>
                    <span className="ck" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="cn">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="plan-foot">
                <Link className="plan-btn" href={c.href}>
                  {ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
