import type { MetadataRoute } from "next";

const BASE = "https://www.equre.us";

/** 공개 페이지 목록 (관리자·인증·동적 라우트 제외). */
const ROUTES = [
  "",
  "/about",
  "/divisions",
  "/divisions/education",
  "/divisions/business",
  "/space",
  "/scholarship",
  "/contact",
  "/programs",
  "/programs/art",
  "/programs/tennis",
  "/community",
  "/private-membership",
  "/resources",
  "/team",
  "/profile",
  "/company-presentation",
  "/governance/management",
  "/governance/board",
  "/news/press",
  "/news/media",
  "/news/events",
  "/board",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
