import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Resources" };

export default function Page() {
  return <ComingSoon kicker="Resources" title="리소스" />;
}
