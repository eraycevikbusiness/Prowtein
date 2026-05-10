"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
}

export default function SectionHead({ eyebrow, title, sub, align = "left" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#1F1F1F] bg-[#0A0A0A] mb-5 ${align === "center" ? "mx-auto" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(132,204,22,0.8)]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-400">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white" style={{ textWrap: "balance" } as React.CSSProperties}>
        {title}
      </h2>
      {sub && <p className="mt-4 text-zinc-500 text-base md:text-[17px] leading-relaxed max-w-xl">{sub}</p>}
    </motion.div>
  );
}
