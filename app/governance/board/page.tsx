import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Board of Directors" };

export default function Page() {
  return <ComingSoon kicker="Corporate Governance" title="Board of Directors" />;
}
