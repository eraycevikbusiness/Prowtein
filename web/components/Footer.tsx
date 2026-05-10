"use client";

import { GitBranch, X, Mail } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const SOCIAL = [
  { Icon: GitBranch, label: "github" },
  { Icon: X, label: "twitter" },
  { Icon: Mail, label: "mail" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[#141414] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-[5px] bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-black">P</span>
          </span>
          <span className="font-mono text-[13px] text-white">prowtein</span>
          <span className="text-zinc-700">·</span>
          <span className="text-[12.5px] text-zinc-500">{t.footer.copy}</span>
        </div>
        <div className="md:ml-auto flex items-center gap-2">
          {SOCIAL.map(({ Icon, label }) => (
            <a
              key={label}
              href={label === "github" ? "https://github.com/eraycevikbusiness/Prowtein" : "#"}
              target={label === "github" ? "_blank" : undefined}
              rel={label === "github" ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="w-9 h-9 rounded-md border border-[#1F1F1F] flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#2A2A2A] transition"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
