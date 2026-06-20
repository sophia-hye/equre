import { ReactNode } from "react";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";

/**
 * 회원 전용 콘텐츠 게이트.
 * - 회원: children 전체 노출
 * - 비회원: 상단 일부만 미리보기(blur/fade) + 가입 유도 CTA
 */
export async function MemberGate({ children }: { children: ReactNode }) {
  const session = await getSessionUser();
  if (session) return <>{children}</>;

  return (
    <div className="relative">
      {/* preview (locked) */}
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

      {/* unlock CTA */}
      <div className="mt-2 border border-line-strong bg-bg-soft p-8 text-center md:p-10">
        <p className="label text-accent">Members Only</p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
          전체 콘텐츠는 회원에게 열립니다
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          30초면 끝나는 가입으로 equre의 모든 프로그램과 콘텐츠를 확인하세요.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            회원가입하고 전체 보기
          </Link>
          <Link
            href="/login"
            className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
