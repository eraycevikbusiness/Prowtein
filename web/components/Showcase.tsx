"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import SectionHead from "./ui/SectionHead";
import AppUI from "./AppUI";

export default function Showcase() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.35, 1], [22, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.86, 1, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.45], [40, 0]);

  return (
    <section ref={ref} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <SectionHead
            eyebrow={t.showcase.eyebrow}
            title={
              <>
                {t.showcase.titleA} <span className="italic text-[var(--ink-3)]">{t.showcase.titleB}</span>
              </>
            }
            sub={t.showcase.sub}
            align="center"
          />
        </div>

        <div className="[perspective:1400px]">
          <motion.div
            style={{
              rotateX: rotate,
              scale,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            className="app-window relative mx-auto w-full max-w-[1080px] overflow-hidden"
          >
            <div className="h-10 flex items-center px-4 gap-1.5 border-b border-[var(--border)] bg-[var(--surface-2)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5BF4F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#62C554]" />
              <span className="mx-auto text-[12px] text-[var(--ink-3)] truncate">{t.showcase.windowTitle}</span>
              <span className="w-14" />
            </div>
            <div className="h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden">
              <div
                className="origin-top-left md:origin-center"
                style={{
                  width: "1040px",
                  height: "620px",
                  transform: "scale(var(--app-scale, 1))",
                  transformOrigin: "top left",
                }}
              >
                <AppUI />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
