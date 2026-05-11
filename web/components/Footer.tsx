"use client";

import { GitBranch } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const GITHUB_URL = "https://github.com/eraycevikbusiness/Prowtein";
const MAIL = "mailto:eray.cevik.business@gmail.com";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
            <span className="font-serif text-[16px] leading-none">P</span>
          </span>
          <span className="text-[15px] font-semibold text-[var(--ink)]">Prowtein</span>
          <span className="text-[var(--ink-4)]">·</span>
          <span className="text-[13px] text-[var(--ink-3)]">{t.footer.copy}</span>
          <span className="text-[var(--ink-4)]">·</span>
          <a href="/impressum" className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">{t.footer.impressum}</a>
          <span className="text-[var(--ink-4)]">·</span>
          <a href="/privacy" className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">{t.footer.privacy}</a>
        </div>
        <div className="md:ml-auto flex items-center gap-3">
          <a
            href={MAIL}
            className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
          >
            eray.cevik.business@gmail.com
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-lg border border-[var(--border)] bg-white flex items-center justify-center text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--border-2)] transition"
          >
            <GitBranch size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
