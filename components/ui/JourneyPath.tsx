"use client";

import { useEffect, useRef, useState } from "react";

export type JourneyStep = {
  title: string;
  body: string;
  /** handwritten annotation (terracotta) */
  note?: string;
};

type JourneyPathProps = {
  steps: JourneyStep[];
};

/**
 * Numbered process steps connected by a flowing, hand-drawn terracotta line
 * down a left rail. The line draws itself in on scroll.
 */
export function JourneyPath({ steps }: JourneyPathProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <ol ref={ref} className="relative">
      {/* flowing connector line down the rail */}
      <svg
        className="pointer-events-none absolute bottom-3 left-0 top-3 w-20 md:w-32"
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M30 0 C 6 70, 54 150, 30 230 S 4 380, 30 470 S 56 620, 30 720 S 6 880, 30 1000"
          stroke="var(--color-accent)"
          strokeWidth={1.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className={`path-draw ${drawn ? "is-drawn" : ""}`}
        />
      </svg>

      {steps.map((step, i) => (
        <li key={step.title} className="relative pb-16 last:pb-2">
          {/* node + big number on the rail */}
          <span className="absolute left-0 top-0 flex w-20 flex-col items-center md:w-32">
            <span className="block h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
            <span className="mt-3 font-display text-[2.75rem] font-medium leading-none text-accent md:text-6xl">
              {String(i + 1).padStart(2, "0")}
            </span>
          </span>

          {/* content */}
          <div className="pl-20 pt-0.5 md:pl-32">
            <h3 className="max-w-xl font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {step.body}
            </p>
            {step.note && (
              <p className="hand mt-4 -rotate-2">{step.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
