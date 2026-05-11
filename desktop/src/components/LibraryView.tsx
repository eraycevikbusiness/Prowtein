import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { formatKcal, fuzzyScore, round1 } from "@/lib/format";
import type { Food } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FoodFormDialog } from "./FoodFormDialog";

const DOTS = ["#E85D4A", "#F5B07B", "#B9C9A7", "#8B6F8F", "#F5DC8E"];

export function LibraryView() {
  const { t } = useT();
  const foods = useApp((s) => s.foods);
  const removeFood = useApp((s) => s.removeFood);
  const logFood = useApp((s) => s.logFood);
  const setView = useApp((s) => s.setView);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Food | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const list = useMemo(() => {
    const q = query.trim();
    if (!q) return foods;
    return foods
      .map((f) => ({ f, s: fuzzyScore(q, f.name) }))
      .filter((x): x is { f: Food; s: number } => x.s !== null)
      .sort((a, b) => b.s - a.s || b.f.uses - a.f.uses)
      .map((x) => x.f);
  }, [foods, query]);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (f: Food) => {
    setEditing(f);
    setFormOpen(true);
  };

  return (
    <div className="max-w-[940px] mx-auto px-7 py-7 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.library.searchPlaceholder}
            className="pl-9"
          />
        </div>
        <span className="text-[12px] text-ink-3 ml-auto">
          {list.length} {t.common.of} {foods.length}
        </span>
        <Button size="sm" onClick={openNew}>
          <Plus size={14} /> {t.library.newFood}
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border-2)] bg-white/40 dot-grid px-6 py-12 text-center text-ink-3">
          {foods.length === 0 ? t.library.empty : `${t.library.noMatch} “${query}”.`}
          <div className="mt-3">
            <Button size="sm" variant="secondary" onClick={openNew}>
              <Plus size={14} /> {t.library.addAFood}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {list.map((f, i) => (
            <div
              key={f.id}
              className="group rounded-xl bg-white border border-border hover:border-[var(--border-2)] transition p-4"
            >
              <div className="flex items-start gap-2.5">
                <span className="macro-dot mt-1.5" style={{ background: DOTS[i % DOTS.length] }} />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium truncate">{f.name}</div>
                  <div className="text-[11.5px] text-ink-3 mt-0.5">
                    {f.serving}
                    {f.uses > 0 ? ` · ${f.uses}× ${t.library.usageLabel}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-ink-3 hover:text-foreground"
                    onClick={() => openEdit(f)}
                    aria-label={t.library.editFood}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-ink-3 hover:text-destructive hover:bg-coral-soft"
                    onClick={() => setConfirmId(confirmId === f.id ? null : f.id)}
                    aria-label={t.library.deleteFood}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[12px] text-ink-2">
                  <span className="text-coral-deep font-medium">
                    {formatKcal(f.kcal)} {t.units.kcal}
                  </span>
                  <span>P {round1(f.protein)}</span>
                  <span>C {round1(f.carbs)}</span>
                  <span>F {round1(f.fat)}</span>
                </div>
                <Button
                  variant="subtle"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={async () => {
                    await logFood(f);
                    setView("today");
                  }}
                >
                  <Plus size={13} /> {t.library.log}
                </Button>
              </div>

              {confirmId === f.id && (
                <div className="mt-3 rounded-lg bg-coral-soft px-3 py-2 flex items-center justify-between gap-2 text-[12.5px]">
                  <span className="text-coral-deep">{t.library.deleteConfirm}</span>
                  <span className="flex gap-1.5 shrink-0">
                    <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setConfirmId(null)}>
                      {t.common.cancel}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-7 px-2.5"
                      onClick={async () => {
                        await removeFood(f.id);
                        setConfirmId(null);
                      }}
                    >
                      {t.common.delete}
                    </Button>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <FoodFormDialog open={formOpen} onOpenChange={setFormOpen} food={editing} />
    </div>
  );
}
