"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Apple, Square, Terminal, ArrowDownToLine } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

const RELEASES_URL = "https://github.com/eraycevikbusiness/Prowtein/releases";

function Spotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className="spotlight-section">
      {children}
    </div>
  );
}

function DownloadCard({
  Icon,
  os,
  file,
  size,
  sha,
  btnLabel,
}: {
  Icon: React.ElementType;
  os: string;
  file: string;
  size: string;
  sha: string;
  btnLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="dl-card relative p-7 flex flex-col items-center text-center group"
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--bg-2)] flex items-center justify-center mb-5 group-hover:bg-[var(--accent-soft)] transition-colors">
        <Icon size={26} className="text-[var(--ink-2)] group-hover:text-[var(--accent-deep)] transition-colors" />
      </div>
      <h3 className="text-[22px] font-semibold text-[var(--ink)] tracking-tight">{os}</h3>
      <p className="mt-1 text-[13px] text-[var(--ink-3)]">{file}</p>
      <button className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-[13.5px] font-medium">
        <ArrowDownToLine size={14} />
        {btnLabel}
      </button>
      <div className="mt-5 w-full flex items-center justify-between text-[11.5px] text-[var(--ink-3)]">
        <span>{size}</span>
        <span className="truncate ml-3" title={sha}>
          {sha}
        </span>
      </div>
    </motion.div>
  );
}

export default function Download() {
  const { t } = useLang();
  return (
    <Spotlight>
      <section id="download" className="relative py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHead
            eyebrow={t.download.eyebrow}
            title={
              <>
                {t.download.titleA} <span className="italic text-[var(--accent)]">{t.download.titleB}</span>
              </>
            }
            sub={t.download.sub}
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DownloadCard btnLabel={t.download.btn} Icon={Apple} os="macOS" file="Universal · .dmg" size="12.4 MB" sha="sha256: a3f9…b21c" />
            <DownloadCard btnLabel={t.download.btn} Icon={Square} os="Windows" file="x64 · .exe" size="14.2 MB" sha="sha256: 7d12…e9f1" />
            <DownloadCard btnLabel={t.download.btn} Icon={Terminal} os="Linux" file="x64 · .AppImage" size="13.8 MB" sha="sha256: c8b4…0a47" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-[var(--ink-3)]">
            <span>{t.download.signed}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-2)]" />
            <span>{t.download.autoUpdate}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-2)]" />
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-[var(--ink)]">
              {t.download.releases}
            </a>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}
