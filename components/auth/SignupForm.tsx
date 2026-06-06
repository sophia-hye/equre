"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authButton, authInput, authLabel, validateEmail } from "./authStyles";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | "active" | "confirm">(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError("Supabase가 아직 설정되지 않았습니다. (.env.local 확인)");
      return;
    }

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!name) return setError("이름을 입력해 주세요.");
    if (!validateEmail(email)) return setError("올바른 이메일을 입력해 주세요.");
    if (password.length < 8)
      return setError("비밀번호는 8자 이상이어야 합니다.");

    setLoading(true);
    const supabase = createClient();
    const { data: result, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);

    if (err) {
      setError(err.message);
      return;
    }

    // 세션이 바로 생기면 가입 즉시 로그인, 아니면 이메일 확인 안내
    if (result.session) {
      setDone("active");
      router.push("/");
      router.refresh();
    } else {
      setDone("confirm");
    }
  }

  if (done === "confirm") {
    return (
      <div className="border border-line bg-surface p-8 text-center">
        <h3 className="font-display text-xl font-semibold">이메일을 확인해 주세요</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          입력하신 이메일로 인증 링크를 보냈습니다. 링크를 클릭하면 가입이
          완료됩니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={authLabel}>
          이름
        </label>
        <input id="name" name="name" className={authInput} placeholder="홍길동" />
      </div>
      <div>
        <label htmlFor="email" className={authLabel}>
          이메일
        </label>
        <input id="email" name="email" type="email" className={authInput} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className={authLabel}>
          비밀번호 (8자 이상)
        </label>
        <input id="password" name="password" type="password" className={authInput} placeholder="••••••••" />
      </div>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button type="submit" disabled={loading} className={authButton}>
        {loading ? "가입 중…" : "회원가입"}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-accent link-underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
