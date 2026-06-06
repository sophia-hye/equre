type Step = {
  label: string;
  caption?: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

const colsClass: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      {/* horizontal connector line (desktop) */}
      <span
        className="absolute left-0 right-0 top-[5px] hidden h-px bg-accent/40 md:block"
        aria-hidden
      />
      <ol className={`grid gap-10 ${colsClass[steps.length] ?? "md:grid-cols-4"}`}>
        {steps.map((step, i) => (
          <li key={step.label} className="relative">
            <span
              className="block h-3 w-3 rounded-full bg-accent ring-4 ring-bg"
              aria-hidden
            />
            <span className="mt-5 block index-num text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-display text-lg font-semibold tracking-tight">
              {step.label}
            </p>
            {step.caption && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.caption}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
