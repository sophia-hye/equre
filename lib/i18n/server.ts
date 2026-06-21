import "server-only";
import { messages, type Locale, type Messages } from "./messages";

/**
 * 임시: 한국어 검수 전까지 전체 사이트를 영어로 고정합니다.
 * (원복하려면 쿠키 기반 로직 + `cookies` / `DEFAULT_LOCALE` import 를 복구)
 *
 *   import { cookies } from "next/headers";
 *   import { DEFAULT_LOCALE } from "./messages";
 *   const c = (await cookies()).get("lang")?.value;
 *   if (c === "ko" || c === "en") return c;
 *   return DEFAULT_LOCALE;
 */
export async function getLocale(): Promise<Locale> {
  return "en";
}

/** 서버 컴포넌트용 메시지 객체. */
export async function getMessages(): Promise<Messages> {
  return messages[await getLocale()];
}
