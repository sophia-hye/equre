"use client";

import Link from "next/link";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { AuthNav } from "./AuthNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline label text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <AuthNav />
          <Link
            href="/contact"
            className="hidden bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim md:inline-flex"
          >
            상담 신청
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
