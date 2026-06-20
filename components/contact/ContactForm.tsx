"use client";

import { FormEvent, useState } from "react";
import { IconShield } from "@/components/ui/icons";
import { useMessages } from "@/components/i18n/LocaleProvider";

type Tab = "consult" | "b2b";
type FieldErrors = Record<string, string>;

const inputClass =
  "w-full border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";
const labelClass = "label mb-2 block text-muted";

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const t = useMessages().contactForm;
  const [tab, setTab] = useState<Tab>("consult");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FieldErrors = {};

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const agree = data.get("agree");

    if (!name) nextErrors.name = t.errName;
    if (!email) nextErrors.email = t.errEmail1;
    else if (!validateEmail(email)) nextErrors.email = t.errEmail2;
    if (!agree) nextErrors.agree = t.errAgree;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    form.reset();
  }

  function switchTab(next: Tab) {
    setTab(next);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center border border-line-strong bg-surface p-12">
        <span className="text-accent">
          <IconShield width={40} height={40} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
          {t.successTitle}
        </h3>
        <p className="mt-3 text-sm text-muted">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-sm font-medium text-accent"
        >
          {t.successNew}
        </button>
      </div>
    );
  }

  const tabBtn = (active: boolean) =>
    `px-5 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-accent text-white" : "text-muted hover:text-ink"
    }`;

  return (
    <div className="border border-line-strong bg-bg-soft p-6 md:p-9">
      <div className="mb-9 inline-flex border border-line-strong">
        <button type="button" onClick={() => switchTab("consult")} className={tabBtn(tab === "consult")}>
          {t.tabConsult}
        </button>
        <button type="button" onClick={() => switchTab("b2b")} className={tabBtn(tab === "b2b")}>
          {t.tabB2B}
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              {tab === "b2b" ? t.company : t.name} *
            </label>
            <input id="name" name="name" className={inputClass} placeholder={t.namePh} />
            {errors.name && <p className="mt-1.5 text-xs text-alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>{t.phone}</label>
            <input id="phone" name="phone" className={inputClass} placeholder="010-0000-0000" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>{t.email} *</label>
          <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
          {errors.email && <p className="mt-1.5 text-xs text-alert">{errors.email}</p>}
        </div>

        {tab === "consult" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="program" className={labelClass}>{t.program}</label>
              <select id="program" name="program" className={inputClass}>
                <option>{t.optCore}</option>
                <option>{t.optPeer}</option>
                <option>{t.optUndecided}</option>
              </select>
            </div>
            <div>
              <label htmlFor="grade" className={labelClass}>{t.grade}</label>
              <input id="grade" name="grade" className={inputClass} placeholder={t.gradePh} />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="partnerType" className={labelClass}>{t.partnerType}</label>
            <select id="partnerType" name="partnerType" className={inputClass}>
              <option>{t.pt1}</option>
              <option>{t.pt2}</option>
              <option>{t.pt3}</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className={labelClass}>{t.message}</label>
          <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder={t.messagePh} />
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="agree" className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]" />
            <span>
              {t.agree} <span className="text-alert">{t.required}</span>
            </span>
          </label>
          {errors.agree && <p className="mt-1.5 text-xs text-alert">{errors.agree}</p>}
        </div>

        <button type="submit" className="w-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim">
          {tab === "b2b" ? t.submitB2B : t.submitConsult}
        </button>
      </form>
    </div>
  );
}
