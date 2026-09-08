"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function DogLanguageModelCover({ className }: { className?: string }) {
  const [phase, setPhase] = useState(0);
  const lines = [
    "barkseq → intent: walk / excited",
    "「我们出去散步吧」→ dog vocalization",
  ];

  useEffect(() => {
    const timer = setInterval(() => setPhase((p) => (p + 1) % 2), 3000);
    return () => clearInterval(timer);
  }, []);

  const bars = [0.28, 0.55, 0.42, 0.88, 0.36, 0.72, 0.48, 0.64, 0.4, 0.78, 0.52, 0.6];

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-full",
        "bg-gradient-to-br from-[#1a120c] via-[#241810] to-[#0f1410]",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-9">
        <div className="flex h-11 items-end justify-center gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-orange-400/85"
              animate={{ height: [h * 34, h * 18, h * 38, h * 26] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.07 }}
            />
          ))}
        </div>
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[14rem] text-center font-mono text-xs leading-relaxed text-orange-50/90 sm:text-sm"
        >
          {lines[phase]}
        </motion.p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_50px_24px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
