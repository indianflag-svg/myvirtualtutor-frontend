"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const steps = [
    "Step 1: Subtract 6 → 2x = 4",
    "Step 2: Divide by 2 → x = 2"
  ]

  const [visibleSteps, setVisibleSteps] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setVisibleSteps((prev) => [...prev, steps[i]])
      i++
      if (i >= steps.length) clearInterval(interval)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Learn Math <span className="text-gray-400">Step-by-Step</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Built for grades 6–12. A calm AI tutor that teaches you how to solve problems — not just gives answers.
        </p>

        {/* DEMO */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-xl w-full text-left mb-10 shadow-lg">
          <p className="text-gray-400 mb-2">Example</p>
          <p className="mb-4">2x + 6 = 10</p>

          <div className="space-y-2 text-gray-300">
            {visibleSteps.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/session">
            <button className="bg-white text-black px-7 py-3 rounded-2xl font-semibold hover:scale-105 transition">
              Start Learning
            </button>
          </Link>

          <Link href="/worksheets">
            <button className="border border-gray-600 px-7 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition">
              Practice Worksheets
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold mb-14">Why Students Love It</h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-300">
          <div className="p-6 bg-gray-900 rounded-2xl">📚 Step-by-step explanations</div>
          <div className="p-6 bg-gray-900 rounded-2xl">📷 Upload homework photos</div>
          <div className="p-6 bg-gray-900 rounded-2xl">🧠 Actually understand concepts</div>
          <div className="p-6 bg-gray-900 rounded-2xl">✏️ Interactive whiteboard (coming)</div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold mb-12">Simple Pricing</h2>

        <div className="bg-gray-900 p-10 rounded-2xl max-w-md mx-auto border border-gray-800">
          <p className="text-3xl font-bold mb-4">$10<span className="text-lg text-gray-400"> / month</span></p>

          <ul className="text-gray-300 space-y-3 mb-8">
            <li>Unlimited questions</li>
            <li>Homework help</li>
            <li>Step-by-step tutoring</li>
          </ul>

          <Link href="/session">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold w-full hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
