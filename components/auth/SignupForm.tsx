"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authInput, authLabel, validateEmail } from "./authStyles";
import {
  AGE_GROUPS,
  GENDERS,
  INTERESTS,
  LANGUAGES,
  REFERRALS,
  REGIONS,
  USER_TYPES,
} from "@/lib/profile/options";

type Form = {
  name: string;
  phone: string;
  email: string;
  password: string;
  user_type: string;
  age_group: string;
  gender: string;
  region: string;
  language: string;
  interests: string[];
  referral: string;
  marketing_consent: boolean;
  terms: boolean;
};

const EMPTY: Form = {
  name: "",
  phone: "",
  email: "",
  password: "",
  user_type: "",
  age_group: "",
  gender: "",
  region: "",
  language: "",
  interests: [],
  referral: "",
  marketing_consent: false,
  terms: false,
};

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-bg">
      {n}
    </span>
  );
}

function Field({
  label,
  children,
  half,
}: {
  label: string;
  children: React.ReactNode;
  half?: boolean;
}) {
  return (
    <div className={half ? "" : "md:col-span-2"}>
      <label className={authLabel}>{label}</label>
      {children}
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | "active" | "confirm">(null);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(item: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((x) => x !== item)
        : [...prev.interests, item],
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured)
      return setError("Supabase가 아직 설정되지 않았습니다. (.env.local 확인)");
    if (!form.name.trim()) return setError("이름을 입력해 주세요.");
    if (!validateEmail(form.email)) return setError("올바른 이메일을 입력해 주세요.");
    if (form.password.length < 8)
      return setError("비밀번호는 8자 이상이어야 합니다.");
    if (!form.terms)
      return setError("이용약관 및 개인정보 처리방침에 동의해 주세요.");

    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          user_type: form.user_type,
          age_group: form.age_group,
          gender: form.gender,
          region: form.region,
          language: form.language,
          interests: form.interests,
          referral: form.referral,
          marketing_consent: form.marketing_consent,
        },
      },
    });
    setLoading(false);

    if (err) return setError(err.message);

    if (data.session) {
      setDone("active");
    } else {
      setDone("confirm");
    }
  }

  if (done === "active") {
    return (
      <div className="border border-accent/40 bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
          ✓
        </div>
        <p className="mt-5 label text-accent">회원 가입 완료</p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
          환영합니다, {form.name}님!
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          이제 <strong className="text-ink">equre의 전체 콘텐츠</strong>를 보실 수
          있어요. 마이페이지에서 회원 상태를 확인할 수 있습니다.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            전체 콘텐츠 둘러보기
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/mypage");
              router.refresh();
            }}
            className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            마이페이지
          </button>
        </div>
      </div>
    );
  }

  if (done === "confirm") {
    return (
      <div className="border border-line bg-surface p-8 text-center">
        <h3 className="font-display text-xl font-bold tracking-tight">
          이메일을 확인해 주세요
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {form.email}로 인증 링크를 보냈습니다. 링크를 클릭하면 가입이
          완료되고 전체 콘텐츠가 열립니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* stepper */}
      <div className="flex flex-wrap gap-2">
        {["계정", "프로필", "관심사"].map((s, i) => (
          <span
            key={s}
            className={`px-4 py-1.5 text-xs font-semibold ${
              i === 0
                ? "bg-accent text-white"
                : "border border-line-strong text-ink"
            }`}
          >
            {i + 1} {s}
          </span>
        ))}
      </div>

      {/* 1. 계정 */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={1} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            계정 · Account
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="이름 NAME" half>
            <input
              className={authInput}
              placeholder="홍길동"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="휴대폰 PHONE (선택)" half>
            <input
              className={authInput}
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field label="이메일 EMAIL">
            <input
              type="email"
              className={authInput}
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="비밀번호 PASSWORD (8자 이상)">
            <input
              type="password"
              className={authInput}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 2. 프로필 */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={2} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            프로필 · About you
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="나는 어떤 사람인가요? I AM…">
            <Select
              value={form.user_type}
              onChange={(v) => set("user_type", v)}
              options={USER_TYPES}
              placeholder="선택해주세요"
            />
          </Field>
          <Field label="연령대 AGE" half>
            <Select
              value={form.age_group}
              onChange={(v) => set("age_group", v)}
              options={AGE_GROUPS}
            />
          </Field>
          <Field label="성별 GENDER" half>
            <Select
              value={form.gender}
              onChange={(v) => set("gender", v)}
              options={GENDERS}
            />
          </Field>
          <Field label="거주 지역 LOCATION" half>
            <Select
              value={form.region}
              onChange={(v) => set("region", v)}
              options={REGIONS}
            />
          </Field>
          <Field label="선호 언어 LANGUAGE" half>
            <Select
              value={form.language}
              onChange={(v) => set("language", v)}
              options={LANGUAGES}
            />
          </Field>
        </div>
      </section>

      {/* 3. 관심사 */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={3} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            관심사 · Interests
          </h2>
        </div>
        <div className="mt-6">
          <p className="label mb-3 text-muted">
            equre에서 무엇을 찾고 있나요? (복수 선택)
          </p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((item) => {
              const active = form.interests.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong text-ink hover:border-accent"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <label className={authLabel}>어떻게 알게 되셨나요? HOW DID YOU HEAR</label>
          <Select
            value={form.referral}
            onChange={(v) => set("referral", v)}
            options={REFERRALS}
          />
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              checked={form.marketing_consent}
              onChange={(e) => set("marketing_consent", e.target.checked)}
            />
            <span>이벤트 · 웰니스 소식 받기 (마케팅 정보 수신 동의)</span>
          </label>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              checked={form.terms}
              onChange={(e) => set("terms", e.target.checked)}
            />
            <span>
              <span className="text-accent">(필수)</span> 이용약관 및 개인정보
              처리방침에 동의합니다
            </span>
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
      >
        {loading ? "가입 중…" : "가입하고 전체 콘텐츠 열기"}
      </button>

      <p className="text-center text-sm text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-accent link-underline">
          로그인
        </Link>
      </p>
    </form>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder = "선택",
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <select
      className={authInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
