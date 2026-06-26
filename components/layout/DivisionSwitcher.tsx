"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { divisions, type DivisionKey } from "@/lib/site";

/** 사업부 페이지 전환 드롭다운. 홈 톤앤매너(디스플레이체·테라코타·페이퍼 카드)로 커스텀 스타일. */
export function DivisionSwitcher({ current }: { current: DivisionKey }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cur = divisions.find((d) => d.key === current) ?? divisions[0];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wide text-accent transition-colors hover:text-accent-dim"
      >
        {cur.label}
        <span
          aria-hidden
          className={`text-[0.55rem] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-3 min-w-[220px] overflow-hidden border border-line-strong bg-bg shadow-[0_12px_30px_-12px_rgba(38,37,31,0.35)]"
        >
          {divisions.map((d) => {
            const active = d.key === current;
            return (
              <li key={d.key} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (!active) router.push(d.href);
                  }}
                  className={`flex w-full items-center gap-3 border-b border-line px-4 py-3.5 text-left font-display text-xs font-semibold uppercase tracking-wide transition-colors last:border-b-0 ${
                    active
                      ? "bg-bg-soft text-accent"
                      : "text-ink hover:bg-bg-soft hover:text-accent"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                      active ? "bg-accent" : "bg-line-strong"
                    }`}
                  />
                  {d.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
