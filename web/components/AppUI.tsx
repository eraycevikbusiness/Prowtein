"use client";

import { useLang } from "@/lib/LangContext";
import { Lang } from "@/lib/i18n";
import Ring from "./ui/Ring";
import {
  Sun,
  Calendar,
  Sparkles,
  Bookmark,
  Share2,
  Coffee,
  Wheat,
  Drumstick,
  Milk,
  Fish,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  ArrowRight,
} from "lucide-react";

type MealKind = "breakfast" | "lunch" | "snack" | "dinner";

const MEALS: {
  time: string;
  Icon: React.ElementType;
  kind: MealKind;
  name: Record<Lang, string>;
  qty: Record<Lang, string>;
  kcal: number;
  p: number;
}[] = [
  { time: "07:42", Icon: Coffee, kind: "breakfast", name: { en: "Skyr & berries", de: "Skyr mit Beeren", tr: "Skyr ve meyveler" }, qty: { en: "250 g + 80 g", de: "250 g + 80 g", tr: "250 g + 80 g" }, kcal: 218, p: 28 },
  { time: "08:10", Icon: Wheat, kind: "breakfast", name: { en: "Rolled oats", de: "Haferflocken", tr: "Yulaf ezmesi" }, qty: { en: "80 g", de: "80 g", tr: "80 g" }, kcal: 304, p: 11 },
  { time: "12:35", Icon: Drumstick, kind: "lunch", name: { en: "Grilled chicken bowl", de: "Hähnchen-Bowl", tr: "Tavuk kasesi" }, qty: { en: "180 g + sides", de: "180 g + Beilagen", tr: "180 g + garnitür" }, kcal: 557, p: 61 },
  { time: "16:20", Icon: Milk, kind: "snack", name: { en: "Whey shake", de: "Whey-Shake", tr: "Whey shake" }, qty: { en: "30 g + milk", de: "30 g + Milch", tr: "30 g + süt" }, kcal: 217, p: 30 },
  { time: "19:48", Icon: Fish, kind: "dinner", name: { en: "Salmon, greens & rice", de: "Lachs mit Gemüse & Reis", tr: "Somon, sebze ve pirinç" }, qty: { en: "150 g salmon", de: "150 g Lachs", tr: "150 g somon" }, kcal: 512, p: 37 },
];

const WEEK = [
  { v: 0.7, active: false },
  { v: 0.88, active: false },
  { v: 0.95, active: false },
  { v: 1.0, active: false },
  { v: 0.92, active: false },
  { v: 0.78, active: false },
  { v: 0.96, active: true },
];
const WEEK_LETTERS: Record<Lang, string[]> = {
  en: ["M", "T", "W", "T", "F", "S", "S"],
  de: ["M", "D", "M", "D", "F", "S", "S"],
  tr: ["P", "S", "Ç", "P", "C", "C", "P"],
};

const LIBRARY: { n: Record<Lang, string>; sub: string; color: string }[] = [
  { n: { en: "Chicken breast", de: "Hähnchenbrust", tr: "Tavuk göğüs" }, sub: "165 kcal · 31g P", color: "#E85D4A" },
  { n: { en: "Greek yogurt", de: "Griechisch. Joghurt", tr: "Yunan yoğurdu" }, sub: "97 kcal · 10g P", color: "#F5B07B" },
  { n: { en: "Salmon fillet", de: "Lachsfilet", tr: "Somon fileto" }, sub: "208 kcal · 22g P", color: "#B9C9A7" },
  { n: { en: "Cottage cheese", de: "Hüttenkäse", tr: "Cottage peyniri" }, sub: "84 kcal · 12g P", color: "#8B6F8F" },
  { n: { en: "Tofu, firm", de: "Tofu, fest", tr: "Tofu, sert" }, sub: "144 kcal · 17g P", color: "#F5DC8E" },
];

const MACRO_COLORS = { protein: "#E85D4A", carbs: "#F5B07B", fat: "#B9C9A7" };

const LOCALE: Record<Lang, string> = { en: "en-US", de: "de-DE", tr: "tr-TR" };

export default function AppUI() {
  const { t, lang } = useLang();
  const ui = t.appUI;
  const ax = t.appExtra;

  const totalKcal = MEALS.reduce((a, m) => a + m.kcal, 0);
  const totalP = MEALS.reduce((a, m) => a + m.p, 0);

  const kindLabel: Record<MealKind, string> = {
    breakfast: ax.breakfast,
    lunch: ax.lunch,
    snack: ax.snack,
    dinner: ax.dinner,
  };

  const sidebar: { Icon: React.ElementType; label: string; active: boolean }[] = [
    { Icon: Sun, label: ui.today, active: true },
    { Icon: Calendar, label: ui.calendar, active: false },
    { Icon: Sparkles, label: ui.stats, active: false },
    { Icon: Bookmark, label: ui.library, active: false },
    { Icon: Share2, label: ui.export, active: false },
  ];

  return (
    <div
      className="w-full h-full bg-[var(--surface-2)] text-[var(--ink)] flex select-none"
      style={{ fontFamily: "var(--font-manrope), Manrope, ui-sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="w-[212px] shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col">
        <div className="px-5 py-4 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
            <span className="font-serif text-[16px] leading-none">P</span>
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold tracking-tight">Prowtein</div>
            <div className="text-[11px] text-[var(--ink-3)]">{ax.personal}</div>
          </div>
        </div>

        <nav className="px-3 py-2 flex flex-col gap-0.5 text-[13.5px]">
          {sidebar.map(({ Icon, label, active }) => (
            <button
              key={label}
              className={
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors " +
                (active ? "bg-[var(--bg-2)] text-[var(--ink)]" : "text-[var(--ink-2)] hover:bg-[var(--surface-2)]")
              }
            >
              <Icon size={15} className={active ? "text-[var(--accent)]" : ""} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Week ring */}
        <div className="mt-3 mx-3 p-3.5 rounded-xl bg-[var(--bg-2)]">
          <div className="flex items-baseline justify-between mb-2.5">
            <span className="text-[11.5px] text-[var(--ink-3)]">{ui.streak}</span>
            <span className="font-serif text-[18px] leading-none text-[var(--ink)]">
              14 <span className="text-[11px] text-[var(--ink-3)] font-sans">{ui.days}</span>
            </span>
          </div>
          <div className="flex items-end justify-between gap-1">
            {WEEK.map((w, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full rounded-full overflow-hidden bg-white" style={{ height: 36 }}>
                  <div
                    className="w-full"
                    style={{
                      marginTop: `${(1 - w.v) * 36}px`,
                      height: `${w.v * 36}px`,
                      background: w.active ? "var(--accent)" : "var(--apricot)",
                      opacity: w.active ? 1 : 0.6,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span
                  className={"text-[10px] " + (w.active ? "text-[var(--accent-deep)] font-semibold" : "text-[var(--ink-3)]")}
                >
                  {WEEK_LETTERS[lang][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-3">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[var(--apricot)] flex items-center justify-center text-white text-[11px] font-semibold">
              EL
            </div>
            <div className="leading-tight flex-1">
              <div className="text-[12.5px] font-medium">Elif</div>
              <div className="text-[10.5px] text-[var(--ink-3)]">{ax.localData}</div>
            </div>
            <ChevronRight size={13} className="text-[var(--ink-3)]" />
          </div>
        </div>
      </aside>

      {/* Center */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 px-6 flex items-center gap-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 text-[var(--ink-2)]">
            <button className="w-7 h-7 rounded-md hover:bg-[var(--bg-2)] flex items-center justify-center">
              <ChevronLeft size={15} />
            </button>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight">{ui.today}</div>
              <div className="text-[11.5px] text-[var(--ink-3)]">{ui.date}</div>
            </div>
            <button className="w-7 h-7 rounded-md hover:bg-[var(--bg-2)] flex items-center justify-center">
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 h-8 rounded-lg bg-[var(--bg-2)] text-[var(--ink-3)]">
              <Search size={13} />
              <span className="text-[12.5px]">{ui.search}</span>
              <span className="chip ml-2">⌘K</span>
            </div>
            <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] text-white text-[12.5px] font-medium hover:bg-[var(--accent-deep)] transition-colors">
              <Plus size={13} />
              <span>{ui.add}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden p-6 grid grid-cols-[1fr_280px] gap-6">
          {/* LEFT: overview + meals timeline */}
          <div className="min-w-0 overflow-hidden flex flex-col gap-5">
            {/* Hero overview card */}
            <div className="rounded-2xl bg-white border border-[var(--border)] p-6 flex items-center gap-7">
              <Ring value={totalP} goal={150} label={ui.protein} unit="g" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12.5px] text-[var(--ink-3)]">{ui.calories}</span>
                  <span className="text-[12px] text-[var(--ink-3)]">{ax.of} 2,200 kcal</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-serif text-[40px] leading-none">{totalKcal.toLocaleString(LOCALE[lang])}</span>
                  <span className="text-[14px] text-[var(--ink-3)]">kcal</span>
                </div>
                {/* segmented macro bar */}
                <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-[var(--bg-2)]">
                  <div style={{ width: "30%", background: MACRO_COLORS.protein }} />
                  <div style={{ width: "45%", background: MACRO_COLORS.carbs }} />
                  <div style={{ width: "13%", background: MACRO_COLORS.fat }} />
                </div>
                <div className="mt-2.5 flex items-center gap-4 text-[12px] text-[var(--ink-2)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="macro-dot" style={{ background: MACRO_COLORS.protein }} />
                    {ui.protein} <span className="text-[var(--ink-3)]">{totalP}g</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="macro-dot" style={{ background: MACRO_COLORS.carbs }} />
                    {ui.carbs} <span className="text-[var(--ink-3)]">198g</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="macro-dot" style={{ background: MACRO_COLORS.fat }} />
                    {ui.fat} <span className="text-[var(--ink-3)]">58g</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Meals timeline */}
            <div className="min-h-0 flex-1 overflow-hidden">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-[15px] font-semibold tracking-tight">{ui.todays}</h3>
                <span className="text-[11.5px] text-[var(--ink-3)]">5 {ax.meals}</span>
              </div>
              <div className="space-y-2">
                {MEALS.map((m, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 p-3 pr-4 rounded-xl bg-white border border-[var(--border)] hover:border-[var(--border-2)] hover:shadow-[0_8px_24px_-16px_rgba(26,24,20,0.18)] transition"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-2)] flex items-center justify-center text-[var(--ink-2)]">
                      <m.Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[14px] font-medium truncate">{m.name[lang]}</span>
                        <span className="text-[10.5px] uppercase tracking-wide text-[var(--ink-3)]">
                          {kindLabel[m.kind]}
                        </span>
                      </div>
                      <div className="text-[12px] text-[var(--ink-3)]">
                        {m.qty[lang]} · {m.time}
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <div className="text-[14px] font-medium">
                        {m.kcal} <span className="text-[var(--ink-3)] font-normal text-[12px]">kcal</span>
                      </div>
                      <div className="text-[12px] text-[var(--accent)]">
                        {m.p}g {ui.protein}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: aside (suggestions + quick-add library) */}
          <aside className="flex flex-col gap-4 min-h-0">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[var(--accent-soft)] to-[#FFF1EC] border border-[var(--border)]">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[var(--accent-deep)] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {ax.suggestion}
              </div>
              <h4 className="font-serif text-[20px] leading-tight text-[var(--ink)]">{ax.suggestionTitle}</h4>
              <p className="mt-1.5 text-[13px] text-[var(--ink-2)] leading-relaxed">{ax.suggestionBody}</p>
              <button className="mt-3.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--accent-deep)] hover:underline">
                {ax.browseIdeas}
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="rounded-2xl bg-white border border-[var(--border)] p-4 flex-1 min-h-0 flex flex-col">
              <div className="flex items-baseline justify-between mb-2.5">
                <span className="text-[13px] font-semibold tracking-tight">{ui.libraryShort}</span>
                <button className="text-[var(--ink-3)] hover:text-[var(--ink)]">
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                {LIBRARY.map((f, i) => (
                  <button
                    key={i}
                    className="group flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--bg-2)] text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] truncate">{f.n[lang]}</div>
                      <div className="text-[11px] text-[var(--ink-3)]">{f.sub}</div>
                    </div>
                    <Plus size={13} className="text-[var(--ink-3)] opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
