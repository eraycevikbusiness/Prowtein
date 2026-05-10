"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { Lang } from "@/lib/i18n";
import SectionHead from "./ui/SectionHead";

function DemoStep({
  idx,
  kicker,
  title,
  body,
  align = "left",
  children,
}: {
  idx: number;
  kicker: string;
  title: string;
  body: string;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
    >
      <div className={align === "right" ? "md:order-2" : ""}>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-lime-400">{kicker}</span>
          <span className="font-mono text-[10.5px] text-zinc-700">/ {String(idx).padStart(2, "0")}</span>
        </div>
        <h3 className="text-3xl md:text-[34px] font-semibold tracking-tight text-white" style={{ textWrap: "balance" } as React.CSSProperties}>
          {title}
        </h3>
        <p className="mt-3 text-zinc-500 text-[15px] leading-relaxed max-w-md">{body}</p>
      </div>
      <div className={align === "right" ? "md:order-1" : ""}>
        <div className="relative rounded-xl border border-[#1a1a1a] bg-[#070707] p-4 overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

const LIB_GRID: Record<Lang, [string, string, string, string][]> = {
  en: [
    ["Skyr, plain", "11g P · 4g C · 0.2g F", "63 kcal", "Dairy"],
    ["Rolled oats", "13g P · 67g C · 6.5g F", "380 kcal", "Carbs"],
    ["Chicken breast", "31g P · 0g C · 3.6g F", "165 kcal", "Protein"],
    ["Whey isolate", "84g P · 4g C · 1.5g F", "390 kcal", "Powder"],
    ["Salmon fillet", "22g P · 0g C · 13g F", "208 kcal", "Protein"],
    ["Egg, whole", "13g P · 1.1g C · 11g F", "155 kcal", "Protein"],
  ],
  de: [
    ["Skyr, natur", "11g E · 4g K · 0.2g F", "63 kcal", "Milch"],
    ["Haferflocken", "13g E · 67g K · 6.5g F", "380 kcal", "Kohlh."],
    ["Hähnchenbrust", "31g E · 0g K · 3.6g F", "165 kcal", "Eiweiss"],
    ["Whey-Isolat", "84g E · 4g K · 1.5g F", "390 kcal", "Pulver"],
    ["Lachsfilet", "22g E · 0g K · 13g F", "208 kcal", "Eiweiss"],
    ["Ei, ganz", "13g E · 1.1g K · 11g F", "155 kcal", "Eiweiss"],
  ],
  tr: [
    ["Skyr, sade", "11g P · 4g K · 0.2g Y", "63 kcal", "Süt"],
    ["Yulaf ezmesi", "13g P · 67g K · 6.5g Y", "380 kcal", "Karb."],
    ["Tavuk göğüs", "31g P · 0g K · 3.6g Y", "165 kcal", "Protein"],
    ["Whey izolat", "84g P · 4g K · 1.5g Y", "390 kcal", "Toz"],
    ["Somon fileto", "22g P · 0g K · 13g Y", "208 kcal", "Protein"],
    ["Yumurta, bütün", "13g P · 1.1g K · 11g Y", "155 kcal", "Protein"],
  ],
};

const DAY_LETTERS: Record<Lang, string[]> = {
  en: ["M", "T", "W", "T", "F", "S", "S"],
  de: ["M", "D", "M", "D", "F", "S", "S"],
  tr: ["P", "S", "Ç", "P", "C", "C", "P"],
};
const WEEK_VALUES = [70, 88, 95, 100, 92, 78, 95];
const QUERY_WORD: Record<Lang, string> = { en: "chic", de: "hähn", tr: "tavu" };

export default function Demo() {
  const { t, lang } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.5", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const s1 = t.demo.step1;
  const s3 = t.demo.step3;

  return (
    <section className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead
          eyebrow={t.demo.eyebrow}
          title={<>{t.demo.titleA} <span className="text-zinc-500">{t.demo.titleB}</span></>}
        />
        <div ref={wrap} className="relative mt-16 pl-6 md:pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#141414]" />
          <motion.div
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-transparent via-lime-400 to-transparent shadow-[0_0_12px_rgba(132,204,22,0.5)]"
            style={{ height: fill }}
          />

          <div className="space-y-28">
            <DemoStep idx={1} kicker={s1.kicker} title={s1.title} body={s1.body}>
              <div className="h-[260px] rounded-lg bg-[#040404] border border-[#141414] flex flex-col">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#141414]">
                  <Search size={13} className="text-zinc-500" />
                  <span className="font-mono text-[13px] text-zinc-300">{QUERY_WORD[lang]}</span>
                  <span className="inline-block w-[1.5px] h-3.5 bg-lime-400 animate-pulse" />
                  <span className="ml-auto kbd">⌘K</span>
                </div>
                {s1.rows.map(([n, meta], i) => (
                  <div
                    key={i}
                    className={"px-3 py-2 flex items-center gap-3 border-b border-[#0f0f0f] " + (i === 0 ? "bg-[#0e1208]" : "")}
                  >
                    <span className={"w-1 h-1 rounded-full " + (i === 0 ? "bg-lime-400" : "bg-zinc-700")} />
                    <span className={"text-[13px] " + (i === 0 ? "text-white" : "text-zinc-400")}>{n}</span>
                    <span className="ml-auto font-mono text-[10.5px] text-zinc-600">{meta}</span>
                  </div>
                ))}
                <div className="mt-auto px-3 py-2 flex items-center gap-3 text-[10.5px] font-mono text-zinc-600 border-t border-[#141414]">
                  <span className="kbd">↵</span> {s1.hintLog}
                  <span className="kbd ml-2">⇥</span> {s1.hintEdit}
                  <span className="ml-auto">{s1.hintMatches}</span>
                </div>
              </div>
            </DemoStep>

            <DemoStep idx={2} align="right" kicker={t.demo.step2.kicker} title={t.demo.step2.title} body={t.demo.step2.body}>
              <div className="h-[260px] rounded-lg bg-[#040404] border border-[#141414] grid grid-cols-2 gap-px overflow-hidden" style={{ background: "#141414" }}>
                {LIB_GRID[lang].map(([n, macros, kcal, tag], i) => (
                  <div key={i} className="bg-[#080808] p-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-zinc-200 truncate">{n}</span>
                      <span className="font-mono text-[9.5px] uppercase tracking-widest text-zinc-600">{tag}</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">{macros}</span>
                    <span className="font-mono text-[10.5px] text-lime-400 mt-auto">{kcal}</span>
                  </div>
                ))}
              </div>
            </DemoStep>

            <DemoStep idx={3} kicker={s3.kicker} title={s3.title} body={s3.body}>
              <div className="h-[260px] rounded-lg bg-[#040404] border border-[#141414] p-5 flex flex-col">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-500">{s3.weekOf}</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-3xl text-white tabular-nums">93%</span>
                      <span className="text-[12px] text-zinc-500">{s3.avg}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-500">{s3.streak}</div>
                    <div className="mt-1 font-mono text-3xl text-lime-400 tabular-nums">14d</div>
                  </div>
                </div>
                <div className="mt-auto flex items-end gap-3 h-32">
                  {WEEK_VALUES.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full rounded-t-sm relative" style={{ height: `${v}%` }}>
                        <div
                          className="absolute inset-0 rounded-t-sm"
                          style={{
                            background: i === 3 ? "#84CC16" : "#1F1F1F",
                            boxShadow: i === 3 ? "0 0 14px rgba(132,204,22,0.5)" : "none",
                          }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600">{DAY_LETTERS[lang][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DemoStep>
          </div>
        </div>
      </div>
    </section>
  );
}
