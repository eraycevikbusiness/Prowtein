"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TRANSLATIONS, Lang } from "./i18n";

type AnyTranslation = (typeof TRANSLATIONS)[Lang];

interface LangCtx {
  lang: Lang;
  t: AnyTranslation;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({
  lang: "en",
  t: TRANSLATIONS.en,
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("prowtein-lang") as Lang | null;
      if (stored && TRANSLATIONS[stored]) {
        setLangState(stored);
        document.documentElement.lang = stored;
        return;
      }
    } catch {}
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("de")) {
      setLangState("de");
      document.documentElement.lang = "de";
    } else if (nav.startsWith("tr")) {
      setLangState("tr");
      document.documentElement.lang = "tr";
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("prowtein-lang", l);
    } catch {}
  };

  return (
    <Ctx.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
