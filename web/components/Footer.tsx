"use client";

import { GitBranch, X, Mail } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const GITHUB_URL = "https://github.com/eraycevikbusiness/Prowtein";

const SOCIAL: { Icon: React.ElementType; label: string; href: string; external: boolean }[] = [
  { Icon: GitBranch, label: "github", href: GITHUB_URL, external: true },
  { Icon: X, label: "twitter", href: "#", external: false },
  { Icon: Mail, label: "mail", href: "#", external: false },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
            <span className="font-serif text-[16px] leading-none">P</span>
          </span>
          <span className="text-[15px] font-semibold text-[var(--ink)]">Prowtein</span>
          <span className="text-[var(--ink-4)]">·</span>
          <span className="text-[13px] text-[var(--ink-3)]">{t.footer.copy}</span>
        </div>
        <div className="md:ml-auto flex items-center gap-2">
          {SOCIAL.map(({ Icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-[var(--border)] bg-white flex items-center justify-center text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--border-2)] transition"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
