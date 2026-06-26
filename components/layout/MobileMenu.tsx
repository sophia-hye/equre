"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { useMessages } from "@/components/i18n/LocaleProvider";

type Auth =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "user"; name: string; isAdmin: boolean };

export function MobileMenu() {
  const m = useMessages();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth>({ status: "loading" });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!supabaseConfigured) {
      setAuth({ status: "guest" });
      return;
    }
    const supabase = createClient();
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setAuth({ status: "guest" });
        return;
      }
      const { data: profile } = await supabase
        .from("equre_profiles")
        .select("name, role")
        .eq("id", user.id)
        .maybeSingle();
      setAuth({
        status: "user",
        name: profile?.name || user.email || "회원",
        isAdmin: profile?.role === "admin",
      });
    };
    load();
    // onAuthStateChange 콜백 안에서 auth 호출 시 navigator.locks 데드락 →
    // 락 밖에서 실행되도록 지연.
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => load(), 0);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

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

  const loggedIn = auth.status === "user";

  const overlay = (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg">
      <div className="flex h-16 items-center justify-between border-b border-line-strong px-6">
        <Logo onClick={close} />
        <button
          type="button"
          onClick={close}
          aria-label="메뉴 닫기"
          className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink"
        >
          <span className="text-lg leading-none">✕</span>
        </button>
      </div>

      {/* 로그인 상태 배너 */}
      {loggedIn && (
        <div className="flex items-center justify-between border-b border-line bg-bg-soft px-6 py-4">
          <span className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            <strong className="font-semibold text-ink">{auth.name}</strong>
            <span className="text-muted">{m.common.signedIn}</span>
          </span>
          {auth.isAdmin && (
            <span className="border border-line-strong px-2 py-0.5 text-xs font-semibold text-ink">
              {m.common.adminBadge}
            </span>
          )}
        </div>
      )}

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

        {/* 추가 링크 (로그인/상담신청/로그아웃은 상단 Navbar에 있음) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 pb-8">
          {loggedIn ? (
            <Link href="/mypage" onClick={close} className="label text-muted">
              {m.common.mypage}
            </Link>
          ) : (
            <Link href="/signup" onClick={close} className="label text-muted">
              {m.common.signup}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center border border-line-strong text-ink"
      >
        <span className="text-lg leading-none">☰</span>
        {/* 로그인 상태 표시 점 */}
        {loggedIn && (
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-bg"
            aria-hidden
          />
        )}
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </div>
  );
}
