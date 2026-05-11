import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import { LANGS, useT } from "@/lib/i18n";
import { calculateGoals } from "@/lib/calculator";
import type { BodyStats } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";

const DEFAULT_STATS: BodyStats = {
  weightKg: 75,
  heightCm: 175,
  age: 25,
  gender: "male",
  activity: "moderate",
  goal: "maintain",
};

const ACTIVITY_KEYS: BodyStats["activity"][] = ["sedentary", "light", "moderate", "active", "veryActive"];

export function WelcomeDialog() {
  const { t, lang, setLang } = useT();
  const showWelcome = useApp((s) => s.showWelcome);
  const setUserName = useApp((s) => s.setUserName);
  const dismissWelcome = useApp((s) => s.dismissWelcome);
  const setBodyStats = useApp((s) => s.setBodyStats);
  const saveGoals = useApp((s) => s.saveGoals);

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [stats, setStats] = useState<BodyStats>(DEFAULT_STATS);
  const [proteinOverride, setProteinOverride] = useState<string | null>(null);
  const [caloriesOverride, setCaloriesOverride] = useState<string | null>(null);

  const patch = <K extends keyof BodyStats>(key: K, val: BodyStats[K]) => {
    setStats((prev) => ({ ...prev, [key]: val }));
    // clear overrides so calculated values take over again
    setProteinOverride(null);
    setCaloriesOverride(null);
  };

  const suggested = useMemo(() => calculateGoals(stats), [stats]);
  const proteinVal = proteinOverride ?? String(suggested.protein);
  const caloriesVal = caloriesOverride ?? String(suggested.calories);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSkipStats = () => {
    void setUserName(name);
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    const protein = Math.max(1, Math.round(Number(proteinVal) || suggested.protein));
    const calories = Math.max(1, Math.round(Number(caloriesVal) || suggested.calories));
    await Promise.all([
      setUserName(name),
      setBodyStats(stats),
      saveGoals({ protein, calories }),
    ]);
  };

  return (
    <Dialog
      open={showWelcome}
      onOpenChange={() => {
        /* intentionally non-closable */
      }}
    >
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-sm"
      >
        {/* step indicator */}
        <div className="flex gap-1.5 mb-1">
          <div className={cn("h-1 flex-1 rounded-full", step >= 1 ? "bg-coral" : "bg-[var(--bg-2)]")} />
          <div className={cn("h-1 flex-1 rounded-full", step >= 2 ? "bg-coral" : "bg-[var(--bg-2)]")} />
        </div>

        {step === 1 ? (
          <>
            <DialogHeader>
              <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center text-white mb-3">
                <span className="font-serif text-[22px] leading-none">P</span>
              </div>
              <DialogTitle className="text-[22px] font-serif font-normal leading-snug">
                {t.welcome.title}
              </DialogTitle>
              <DialogDescription className="text-[14px] leading-relaxed">
                {t.welcome.sub}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleContinue} className="mt-1 grid gap-4">
              {/* Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="welcome-name">{t.welcome.label}</Label>
                <Input
                  id="welcome-name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.welcome.placeholder}
                  maxLength={40}
                />
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
                        lang === l.code
                          ? "bg-white text-foreground shadow-sm"
                          : "text-ink-3 hover:text-ink-2",
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="ghost" onClick={dismissWelcome} className="text-ink-3">
                  {t.welcome.skip}
                </Button>
                <Button type="submit">{t.welcome.cta}</Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-[18px] font-serif font-normal leading-snug">
                {t.welcome.statsTitle}
              </DialogTitle>
              <DialogDescription className="text-[13px] leading-relaxed">
                {t.welcome.statsSub}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleStart} className="mt-1 grid gap-3">
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
                  {ACTIVITY_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t.bodyStats[key]}
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

              {/* Live-calculated goals (editable) */}
              <div className="rounded-xl bg-[var(--bg-2)] p-3 grid gap-2">
                <span className="text-[11.5px] text-ink-3 font-medium">{t.welcome.suggestedGoals}</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-1">
                    <Label className="text-[12px]">{t.macros.protein}</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        min={1}
                        value={proteinVal}
                        onChange={(e) => setProteinOverride(e.target.value)}
                        className="pr-7 bg-white"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">{t.units.g}</span>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-[12px]">{t.macros.calories}</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        min={1}
                        value={caloriesVal}
                        onChange={(e) => setCaloriesOverride(e.target.value)}
                        className="pr-12 bg-white"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">{t.units.kcal}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="ghost" onClick={handleSkipStats} className="text-ink-3">
                  {t.welcome.skipStats}
                </Button>
                <Button type="submit">{t.welcome.calculateBtn}</Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
