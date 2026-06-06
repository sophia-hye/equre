"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authButton, authInput, authLabel, validateEmail } from "./authStyles";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError("Supabase가 아직 설정되지 않았습니다. (.env.local 확인)");
      return;
    }

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!validateEmail(email)) return setError("올바른 이메일을 입력해 주세요.");
    if (!password) return setError("비밀번호를 입력해 주세요.");

    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className={authLabel}>
          이메일
        </label>
        <input id="email" name="email" type="email" className={authInput} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className={authLabel}>
          비밀번호
        </label>
        <input id="password" name="password" type="password" className={authInput} placeholder="••••••••" />
      </div>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button type="submit" disabled={loading} className={authButton}>
        {loading ? "로그인 중…" : "로그인"}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-accent link-underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
