"use client";

import { useEffect, useState } from "react";
import { ArrowDown, GitBranch } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { FlagUS, FlagDE, FlagTR } from "./ui/Flags";
import { Lang } from "@/lib/i18n";

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const opts: { code: Lang; label: string; Flag: React.ComponentType }[] = [
    { code: "en", label: "English", Flag: FlagUS },
    { code: "de", label: "Deutsch", Flag: FlagDE },
    { code: "tr", label: "Türkçe", Flag: FlagTR },
  ];
  return (
    <div className="hidden sm:inline-flex items-center gap-0.5 p-0.5 rounded-md border border-[#1F1F1F] bg-[#0a0a0a]">
      {opts.map(({ code, label, Flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={label}
          title={label}
          className={
            "w-7 h-7 rounded-[5px] flex items-center justify-center transition-all " +
            (lang === code
              ? "bg-[#161616] ring-1 ring-lime-400/40 shadow-[0_0_0_1px_rgba(132,204,22,0.25)]"
              : "opacity-55 hover:opacity-100")
          }
        >
          <Flag />
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 " +
        (scrolled ? "bg-black/60 backdrop-blur-xl border-b border-[#141414]" : "bg-transparent")
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-[5px] bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-black">P</span>
          </span>
          <span className="font-mono text-[13px] tracking-tight text-white">prowtein</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 mx-auto text-[13px] text-zinc-400">
          <a href="#features" className="link-underline hover:text-white transition-colors">{t.nav.features}</a>
          <a href="#download" className="link-underline hover:text-white transition-colors">{t.nav.download}</a>
          <a href="#faq" className="link-underline hover:text-white transition-colors">{t.nav.changelog}</a>
        </nav>
        <div className="ml-auto md:ml-0 flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="https://github.com/eraycevikbusiness/Prowtein"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex w-8 h-8 items-center justify-center rounded-md border border-[#1F1F1F] text-zinc-400 hover:text-white hover:border-[#2A2A2A] transition"
            aria-label="GitHub"
          >
            <GitBranch size={14} />
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-lime-400 text-black text-[12.5px] font-medium hover:bg-lime-300 transition-all shadow-[0_0_0_1px_rgba(132,204,22,0.4),0_8px_24px_-8px_rgba(132,204,22,0.6)]"
          >
            <ArrowDown size={12} />
            {t.nav.downloadBtn}
          </a>
        </div>
      </div>
    </header>
  );
}
