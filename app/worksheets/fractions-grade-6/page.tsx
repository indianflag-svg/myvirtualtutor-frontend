"use client"

import Link from "next/link"

export default function Worksheet() {
  const problems = [
    "1/2 + 3/4",
    "5/6 - 1/3",
    "2/3 × 4/5",
    "7/8 ÷ 2/3",
    "3/4 + 2/5"
  ]

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">

      {/* TITLE */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">
          6th Grade Fractions Worksheet
        </h1>
        <p className="text-gray-600">
          Practice fractions step-by-step. Get help instantly if you get stuck.
        </p>
      </div>

      {/* PROBLEMS */}
      <div className="max-w-2xl mx-auto space-y-6">

        {problems.map((problem, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border shadow-sm">

            <p className="font-semibold mb-3">
              Problem {index + 1}
            </p>

            <p className="text-lg mb-4">
              {problem}
            </p>

            {/* CTA */}
            <Link href={`/session?problem=${encodeURIComponent(problem)}`}>
              <button className="text-blue-600 font-medium hover:underline">
                Solve step-by-step →
              </button>
            </Link>

          </div>
        ))}

      </div>

      {/* BIG CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-4">
          Need help with any problem?
        </p>

        <Link href="/session">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
            Ask AI Tutor
          </button>
        </Link>
      </div>

    </main>
  )
}
