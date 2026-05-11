import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import {
  entryTotals,
  formatDateFull,
  formatKcal,
  MEAL_KIND_LABEL,
  mealKindFromTime,
  round1,
  sumTotals,
  timeFromTimestamp,
  trimNum,
} from "./format";
import type { Entry, Goals } from "./types";

/** A day's log as a Markdown document (great for pasting into notes). */
export function dayToMarkdown(date: string, entries: Entry[], goals: Goals): string {
  const t = sumTotals(entries);
  const out: string[] = [];
  out.push(`# Prowtein — ${formatDateFull(date)}`, "");
  out.push(`**Calories:** ${formatKcal(t.kcal)} / ${formatKcal(goals.calories)} kcal  `);
  out.push(
    `**Protein:** ${round1(t.protein)} / ${goals.protein} g · Carbs: ${round1(t.carbs)} g · Fat: ${round1(t.fat)} g`,
    "",
  );
  if (entries.length === 0) {
    out.push("_No meals logged._");
  } else {
    out.push("| Time | Meal | Food | Servings | kcal | Protein |");
    out.push("|---|---|---|---:|---:|---:|");
    for (const e of entries) {
      const et = entryTotals(e);
      out.push(
        `| ${timeFromTimestamp(e.logged_at)} | ${MEAL_KIND_LABEL[mealKindFromTime(e.logged_at)]} | ${e.name} | ${trimNum(
          e.servings,
        )} × ${e.serving} | ${formatKcal(et.kcal)} | ${round1(et.protein)} g |`,
      );
    }
  }
  out.push("", "---", "_Exported from Prowtein_");
  return out.join("\n");
}

/** A day's log as CSV (for spreadsheets). */
export function dayToCSV(date: string, entries: Entry[]): string {
  const esc = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
  const rows: string[] = [
    "date,time,meal,food,servings,serving_label,kcal,protein_g,carbs_g,fat_g",
  ];
  for (const e of entries) {
    const et = entryTotals(e);
    rows.push(
      [
        date,
        timeFromTimestamp(e.logged_at),
        MEAL_KIND_LABEL[mealKindFromTime(e.logged_at)],
        esc(e.name),
        trimNum(e.servings),
        esc(e.serving),
        Math.round(et.kcal),
        round1(et.protein),
        round1(et.carbs),
        round1(et.fat),
      ].join(","),
    );
  }
  return rows.join("\n");
}

export async function copyToClipboard(text: string): Promise<void> {
  await writeText(text);
}
