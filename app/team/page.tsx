import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Team" };

export default function Page() {
  return <ComingSoon kicker="Team" title="팀" />;
}
