"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "no";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T extends Record<Lang, string>>(record: T) => string;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (record) => record.en,
});

const STORAGE_KEY = "jc-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "no" || stored === "en") {
      setLangState(stored);
      return;
    }
    if (typeof navigator !== "undefined") {
      const nav = navigator.language || (navigator.languages && navigator.languages[0]);
      if (nav && (nav.startsWith("nb") || nav.startsWith("nn") || nav === "no")) {
        setLangState("no");
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "no" ? "no" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  };

  const t: LangContextValue["t"] = (record) => record[lang] ?? record.en;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
