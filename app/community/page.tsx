import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Community" };

export default function Page() {
  return <ComingSoon kicker="Community" title="커뮤니티" />;
}
