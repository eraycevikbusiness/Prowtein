import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Apple, Coffee, Drumstick, Fish, Trash2 } from "lucide-react";
import { useApp } from "@/lib/store";
import {
  entryTotals,
  formatKcal,
  MEAL_KIND_LABEL,
  mealKindFromTime,
  round1,
  timeFromTimestamp,
  trimNum,
} from "@/lib/format";
import type { Entry, MealKind } from "@/lib/types";
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

const KIND_ICON: Record<MealKind, typeof Coffee> = {
  breakfast: Coffee,
  lunch: Drumstick,
  snack: Apple,
  dinner: Fish,
};

export function MealRow({ entry }: { entry: Entry }) {
  const changeServings = useApp((s) => s.changeServings);
  const removeEntry = useApp((s) => s.removeEntry);
  const [editOpen, setEditOpen] = useState(false);
  const [servings, setServings] = useState(trimNum(entry.servings));

  useEffect(() => {
    if (editOpen) setServings(trimNum(entry.servings));
  }, [editOpen, entry.servings]);

  const kind = mealKindFromTime(entry.logged_at);
  const Icon = KIND_ICON[kind];
  const t = entryTotals(entry);

  const n = Math.max(0.05, Number(servings) || 0);
  const preview = { kcal: entry.kcal * n, p: entry.protein * n, c: entry.carbs * n, f: entry.fat * n };

  const bump = (delta: number) => setServings(trimNum(Math.max(0.05, n + delta)));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await changeServings(entry.id, n);
    setEditOpen(false);
  };

  return (
    <>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
        onClick={() => setEditOpen(true)}
        className="group flex items-center gap-4 p-3 rounded-xl bg-white border border-border hover:border-[var(--border-2)] hover:shadow-[0_8px_24px_-16px_rgba(26,24,20,0.18)] transition cursor-pointer"
      >
        <div className="w-10 h-10 rounded-lg bg-[var(--bg-2)] flex items-center justify-center text-ink-2 shrink-0">
          <Icon size={17} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium truncate">{entry.name}</span>
            <span className="text-[10.5px] uppercase tracking-wide text-ink-3 shrink-0">{MEAL_KIND_LABEL[kind]}</span>
          </div>
          <div className="text-[12px] text-ink-3 truncate">
            {trimNum(entry.servings)} × {entry.serving} · {timeFromTimestamp(entry.logged_at)}
          </div>
        </div>
        <div className="text-right whitespace-nowrap">
          <div className="text-[14px] font-medium">
            {formatKcal(t.kcal)} <span className="text-ink-3 font-normal text-[12px]">kcal</span>
          </div>
          <div className="text-[12px] text-coral">{round1(t.protein)}g protein</div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="opacity-0 group-hover:opacity-100 text-ink-3 hover:text-destructive hover:bg-coral-soft shrink-0"
          onClick={(ev) => {
            ev.stopPropagation();
            void removeEntry(entry.id);
          }}
          aria-label="Remove entry"
        >
          <Trash2 size={14} />
        </Button>
      </motion.div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{entry.name}</DialogTitle>
            <DialogDescription>
              Per {entry.serving}: {formatKcal(entry.kcal)} kcal · {round1(entry.protein)}g P · {round1(entry.carbs)}g C ·{" "}
              {round1(entry.fat)}g F
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="servings">Servings</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="secondary" size="icon" onClick={() => bump(-0.5)} aria-label="Less">
                  −
                </Button>
                <div className="relative flex-1">
                  <Input
                    id="servings"
                    type="number"
                    min={0.05}
                    step="any"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="pr-20 text-center"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-ink-3 max-w-[70px] truncate">
                    × {entry.serving}
                  </span>
                </div>
                <Button type="button" variant="secondary" size="icon" onClick={() => bump(0.5)} aria-label="More">
                  +
                </Button>
              </div>
            </div>
            <div className="rounded-xl bg-[var(--bg-2)] px-4 py-3 flex items-center justify-between text-[13px]">
              <span className="font-medium">{formatKcal(preview.kcal)} kcal</span>
              <span className="text-ink-2">
                {round1(preview.p)}g P · {round1(preview.c)}g C · {round1(preview.f)}g F
              </span>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:bg-coral-soft"
                onClick={() => {
                  void removeEntry(entry.id);
                  setEditOpen(false);
                }}
              >
                <Trash2 size={14} /> Remove
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
