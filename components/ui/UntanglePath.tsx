"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single terracotta line that starts as a tangled knot (left) and gradually
 * untangles into a clean, straight path with an arrow (right). The line draws
 * itself in on scroll, so it literally "unravels" from chaos to clarity.
 */
export function UntanglePath() {
  const ref = useRef<SVGSVGElement>(null);
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
      { threshold: 0.25 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // tangled knot on the left → smoothing waves → straight line + arrow on the right
  const d = [
    "M 70 180",
    // --- dense knot: many tight loops piled and crossing over each other ---
    "C 10 130, 70 70, 130 110",
    "C 190 150, 120 200, 80 150",
    "C 40 100, 110 80, 160 130",
    "C 210 180, 140 240, 95 195",
    "C 50 150, 100 95, 175 120",
    "C 250 145, 200 215, 140 200",
    "C 80 185, 110 110, 185 140",
    "C 260 170, 215 240, 150 230",
    "C 95 220, 135 140, 210 160",
    "C 285 180, 245 245, 180 235",
    "C 125 225, 175 165, 240 180",
    "C 300 195, 265 235, 215 220",
    "C 180 210, 230 185, 280 195",
    // --- transition: the knot loosens into open waves ---
    "C 340 215, 400 120, 490 178",
    "C 580 230, 660 125, 760 177",
    // --- resolved: nearly straight, settling onto the baseline ---
    "C 840 206, 905 184, 985 181",
    "L 1080 181",
  ].join(" ");

  return (
    <svg
      ref={ref}
      viewBox="0 0 1120 320"
      fill="none"
      className="w-full"
      role="img"
      aria-label="엉킨 길이 점차 풀려 깔끔한 길로 이어지는 곡선"
    >
      <path
        d={d}
        stroke="var(--color-accent)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={`path-draw-long ${drawn ? "is-drawn" : ""}`}
      />
      {/* arrowhead at the clean end */}
      <path
        d="M 1062 168 L 1082 181 L 1062 194"
        stroke="var(--color-accent)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={`path-draw ${drawn ? "is-drawn" : ""}`}
        style={{ animationDelay: "2.6s" }}
      />
      {/* node where the tangle begins */}
      <circle cx="70" cy="180" r="5" fill="var(--color-accent)" />
    </svg>
  );
}
