import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, messages, type Locale, type Messages } from "./messages";

/** 서버에서 현재 로케일을 쿠키로 읽음 (없으면 기본 ko). */
export async function getLocale(): Promise<Locale> {
  try {
    const c = (await cookies()).get("lang")?.value;
    if (c === "ko" || c === "en") return c;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

/** 서버 컴포넌트용 메시지 객체. */
export async function getMessages(): Promise<Messages> {
  const locale = await getLocale();
  return messages[locale];
}
