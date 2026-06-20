"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALES } from "@/lib/i18n/messages";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center overflow-hidden border border-line-strong"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`px-2 py-1 text-xs font-semibold transition-colors ${
            locale === l ? "bg-ink text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
