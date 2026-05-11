import { motion } from "framer-motion";

interface RingProps {
  value: number;
  goal: number;
  size?: number;
  stroke?: number;
  label?: string;
  unit?: string;
}

/** Animated progress ring — coral fill on a warm track (matches the marketing site). */
export function Ring({ value, goal, size = 132, stroke = 11, label = "Protein", unit = "g" }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = goal > 0 ? Math.min(1, value / goal) : 0;
  const over = goal > 0 && value > goal;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="#F2EDE4" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={over ? "#C8442F" : "#E85D4A"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - c * pct }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[11px] text-ink-3">{label}</div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="font-serif text-[34px] leading-none text-foreground">{Math.round(value)}</span>
          <span className="text-[12px] text-ink-3">
            / {Math.round(goal)}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
