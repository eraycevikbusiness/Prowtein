"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, GitBranch, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const GITHUB_URL = "https://github.com/eraycevikbusiness/Prowtein";

function Sparkles({ count = 32 }: { count?: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        t: Math.random() * 100,
        d: 4 + Math.random() * 5,
        delay: -Math.random() * 6,
        size: Math.random() < 0.18 ? 3 : 2,
        color: Math.random() < 0.45 ? "rgba(232,93,74,0.55)" : "rgba(26,24,20,0.25)",
      })),
    [count]
  );
  return (
    <div className="sparkles" aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: s.l + "%",
            top: s.t + "%",
            width: s.size,
            height: s.size,
            background: s.color,
            animationDuration: s.d + "s",
            animationDelay: s.delay + "s",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-20 px-4"
    >
      <div className="absolute inset-0 dot-grid fade-edges-y opacity-50" aria-hidden="true" />
      <div className="warm-orbs" aria-hidden="true" />
      <Sparkles count={32} />

      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="tag mb-7"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-50" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span>{t.hero.pill}</span>
        </motion.div>

        <h1 className="font-serif text-[clamp(40px,10vw,108px)] leading-[1.06] tracking-[-0.02em] text-[var(--ink)]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
          >
            {t.hero.title1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
            className="block italic text-[var(--accent)]"
          >
            {t.hero.title2}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-7 text-[var(--ink-2)] text-[17.5px] md:text-[19.5px] leading-relaxed max-w-xl mx-auto"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#download"
            className="btn-primary inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-medium"
          >
            <ArrowDownToLine size={16} />
            {t.hero.ctaPrimary}
            <span className="text-[12px] text-white/70 ml-1">v0.1</span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-medium"
          >
            <GitBranch size={16} />
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-5 text-[13px] text-[var(--ink-3)]"
        >
          {t.hero.meta}
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-cue flex flex-col items-center gap-1.5 text-[var(--ink-3)]">
        <span className="text-[11px] tracking-wide">{t.hero.scroll}</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
