"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  const floatAnim = prefersReducedMotion
    ? {}
    : {
        y: [0, -6, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-sky-500/10 via-indigo-500/10 to-emerald-500/10 blur-2xl" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl"
      >
        <motion.div animate={floatAnim} className="relative p-16 text-center">
          <div className="text-3xl font-mono text-sky-400">
            2(x + 3) = 10
          </div>

          <div className="mt-6 space-y-2 font-mono text-white/80">
            <div>÷ 2</div>
            <div>x + 3 = 5</div>
            <div>− 3</div>
            <div className="font-bold text-emerald-400 text-lg mt-2">
              x = 2
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 border-t border-white/10 bg-black/40 p-4 text-xs text-white/80 backdrop-blur">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Math-only</div>
            <div className="text-white/70">No distractions</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Voice + Chat</div>
            <div className="text-white/70">Explain + practice</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="font-semibold text-white">Whiteboard</div>
            <div className="text-white/70">Shows each step</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
