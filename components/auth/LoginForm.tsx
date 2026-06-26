"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authButton, authInput, authLabel, validateEmail } from "./authStyles";
import { useMessages } from "@/components/i18n/LocaleProvider";

export function LoginForm() {
  const router = useRouter();
  const t = useMessages().login;
  const cm = useMessages().common;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError(t.notConfigured);
      return;
    }

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!validateEmail(email)) return setError(t.errEmail);
    if (!password) return setError(t.errPassword);

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) {
        setError(t.errFail);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError(t.errFail);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className={authLabel}>
          {t.email}
        </label>
        <input id="email" name="email" type="email" className={authInput} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className={authLabel}>
          {t.password}
        </label>
        <input id="password" name="password" type="password" className={authInput} placeholder="••••••••" />
      </div>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button type="submit" disabled={loading} className={authButton}>
        {loading ? t.submitting : t.submit}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        {t.noAccount}{" "}
        <Link href="/signup" className="font-medium text-accent link-underline">
          {cm.signup}
        </Link>
      </p>
    </form>
  );
}
