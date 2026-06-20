"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Profile } from "@/lib/auth/session";
import {
  AGE_GROUPS,
  INTERESTS,
  USER_TYPES,
  optionLabel,
} from "@/lib/profile/options";
import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";

export type MemberApp = {
  id: string;
  status: "requested" | "submitted" | "sent";
};

type Member = Profile & { application: MemberApp | null };

type Props = {
  initialMembers: Member[];
  currentUserId: string;
};

const selectClass =
  "border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent";

export function MemberTable({ initialMembers, currentUserId }: Props) {
  const router = useRouter();
  const t = useMessages().admin;
  const { locale } = useLocale();
  const APP_LABEL: Record<MemberApp["status"], string> = {
    requested: t.appRequested,
    submitted: t.appSubmitted,
    sent: t.appSent,
  };
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  // filters
  const [fType, setFType] = useState("");
  const [fAge, setFAge] = useState("");
  const [fInterest, setFInterest] = useState("");

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        if (fType && m.user_type !== fType) return false;
        if (fAge && m.age_group !== fAge) return false;
        if (fInterest && !(m.interests ?? []).includes(fInterest)) return false;
        return true;
      }),
    [members, fType, fAge, fInterest]
  );

  async function toggleRole(m: Member) {
    const nextRole = m.role === "admin" ? "user" : "admin";
    setBusy(m.id);
    setError("");
    const res = await fetch(`/api/admin/users/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? t.errChange);
      return;
    }
    setMembers((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, role: nextRole } : x))
    );
  }

  async function remove(m: Member) {
    if (!confirm(t.confirmDelete.replace("{who}", m.email ?? m.name ?? t.defaultMember)))
      return;
    setBusy(m.id);
    setError("");
    const res = await fetch(`/api/admin/users/${m.id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? t.errDelete);
      return;
    }
    setMembers((prev) => prev.filter((x) => x.id !== m.id));
  }

  async function requestApplication(m: Member) {
    setBusy(m.id);
    setError("");
    const res = await fetch(`/api/admin/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: m.id }),
    });
    setBusy(null);
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(j.error ?? t.errRequest);
      return;
    }
    router.refresh();
  }

  function resetFilters() {
    setFType("");
    setFAge("");
    setFInterest("");
  }

  return (
    <div>
      {/* filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="label text-faint">{t.filter}</span>
        <select value={fType} onChange={(e) => setFType(e.target.value)} className={selectClass}>
          <option value="">{t.allTypes}</option>
          {USER_TYPES.map((o) => (
            <option key={o} value={o}>{optionLabel(o, locale)}</option>
          ))}
        </select>
        <select value={fAge} onChange={(e) => setFAge(e.target.value)} className={selectClass}>
          <option value="">{t.allAges}</option>
          {AGE_GROUPS.map((o) => (
            <option key={o} value={o}>{optionLabel(o, locale)}</option>
          ))}
        </select>
        <select
          value={fInterest}
          onChange={(e) => setFInterest(e.target.value)}
          className={selectClass}
        >
          <option value="">{t.allInterests}</option>
          {INTERESTS.map((o) => (
            <option key={o} value={o}>{optionLabel(o, locale)}</option>
          ))}
        </select>
        {(fType || fAge || fInterest) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-accent"
          >
            {t.reset}
          </button>
        )}
        <span className="ml-auto text-sm text-muted">
          {filtered.length} / {members.length}{t.countSuffix}
        </span>
      </div>

      {error && <p className="mb-4 text-sm text-alert">{error}</p>}

      <div className="overflow-x-auto border border-line-strong">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead>
            <tr className="border-b border-line-strong">
              {[t.thName, t.thEmail, t.thContact, t.thType, t.thAge, t.thRegion, t.thInterests, t.thRole, t.thApp, t.thManage].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`label px-4 py-3 text-muted ${i === 9 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-line align-top last:border-0">
                <td className="px-4 py-3 font-medium text-ink">
                  {m.name || "—"}
                  {m.id === currentUserId && (
                    <span className="ml-2 text-xs text-faint">{t.me}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{m.email}</td>
                <td className="px-4 py-3 text-muted">
                  <span>{m.phone || "—"}</span>
                  {m.contact_value && (
                    <span className="mt-0.5 block text-xs text-faint">
                      {m.contact_type ? optionLabel(m.contact_type, locale) : t.extra}: {m.contact_value}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{m.user_type ? optionLabel(m.user_type, locale) : "—"}</td>
                <td className="px-4 py-3 text-muted">{m.age_group ? optionLabel(m.age_group, locale) : "—"}</td>
                <td className="px-4 py-3 text-muted">{m.region ? optionLabel(m.region, locale) : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex max-w-[220px] flex-wrap gap-1">
                    {(m.interests ?? []).length > 0 ? (
                      (m.interests ?? []).map((it) => (
                        <span
                          key={it}
                          className="border border-line px-1.5 py-0.5 text-[0.65rem] text-muted"
                        >
                          {optionLabel(it, locale)}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      m.role === "admin"
                        ? "bg-accent px-2 py-0.5 text-xs font-medium text-white"
                        : "border border-line px-2 py-0.5 text-xs text-muted"
                    }
                  >
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {m.application ? (
                    <Link
                      href={`/admin/applications/${m.application.id}`}
                      className="text-xs font-medium text-accent link-underline"
                    >
                      {APP_LABEL[m.application.status]} →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled={busy === m.id}
                      onClick={() => requestApplication(m)}
                      className="whitespace-nowrap border border-line px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                      {t.requestApp}
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      disabled={busy === m.id}
                      onClick={() => toggleRole(m)}
                      className="whitespace-nowrap border border-line px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                      {m.role === "admin" ? t.removeAdmin : t.makeAdmin}
                    </button>
                    <button
                      type="button"
                      disabled={busy === m.id || m.id === currentUserId}
                      onClick={() => remove(m)}
                      className="border border-line px-2.5 py-1.5 text-xs font-medium text-alert transition-colors hover:bg-alert hover:text-white disabled:opacity-30"
                    >
                      {t.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-muted">
                  {t.noMembers}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
