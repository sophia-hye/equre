import Link from "next/link";
import { ReactNode } from "react";
import { IconArrowRight } from "./icons";

type FeatureCardProps = {
  index?: string;
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
};

export function FeatureCard({
  index,
  icon,
  title,
  children,
  href,
  linkLabel = "자세히 보기",
}: FeatureCardProps) {
  return (
    <div className="group flex h-full flex-col border-t border-line-strong pt-6">
      <div className="mb-8 flex items-center justify-between">
        {icon && <span className="text-accent">{icon}</span>}
        {index && <span className="index-num text-lg">{index}</span>}
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {children}
      </p>
      {href && (
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent"
        >
          <span className="link-underline">{linkLabel}</span>
          <IconArrowRight
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
