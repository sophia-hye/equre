"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  messages,
  type Locale,
  type Messages,
} from "@/lib/i18n/messages";

type Ctx = {
  locale: Locale;
  messages: Messages;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<Ctx>({
  locale: DEFAULT_LOCALE,
  messages: messages[DEFAULT_LOCALE],
  setLocale: () => {},
});

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLoc] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (l: Locale) => {
      setLoc(l);
      try {
        localStorage.setItem("lang", l);
        document.cookie = `lang=${l};path=/;max-age=31536000`;
        document.documentElement.lang = l;
      } catch {
        /* ignore */
      }
      // 서버 컴포넌트(쿠키 기반 번역) 재렌더
      router.refresh();
    },
    [router]
  );

  return (
    <LocaleContext.Provider
      value={{ locale, messages: messages[locale], setLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** 클라이언트 컴포넌트용 메시지 객체. */
export function useMessages(): Messages {
  return useContext(LocaleContext).messages;
}
