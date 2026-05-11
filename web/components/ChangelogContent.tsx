"use client";

import { motion } from "framer-motion";
import { ChevronLeft, GitBranch, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { RELEASES, ChangeKind } from "@/lib/changelog";

const RELEASES_URL = "https://github.com/eraycevikbusiness/Prowtein/releases";

const KIND_COLOR: Record<ChangeKind, string> = {
  new: "#C8442F",
  added: "#6E8B52",
  changed: "#BD7A36",
  fixed: "#735B78",
  notes: "#8A8580",
};

const FOOTER_NOTE = {
  en: "Built incrementally, vibe-coded with Claude.",
  de: "Inkrementell entwickelt, vibe-coded mit Claude.",
  tr: "Aşamalı olarak geliştirildi, Claude ile vibe-coded.",
};

export default function ChangelogContent() {
  const { t, lang } = useLang();
  const c = t.changelog;

  return (
    <main className="relative pt-28 sm:pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 dot-grid fade-edges-y opacity-30" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            {c.back}
          </a>
          <div className="tag mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{c.eyebrow}</span>
          </div>
          <h1
            className="font-serif text-[40px] md:text-[56px] leading-[1.08] tracking-tight text-[var(--ink)]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {c.title}
          </h1>
          <p
            className="mt-4 text-[var(--ink-3)] text-[16.5px] leading-relaxed max-w-xl"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            {c.sub}
          </p>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-7 inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13.5px] font-medium"
          >
            <GitBranch size={14} />
            {c.releasesCta}
          </a>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 relative pl-7 sm:pl-12">
          <div className="absolute left-[3px] sm:left-[7px] top-3 bottom-3 w-px bg-[var(--border-2)]" aria-hidden="true" />
          <div className="space-y-16">
            {RELEASES.map((r, i) => (
              <motion.article
                key={r.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.04 }}
                className="relative"
              >
                {/* node */}
                <span className="absolute -left-7 sm:-left-12 top-[7px] flex items-center justify-center">
                  <span
                    className={
                      "w-3.5 h-3.5 rounded-full ring-4 ring-[var(--bg)] " +
                      (r.status === "latest" ? "bg-[var(--accent)]" : "bg-[var(--ink-4)]")
                    }
                  />
                </span>

                {/* header row */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h2 className="font-serif text-[28px] leading-none text-[var(--ink)]">
                    v{r.version}
                  </h2>
                  {r.status === "latest" && (
                    <span className="inline-flex items-center h-[20px] px-2 rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)] text-[10.5px] font-semibold uppercase tracking-wider">
                      {c.status.latest}
                    </span>
                  )}
                  <span className="text-[13px] text-[var(--ink-3)] ml-auto">{r.date}</span>
                </div>
                <p className="mt-2 text-[15.5px] text-[var(--ink-2)] font-medium">{r.title[lang]}</p>

                {/* groups */}
                <div className="mt-5 space-y-5">
                  {r.groups.map((g) => (
                    <div key={g.kind}>
                      <div
                        className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-2"
                        style={{ color: KIND_COLOR[g.kind] }}
                      >
                        {c.kind[g.kind]}
                      </div>
                      <ul className="space-y-1.5">
                        {g.items.map((it, k) => (
                          <li key={k} className="flex gap-2.5 text-[15px] text-[var(--ink-2)] leading-relaxed">
                            <span
                              className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: KIND_COLOR[g.kind], opacity: 0.55 }}
                            />
                            <span style={{ textWrap: "pretty" } as React.CSSProperties}>{it[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* footer note */}
        <div className="mt-20 pt-8 border-t border-[var(--border)] flex items-center gap-2.5 text-[13.5px] text-[var(--ink-3)]">
          <Sparkles size={14} className="text-[var(--accent)]" />
          <span>{FOOTER_NOTE[lang]}</span>
        </div>
      </div>
    </main>
  );
}
