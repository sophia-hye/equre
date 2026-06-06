"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { Profile } from "@/lib/auth/session";

export type MemberApp = {
  id: string;
  status: "requested" | "submitted" | "sent";
};

type Member = Profile & { application: MemberApp | null };

type Props = {
  initialMembers: Member[];
  currentUserId: string;
};

const APP_LABEL: Record<MemberApp["status"], string> = {
  requested: "작성 요청됨",
  submitted: "제출됨",
  sent: "발송 완료",
};

export function MemberTable({ initialMembers, currentUserId }: Props) {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

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
      setError(j.error ?? "변경에 실패했습니다.");
      return;
    }
    setMembers((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, role: nextRole } : x))
    );
  }

  async function remove(m: Member) {
    if (!confirm(`${m.email ?? m.name ?? "회원"} 을(를) 삭제할까요?`)) return;
    setBusy(m.id);
    setError("");
    const res = await fetch(`/api/admin/users/${m.id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "삭제에 실패했습니다.");
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
      setError(j.error ?? "요청에 실패했습니다.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      {error && <p className="mb-4 text-sm text-alert">{error}</p>}

      <div className="overflow-x-auto border border-line-strong">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-line-strong">
              <th className="label px-4 py-3 text-muted">이름</th>
              <th className="label px-4 py-3 text-muted">이메일</th>
              <th className="label px-4 py-3 text-muted">역할</th>
              <th className="label px-4 py-3 text-muted">지원서</th>
              <th className="label px-4 py-3 text-right text-muted">관리</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-ink">
                  {m.name || "—"}
                  {m.id === currentUserId && (
                    <span className="ml-2 text-xs text-faint">(나)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{m.email}</td>
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
                      className="border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                      지원서 요청
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      disabled={busy === m.id}
                      onClick={() => toggleRole(m)}
                      className="border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                      {m.role === "admin" ? "관리자 해제" : "관리자 지정"}
                    </button>
                    <button
                      type="button"
                      disabled={busy === m.id || m.id === currentUserId}
                      onClick={() => remove(m)}
                      className="border border-line px-3 py-1.5 text-xs font-medium text-alert transition-colors hover:bg-alert hover:text-white disabled:opacity-30"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
