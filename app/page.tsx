"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            AI Tutor for Grades 6–12
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Learn Math <span className="text-blue-600">Step-by-Step</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
            A calm AI tutor that explains the process — not just the answer.
            Practice algebra, fractions, percentages, and more with guided help.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/session?problem=2x%2B6%3D10">
              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-4 rounded-2xl font-semibold shadow-md">
                Start Learning
              </button>
            </Link>

            <Link href="/worksheets">
              <button className="bg-white border border-gray-300 hover:bg-gray-100 transition px-7 py-4 rounded-2xl font-semibold">
                Practice Worksheets
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4 flex items-center justify-between bg-gray-50">
            <div>
              <p className="font-semibold">MyVirtualTutor</p>
              <p className="text-sm text-gray-500">Step-by-step tutoring</p>
            </div>

            <div className="text-xs text-green-600 font-medium">
              Tutor Preview
            </div>
          </div>

          <div className="p-6 space-y-4 bg-[#fbfcfe]">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-sm">
                5/6 - 1/3
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              Step 1: Find a common denominator
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              1/3 = 2/6
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              Step 2: Subtract
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 shadow-sm text-green-700 font-semibold">
              Final Answer: 1/2
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
