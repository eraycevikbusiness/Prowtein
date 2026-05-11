"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const PORTFOLIO_URL = "https://www.eraycevik.com/";

export default function Philosophy() {
  const { t } = useLang();
  const p = t.philosophy;

  return (
    <section id="philosophy" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid fade-edges-y opacity-40" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="tag mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{p.eyebrow}</span>
          </div>
          <h2
            className="font-serif text-[36px] md:text-[52px] leading-[1.1] tracking-tight text-[var(--ink)]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {p.titleA} <span className="italic text-[var(--accent)]">{p.titleB}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-7 sm:p-10 shadow-[0_30px_70px_-40px_rgba(26,24,20,0.18)]"
        >
          <span className="inline-flex items-center gap-1.5 tag mb-6">
            <Sparkles size={13} className="text-[var(--accent)]" />
            <span>{p.badge}</span>
          </span>

          <div className="space-y-5 text-[var(--ink-2)] text-[16.5px] leading-relaxed">
            {p.paragraphs.map((para, i) => (
              <p key={i} style={{ textWrap: "pretty" } as React.CSSProperties}>
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <span className="font-serif text-[19px] italic text-[var(--ink-3)]">{p.sign}</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--border-2)]" />
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[var(--accent-deep)] hover:text-[var(--accent)] transition-colors w-fit"
            >
              {p.link}
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
