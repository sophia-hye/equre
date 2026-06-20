import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Company Presentation" };

export default function Page() {
  return <ComingSoon kicker="Corporate Profile" title="Company Presentation" />;
}
