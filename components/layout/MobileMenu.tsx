"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const overlay = (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg md:hidden">
      {/* top bar inside overlay (so header backdrop-blur 영향 없이 불투명) */}
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

      <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
        {nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="flex items-baseline justify-between border-b border-line py-5 font-display text-3xl font-bold text-ink"
          >
            {item.label}
            <span className="index-num text-base">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={close}
          className="mt-8 bg-accent px-5 py-4 text-center text-base font-medium text-white"
        >
          상담 신청
        </Link>
        <div className="mt-6 flex justify-center gap-6">
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
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </div>
  );
}
