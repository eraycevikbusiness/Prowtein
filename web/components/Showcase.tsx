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
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionHead
            eyebrow={t.showcase.eyebrow}
            title={<>{t.showcase.titleA} <span className="text-zinc-500">{t.showcase.titleB}</span></>}
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
              boxShadow: "0 60px 140px -40px rgba(132,204,22,0.18), 0 30px 80px -30px rgba(0,0,0,0.8)",
            }}
            className="relative mx-auto w-full max-w-[1080px] rounded-[14px] border border-[#1a1a1a] bg-[#040404] overflow-hidden"
          >
            <div className="h-9 flex items-center px-3.5 gap-1.5 border-b border-[#141414] bg-[#0a0a0a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
              <span className="mx-auto font-mono text-[11px] text-zinc-600">{t.showcase.windowTitle}</span>
              <span className="w-14" />
            </div>
            <div className="h-[560px]">
              <AppUI />
            </div>
          </motion.div>
          <div
            className="mx-auto h-6 w-3/5 -mt-3 rounded-full blur-2xl opacity-60"
            style={{ background: "radial-gradient(closest-side, rgba(132,204,22,0.4), transparent 70%)" }}
          />
        </div>
      </div>
    </section>
  );
}
