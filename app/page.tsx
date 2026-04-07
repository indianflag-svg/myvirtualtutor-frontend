"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold mb-6">
        Learn Math <span className="text-blue-600">Step-by-Step</span>
      </h1>

      <p className="text-lg text-gray-600 mb-10 max-w-xl">
        Built for grades 6–12. A calm AI tutor that teaches you how to solve problems — not just gives answers.
      </p>

      <div className="flex gap-4">
        
        {/* 🔥 FIXED BUTTON */}
        <Link href="/session?problem=2x+6=10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
            Start Learning
          </button>
        </Link>

        <Link href="/worksheets">
          <button className="border px-6 py-3 rounded-xl font-semibold">
            Practice Worksheets
          </button>
        </Link>

      </div>

    </main>
  )
}
