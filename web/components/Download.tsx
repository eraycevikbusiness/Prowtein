"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Apple, MonitorDown, Terminal, ArrowDownToLine } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

const RELEASES_URL = "https://github.com/eraycevikbusiness/Prowtein/releases";
const WIN_URL = "https://github.com/eraycevikbusiness/Prowtein/releases/download/v0.1.0/Prowtein_0.1.0_x64-setup.exe";

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
  btnLabel,
  disabled,
  onClick,
}: {
  Icon: React.ElementType;
  os: string;
  file: string;
  btnLabel: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="dl-card relative p-7 flex flex-col items-center text-center group"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
        disabled
          ? "bg-[var(--bg-2)]"
          : "bg-[var(--bg-2)] group-hover:bg-[var(--accent-soft)]"
      }`}>
        <Icon size={26} className={`transition-colors ${
          disabled
            ? "text-[var(--ink-3)]"
            : "text-[var(--ink-2)] group-hover:text-[var(--accent-deep)]"
        }`} />
      </div>
      <h3 className="text-[22px] font-semibold text-[var(--ink)] tracking-tight">{os}</h3>
      <p className="mt-1 text-[13px] text-[var(--ink-3)]">{file}</p>

      {disabled ? (
        <div className="mt-6 w-full h-11 rounded-xl border border-dashed border-[var(--border-2)] flex items-center justify-center text-[13px] text-[var(--ink-3)]">
          {btnLabel}
        </div>
      ) : (
        <button
          onClick={onClick}
          className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-[13.5px] font-medium"
        >
          <ArrowDownToLine size={14} />
          {btnLabel}
        </button>
      )}
    </motion.div>
  );
}

export default function Download() {
  const { t } = useLang();
  const router = useRouter();

  const handleWindowsDownload = () => {
    const a = document.createElement("a");
    a.href = WIN_URL;
    a.setAttribute("download", "");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    void router.push("/downloaded");
  };

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
            <DownloadCard
              Icon={MonitorDown}
              os="Windows"
              file={t.download.winFile}
              btnLabel={t.download.btnWin}
              onClick={handleWindowsDownload}
            />
            <DownloadCard
              Icon={Apple}
              os="macOS"
              file={t.download.macFile}
              btnLabel={t.download.btnMac}
              disabled
            />
            <DownloadCard
              Icon={Terminal}
              os="Linux"
              file={t.download.linuxFile}
              btnLabel={t.download.btnLinux}
              disabled
            />
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
