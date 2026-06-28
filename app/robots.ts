import type { MetadataRoute } from "next";

const BASE = "https://www.equre.us";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mypage", "/api", "/login", "/logout", "/signup"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
