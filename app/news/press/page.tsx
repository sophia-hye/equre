import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Press Releases" };

export default function Page() {
  return <ComingSoon kicker="News & Events" title="Press Releases" />;
}
