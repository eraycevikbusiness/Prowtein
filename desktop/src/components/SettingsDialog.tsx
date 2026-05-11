import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { LANGS, useT } from "@/lib/i18n";
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

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, lang, setLang } = useT();
  const goals = useApp((s) => s.goals);
  const saveGoals = useApp((s) => s.saveGoals);
  const [protein, setProtein] = useState(String(goals.protein));
  const [calories, setCalories] = useState(String(goals.calories));

  useEffect(() => {
    if (open) {
      setProtein(String(goals.protein));
      setCalories(String(goals.calories));
    }
  }, [open, goals]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = Math.max(1, Math.round(Number(protein) || goals.protein));
    const c = Math.max(1, Math.round(Number(calories) || goals.calories));
    await saveGoals({ protein: p, calories: c });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.settings.title}</DialogTitle>
          <DialogDescription>{t.settings.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
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
