import "@/app/studio-home.css";
import type { Messages } from "@/lib/i18n/messages";
import { RevealInit } from "@/components/home/RevealInit";
import { StudioCta } from "@/components/home/StudioCta";

type Studio = Messages["studio"];
type Row = { cn: string; ch: string; t: boolean };

/** 단일 사업부(Education / Business)에 집중한 Home-형 상세 페이지 본문. */
export function DivisionDetail({
  m,
  pn,
  h3,
  kr,
  blurb,
  rows,
}: {
  m: Studio;
  pn: string;
  h3: string;
  kr: string;
  blurb: string;
  rows: readonly Row[];
}) {
  return (
    <div className="studio-home" id="top">
      <section className="plans">
        <div className="wrap">
          <div className="plans-head reveal">
            <p className="eyebrow">{pn}</p>
            <h2 className="plans-title">{h3}</h2>
            <p className="detail-kr">{kr}</p>
            <p
              className="plans-lede"
              dangerouslySetInnerHTML={{ __html: blurb }}
            />
          </div>
          <ul className="detail-feat reveal">
            {rows.map((r) => (
              <li key={r.cn}>
                <span className="ck" aria-hidden="true">
                  ✓
                </span>
                <span className="cn">{r.cn}</span>
                <span className={r.t ? "ch t" : "ch"}>{r.ch}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StudioCta m={m} />

      <RevealInit />
    </div>
  );
}
