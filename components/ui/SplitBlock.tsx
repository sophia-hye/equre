import { ReactNode } from "react";

type SplitBlockProps = {
  children: ReactNode;
  media: ReactNode;
  reverse?: boolean;
};

export function SplitBlock({ children, media, reverse = false }: SplitBlockProps) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={reverse ? "md:order-2" : ""}>{children}</div>
      <div className={reverse ? "md:order-1" : ""}>{media}</div>
    </div>
  );
}
