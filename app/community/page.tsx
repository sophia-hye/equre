import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Community" };

export default async function Page() {
  const m = (await getMessages()).pages;
  return <ComingSoon kicker="Community" title={m.community} />;
}
