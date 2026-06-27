import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Resources" };

export default async function Page() {
  const m = (await getMessages()).pages;
  return <ComingSoon kicker="Resources" title={m.resources} />;
}
