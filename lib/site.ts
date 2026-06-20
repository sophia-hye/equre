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
