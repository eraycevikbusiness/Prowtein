import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { LANGS, useT } from "@/lib/i18n";
import { calculateGoals } from "@/lib/calculator";
import type { BodyStats } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ACTIVITIES: { key: BodyStats["activity"]; labelKey: keyof ReturnType<typeof useT>["t"]["bodyStats"] }[] = [
  { key: "sedentary", labelKey: "sedentary" },
  { key: "light", labelKey: "light" },
  { key: "moderate", labelKey: "moderate" },
  { key: "active", labelKey: "active" },
  { key: "veryActive", labelKey: "veryActive" },
];

const DEFAULT_STATS: BodyStats = {
  weightKg: 75,
  heightCm: 175,
  age: 25,
  gender: "male",
  activity: "moderate",
  goal: "maintain",
};

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, lang, setLang } = useT();
  const goals = useApp((s) => s.goals);
  const saveGoals = useApp((s) => s.saveGoals);
  const storeUserName = useApp((s) => s.userName);
  const setUserName = useApp((s) => s.setUserName);
  const storeBodyStats = useApp((s) => s.bodyStats);
  const setBodyStats = useApp((s) => s.setBodyStats);

  const [protein, setProtein] = useState(String(goals.protein));
  const [calories, setCalories] = useState(String(goals.calories));
  const [nameVal, setNameVal] = useState(storeUserName);
  const [stats, setStats] = useState<BodyStats>(storeBodyStats ?? DEFAULT_STATS);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    if (open) {
      setProtein(String(goals.protein));
      setCalories(String(goals.calories));
      setNameVal(storeUserName);
      setStats(storeBodyStats ?? DEFAULT_STATS);
      setCalculated(false);
    }
  }, [open, goals, storeUserName, storeBodyStats]);

  const patch = <K extends keyof BodyStats>(key: K, val: BodyStats[K]) =>
    setStats((prev) => ({ ...prev, [key]: val }));

  const handleRecalculate = () => {
    const g = calculateGoals(stats);
    setProtein(String(g.protein));
    setCalories(String(g.calories));
    setCalculated(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = Math.max(1, Math.round(Number(protein) || goals.protein));
    const c = Math.max(1, Math.round(Number(calories) || goals.calories));
    await Promise.all([
      saveGoals({ protein: p, calories: c }),
      setUserName(nameVal),
      setBodyStats(stats),
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.settings.title}</DialogTitle>
          <DialogDescription>{t.settings.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          {/* Name */}
          <div className="grid gap-1.5">
            <Label htmlFor="settings-name">{t.settings.name}</Label>
            <Input
              id="settings-name"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              placeholder={t.settings.namePlaceholder}
              maxLength={40}
            />
          </div>

          <div className="h-px bg-border" />

          {/* Body stats */}
          <div className="grid gap-3">
            {/* Weight / Height / Age */}
            <div className="grid grid-cols-3 gap-2">
              <div className="grid gap-1">
                <Label className="text-[12px]">{t.bodyStats.weight} (kg)</Label>
                <Input
                  type="number"
                  min={30}
                  max={300}
                  step="0.1"
                  value={stats.weightKg}
                  onChange={(e) => patch("weightKg", Number(e.target.value))}
                  className="text-center"
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-[12px]">{t.bodyStats.height} (cm)</Label>
                <Input
                  type="number"
                  min={100}
                  max={250}
                  value={stats.heightCm}
                  onChange={(e) => patch("heightCm", Number(e.target.value))}
                  className="text-center"
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-[12px]">{t.bodyStats.age}</Label>
                <Input
                  type="number"
                  min={10}
                  max={120}
                  value={stats.age}
                  onChange={(e) => patch("age", Number(e.target.value))}
                  className="text-center"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="grid gap-1">
              <Label className="text-[12px]">{t.bodyStats.gender}</Label>
              <div className="flex gap-1.5 rounded-lg bg-[var(--bg-2)] p-1">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => patch("gender", g)}
                    className={cn(
                      "flex-1 h-8 rounded-md text-[12.5px] font-medium transition-colors",
                      stats.gender === g
                        ? "bg-white text-foreground shadow-sm"
                        : "text-ink-3 hover:text-ink-2",
                    )}
                  >
                    {t.bodyStats[g]}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="grid gap-1">
              <Label className="text-[12px]">{t.bodyStats.activity}</Label>
              <select
                value={stats.activity}
                onChange={(e) => patch("activity", e.target.value as BodyStats["activity"])}
                className="h-9 rounded-md border border-input bg-background px-3 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {ACTIVITIES.map(({ key, labelKey }) => (
                  <option key={key} value={key}>
                    {t.bodyStats[labelKey]}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal */}
            <div className="grid gap-1">
              <Label className="text-[12px]">{t.bodyStats.goal}</Label>
              <div className="flex gap-1.5 rounded-lg bg-[var(--bg-2)] p-1">
                {(["lose", "maintain", "gain"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => patch("goal", g)}
                    className={cn(
                      "flex-1 h-8 rounded-md text-[12px] font-medium transition-colors",
                      stats.goal === g
                        ? "bg-white text-foreground shadow-sm"
                        : "text-ink-3 hover:text-ink-2",
                    )}
                  >
                    {t.bodyStats[g]}
                  </button>
                ))}
              </div>
            </div>

            <Button type="button" variant="secondary" onClick={handleRecalculate} className="w-full">
              {t.bodyStats.recalculate}
            </Button>
            {calculated && (
              <p className="text-[11.5px] text-ink-3 text-center -mt-1">{t.bodyStats.calculated}</p>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Goals */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="protein-goal">{t.macros.protein}</Label>
              <div className="relative">
                <Input
                  id="protein-goal"
                  type="number"
                  min={1}
                  step="any"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="pr-7"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">{t.units.g}</span>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="calorie-goal">{t.macros.calories}</Label>
              <div className="relative">
                <Input
                  id="calorie-goal"
                  type="number"
                  min={1}
                  step="any"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">{t.units.kcal}</span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="grid gap-1.5">
            <Label>{t.settings.language}</Label>
            <div className="flex gap-1.5 rounded-lg bg-[var(--bg-2)] p-1">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "flex-1 h-8 rounded-md text-[12.5px] font-medium transition-colors",
                    lang === l.code ? "bg-white text-foreground shadow-sm" : "text-ink-3 hover:text-ink-2",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[12px] text-ink-3 leading-relaxed">{t.settings.localNote}</p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{t.settings.save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
