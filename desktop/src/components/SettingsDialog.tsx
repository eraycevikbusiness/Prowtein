import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
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
          <DialogTitle>Daily goals</DialogTitle>
          <DialogDescription>
            Your targets. The ring and the week chart fill against your protein goal.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="protein-goal">Protein</Label>
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
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">g</span>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="calorie-goal">Calories</Label>
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
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">kcal</span>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-ink-3 leading-relaxed">
            Your data lives in a single SQLite file on this machine — no account, no cloud, no telemetry.
          </p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save goals</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
