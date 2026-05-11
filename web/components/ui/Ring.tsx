"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  goal: number;
  size?: number;
  stroke?: number;
  label?: string;
  unit?: string;
}

export default function Ring({ value, goal, size = 144, stroke = 12, label = "Protein", unit = "g" }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / goal);
  const dash = c * pct;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="#F2EDE4" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E85D4A"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[11px] text-[var(--ink-3)]">{label}</div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="font-serif text-[34px] leading-none text-[var(--ink)]">{value}</span>
          <span className="text-[12px] text-[var(--ink-3)]">
            / {goal}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
