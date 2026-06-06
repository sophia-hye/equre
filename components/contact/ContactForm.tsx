"use client";

import { FormEvent, useState } from "react";
import { IconShield } from "@/components/ui/icons";

type Tab = "consult" | "b2b";
type FieldErrors = Record<string, string>;

const inputClass =
  "w-full border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";
const labelClass = "label mb-2 block text-muted";

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
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

    if (!name) nextErrors.name = "이름을 입력해 주세요.";
    if (!email) nextErrors.email = "이메일을 입력해 주세요.";
    else if (!validateEmail(email))
      nextErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!agree) nextErrors.agree = "개인정보 수집·이용에 동의해 주세요.";

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
          신청이 접수되었습니다
        </h3>
        <p className="mt-3 text-sm text-muted">
          빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-sm font-medium text-accent"
        >
          새 문의 작성하기
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
          학부모 / 학생 상담
        </button>
        <button type="button" onClick={() => switchTab("b2b")} className={tabBtn(tab === "b2b")}>
          B2B / 제휴
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              {tab === "b2b" ? "회사 / 담당자명" : "이름"} *
            </label>
            <input id="name" name="name" className={inputClass} placeholder="홍길동" />
            {errors.name && <p className="mt-1.5 text-xs text-alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>연락처</label>
            <input id="phone" name="phone" className={inputClass} placeholder="010-0000-0000" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>이메일 *</label>
          <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
          {errors.email && <p className="mt-1.5 text-xs text-alert">{errors.email}</p>}
        </div>

        {tab === "consult" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="program" className={labelClass}>관심 프로그램</label>
              <select id="program" name="program" className={inputClass}>
                <option>Core: 입시 &amp; 멘탈</option>
                <option>Peer Mentoring</option>
                <option>미정 / 상담 후 결정</option>
              </select>
            </div>
            <div>
              <label htmlFor="grade" className={labelClass}>학생 학년 / 종목</label>
              <input id="grade" name="grade" className={inputClass} placeholder="예) 고2 / 테니스" />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="partnerType" className={labelClass}>제휴 유형</label>
            <select id="partnerType" name="partnerType" className={inputClass}>
              <option>팝업 스폰서십</option>
              <option>공간 대여</option>
              <option>제품 브리핑 세션</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className={labelClass}>문의 내용</label>
          <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder="문의하실 내용을 자유롭게 작성해 주세요." />
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="agree" className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]" />
            <span>
              개인정보 수집·이용에 동의합니다. <span className="text-alert">(필수)</span>
            </span>
          </label>
          {errors.agree && <p className="mt-1.5 text-xs text-alert">{errors.agree}</p>}
        </div>

        <button type="submit" className="w-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim">
          {tab === "b2b" ? "제휴 문의하기" : "상담 신청하기"}
        </button>
      </form>
    </div>
  );
}
