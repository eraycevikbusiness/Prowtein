import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { entryTotals, formatDateFull, formatDateLong, formatKcal, mealKindFromTime, round1, sumTotals, timeFromTimestamp, todayISO, trimNum, weekDays } from "./format";
import type { Entry, Goals, MealKind } from "./types";

// Export documents stay in English (portable + spreadsheet-friendly); only the
// date heading is localized.
const KIND_EN: Record<MealKind, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
};

/** A day's log as a Markdown document (great for pasting into notes). */
export function dayToMarkdown(date: string, entries: Entry[], goals: Goals, locale?: string): string {
  const t = sumTotals(entries);
  const out: string[] = [];
  out.push(`# Prowtein — ${formatDateFull(date, locale)}`, "");
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
        `| ${timeFromTimestamp(e.logged_at)} | ${KIND_EN[mealKindFromTime(e.logged_at)]} | ${e.name} | ${trimNum(
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
  const rows: string[] = ["date,time,meal,food,servings,serving_label,kcal,protein_g,carbs_g,fat_g"];
  for (const e of entries) {
    const et = entryTotals(e);
    rows.push(
      [
        date,
        timeFromTimestamp(e.logged_at),
        KIND_EN[mealKindFromTime(e.logged_at)],
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

export function printDayAsPDF(
  date: string,
  entries: Entry[],
  goals: Goals,
  userName: string,
  locale?: string,
): void {
  const totals = sumTotals(entries);
  const pct = goals.protein > 0 ? Math.min(1, totals.protein / goals.protein) : 0;
  const r = 52;
  const stroke = 10;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (1 - pct);
  const dateStr = formatDateFull(date, locale);
  const greeting = userName ? `${userName}'s log` : "Daily log";

  const mealRows = entries.map((e) => {
    const et = entryTotals(e);
    return `<tr>
      <td>${timeFromTimestamp(e.logged_at)}</td>
      <td class="food-name">${e.name}</td>
      <td class="num">${trimNum(e.servings)} × ${e.serving}</td>
      <td class="num">${Math.round(et.kcal)}</td>
      <td class="num">${round1(et.protein)}</td>
      <td class="num">${round1(et.carbs)}</td>
      <td class="num">${round1(et.fat)}</td>
    </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="${locale?.split("-")[0] ?? "en"}">
<head>
<meta charset="utf-8">
<title>Prowtein — ${dateStr}</title>
<style>
  @page { margin: 2.2cm 2.4cm; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    color: #1a1814;
    background: #fff;
    font-size: 12px;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  /* Header */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1.5px solid #ece6db;
    margin-bottom: 24px;
  }
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .logo-mark {
    width: 30px; height: 30px;
    background: #e85d4a;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-size: 17px;
    font-family: Georgia, serif;
    line-height: 1;
    padding-top: 1px;
  }
  .logo-name { font-size: 15px; font-weight: 600; letter-spacing: -0.02em; }
  .header-right { text-align: right; color: #8a8580; font-size: 11px; line-height: 1.7; }
  .date-str { font-size: 13px; color: #1a1814; font-weight: 500; }
  /* Greeting */
  .greeting { font-size: 22px; font-family: Georgia, serif; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 20px; color: #1a1814; }
  /* Stats row */
  .stats { display: flex; gap: 20px; align-items: center; margin-bottom: 28px; }
  .ring-wrap { flex-shrink: 0; }
  .ring-wrap svg { display: block; }
  .ring-label { font-size: 10px; color: #8a8580; text-align: center; margin-top: 4px; letter-spacing: 0.04em; text-transform: uppercase; }
  .macro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; flex: 1; }
  .macro-item { }
  .macro-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a8580; margin-bottom: 2px; }
  .macro-val { font-size: 20px; font-family: Georgia, serif; font-weight: 400; color: #1a1814; letter-spacing: -0.02em; }
  .macro-val span { font-size: 11px; color: #8a8580; font-family: inherit; }
  .macro-goal { font-size: 10px; color: #b8b2aa; }
  /* Meals table */
  .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.10em; color: #8a8580; margin-bottom: 10px; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
  th { text-align: left; padding: 0 8px 6px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a8580; font-weight: 600; border-bottom: 1px solid #ece6db; }
  th.num, td.num { text-align: right; }
  td { padding: 7px 8px 7px 0; border-bottom: 1px solid #f2ede4; color: #1a1814; vertical-align: top; }
  td.food-name { font-weight: 500; }
  tr:last-child td { border-bottom: none; }
  .totals-row td { border-top: 1.5px solid #ece6db; border-bottom: none; padding-top: 9px; font-weight: 600; color: #1a1814; }
  .empty { color: #8a8580; font-style: italic; padding: 12px 0; }
  /* Footer */
  .footer { margin-top: 32px; padding-top: 14px; border-top: 1px solid #ece6db; display: flex; justify-content: space-between; align-items: center; color: #b8b2aa; font-size: 10px; }
</style>
</head>
<body>
<div class="header">
  <div class="logo">
    <div class="logo-mark">P</div>
    <span class="logo-name">Prowtein</span>
  </div>
  <div class="header-right">
    <div class="date-str">${dateStr}</div>
    <div>Local · No cloud · SQLite</div>
  </div>
</div>

<div class="greeting">${greeting}</div>

<div class="stats">
  <div class="ring-wrap">
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="${r}" fill="none" stroke="#f2ede4" stroke-width="${stroke}" />
      <circle
        cx="60" cy="60" r="${r}"
        fill="none" stroke="#e85d4a" stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-dasharray="${circ.toFixed(2)}"
        stroke-dashoffset="${dashOffset.toFixed(2)}"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="55" text-anchor="middle" font-size="11" fill="#8a8580" font-family="-apple-system, sans-serif">Protein</text>
      <text x="60" y="73" text-anchor="middle" font-size="22" fill="#1a1814" font-family="Georgia, serif">${round1(totals.protein)}</text>
      <text x="60" y="87" text-anchor="middle" font-size="10" fill="#b8b2aa" font-family="-apple-system, sans-serif">/ ${goals.protein} g</text>
    </svg>
  </div>
  <div class="macro-grid">
    <div class="macro-item">
      <div class="macro-label">Calories</div>
      <div class="macro-val">${Math.round(totals.kcal)} <span>kcal</span></div>
      <div class="macro-goal">goal ${goals.calories} kcal</div>
    </div>
    <div class="macro-item">
      <div class="macro-label">Protein</div>
      <div class="macro-val">${round1(totals.protein)} <span>g</span></div>
      <div class="macro-goal">goal ${goals.protein} g</div>
    </div>
    <div class="macro-item">
      <div class="macro-label">Carbs</div>
      <div class="macro-val">${round1(totals.carbs)} <span>g</span></div>
    </div>
    <div class="macro-item">
      <div class="macro-label">Fat</div>
      <div class="macro-val">${round1(totals.fat)} <span>g</span></div>
    </div>
  </div>
</div>

<div class="section-title">Meals</div>
<table>
  <thead>
    <tr>
      <th style="width:48px">Time</th>
      <th>Food</th>
      <th class="num" style="width:110px">Serving</th>
      <th class="num" style="width:52px">kcal</th>
      <th class="num" style="width:52px">P (g)</th>
      <th class="num" style="width:52px">C (g)</th>
      <th class="num" style="width:52px">F (g)</th>
    </tr>
  </thead>
  <tbody>
    ${entries.length === 0
      ? `<tr><td colspan="7" class="empty">No meals logged for this day.</td></tr>`
      : mealRows
    }
    ${entries.length > 0 ? `
    <tr class="totals-row">
      <td></td>
      <td>Total</td>
      <td></td>
      <td class="num">${Math.round(totals.kcal)}</td>
      <td class="num">${round1(totals.protein)}</td>
      <td class="num">${round1(totals.carbs)}</td>
      <td class="num">${round1(totals.fat)}</td>
    </tr>` : ""}
  </tbody>
</table>

<div class="footer">
  <span>Exported from Prowtein · ${new Date().toLocaleDateString()}</span>
  <span>prowtein.app</span>
</div>
</body>
</html>`;

  triggerPrint(html);
}

function triggerPrint(html: string): void {
  const printEl = document.createElement("div");
  printEl.id = "__prowtein_print__";
  printEl.innerHTML = html;
  const styleEl = document.createElement("style");
  styleEl.id = "__prowtein_print_style__";
  styleEl.textContent = `
    @media print {
      body > *:not(#__prowtein_print__) { display: none !important; }
      #__prowtein_print__ { display: block !important; position: fixed; inset: 0; background: white; z-index: 99999; }
    }
    #__prowtein_print__ { display: none; }
  `;
  document.head.appendChild(styleEl);
  document.body.appendChild(printEl);
  window.print();
  document.body.removeChild(printEl);
  document.head.removeChild(styleEl);
}

export function printWeekAsPDF(
  allEntries: Entry[],
  goals: Goals,
  userName: string,
  locale?: string,
): void {
  const days = weekDays(todayISO());
  const monday = days[0]!;
  const sunday = days[6]!;

  const byDay = new Map<string, Entry[]>();
  for (const d of days) byDay.set(d, []);
  for (const e of allEntries) {
    if (byDay.has(e.date)) byDay.get(e.date)!.push(e);
  }

  const greeting = userName ? `${userName}'s week` : "Weekly log";
  const weekLabel = `${formatDateLong(monday, locale)} – ${formatDateLong(sunday, locale)}`;

  const SHARED_CSS = `
    @page { margin: 2.2cm 2.4cm; size: A4; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1a1814; background: #fff; font-size: 12px; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .header { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 20px; border-bottom: 1.5px solid #ece6db; margin-bottom: 24px; }
    .logo { display: inline-flex; align-items: center; gap: 8px; }
    .logo-mark { width: 30px; height: 30px; background: #e85d4a; border-radius: 7px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 17px; font-family: Georgia, serif; line-height: 1; padding-top: 1px; }
    .logo-name { font-size: 15px; font-weight: 600; letter-spacing: -0.02em; }
    .header-right { text-align: right; color: #8a8580; font-size: 11px; line-height: 1.7; }
    .date-str { font-size: 13px; color: #1a1814; font-weight: 500; }
    .greeting { font-size: 22px; font-family: Georgia, serif; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 6px; color: #1a1814; }
    .week-range { font-size: 13px; color: #8a8580; margin-bottom: 24px; }
    .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.10em; color: #8a8580; margin-bottom: 10px; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
    th { text-align: left; padding: 0 8px 6px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a8580; font-weight: 600; border-bottom: 1px solid #ece6db; }
    th.num, td.num { text-align: right; }
    td { padding: 7px 8px 7px 0; border-bottom: 1px solid #f2ede4; color: #1a1814; vertical-align: middle; }
    td.food-name { font-weight: 500; }
    tr:last-child td { border-bottom: none; }
    .totals-row td { border-top: 1.5px solid #ece6db; border-bottom: none; padding-top: 9px; font-weight: 600; }
    .day-header td { padding-top: 16px; padding-bottom: 4px; border-bottom: none; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #8a8580; }
    .day-header:first-child td { padding-top: 0; }
    .bar-cell { width: 80px; }
    .bar-bg { background: #f2ede4; border-radius: 99px; height: 6px; overflow: hidden; }
    .bar-fill { background: #e85d4a; border-radius: 99px; height: 6px; }
    .empty-day { color: #b8b2aa; font-style: italic; font-size: 11px; }
    .footer { margin-top: 32px; padding-top: 14px; border-top: 1px solid #ece6db; display: flex; justify-content: space-between; color: #b8b2aa; font-size: 10px; }
  `;

  // Week summary table
  const weekTotals = sumTotals(allEntries.filter((e) => days.includes(e.date)));
  const summaryRows = days.map((d) => {
    const dayEntries = byDay.get(d) ?? [];
    const dt = sumTotals(dayEntries);
    const pct = goals.protein > 0 ? Math.min(1, dt.protein / goals.protein) : 0;
    const isToday = d === todayISO();
    const isFuture = d > todayISO();
    return `<tr>
      <td style="color:${isToday ? "#e85d4a" : "#1a1814"};font-weight:${isToday ? "600" : "400"}">${formatDateLong(d, locale)}</td>
      <td class="num">${dayEntries.length === 0 ? "—" : Math.round(dt.kcal)}</td>
      <td class="num">${dayEntries.length === 0 ? "—" : round1(dt.protein) + " g"}</td>
      <td class="num">${dayEntries.length === 0 ? "—" : dayEntries.length}</td>
      <td class="bar-cell" style="padding-left:8px">
        ${isFuture || dayEntries.length === 0
          ? `<div class="bar-bg"></div>`
          : `<div class="bar-bg"><div class="bar-fill" style="width:${Math.round(pct * 100)}%"></div></div>`
        }
      </td>
    </tr>`;
  }).join("");

  // Per-day detail
  const detailSections = days.map((d) => {
    const dayEntries = byDay.get(d) ?? [];
    if (dayEntries.length === 0) return "";
    const dt = sumTotals(dayEntries);
    const mealRows = dayEntries.map((e) => {
      const et = entryTotals(e);
      return `<tr>
        <td>${timeFromTimestamp(e.logged_at)}</td>
        <td class="food-name">${e.name}</td>
        <td class="num">${trimNum(e.servings)} × ${e.serving}</td>
        <td class="num">${Math.round(et.kcal)}</td>
        <td class="num">${round1(et.protein)}</td>
      </tr>`;
    }).join("");
    return `
      <tr class="day-header"><td colspan="5">${formatDateLong(d, locale)}</td></tr>
      ${mealRows}
      <tr class="totals-row">
        <td></td><td>Total</td><td></td>
        <td class="num">${Math.round(dt.kcal)}</td>
        <td class="num">${round1(dt.protein)} g</td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="${locale?.split("-")[0] ?? "en"}">
<head><meta charset="utf-8"><title>Prowtein — Week</title>
<style>${SHARED_CSS}</style></head>
<body>
<div class="header">
  <div class="logo">
    <div class="logo-mark">P</div>
    <span class="logo-name">Prowtein</span>
  </div>
  <div class="header-right">
    <div class="date-str">${weekLabel}</div>
    <div>Local · No cloud · SQLite</div>
  </div>
</div>

<div class="greeting">${greeting}</div>
<div class="week-range">${weekLabel}</div>

<div class="section-title">Week summary</div>
<table style="margin-bottom:28px">
  <thead><tr>
    <th>Day</th>
    <th class="num">kcal</th>
    <th class="num">Protein</th>
    <th class="num">Meals</th>
    <th style="padding-left:8px;width:88px">vs. goal</th>
  </tr></thead>
  <tbody>
    ${summaryRows}
    <tr class="totals-row">
      <td>Week total</td>
      <td class="num">${Math.round(weekTotals.kcal)}</td>
      <td class="num">${round1(weekTotals.protein)} g</td>
      <td class="num">${allEntries.filter((e) => days.includes(e.date)).length}</td>
      <td></td>
    </tr>
  </tbody>
</table>

${detailSections ? `<div class="section-title">Meals detail</div>
<table>
  <thead><tr>
    <th style="width:48px">Time</th>
    <th>Food</th>
    <th class="num" style="width:120px">Serving</th>
    <th class="num" style="width:52px">kcal</th>
    <th class="num" style="width:64px">P (g)</th>
  </tr></thead>
  <tbody>${detailSections}</tbody>
</table>` : ""}

<div class="footer">
  <span>Exported from Prowtein · ${new Date().toLocaleDateString()}</span>
  <span>prowtein.app</span>
</div>
</body></html>`;

  triggerPrint(html);
}
