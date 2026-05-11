"use client";

import { useEffect, useState } from "react";
import { ArrowDown, GitBranch } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import LanguageSwitcher from "./ui/LanguageSwitcher";

const GITHUB_URL = "https://github.com/eraycevikbusiness/Prowtein";

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
        (scrolled
          ? "bg-[rgba(250,247,242,0.78)] backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent")
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <a href="/#top" className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
            <span className="font-serif text-[16px] leading-none">P</span>
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-[var(--ink)]">Prowtein</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 mx-auto text-[14px] text-[var(--ink-2)]">
          <a href="/#features" className="link-underline hover:text-[var(--ink)] transition-colors">
            {t.nav.features}
          </a>
          <a href="/#philosophy" className="link-underline hover:text-[var(--ink)] transition-colors">
            {t.nav.philosophy}
          </a>
          <a href="/#download" className="link-underline hover:text-[var(--ink)] transition-colors">
            {t.nav.download}
          </a>
          <a href="/changelog" className="link-underline hover:text-[var(--ink)] transition-colors">
            {t.nav.changelog}
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--border-2)] transition"
            aria-label="GitHub"
          >
            <GitBranch size={15} />
          </a>
          <a
            href="/#download"
            className="btn-primary inline-flex items-center gap-1.5 h-9 px-3 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-medium"
          >
            <ArrowDown size={13} />
            <span className="hidden sm:inline">{t.nav.downloadBtn}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
