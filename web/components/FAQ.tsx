"use client";

import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

export default function FAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="relative py-20 sm:py-32 bg-[var(--bg-2)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} align="center" />
        <div className="mt-12 divide-y divide-[var(--border-2)] border-y border-[var(--border-2)]">
          {t.faq.items.map(([q, a], i) => (
            <details key={i} className="acc-item group py-5">
              <summary className="flex items-center gap-4">
                <span className="text-[11.5px] text-[var(--ink-4)] w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16.5px] text-[var(--ink)]">{q}</span>
                <span className="chev ml-auto text-[var(--ink-3)]">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <p className="mt-3 ml-10 text-[15px] text-[var(--ink-2)] leading-relaxed max-w-xl">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
