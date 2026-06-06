import Link from "next/link";
import { ReactNode } from "react";
import { IconArrowRight } from "./icons";

type Variant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dim",
  secondary:
    "border border-line-strong text-ink hover:bg-ink hover:text-bg",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {withArrow && (
        <IconArrowRight
          width={16}
          height={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
