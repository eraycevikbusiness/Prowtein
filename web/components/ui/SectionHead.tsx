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
      className={"max-w-2xl " + (align === "center" ? "mx-auto text-center" : "")}
    >
      {eyebrow && (
        <div className="tag mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className="font-serif text-[40px] md:text-[56px] leading-[1.08] tracking-tight text-[var(--ink)]"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="mt-4 text-[var(--ink-3)] text-[16.5px] leading-relaxed max-w-xl"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
