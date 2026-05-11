import type { DayTotals, Entry, MealKind } from "./types";

// ── Dates ──────────────────────────────────────────────────────────────────

/** Local date as YYYY-MM-DD (no UTC drift). */
export function todayISO(): string {
  return toISODate(new Date());
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(iso: string, n: number): string {
  const d = fromISODate(iso);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function formatDateLong(iso: string, locale?: string): string {
  return fromISODate(iso).toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateFull(iso: string, locale?: string): string {
  return fromISODate(iso).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Single-letter weekday for the mini week chart (locale "narrow"). */
export function dayLetter(iso: string, locale?: string): string {
  return fromISODate(iso).toLocaleDateString(locale, { weekday: "narrow" });
}

/** The Monday-anchored 7-day window that contains `iso`. */
export function weekDays(iso: string): string[] {
  const d = fromISODate(iso);
  const dow = (d.getDay() + 6) % 7; // 0 = Monday
  const monday = addDays(iso, -dow);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

// ── Meal kinds (derived from the time the entry was logged) ─────────────────

export function mealKindFromTime(loggedAt: string): MealKind {
  // loggedAt looks like "2026-05-11 08:42:13" (local)
  const hour = Number(loggedAt.slice(11, 13)) || 12;
  if (hour < 11) return "breakfast";
  if (hour < 15) return "lunch";
  if (hour < 18) return "snack";
  return "dinner";
}

export function localTimestamp(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${toISODate(d)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export function timeFromTimestamp(ts: string): string {
  return ts.slice(11, 16); // "HH:MM"
}

// ── Macro math ─────────────────────────────────────────────────────────────

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Macros for a single entry, scaled by its servings multiplier. */
export function entryTotals(e: Pick<Entry, "kcal" | "protein" | "carbs" | "fat" | "servings">): DayTotals {
  return {
    kcal: e.kcal * e.servings,
    protein: e.protein * e.servings,
    carbs: e.carbs * e.servings,
    fat: e.fat * e.servings,
  };
}

export function sumTotals(entries: Entry[]): DayTotals {
  return entries.reduce<DayTotals>(
    (acc, e) => {
      const t = entryTotals(e);
      acc.kcal += t.kcal;
      acc.protein += t.protein;
      acc.carbs += t.carbs;
      acc.fat += t.fat;
      return acc;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

export function formatKcal(n: number): string {
  return Math.round(n).toLocaleString();
}

/** Drop a trailing ".0" so "1.5" stays but "2.0" becomes "2". */
export function trimNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(round1(n));
}

// ── Fuzzy search (subsequence match with light scoring) ─────────────────────

/** Returns a score (higher = better) or null if `query` isn't a subsequence of `target`. */
export function fuzzyScore(query: string, target: string): number | null {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const t = target.toLowerCase();
  let score = 0;
  let ti = 0;
  let streak = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    const found = t.indexOf(ch, ti);
    if (found === -1) return null;
    // bonuses: word start, contiguous run, earlier position
    const prev = found > 0 ? t[found - 1] : " ";
    if (prev === " " || prev === "," || prev === "(" || prev === "-") score += 8;
    if (found === ti) {
      streak += 1;
      score += 4 + streak;
    } else {
      streak = 0;
    }
    score += Math.max(0, 6 - found * 0.15);
    ti = found + 1;
  }
  // shorter targets that fully match rank a touch higher
  score += Math.max(0, 4 - (t.length - q.length) * 0.05);
  if (t.startsWith(q)) score += 12;
  return score;
}
