export const site = {
  name: "eqüre",
  legalName: "eqüre",
  legalNameFull: "eqüre",
  tagline: "The Next Generation Wellness Education",
  description:
    "경쟁과 압박에 내몰린 엘리트 청소년들을 위한 완벽한 플랜 B. 입시 컨설팅과 멘탈 케어를 혁신하는 글로벌 하이브리드 허브.",
  email: "hello@equre.us",
  location: "SEOULITE HANNAM",
} as const;

/** 소셜 / 메신저 채널 설정.
 *  카카오 채널이 생기면 kakaoChannelId 에 "_xxxxx" (pf.kakao.com/_xxxxx 의 뒷부분)만
 *  넣으면 모든 곳(푸터/플로팅/Contact)에 카카오 버튼이 자동으로 나타납니다. */
export const social = {
  instagramHandle: "equre.us",
  instagramUrl: "https://instagram.com/equre.us",
  instagramDm: "https://ig.me/m/equre.us",
  kakaoChannelId: "", // 예: "_abcDEF"
} as const;

export type SocialLink = {
  type: "instagram" | "kakao";
  label: string;
  href: string;
};

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { type: "instagram", label: "Instagram DM", href: social.instagramDm },
  ];
  if (social.kakaoChannelId) {
    links.push({
      type: "kakao",
      label: "KakaoTalk 채널",
      href: `https://pf.kakao.com/${social.kakaoChannelId}/chat`,
    });
  }
  return links;
}

export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

/** 헤더에 노출되는 기본 네비게이션 (4개). */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Divisions", href: "/divisions" },
  { label: "Consultation", href: "/#contact" },
  { label: "Contact", href: "/contact" },
];

/** Board(소식) 하위 항목 — sub navbar 드롭다운과 /board 랜딩 카드에서 공용 사용. */
export const boardItems: NavChild[] = [
  { label: "Gallery", href: "/news/media", desc: "Media & gallery" },
  { label: "News", href: "/news/press", desc: "Press releases" },
  { label: "Events", href: "/news/events", desc: "Events & happenings" },
];

/** Education Mentoring 사업부 페이지 상단 sub navbar. */
export const educationSubNav: NavItem[] = [
  {
    label: "Program",
    href: "/programs",
    children: [
      { label: "Tennis", href: "/programs/tennis" },
      { label: "Art", href: "/programs/art" },
    ],
  },
  { label: "Space", href: "/space" },
  { label: "Board", href: "/board", children: boardItems },
  { label: "Membership", href: "/private-membership" },
  {
    label: "Profile",
    children: [{ label: "Team", href: "/team" }],
  },
];

/** Business Consulting 사업부 sub navbar (메뉴 미확정 — 우선 Program 하나만 노출). */
export const businessSubNav: NavItem[] = [{ label: "Program", href: "/programs" }];

/** 사업부 목록 — sub navbar 셀렉트박스로 페이지 전환에 사용. */
export const divisions = [
  { key: "education", label: "Education Mentoring", href: "/divisions/education" },
  { key: "business", label: "Business Consulting", href: "/divisions/business" },
] as const;

export type DivisionKey = (typeof divisions)[number]["key"];

/** [ARCHIVED] 전체 메뉴 — 현재 헤더에 노출하지 않음. 추후 복원용으로 보관. */
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
