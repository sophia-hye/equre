import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Roadmap / 입학 로드맵 */
export function IconRoute(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a3 3 0 0 0 3-3V8" />
      <path d="M6 17V9a3 3 0 0 1 3-3h5" />
    </svg>
  );
}

/** Healing / 심리 치유 */
export function IconPulseHeart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 14c1.5-1.5 3-3.4 3-5.5A3.5 3.5 0 0 0 12 6 3.5 3.5 0 0 0 2 8.5c0 2.1 1.5 4 3 5.5l7 7Z" />
      <path d="M3.5 12h4l1.5-3 2 5 1.5-2h4.5" />
    </svg>
  );
}

/** Peer mentoring / 멘토 */
export function IconPeers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5" />
      <path d="M18 14a6 6 0 0 1 3 5.2" />
    </svg>
  );
}

/** Sober bar / 무알콜 음료 */
export function IconGlass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h14l-6 8v6" />
      <path d="M9 18h6" />
      <path d="M8.5 8h7" />
    </svg>
  );
}

/** Tech showroom / 기기 */
export function IconDevice(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7.5 9.5 10 12l-2.5 2.5" />
      <path d="M13 14.5h3.5" />
    </svg>
  );
}

/** Anchor / 견고한 멘탈 */
export function IconAnchor(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v13" />
      <path d="M5 12a7 7 0 0 0 14 0" />
      <path d="M8 11H5M19 11h-3" />
    </svg>
  );
}

export function IconInfinity(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 8.5a3.5 3.5 0 1 0 0 7c2 0 3.5-1.8 5.5-3.5 2-1.7 3.5-3.5 5.5-3.5a3.5 3.5 0 1 1 0 7c-2 0-3.5-1.8-5.5-3.5C10 11.8 8.5 10 6.5 8.5Z" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
