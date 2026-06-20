import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-opacity hover:opacity-70 ${className}`}
      aria-label="eqüre 홈"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="eqüre"
        className="h-8 w-auto md:h-9"
        width={3000}
        height={1336}
      />
    </Link>
  );
}
