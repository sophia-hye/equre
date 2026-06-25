import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
// import { LanguageToggle } from "@/components/ui/LanguageToggle"; // 임시: 한국어 검수 전까지 영어 고정
import { AuthNav } from "./AuthNav";
import { primaryNav } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="flex min-w-0 items-center gap-3 overflow-x-auto sm:gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href!}
              className="shrink-0 whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* <LanguageToggle /> 임시: 한국어 검수 전까지 영어 고정 */}
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
