import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { shortcutLabel } from "@/lib/platform";
import { formatKcal, round1, sumTotals } from "@/lib/format";
import { Button } from "./ui/button";
import { MealRow } from "./MealRow";
import { Ring } from "./Ring";

const MACRO = { protein: "#E85D4A", carbs: "#F5B07B", fat: "#B9C9A7" };

export function TodayView() {
  const { t } = useT();
  const entries = useApp((s) => s.entries);
  const goals = useApp((s) => s.goals);
  const setCommandOpen = useApp((s) => s.setCommandOpen);
  const totals = useMemo(() => sumTotals(entries), [entries]);

  // macro bar split by calorie contribution (4/4/9 kcal per gram)
  const pCal = totals.protein * 4;
  const cCal = totals.carbs * 4;
  const fCal = totals.fat * 9;
  const calSum = pCal + cCal + fCal;
  const w = (n: number) => (calSum > 0 ? `${(n / calSum) * 100}%` : "0%");

  return (
    <div className="max-w-[940px] mx-auto px-7 py-7 flex flex-col gap-5">
      {/* Overview card */}
      <div className="rounded-2xl bg-white border border-border p-6 flex flex-col sm:flex-row items-center gap-7">
        <Ring value={totals.protein} goal={goals.protein} label={t.macros.protein} unit="g" />
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[12.5px] text-ink-3">{t.macros.calories}</span>
            <span className="text-[12px] text-ink-3">
              {t.common.of} {formatKcal(goals.calories)} {t.units.kcal}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-[40px] leading-none">{formatKcal(totals.kcal)}</span>
            <span className="text-[14px] text-ink-3">{t.units.kcal}</span>
          </div>
          <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-[var(--bg-2)]">
            <div style={{ width: w(pCal), background: MACRO.protein }} />
            <div style={{ width: w(cCal), background: MACRO.carbs }} />
            <div style={{ width: w(fCal), background: MACRO.fat }} />
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[12px] text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="macro-dot" style={{ background: MACRO.protein }} />
              {t.macros.protein} <span className="text-ink-3">{round1(totals.protein)} {t.units.g}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="macro-dot" style={{ background: MACRO.carbs }} />
              {t.macros.carbs} <span className="text-ink-3">{round1(totals.carbs)} {t.units.g}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="macro-dot" style={{ background: MACRO.fat }} />
              {t.macros.fat} <span className="text-ink-3">{round1(totals.fat)} {t.units.g}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-[15px] font-semibold tracking-tight">{t.today.todaysMeals}</h3>
          <span className="text-[11.5px] text-ink-3">
            {entries.length} {entries.length === 1 ? t.common.meal : t.common.meals}
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border-2)] bg-white/40 dot-grid px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-coral-soft text-coral-deep mb-3">
              <Sparkles size={18} />
            </div>
            <p className="text-[15px] text-ink-2">{t.today.nothingLogged}</p>
            <p className="text-[13px] text-ink-3 mt-1">
              {t.today.quickAddHintPre && <>{t.today.quickAddHintPre} </>}
              <span className="chip">{shortcutLabel("K")}</span>
              {t.today.quickAddHintPost}
            </p>
            <Button size="sm" className="mt-4" onClick={() => setCommandOpen(true)}>
              {t.today.addAMeal}
            </Button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
            className="space-y-2"
          >
            {entries.map((e) => (
              <MealRow key={e.id} entry={e} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
