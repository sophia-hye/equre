import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

/** Browser-side Supabase client (anon key).
 *  싱글턴 — 브라우저에서 GoTrueClient 인스턴스가 여러 개면 navigator.locks
 *  경합으로 auth 호출(signUp/signIn)이 멈출 수 있어, 하나만 생성해 재사용한다. */
let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return browserClient;
}
