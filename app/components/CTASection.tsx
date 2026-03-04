"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const block = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
    },
  },
});

export default function CTASection() {
  return (
    <section className="py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={block(0)}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Ready to start learning?
        </h2>

        <motion.p
          variants={block(0.1)}
          className="mx-auto mt-4 max-w-2xl text-slate-600"
        >
          Step-by-step explanations. Guided practice. A simple whiteboard that
          shows every move — without pressure or rushing.
        </motion.p>

        <motion.div variants={block(0.14)} className="mt-8 flex justify-center">
          <Link
            href="/session"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 transition"
          >
            Start Free Session
          </Link>
        </motion.div>

        <motion.p
          variants={block(0.18)}
          className="mt-4 text-sm text-slate-500"
        >
          No credit card required
        </motion.p>
      </motion.div>
    </section>
  );
}
