import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { AuthNav } from "./AuthNav";
import { PrimaryMobileNav } from "./PrimaryMobileNav";
import { primaryNav } from "@/lib/site";
import { getMessages } from "@/lib/i18n/server";

export async function Header() {
  const nav = (await getMessages()).nav;
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* desktop inline nav */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href!}
              className="whitespace-nowrap text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent"
            >
              {nav[item.key as keyof typeof nav] ?? item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <AuthNav />
          <PrimaryMobileNav />
        </div>
      </div>
    </header>
  );
}
