"use client";

import { motion } from "framer-motion";
import { Sun, Bookmark, Sparkles, Zap, Shield, Share2 } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

const ICONS = [Sun, Bookmark, Sparkles, Zap, Shield, Share2];

function BentoCard({
  Icon,
  title,
  body,
  accent = false,
}: {
  Icon: React.ElementType;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
      className="bento-card p-7"
    >
      <div className="flex items-center justify-between mb-9">
        <div
          className={
            "w-10 h-10 rounded-xl flex items-center justify-center " +
            (accent ? "bg-[var(--accent-soft)] text-[var(--accent-deep)]" : "bg-[var(--bg-2)] text-[var(--ink-2)]")
          }
        >
          <Icon size={18} />
        </div>
      </div>
      <h3 className="text-[19px] font-semibold text-[var(--ink)] tracking-tight mb-1.5">{title}</h3>
      <p className="text-[14px] leading-relaxed text-[var(--ink-3)]" style={{ textWrap: "pretty" } as React.CSSProperties}>
        {body}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="relative py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead
          eyebrow={t.features.eyebrow}
          title={
            <>
              {t.features.titleA} <span className="italic text-[var(--ink-3)]">{t.features.titleB}</span>
            </>
          }
          sub={t.features.sub}
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.items.map(([title, body], i) => (
            <BentoCard key={title} Icon={ICONS[i]} title={title} body={body} accent={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
