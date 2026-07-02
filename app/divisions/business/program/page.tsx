import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Business Program" };

export default function Page() {
  return <ComingSoon kicker="Program" title="Business Program" />;
}
