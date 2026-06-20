"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  const overlay = (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg min-[1340px]:hidden">
      <div className="flex h-16 items-center justify-between border-b border-line-strong px-6">
        <span className="font-display text-[1.7rem] font-bold lowercase leading-none tracking-tight text-ink">
          eq&uuml;re
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="메뉴 닫기"
          className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink"
        >
          <span className="text-lg leading-none">✕</span>
        </button>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-2">
        {nav.map((item) =>
          item.children ? (
            <div key={item.label} className="border-b border-line">
              <button
                type="button"
                onClick={() =>
                  setExpanded((cur) => (cur === item.label ? null : item.label))
                }
                aria-expanded={expanded === item.label}
                className="flex w-full items-center justify-between py-4 text-left text-base font-bold uppercase tracking-wide text-ink"
              >
                {item.label}
                <span className="text-xl leading-none text-accent">
                  {expanded === item.label ? "−" : "+"}
                </span>
              </button>
              {expanded === item.label && (
                <ul className="pb-3">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        onClick={close}
                        className="block py-2.5 pl-1 text-sm text-muted transition-colors hover:text-ink"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              onClick={close}
              className="border-b border-line py-4 text-base font-bold uppercase tracking-wide text-ink"
            >
              {item.label}
            </Link>
          )
        )}

        <Link
          href="/contact"
          onClick={close}
          className="mt-8 bg-accent px-5 py-4 text-center text-base font-medium text-white"
        >
          상담 신청
        </Link>
        <div className="mt-6 flex justify-center gap-6 pb-8">
          <Link href="/login" onClick={close} className="label text-muted">
            로그인
          </Link>
          <Link href="/signup" onClick={close} className="label text-muted">
            회원가입
          </Link>
          <Link href="/mypage" onClick={close} className="label text-muted">
            마이페이지
          </Link>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-[1340px]:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </div>
  );
}
