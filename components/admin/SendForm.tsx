"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/components/auth/authStyles";
import { useMessages } from "@/components/i18n/LocaleProvider";

type Props = {
  applicationId: string;
  defaultEmail?: string;
  alreadySentTo?: string | null;
};

export function SendForm({ applicationId, defaultEmail, alreadySentTo }: Props) {
  const router = useRouter();
  const t = useMessages().admin;
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!validateEmail(email)) {
      setError(t.errEmail);
      return;
    }
    if (!confirm(t.confirmSend.replace("{email}", email))) return;

    setBusy(true);
    const res = await fetch(`/api/admin/applications/${applicationId}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(j.error ?? t.errSend);
      return;
    }
    setMsg(t.sendDone.replace("{email}", email));
    router.refresh();
  }

  return (
    <div className="border border-line-strong bg-bg-soft p-6">
      <h3 className="font-display text-lg font-bold tracking-tight">
        {t.sendTitle}
      </h3>
      {alreadySentTo && (
        <p className="mt-2 text-xs text-muted">
          {t.prevSend.replace("{email}", alreadySentTo)}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.sendPlaceholder}
          className="min-w-[260px] flex-1 border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
        >
          {busy ? t.sending : t.sendBtn}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-alert">{error}</p>}
      {msg && <p className="mt-3 text-sm text-accent">{msg}</p>}
    </div>
  );
}
