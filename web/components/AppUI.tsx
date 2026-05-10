"use client";

import { useLang } from "@/lib/LangContext";
import Ring from "./ui/Ring";
import { Lang } from "@/lib/i18n";
import {
  CircleDot, Calendar, BarChart3, BookOpen, FileDown,
  ChevronLeft, ChevronRight, Search, Plus,
} from "lucide-react";

const MEALS: { time: string; name: Record<Lang, string>; qty: string; kcal: number; p: number }[] = [
  { time: "07:42", name: { en: "Skyr, plain", de: "Skyr, natur", tr: "Skyr, sade" }, qty: "250 g", kcal: 158, p: 27 },
  { time: "08:10", name: { en: "Rolled oats", de: "Haferflocken", tr: "Yulaf ezmesi" }, qty: "80 g", kcal: 304, p: 11 },
  { time: "12:35", name: { en: "Chicken breast, grilled", de: "Hähnchenbrust, gegrillt", tr: "Tavuk göğüs, ızgara" }, qty: "180 g", kcal: 297, p: 56 },
  { time: "13:00", name: { en: "Jasmine rice, cooked", de: "Jasminreis, gekocht", tr: "Jasmin pirinç, pişmiş" }, qty: "200 g", kcal: 260, p: 5 },
  { time: "16:20", name: { en: "Whey isolate", de: "Whey-Isolat", tr: "Whey izolat" }, qty: "30 g", kcal: 117, p: 25 },
  { time: "19:48", name: { en: "Salmon fillet, baked", de: "Lachsfilet, gebacken", tr: "Somon fileto, fırınlanmış" }, qty: "150 g", kcal: 312, p: 32 },
];

const LIBRARY: { name: Record<Lang, string>; p: number; c: number; f: number; kcal: number; tag: Record<Lang, string> }[] = [
  { name: { en: "Chicken breast", de: "Hähnchenbrust", tr: "Tavuk göğüs" }, p: 31, c: 0, f: 3.6, kcal: 165, tag: { en: "Protein", de: "Eiweiss", tr: "Protein" } },
  { name: { en: "Skyr, plain", de: "Skyr, natur", tr: "Skyr, sade" }, p: 11, c: 4, f: 0.2, kcal: 63, tag: { en: "Dairy", de: "Milch", tr: "Süt" } },
  { name: { en: "Rolled oats", de: "Haferflocken", tr: "Yulaf ezmesi" }, p: 13, c: 67, f: 6.5, kcal: 380, tag: { en: "Carbs", de: "Kohlh.", tr: "Karb." } },
  { name: { en: "Salmon fillet", de: "Lachsfilet", tr: "Somon fileto" }, p: 22, c: 0, f: 13, kcal: 208, tag: { en: "Protein", de: "Eiweiss", tr: "Protein" } },
  { name: { en: "Whey isolate", de: "Whey-Isolat", tr: "Whey izolat" }, p: 84, c: 4, f: 1.5, kcal: 390, tag: { en: "Powder", de: "Pulver", tr: "Toz" } },
  { name: { en: "Jasmine rice", de: "Jasminreis", tr: "Jasmin pirinç" }, p: 2.7, c: 28, f: 0.3, kcal: 130, tag: { en: "Carbs", de: "Kohlh.", tr: "Karb." } },
  { name: { en: "Egg, whole", de: "Ei, ganz", tr: "Yumurta, bütün" }, p: 13, c: 1.1, f: 11, kcal: 155, tag: { en: "Protein", de: "Eiweiss", tr: "Protein" } },
  { name: { en: "Cottage cheese 2%", de: "Hüttenkäse 2 %", tr: "Cottage peyniri 2%" }, p: 12, c: 4, f: 2, kcal: 84, tag: { en: "Dairy", de: "Milch", tr: "Süt" } },
];

const WEEK_BARS = [70, 88, 95, 100, 92, 78, 95];

const NAV_ITEMS = [
  { Icon: CircleDot, key: "today" },
  { Icon: Calendar, key: "calendar" },
  { Icon: BarChart3, key: "stats" },
  { Icon: BookOpen, key: "library" },
  { Icon: FileDown, key: "export" },
] as const;

export default function AppUI() {
  const { lang, t } = useLang();
  const ui = t.appUI;
  const totalKcal = MEALS.reduce((a, m) => a + m.kcal, 0);
  const totalP = MEALS.reduce((a, m) => a + m.p, 0);
  const searchWord = { en: "chicken", de: "hähnchen", tr: "tavuk" }[lang];

  return (
    <div className="w-full h-full bg-[#070707] text-zinc-200 flex font-sans select-none text-sm">
      {/* Sidebar */}
      <aside className="w-[178px] shrink-0 border-r border-[#141414] bg-[#050505] flex flex-col">
        <div className="px-4 py-4 flex items-center gap-2 border-b border-[#141414]">
          <div className="w-5 h-5 rounded-[5px] bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-black">P</span>
          </div>
          <span className="font-mono text-[12px] tracking-wide">prowtein</span>
        </div>
        <nav className="px-2 py-3 flex flex-col gap-0.5 text-[12.5px]">
          {NAV_ITEMS.map(({ Icon, key }, idx) => {
            const active = idx === 0;
            const label = ui[key as keyof typeof ui] as string;
            return (
              <button
                key={key}
                className={
                  "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left " +
                  (active ? "bg-[#101010] text-white" : "text-zinc-500 hover:text-zinc-300")
                }
              >
                <Icon size={13} />
                <span>{label}</span>
                {active && <span className="ml-auto w-1 h-1 rounded-full bg-lime-400 shadow-[0_0_6px_rgba(132,204,22,0.9)]" />}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto px-3 py-3 border-t border-[#141414]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">{ui.streak}</div>
          <div className="flex items-end gap-[3px]">
            {WEEK_BARS.map((v, i) => (
              <div
                key={i}
                className="w-2 rounded-sm"
                style={{ height: v * 0.32, background: i === 6 ? "#84CC16" : "#1F1F1F" }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-mono text-base text-white">14</span>
            <span className="text-[11px] text-zinc-500">{ui.days}</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-10 border-b border-[#141414] px-4 flex items-center gap-3 text-[12px]">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ChevronLeft size={13} />
            <span className="font-mono text-zinc-300">{ui.date}</span>
            <ChevronRight size={13} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0c0c0c] border border-[#1a1a1a] text-zinc-500">
              <Search size={11} />
              <span className="text-[11px]">{ui.search}</span>
              <span className="kbd ml-2">⌘K</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-[1fr_220px] gap-0 flex-1 min-h-0 overflow-hidden">
          <div className="p-5 overflow-hidden">
            {/* Top metrics */}
            <div className="flex items-center gap-6">
              <Ring value={totalP} goal={150} size={132} stroke={9} label={ui.protein} unit="g" />
              <div className="flex-1 grid grid-cols-3 gap-3">
                {[
                  { l: ui.calories, v: totalKcal, goal: 2200, unit: "kcal" },
                  { l: ui.carbs, v: 134, goal: 220, unit: "g" },
                  { l: ui.fat, v: 58, goal: 75, unit: "g" },
                ].map((m) => (
                  <div key={m.l} className="rounded-md border border-[#171717] bg-[#0a0a0a] p-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{m.l}</div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-mono text-xl text-white tabular-nums">{m.v}</span>
                      <span className="font-mono text-[10.5px] text-zinc-500">/ {m.goal} {m.unit}</span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-[#141414] overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(100, (m.v / m.goal) * 100)}%`,
                          background: m.l === ui.calories ? "#e4e4e7" : "#3f3f46",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meals */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">{ui.todays}</span>
                <button className="text-[11px] flex items-center gap-1 px-2 py-1 rounded-md border border-[#1a1a1a] hover:border-[#262626] text-zinc-400">
                  <Plus size={11} />
                  <span>{ui.add}</span>
                </button>
              </div>
              <div className="rounded-lg border border-[#141414] bg-[#080808] divide-y divide-[#121212] overflow-hidden">
                {MEALS.map((m, i) => (
                  <div key={i} className="grid grid-cols-[64px_1fr_70px_64px_54px] items-center px-3 py-2 text-[12.5px] hover:bg-[#0c0c0c]">
                    <span className="font-mono text-zinc-500 text-[11px]">{m.time}</span>
                    <span className="text-zinc-200 truncate">{m.name[lang]}</span>
                    <span className="font-mono text-zinc-500 text-[11px] text-right">{m.qty}</span>
                    <span className="font-mono text-zinc-300 text-[11.5px] tabular-nums text-right">{m.kcal}</span>
                    <span className="font-mono text-lime-400 text-[11.5px] tabular-nums text-right">{m.p}g</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Library sidebar */}
          <aside className="border-l border-[#141414] bg-[#060606] flex flex-col min-h-0 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-[#141414] flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">{ui.libraryShort}</span>
              <button className="text-zinc-500 hover:text-zinc-300"><Plus size={12} /></button>
            </div>
            <div className="px-3 py-2 border-b border-[#141414]">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0c0c0c] border border-[#1a1a1a]">
                <Search size={11} className="text-zinc-500" />
                <span className="text-[11px] text-zinc-600">{searchWord}</span>
                <span className="ml-auto inline-block w-[1.5px] h-3 bg-lime-400 animate-pulse" />
              </div>
            </div>
            <div className="overflow-hidden flex-1">
              {LIBRARY.map((f, i) => (
                <div key={i} className="px-3 py-2 hover:bg-[#0b0b0b] border-b border-[#101010] cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-zinc-200 truncate">{f.name[lang]}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">{f.tag[lang]}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2.5 font-mono text-[10.5px] text-zinc-500 tabular-nums">
                    <span><span className="text-lime-400">P</span> {f.p}</span>
                    <span>C {f.c}</span>
                    <span>F {f.f}</span>
                    <span className="ml-auto text-zinc-400">{f.kcal} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
