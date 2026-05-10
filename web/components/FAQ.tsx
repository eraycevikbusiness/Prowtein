"use client";

import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

export default function FAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="relative py-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} align="center" />
        <div className="mt-12 divide-y divide-[#141414] border-y border-[#141414]">
          {t.faq.items.map(([q, a], i) => (
            <details key={i} className="acc-item group py-5">
              <summary className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-zinc-600 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px] text-white">{q}</span>
                <span className="chev ml-auto text-zinc-500"><ChevronDown size={16} /></span>
              </summary>
              <p className="mt-3 ml-10 text-[14.5px] text-zinc-400 leading-relaxed max-w-xl">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
