"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Your Calm AI Math Tutor
      </h1>

      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
        Learn step-by-step with a tutor that actually explains. 
        Not just answers — real understanding.
      </p>

      <div className="flex gap-4">
        <Link href="/session">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Start Session
          </button>
        </Link>

        <Link href="/worksheets">
          <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition">
            Practice Worksheets
          </button>
        </Link>
      </div>

      <div className="mt-16 text-gray-400 text-sm">
        Built for students who want to actually understand math.
      </div>

    </main>
  )
}
