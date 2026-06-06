import { ReactNode } from "react";

type SectionTitleProps = {
  index?: string;
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionTitle({
  index,
  kicker,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {(kicker || index) && (
        <div
          className={`mb-6 flex items-center gap-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {index && <span className="label text-faint">{index}</span>}
          {kicker && (
            <>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="label text-ink">{kicker}</span>
            </>
          )}
        </div>
      )}
      <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight md:text-[2.9rem]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 leading-relaxed text-muted md:text-lg ${
            isCenter ? "mx-auto max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
