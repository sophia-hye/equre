import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Management" };

export default function Page() {
  return <ComingSoon kicker="Corporate Governance" title="Management" />;
}
