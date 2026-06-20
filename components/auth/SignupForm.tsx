"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authInput, authLabel, validateEmail } from "./authStyles";
import {
  AGE_GROUPS,
  CONTACT_PLACEHOLDER,
  CONTACT_TYPES,
  GENDERS,
  INTERESTS,
  LANGUAGES,
  REFERRALS,
  REGIONS,
  USER_TYPES,
  optionLabel,
} from "@/lib/profile/options";
import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";

type Form = {
  name: string;
  phone: string;
  contact_type: string;
  contact_value: string;
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
  contact_type: "",
  contact_value: "",
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
  const t = useMessages().signup;
  const cm = useMessages().common;
  const { locale } = useLocale();
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

  const pwTyped = form.password.length > 0;
  const pwLenOk = form.password.length >= 8;
  const pwSpecialOk = /[^A-Za-z0-9]/.test(form.password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supabaseConfigured) return setError(t.errConfig);
    if (!form.name.trim()) return setError(t.errName);
    if (form.phone.replace(/\D/g, "").length < 7) return setError(t.errPhone);
    if (!validateEmail(form.email)) return setError(t.errEmail);
    if (!pwLenOk || !pwSpecialOk) return setError(t.errPw);
    if (!form.terms) return setError(t.errTerms);

    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          contact_type: form.contact_type,
          contact_value: form.contact_value.trim(),
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
    setDone(data.session ? "active" : "confirm");
  }

  if (done === "active") {
    return (
      <div className="border border-accent/40 bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
          ✓
        </div>
        <p className="mt-5 label text-accent">{t.doneTag}</p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
          {t.doneTitle.replace("{name}", form.name)}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.doneBody}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            {t.doneBtn1}
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/mypage");
              router.refresh();
            }}
            className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            {t.doneBtn2}
          </button>
        </div>
      </div>
    );
  }

  if (done === "confirm") {
    return (
      <div className="border border-line bg-surface p-8 text-center">
        <h3 className="font-display text-xl font-bold tracking-tight">
          {t.confirmTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t.confirmBody.replace("{email}", form.email)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* stepper */}
      <div className="flex flex-wrap gap-2">
        {[t.step1, t.step2, t.step3].map((s, i) => (
          <span
            key={s}
            className={`px-4 py-1.5 text-xs font-semibold ${
              i === 0 ? "bg-accent text-white" : "border border-line-strong text-ink"
            }`}
          >
            {i + 1} {s}
          </span>
        ))}
      </div>

      {/* 1. Account */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={1} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            {t.secAccount}
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label={t.name} half>
            <input
              className={authInput}
              placeholder={t.namePh}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label={t.phone} half>
            <input
              className={authInput}
              placeholder="+82 10-1234-5678"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
            <p className="mt-1.5 text-xs text-faint">{t.phoneHint}</p>
          </Field>
          <Field label={t.email}>
            <input
              type="email"
              className={authInput}
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label={t.password}>
            <input
              type="password"
              className={authInput}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              aria-invalid={pwTyped && (!pwLenOk || !pwSpecialOk)}
            />
            <ul className="mt-2 space-y-1">
              <PwRule ok={pwLenOk} typed={pwTyped} text={t.pwLen} />
              <PwRule ok={pwSpecialOk} typed={pwTyped} text={t.pwSpecial} />
            </ul>
          </Field>

          <Field label={t.contactType} half>
            <Select
              value={form.contact_type}
              onChange={(v) => set("contact_type", v)}
              options={CONTACT_TYPES.filter((x) => x !== "휴대폰")}
              placeholder={t.contactTypePh}
              locale={locale}
            />
          </Field>
          <Field label={t.contactValue} half>
            <input
              className={authInput}
              placeholder={
                form.contact_type
                  ? CONTACT_PLACEHOLDER[form.contact_type] ?? ""
                  : t.contactValuePh
              }
              value={form.contact_value}
              onChange={(e) => set("contact_value", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 2. Profile */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={2} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            {t.secProfile}
          </h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label={t.userType}>
            <Select
              value={form.user_type}
              onChange={(v) => set("user_type", v)}
              options={USER_TYPES}
              placeholder={t.userTypePh}
              locale={locale}
            />
          </Field>
          <Field label={t.age} half>
            <Select
              value={form.age_group}
              onChange={(v) => set("age_group", v)}
              options={AGE_GROUPS}
              placeholder={t.selectPh}
              locale={locale}
            />
          </Field>
          <Field label={t.gender} half>
            <Select
              value={form.gender}
              onChange={(v) => set("gender", v)}
              options={GENDERS}
              placeholder={t.selectPh}
              locale={locale}
            />
          </Field>
          <Field label={t.region} half>
            <Select
              value={form.region}
              onChange={(v) => set("region", v)}
              options={REGIONS}
              placeholder={t.selectPh}
              locale={locale}
            />
          </Field>
          <Field label={t.language} half>
            <Select
              value={form.language}
              onChange={(v) => set("language", v)}
              options={LANGUAGES}
              placeholder={t.selectPh}
              locale={locale}
            />
          </Field>
        </div>
      </section>

      {/* 3. Interests */}
      <section>
        <div className="flex items-center gap-3">
          <StepBadge n={3} />
          <h2 className="font-display text-xl font-bold tracking-tight">
            {t.secInterests}
          </h2>
        </div>
        <div className="mt-6">
          <p className="label mb-3 text-muted">{t.interestsPrompt}</p>
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
                  {optionLabel(item, locale)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <label className={authLabel}>{t.referral}</label>
          <Select
            value={form.referral}
            onChange={(v) => set("referral", v)}
            options={REFERRALS}
            placeholder={t.selectPh}
            locale={locale}
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
            <span>{t.marketing}</span>
          </label>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              checked={form.terms}
              onChange={(e) => set("terms", e.target.checked)}
            />
            <span>
              <span className="text-accent">{t.termsRequired}</span> {t.termsPre}
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
        {loading ? t.submitting : t.submit}
      </button>

      <p className="text-center text-sm text-muted">
        {t.haveAccount}{" "}
        <Link href="/login" className="font-medium text-accent link-underline">
          {cm.login}
        </Link>
      </p>
    </form>
  );
}

function PwRule({
  ok,
  typed,
  text,
}: {
  ok: boolean;
  typed: boolean;
  text: string;
}) {
  const color = !typed ? "text-faint" : ok ? "text-muted" : "text-alert";
  return (
    <li className={`flex items-center gap-1.5 text-xs ${color}`}>
      <span aria-hidden>{typed && ok ? "✓" : "•"}</span>
      {text}
    </li>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  locale,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
  locale: string;
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
          {optionLabel(o, locale)}
        </option>
      ))}
    </select>
  );
}
