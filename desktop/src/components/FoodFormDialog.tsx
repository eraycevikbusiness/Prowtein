import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import type { Food, FoodInput } from "@/lib/types";
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

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** A `Food` → edit mode · `{ name }` → create prefilled · `null` → blank create. */
  food: Food | { name: string } | null;
  onSaved?: (food: Food | undefined) => void;
}

const BLANK = { name: "", serving: "100 g", kcal: "", protein: "", carbs: "", fat: "" };

function isFood(f: Props["food"]): f is Food {
  return !!f && "id" in f;
}

export function FoodFormDialog({ open, onOpenChange, food, onSaved }: Props) {
  const addFood = useApp((s) => s.addFood);
  const editFood = useApp((s) => s.editFood);
  const [form, setForm] = useState(BLANK);
  const [error, setError] = useState<string | null>(null);
  const editing = isFood(food);

  useEffect(() => {
    if (!open) return;
    if (isFood(food)) {
      setForm({
        name: food.name,
        serving: food.serving,
        kcal: String(food.kcal),
        protein: String(food.protein),
        carbs: String(food.carbs),
        fat: String(food.fat),
      });
    } else {
      setForm({ ...BLANK, name: food?.name ?? "" });
    }
    setError(null);
  }, [open, food]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Give it a name.");
      return;
    }
    const num = (v: string) => {
      const x = Number(v);
      return Number.isFinite(x) && x >= 0 ? x : 0;
    };
    const input: FoodInput = {
      name,
      serving: form.serving.trim() || "100 g",
      kcal: num(form.kcal),
      protein: num(form.protein),
      carbs: num(form.carbs),
      fat: num(form.fat),
    };
    if (editing && isFood(food)) {
      await editFood(food.id, input);
      onOpenChange(false);
    } else {
      const created = await addFood(input);
      onOpenChange(false);
      onSaved?.(created);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit food" : "New food"}</DialogTitle>
          <DialogDescription>Macros are per one serving. Once it's here, logging it is two keystrokes.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="f-name">Name</Label>
            <Input id="f-name" value={form.name} onChange={set("name")} placeholder="Greek yogurt, plain" autoFocus />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="f-serving">Serving</Label>
            <Input id="f-serving" value={form.serving} onChange={set("serving")} placeholder="100 g" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumField id="f-kcal" label="Calories" unit="kcal" value={form.kcal} onChange={set("kcal")} />
            <NumField id="f-protein" label="Protein" unit="g" value={form.protein} onChange={set("protein")} />
            <NumField id="f-carbs" label="Carbs" unit="g" value={form.carbs} onChange={set("carbs")} />
            <NumField id="f-fat" label="Fat" unit="g" value={form.fat} onChange={set("fat")} />
          </div>
          {error && <p className="text-[12.5px] text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add food"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function NumField({
  id,
  label,
  unit,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value}
          onChange={onChange}
          placeholder="0"
          className="pr-12"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-3">{unit}</span>
      </div>
    </div>
  );
}
