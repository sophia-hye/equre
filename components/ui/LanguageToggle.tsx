"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALES } from "@/lib/i18n/messages";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mr-1 text-faint/60">/</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`transition-colors ${
              locale === l
                ? "text-ink"
                : "text-faint hover:text-muted"
            }`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
