import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { AuthNav } from "./AuthNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <AuthNav />
          <Link
            href="/contact"
            className="whitespace-nowrap bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-dim sm:px-4 sm:py-2.5 sm:text-sm"
          >
            상담 신청
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
