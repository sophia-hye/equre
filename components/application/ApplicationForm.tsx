"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  APPLICATION_SECTIONS,
  type ApplicationData,
  type Field,
} from "@/lib/application/fields";

const inputClass =
  "w-full border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";

type Props = {
  applicationId: string;
  initialData: ApplicationData;
  readOnly?: boolean;
};

export function ApplicationForm({
  applicationId,
  initialData,
  readOnly = false,
}: Props) {
  const router = useRouter();
  const [data, setData] = useState<ApplicationData>(initialData ?? {});
  const [busy, setBusy] = useState<"save" | "submit" | null>(null);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState("");

  function update(key: string, value: string | boolean) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function send(action: "save" | "submit") {
    setError("");
    if (action === "submit") {
      const nameMissing = !String(data.student_name_en ?? "").trim();
      if (nameMissing) {
        setError("학생 영문 이름은 필수입니다.");
        return;
      }
      if (!confirm("제출 후에는 관리자 확인 단계로 넘어갑니다. 제출할까요?")) return;
    }
    setBusy(action);
    const res = await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, action }),
    });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "저장에 실패했습니다.");
      return;
    }
    if (action === "submit") {
      router.refresh();
    } else {
      setSavedAt(new Date().toLocaleTimeString("ko-KR"));
    }
  }

  return (
    <div className="space-y-12">
      {APPLICATION_SECTIONS.map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-xl font-bold tracking-tight">
            {section.title}
          </h2>
          {section.description && (
            <p className="mt-1 text-sm text-muted">{section.description}</p>
          )}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {section.fields.map((field) => (
              <FieldRow
                key={field.key}
                field={field}
                value={data[field.key]}
                onChange={(v) => update(field.key, v)}
                readOnly={readOnly}
              />
            ))}
          </div>
        </div>
      ))}

      {error && <p className="text-sm text-alert">{error}</p>}

      {!readOnly && (
        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => send("submit")}
            className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
          >
            {busy === "submit" ? "제출 중…" : "제출하기"}
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => send("save")}
            className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg disabled:opacity-50"
          >
            {busy === "save" ? "저장 중…" : "임시 저장"}
          </button>
          {savedAt && (
            <span className="text-xs text-muted">{savedAt} 임시 저장됨</span>
          )}
        </div>
      )}
    </div>
  );
}

function FieldRow({
  field,
  value,
  onChange,
  readOnly,
}: {
  field: Field;
  value: string | boolean | undefined;
  onChange: (v: string | boolean) => void;
  readOnly: boolean;
}) {
  const wide = field.type === "textarea" || field.type === "checkbox";
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      {field.type !== "checkbox" && (
        <label className="label mb-2 block text-muted">
          {field.label}
          {field.required && <span className="text-alert"> *</span>}
        </label>
      )}

      {field.type === "textarea" ? (
        <textarea
          rows={3}
          className={`${inputClass} resize-none`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          readOnly={readOnly}
        />
      ) : field.type === "select" ? (
        <select
          className={inputClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={readOnly}
        >
          <option value="">선택</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            disabled={readOnly}
          />
          <span>{field.label}</span>
        </label>
      ) : (
        <input
          type={field.type}
          className={inputClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          readOnly={readOnly}
        />
      )}

      {field.hint && (
        <p className="mt-1.5 text-xs text-faint">{field.hint}</p>
      )}
    </div>
  );
}
