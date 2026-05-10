"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Apple, Square, Terminal, ArrowDownToLine } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

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
  icon: Icon,
  os,
  file,
  size,
  sha,
  btnLabel,
}: {
  icon: React.ElementType;
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
      <div className="w-14 h-14 rounded-xl border border-[#1a1a1a] bg-[#0c0c0c] flex items-center justify-center mb-5 group-hover:border-lime-400/40 transition-colors">
        <Icon size={26} className="text-zinc-200 group-hover:text-lime-300 transition-colors" />
      </div>
      <h3 className="text-[22px] font-semibold text-white tracking-tight">{os}</h3>
      <p className="mt-1 font-mono text-[12px] text-zinc-500">{file}</p>
      <button className="mt-6 w-full inline-flex items-center justify-center gap-2 h-10 rounded-md bg-lime-400 text-black text-[13px] font-medium hover:bg-lime-300 active:scale-[0.98] transition-all">
        <ArrowDownToLine size={14} />
        {btnLabel}
      </button>
      <div className="mt-5 w-full flex items-center justify-between font-mono text-[11px] text-zinc-600">
        <span>{size}</span>
        <span className="truncate ml-3" title={sha}>{sha}</span>
      </div>
    </motion.div>
  );
}

export default function Download() {
  const { t } = useLang();
  return (
    <Spotlight>
      <section id="download" className="relative py-32">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHead
            eyebrow={t.download.eyebrow}
            title={
              <>
                {t.download.titleA}{" "}
                <span className="text-lime-400" style={{ textShadow: "0 0 40px rgba(132,204,22,0.35)" }}>
                  {t.download.titleB}
                </span>
              </>
            }
            sub={t.download.sub}
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DownloadCard btnLabel={t.download.btn} icon={Apple}    os="macOS"   file="Universal · .dmg"   size="12.4 MB" sha="sha256: a3f9…b21c" />
            <DownloadCard btnLabel={t.download.btn} icon={Square}   os="Windows" file="x64 · .exe"         size="14.2 MB" sha="sha256: 7d12…e9f1" />
            <DownloadCard btnLabel={t.download.btn} icon={Terminal} os="Linux"   file="x64 · .AppImage"    size="13.8 MB" sha="sha256: c8b4…0a47" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11.5px] text-zinc-600">
            <span>{t.download.signed}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>{t.download.autoUpdate}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <a href="https://github.com/eraycevikbusiness/Prowtein/releases" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-zinc-300">{t.download.releases}</a>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}
