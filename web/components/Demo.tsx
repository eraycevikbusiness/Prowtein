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
          <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">{kicker}</span>
          <span className="text-[11px] text-[var(--ink-4)]">/ {String(idx).padStart(2, "0")}</span>
        </div>
        <h3
          className="font-serif text-[32px] md:text-[38px] leading-[1.1] tracking-tight text-[var(--ink)]"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {title}
        </h3>
        <p
          className="mt-3.5 text-[var(--ink-3)] text-[16px] leading-relaxed max-w-md"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {body}
        </p>
      </div>
      <div className={align === "right" ? "md:order-1" : ""}>
        <div className="relative rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_30px_70px_-40px_rgba(26,24,20,0.25)]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

const QUERY_WORD: Record<Lang, string> = { en: "chicken", de: "hähnchen", tr: "tavuk" };

const LIB_GRID: Record<Lang, [string, string, string, string][]> = {
  en: [
    ["Greek yogurt", "10g protein · 4g carbs", "97 kcal", "#F5B07B"],
    ["Rolled oats", "13g protein · 67g carbs", "380 kcal", "#F5DC8E"],
    ["Chicken breast", "31g protein · 0g carbs", "165 kcal", "#E85D4A"],
    ["Almonds, raw", "21g protein · 22g carbs", "579 kcal", "#B9C9A7"],
    ["Salmon fillet", "22g protein · 0g carbs", "208 kcal", "#8B6F8F"],
    ["Egg, whole", "13g protein · 1g carbs", "155 kcal", "#F5B07B"],
  ],
  de: [
    ["Griech. Joghurt", "10g Eiweiss · 4g Kohlh.", "97 kcal", "#F5B07B"],
    ["Haferflocken", "13g Eiweiss · 67g Kohlh.", "380 kcal", "#F5DC8E"],
    ["Hähnchenbrust", "31g Eiweiss · 0g Kohlh.", "165 kcal", "#E85D4A"],
    ["Mandeln, roh", "21g Eiweiss · 22g Kohlh.", "579 kcal", "#B9C9A7"],
    ["Lachsfilet", "22g Eiweiss · 0g Kohlh.", "208 kcal", "#8B6F8F"],
    ["Ei, ganz", "13g Eiweiss · 1g Kohlh.", "155 kcal", "#F5B07B"],
  ],
  tr: [
    ["Yunan yoğurdu", "10g protein · 4g karb.", "97 kcal", "#F5B07B"],
    ["Yulaf ezmesi", "13g protein · 67g karb.", "380 kcal", "#F5DC8E"],
    ["Tavuk göğüs", "31g protein · 0g karb.", "165 kcal", "#E85D4A"],
    ["Badem, çiğ", "21g protein · 22g karb.", "579 kcal", "#B9C9A7"],
    ["Somon fileto", "22g protein · 0g karb.", "208 kcal", "#8B6F8F"],
    ["Yumurta, bütün", "13g protein · 1g karb.", "155 kcal", "#F5B07B"],
  ],
};

const DAY_LETTERS: Record<Lang, string[]> = {
  en: ["M", "T", "W", "T", "F", "S", "S"],
  de: ["M", "D", "M", "D", "F", "S", "S"],
  tr: ["P", "S", "Ç", "P", "C", "C", "P"],
};
const WEEK_VALUES = [70, 88, 95, 100, 92, 78, 95];

export default function Demo() {
  const { t, lang } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.5", "end 0.6"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const s1 = t.demo.step1;
  const s3 = t.demo.step3;

  return (
    <section className="relative py-20 sm:py-32 bg-[var(--bg-2)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead
          eyebrow={t.demo.eyebrow}
          title={
            <>
              {t.demo.titleA} <span className="italic text-[var(--ink-3)]">{t.demo.titleB}</span>
            </>
          }
        />
        <div ref={wrap} className="relative mt-16 pl-6 md:pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border-2)]" />
          <motion.div
            className="absolute left-0 top-0 w-[2px] -translate-x-px rounded-full bg-[var(--accent)]"
            style={{ height: fill }}
          />
          <div className="space-y-28">
            <DemoStep idx={1} kicker={s1.kicker} title={s1.title} body={s1.body}>
              <div className="rounded-xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-white">
                  <Search size={14} className="text-[var(--ink-3)]" />
                  <span className="text-[14px] text-[var(--ink)]">{QUERY_WORD[lang]}</span>
                  <span className="inline-block w-[1.5px] h-4 bg-[var(--accent)] animate-pulse" />
                  <span className="chip ml-auto">⌘K</span>
                </div>
                {s1.rows.map(([n, meta], i) => (
                  <div
                    key={i}
                    className={"px-4 py-2.5 flex items-center gap-3 " + (i === 0 ? "bg-[var(--accent-soft)]" : "")}
                  >
                    <span
                      className={"w-1.5 h-1.5 rounded-full " + (i === 0 ? "bg-[var(--accent)]" : "bg-[var(--ink-4)]")}
                    />
                    <span className={"text-[13.5px] " + (i === 0 ? "text-[var(--ink)] font-medium" : "text-[var(--ink-2)]")}>
                      {n}
                    </span>
                    <span className="ml-auto text-[11.5px] text-[var(--ink-3)]">{meta}</span>
                  </div>
                ))}
                <div className="px-4 py-2.5 flex items-center gap-3 text-[11px] text-[var(--ink-3)] border-t border-[var(--border)] bg-white">
                  <span className="chip">↵</span> {s1.hintLog}
                  <span className="chip">⇥</span> {s1.hintEdit}
                  <span className="ml-auto">{s1.hintMatches}</span>
                </div>
              </div>
            </DemoStep>

            <DemoStep idx={2} align="right" kicker={t.demo.step2.kicker} title={t.demo.step2.title} body={t.demo.step2.body}>
              <div className="rounded-xl bg-[var(--bg)] border border-[var(--border)] p-3 grid grid-cols-2 gap-2">
                {LIB_GRID[lang].map(([n, macros, kcal, color], i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-[var(--border)] p-3.5 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-[13px] font-medium text-[var(--ink)] truncate">{n}</span>
                    </div>
                    <span className="text-[11px] text-[var(--ink-3)]">{macros}</span>
                    <span className="text-[12px] text-[var(--accent-deep)] mt-auto">{kcal}</span>
                  </div>
                ))}
              </div>
            </DemoStep>

            <DemoStep idx={3} kicker={s3.kicker} title={s3.title} body={s3.body}>
              <div className="rounded-xl bg-white border border-[var(--border)] p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-[11.5px] text-[var(--ink-3)]">{s3.weekOf}</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-serif text-[36px] leading-none">93%</span>
                      <span className="text-[12.5px] text-[var(--ink-3)]">{s3.avg}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11.5px] text-[var(--ink-3)]">{s3.streak}</div>
                    <div className="mt-1 font-serif text-[36px] leading-none text-[var(--accent)]">14d</div>
                  </div>
                </div>
                <div className="flex items-end gap-3 h-32 mt-2">
                  {WEEK_VALUES.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-md"
                        style={{
                          height: `${v}%`,
                          background: i === 3 ? "var(--accent)" : "var(--apricot)",
                          opacity: i === 3 ? 1 : 0.55,
                        }}
                      />
                      <span
                        className={
                          "text-[11px] " + (i === 3 ? "text-[var(--accent-deep)] font-semibold" : "text-[var(--ink-3)]")
                        }
                      >
                        {DAY_LETTERS[lang][i]}
                      </span>
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
