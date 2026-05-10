"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, GitBranch, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LangContext";

function Sparkles({ count = 55 }: { count?: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        t: Math.random() * 100,
        d: 2 + Math.random() * 5,
        delay: -Math.random() * 5,
        size: Math.random() < 0.15 ? 3 : Math.random() < 0.4 ? 2 : 1,
        color: Math.random() < 0.2 ? "#84CC16" : "#ffffff",
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
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 dot-grid fade-edges-y opacity-60" aria-hidden="true" />
      <div className="beams" aria-hidden="true" />
      <Sparkles count={55} />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/3 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(132,204,22,0.10), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/5 mb-8"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-lime-400 animate-ping opacity-75" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-lime-400" />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-lime-300">{t.hero.pill}</span>
        </motion.div>

        <h1 className="text-[clamp(56px,9vw,124px)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
          >
            {t.hero.title1}
          </motion.span>
          <motion.span
            className="block text-lime-400"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
            style={{ textShadow: "0 0 60px rgba(132,204,22,0.35)" }}
          >
            {t.hero.title2}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-7 text-zinc-400 text-[17px] md:text-[19px] leading-relaxed max-w-xl mx-auto"
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
          <div className="moving-border">
            <a
              href="#download"
              className="glow-pulse inline-flex items-center gap-2 h-11 px-5 rounded-[9px] bg-lime-400 text-black text-[14px] font-medium hover:bg-lime-300 active:scale-[0.98] transition-all"
            >
              <ArrowDownToLine size={15} />
              {t.hero.ctaPrimary}
              <span className="font-mono text-[11px] text-black/60 ml-1">v1.0</span>
            </a>
          </div>
          <a
            href="https://github.com/eraycevikbusiness/Prowtein"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[9px] border border-[#262626] bg-[#0a0a0a] text-zinc-100 text-[14px] hover:border-[#383838] hover:bg-[#101010] active:scale-[0.98] transition-all"
          >
            <GitBranch size={15} />
            {t.hero.ctaSecondary}
            <span className="font-mono text-[11px] text-zinc-500">{t.hero.stars}</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-5 text-[12.5px] text-zinc-600 font-mono"
        >
          {t.hero.meta}
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 scroll-cue flex flex-col items-center gap-1.5 text-zinc-600">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t.hero.scroll}</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
