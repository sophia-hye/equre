"use client";

import { useEffect, useState } from "react";

type Lang = "ko" | "en";

export function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ko" || saved === "en") {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  function pick(l: Lang) {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
      document.cookie = `lang=${l};path=/;max-age=31536000`;
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="flex items-center overflow-hidden border border-line-strong"
      role="group"
      aria-label="언어 선택"
    >
      {(["ko", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => pick(l)}
          aria-pressed={lang === l}
          className={`px-2 py-1 text-xs font-semibold transition-colors ${
            lang === l ? "bg-ink text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
