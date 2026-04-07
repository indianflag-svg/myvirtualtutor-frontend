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
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Learn Math <span className="text-blue-600">Step-by-Step</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Built for grades 6–12. A calm AI tutor that teaches you how to solve problems — not just gives answers.
        </p>

        {/* DEMO (dark card) */}
        <div className="bg-gray-900 text-white border border-gray-800 rounded-2xl p-6 max-w-xl w-full text-left mb-10 shadow-lg">
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
            <button className="bg-blue-600 text-white px-7 py-3 rounded-2xl font-semibold hover:opacity-90">
              Start Learning
            </button>
          </Link>

          <Link href="/worksheets">
            <button className="border border-gray-300 px-7 py-3 rounded-2xl font-semibold hover:bg-gray-100">
              Practice Worksheets
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12">Why Students Love It</h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="p-6 bg-white rounded-xl shadow-sm border">📚 Step-by-step explanations</div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">📷 Upload homework photos</div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">🧠 Actually understand concepts</div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">✏️ Interactive whiteboard (coming)</div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-24 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-10">Simple Pricing</h2>

        <div className="p-8 rounded-xl max-w-md mx-auto border shadow-sm">
          <p className="text-3xl font-bold mb-4">$10<span className="text-lg text-gray-500"> / month</span></p>

          <ul className="text-gray-600 space-y-2 mb-6">
            <li>Unlimited questions</li>
            <li>Homework help</li>
            <li>Step-by-step tutoring</li>
          </ul>

          <Link href="/session">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:opacity-90">
              Get Started
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
