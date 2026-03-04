"use client";

import { motion } from "framer-motion";

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const features = [
  {
    title: "Step-by-step explanations",
    description:
      "The tutor explains every move clearly so students understand the process — not just the answer.",
  },
  {
    title: "Interactive whiteboard",
    description:
      "Work through problems visually with a simple whiteboard that mirrors the tutor's explanation.",
  },
  {
    title: "Calm learning experience",
    description:
      "No rushing, pressure, or distractions. Just focused tutoring designed to build confidence.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {f.title}
            </h3>

            <p className="mt-3 text-slate-600">
              {f.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
