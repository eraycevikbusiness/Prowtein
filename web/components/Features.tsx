"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Layers, BookOpen, Activity, Zap, Lock, FileDown } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";

const ICONS = [Layers, BookOpen, Activity, Zap, Lock, FileDown];

function BentoCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
      className="bento-card p-6"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="w-9 h-9 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-lime-400">
          <Icon size={16} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          {("0" + ((title.length % 9) + 1)).slice(-2)}
        </span>
      </div>
      <h3 className="text-[17px] font-medium text-white tracking-tight mb-2">{title}</h3>
      <p className="text-[13.5px] leading-relaxed text-zinc-500">{body}</p>
    </motion.div>
  );
}

export default function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead
          eyebrow={t.features.eyebrow}
          title={<>{t.features.titleA} <span className="text-zinc-500">{t.features.titleB}</span></>}
          sub={t.features.sub}
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {t.features.items.map(([title, body], i) => (
            <BentoCard key={title} icon={ICONS[i]} title={title} body={body} />
          ))}
        </div>
      </div>
    </section>
  );
}
