"use client";

import Link from "next/link";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { AuthNav } from "./AuthNav";

function Caret() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      className="mt-0.5 transition-transform duration-200 group-hover:rotate-180"
      aria-hidden
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const linkClass =
  "whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-x-5 min-[1340px]:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className={`flex items-center gap-1 ${linkClass}`}
                >
                  {item.label}
                  <Caret />
                </button>
                {/* dropdown */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[260px] border border-line bg-surface p-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-3 transition-colors hover:bg-bg-soft"
                      >
                        <span className="block text-sm font-semibold text-ink">
                          {c.label}
                        </span>
                        {c.desc && (
                          <span className="mt-0.5 block text-xs text-muted">
                            {c.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href!} className={linkClass}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Utils */}
        <div className="flex shrink-0 items-center gap-4">
          <AuthNav />
          <Link
            href="/contact"
            className="hidden whitespace-nowrap bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim min-[1340px]:inline-flex"
          >
            상담 신청
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
