"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const GITHUB_ISSUES = "https://github.com/eraycevikbusiness/Prowtein/issues";

const steps = (t: ReturnType<typeof useLang>["t"]) => [
  { n: "1", title: t.downloaded.step1title, body: t.downloaded.step1body },
  { n: "2", title: t.downloaded.step2title, body: t.downloaded.step2body },
  { n: "3", title: t.downloaded.step3title, body: t.downloaded.step3body },
];

export default function DownloadedContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 sm:py-32">
        {/* Success mark */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mb-8 shadow-[0_12px_40px_-12px_rgba(232,93,74,0.5)]"
        >
          <Check size={30} strokeWidth={2.5} className="text-white" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-[36px] sm:text-[48px] leading-tight tracking-tight text-[var(--ink)] mb-3">
            {t.downloaded.headline}
          </h1>
          <p className="text-[15px] text-[var(--ink-3)] max-w-md">{t.downloaded.sub}</p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-lg grid gap-4 mb-14"
        >
          {steps(t).map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[var(--border)]"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[13px] font-semibold text-[var(--accent-deep)]">{s.n}</span>
              </div>
              <div>
                <div className="text-[14.5px] font-semibold text-[var(--ink)] mb-0.5">{s.title}</div>
                <div className="text-[13px] text-[var(--ink-3)] leading-relaxed">{s.body}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-[13px]"
        >
          <Link href="/" className="font-medium text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors">
            {t.downloaded.back}
          </Link>
          <span className="text-[var(--ink-3)]">
            {t.downloaded.issue}{" "}
            <a
              href={GITHUB_ISSUES}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[var(--ink-2)] hover:text-[var(--ink)]"
            >
              {t.downloaded.issueLink}
            </a>
          </span>
        </motion.div>
      </main>
    </div>
  );
}
