"use client";

import { usePathname } from "next/navigation";
import { SubNav } from "./SubNav";
import {
  educationSubNav,
  businessSubNav,
  type NavItem,
  type DivisionKey,
} from "@/lib/site";

/** Education 사업부 섹션에 속하는 경로들 — 이 경로에서는 Education sub navbar가 유지된다. */
const EDUCATION_PREFIXES = [
  "/divisions/education",
  "/programs",
  "/space",
  "/board",
  "/news",
  "/private-membership",
  "/profile",
  "/team",
];

function resolve(
  pathname: string
): { current: DivisionKey; items: NavItem[] } | null {
  if (pathname.startsWith("/divisions/business")) {
    return { current: "business", items: businessSubNav };
  }
  if (
    EDUCATION_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  ) {
    return { current: "education", items: educationSubNav };
  }
  return null;
}

/** 사업부 섹션 페이지에서 sub navbar를 유지시키는 레이아웃 레벨 네비.
 *  레이아웃에 1회 마운트되어 라우트 이동 시에도 언마운트되지 않는다. */
export function SectionNav() {
  const pathname = usePathname();
  const section = resolve(pathname ?? "");
  if (!section) return null;
  return <SubNav current={section.current} items={section.items} />;
}
