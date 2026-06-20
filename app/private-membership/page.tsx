import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Private Membership" };

export default function Page() {
  return <ComingSoon kicker="Private Membership" title="프라이빗 멤버십" />;
}
