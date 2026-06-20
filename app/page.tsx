import "./studio-home.css";
import { StudioHome } from "@/components/home/StudioHome";
import { getMessages } from "@/lib/i18n/server";

export default async function HomePage() {
  const m = await getMessages();
  return <StudioHome m={m.studio} />;
}
