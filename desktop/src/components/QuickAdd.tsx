import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Plus, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatKcal, fuzzyScore, round1 } from "@/lib/format";
import type { Food } from "@/lib/types";
import { FoodFormDialog } from "./FoodFormDialog";

const OVERLAY =
  "fixed inset-0 z-50 bg-[#1A1814]/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";
const CONTENT =
  "fixed left-1/2 top-[16%] z-50 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(26,24,20,0.4)] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95";

export function QuickAdd() {
  const open = useApp((s) => s.commandOpen);
  const setCommandOpen = useApp((s) => s.setCommandOpen);
  const foods = useApp((s) => s.foods);
  const logFood = useApp((s) => s.logFood);
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [pendingName, setPendingName] = useState("");

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const results = useMemo<Food[]>(() => {
    const q = query.trim();
    if (!q) return foods.slice(0, 8); // already sorted: most-used first
    return foods
      .map((f) => ({ f, s: fuzzyScore(q, f.name) }))
      .filter((x): x is { f: Food; s: number } => x.s !== null)
      .sort((a, b) => b.s - a.s || b.f.uses - a.f.uses)
      .slice(0, 20)
      .map((x) => x.f);
  }, [foods, query]);

  const trimmed = query.trim();
  const exact = trimmed.length > 0 && foods.some((f) => f.name.toLowerCase() === trimmed.toLowerCase());

  const pick = async (food: Food) => {
    setCommandOpen(false);
    await logFood(food);
  };
  const createNew = () => {
    setPendingName(trimmed);
    setCommandOpen(false);
    setNewOpen(true);
  };

  return (
    <>
      <DialogPrimitive.Root open={open} onOpenChange={setCommandOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className={OVERLAY} />
          <DialogPrimitive.Content className={CONTENT} onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogPrimitive.Title className="sr-only">Quick add a food</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search your food library and log a meal to the selected day.
            </DialogPrimitive.Description>
            <Command shouldFilter={false} loop className="w-full">
              <div className="flex items-center gap-2.5 px-4 h-12 border-b border-border">
                <Search size={15} className="text-ink-3 shrink-0" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  autoFocus
                  placeholder="Search foods…  (then ↵ to log)"
                  className="flex-1 bg-transparent text-[14.5px] text-foreground placeholder:text-ink-4 outline-none"
                />
                <span className="chip">esc</span>
              </div>

              <Command.List className="max-h-[340px] overflow-y-auto p-1.5">
                {results.length === 0 && !trimmed && (
                  <div className="px-3 py-6 text-center text-[13px] text-ink-3">
                    Your library is empty — create your first food below.
                  </div>
                )}
                {results.map((f) => (
                  <Command.Item
                    key={f.id}
                    value={`food-${f.id}`}
                    onSelect={() => void pick(f)}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg cursor-pointer data-[selected=true]:bg-accent"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                    <span className="text-[13.5px] text-foreground truncate flex-1">{f.name}</span>
                    <span className="text-[11.5px] text-ink-3 shrink-0">
                      {round1(f.protein)}g P · {formatKcal(f.kcal)} kcal · {f.serving}
                    </span>
                  </Command.Item>
                ))}
                {trimmed && !exact && (
                  <Command.Item
                    value="__create__"
                    onSelect={createNew}
                    className="flex items-center gap-3 px-2.5 py-2 mt-1.5 pt-2.5 rounded-lg cursor-pointer border-t border-border data-[selected=true]:bg-accent"
                  >
                    <Plus size={14} className="text-ink-3 shrink-0" />
                    <span className="text-[13.5px] text-ink-2">
                      Create <span className="font-medium text-foreground">&ldquo;{trimmed}&rdquo;</span> as a new food
                    </span>
                  </Command.Item>
                )}
              </Command.List>

              <div className="flex items-center gap-3 px-4 py-2 border-t border-border text-[11px] text-ink-3 bg-[var(--surface-2)]">
                <span className="inline-flex items-center gap-1">
                  <span className="chip">↵</span> log
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="chip">↑↓</span> navigate
                </span>
                <span className="ml-auto">
                  {results.length} {results.length === 1 ? "match" : "matches"}
                </span>
              </div>
            </Command>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <FoodFormDialog
        open={newOpen}
        onOpenChange={setNewOpen}
        food={pendingName ? { name: pendingName } : null}
        onSaved={(f) => {
          if (f) void logFood(f);
        }}
      />
    </>
  );
}
