export const site = {
  name: "equre",
  legalName: "주식회사 equre",
  legalNameFull: "주식회사 equre | 이큐어 교육성장연구소 (ETERNITY COMPANY)",
  tagline: "The Next Generation Wellness Education",
  description:
    "경쟁과 압박에 내몰린 엘리트 청소년들을 위한 완벽한 플랜 B. 입시 컨설팅과 멘탈 케어를 혁신하는 글로벌 하이브리드 허브.",
  email: "hello@equre.com",
  location: "SEOULITE HANNAM",
} as const;

export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { label: "Program", href: "/programs" },
  { label: "Space", href: "/space" },
  { label: "Community", href: "/community" },
  { label: "Private Membership", href: "/private-membership" },
  {
    label: "Corporate Profile",
    children: [
      { label: "About us", href: "/about", desc: "브랜드 소개" },
      {
        label: "Company Presentation",
        href: "/company-presentation",
        desc: "회사 소개서",
      },
    ],
  },
  {
    label: "News & Events",
    children: [
      { label: "Press Releases", href: "/news/press", desc: "보도자료" },
      {
        label: "Company Events",
        href: "/news/events",
        desc: "SEOULITE HANNAM 외 행사",
      },
      { label: "Media", href: "/news/media", desc: "미디어 · 갤러리" },
    ],
  },
  {
    label: "Corporate Governance",
    children: [
      { label: "Management", href: "/governance/management", desc: "경영진" },
      {
        label: "Board of Directors",
        href: "/governance/board",
        desc: "이사회",
      },
    ],
  },
  { label: "Resources", href: "/resources" },
];
