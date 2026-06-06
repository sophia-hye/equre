import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-display text-[1.7rem] font-bold lowercase leading-none tracking-tight text-ink transition-colors hover:text-accent ${className}`}
      aria-label="equre 홈"
    >
      eq&uuml;re
    </Link>
  );
}
