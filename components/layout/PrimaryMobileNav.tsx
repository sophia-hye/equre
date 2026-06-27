"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/lib/site";
import { useMessages } from "@/components/i18n/LocaleProvider";

/** 모바일 전용 메인 네비 (햄버거). 데스크탑(md+)에서는 Header의 인라인 메뉴가 노출되고
 *  이 컴포넌트는 숨겨진다. */
export function PrimaryMobileNav() {
  const [open, setOpen] = useState(false);
  const nav = useMessages().nav;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="메뉴"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center border border-line-strong text-ink"
      >
        <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-line-strong bg-bg/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-1 sm:px-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-sm font-medium uppercase tracking-wide text-ink transition-colors last:border-0 hover:text-accent"
              >
                {nav[item.key as keyof typeof nav] ?? item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
