"use client"

import { motion } from "framer-motion"

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
})

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

        <p className="mt-4 text-lg text-slate-600">
          Get step-by-step math tutoring with a calm interface and an interactive whiteboard.
        </p>

        <div className="mt-8">
          <a
            href="/session"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 transition"
          >
            Start a session
          </a>
        </div>
      </motion.div>
    </section>
  )
}
