"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { Lang } from "@/lib/i18n";

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "tr", label: "Türkçe", short: "TR" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANG_OPTIONS.find((o) => o.code === lang) || LANG_OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[var(--border)] bg-white text-[var(--ink)] text-[13px] font-medium hover:border-[var(--border-2)] hover:bg-[var(--surface-2)] transition"
      >
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.short}</span>
        <ChevronDown
          size={13}
          className={"text-[var(--ink-3)] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1.5 min-w-[150px] rounded-xl border border-[var(--border)] bg-white shadow-[0_20px_50px_-20px_rgba(26,24,20,0.25)] p-1 z-50"
        >
          {LANG_OPTIONS.map((o) => {
            const active = o.code === lang;
            return (
              <li key={o.code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(o.code);
                    setOpen(false);
                  }}
                  className={
                    "w-full flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-[13px] text-left transition " +
                    (active
                      ? "bg-[var(--accent-soft)] text-[var(--accent-deep)] font-medium"
                      : "text-[var(--ink)] hover:bg-[var(--bg-2)]")
                  }
                >
                  <span>{o.label}</span>
                  {active && <Check size={13} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
