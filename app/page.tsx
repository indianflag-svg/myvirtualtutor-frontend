"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Learn Math Step-by-Step
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          A calm AI tutor that teaches you how to solve problems — not just gives answers.
        </p>

        <div className="flex gap-4">
          <Link href="/session">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90">
              Start Learning
            </button>
          </Link>

          <Link href="/worksheets">
            <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black">
              Practice Worksheets
            </button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10">How It Works</h2>

        <div className="space-y-6 text-gray-300">
          <p>1. Ask a math question or upload homework</p>
          <p>2. Get step-by-step explanations</p>
          <p>3. Learn the process, not just the answer</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Students Love It</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-gray-300">
          <div>📚 Step-by-step explanations</div>
          <div>📷 Upload homework photos</div>
          <div>🧠 Understand concepts clearly</div>
          <div>✏️ Interactive whiteboard (coming)</div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Simple Pricing</h2>

        <div className="bg-gray-900 p-8 rounded-xl max-w-sm mx-auto">
          <p className="text-2xl font-bold mb-4">$10 / month</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>Unlimited questions</li>
            <li>Homework help</li>
            <li>Step-by-step tutoring</li>
          </ul>

          <Link href="/session">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold w-full">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Start Learning Smarter Today
        </h2>

        <Link href="/session">
          <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold">
            Start Now
          </button>
        </Link>
      </section>

    </main>
  )
}
