import { ReactNode } from "react";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";
import { getMessages } from "@/lib/i18n/server";

/**
 * 회원 전용 콘텐츠 게이트.
 * - 회원: children 전체 노출
 * - 비회원: 상단 일부만 미리보기(blur/fade) + 가입 유도 CTA
 */
export async function MemberGate({ children }: { children: ReactNode }) {
  const session = await getSessionUser();
  if (session) return <>{children}</>;

  const msgs = await getMessages();
  const m = msgs.memberGate;

  return (
    <div className="relative">
      <div
        className="pointer-events-none max-h-[320px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
        aria-hidden
      >
        {children}
      </div>

      <div className="mt-2 border border-line-strong bg-bg-soft p-8 text-center md:p-10">
        <p className="label text-accent">{m.tag}</p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
          {m.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          {m.desc}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            {m.signup}
          </Link>
          <Link
            href="/login"
            className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            {msgs.common.login}
          </Link>
        </div>
      </div>
    </div>
  );
}
