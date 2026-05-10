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

export default function Ring({ value, goal, size = 160, stroke = 10, label = "Protein", unit = "g" }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / goal);
  const dash = c * pct;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="ring-bg" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#84CC16"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.3, 1] }}
          style={{ filter: "drop-shadow(0 0 6px rgba(132,204,22,0.45))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{label}</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-mono text-3xl text-white tabular-nums">{value}</span>
          <span className="font-mono text-sm text-zinc-500">/ {goal}{unit}</span>
        </div>
      </div>
    </div>
  );
}
