"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">
            MyVirtualTutor
          </Link>

          <div className="flex items-center gap-5">
            <Link href="/worksheets" className="text-gray-600 hover:text-gray-900">
              Worksheets
            </Link>

            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            AI Math Tutor for Grades 6–12
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Learn math with a tutor that explains every step.
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
            MyVirtualTutor helps students practice algebra, fractions, percentages, and more with calm, step-by-step explanations.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/session?problem=5/6-1/3" className="bg-blue-600 text-white px-7 py-4 rounded-2xl font-semibold hover:bg-blue-700 shadow-md">
              Start Learning
            </Link>

            <Link href="/worksheets" className="bg-white border border-gray-300 px-7 py-4 rounded-2xl font-semibold hover:bg-gray-100">
              Practice Worksheets
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
            <div>
              <p className="font-bold text-gray-900">Tutor Preview</p>
              <p className="text-sm text-gray-500">Example step-by-step explanation</p>
            </div>

            <span className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
              Live Demo
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md">
                5/6 - 1/3
              </div>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4">
              <p className="font-semibold mb-1">Step 1: Find a common denominator</p>
              <p className="text-gray-600">1/3 = 2/6</p>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4">
              <p className="font-semibold mb-1">Step 2: Subtract</p>
              <p className="text-gray-600">5/6 - 2/6 = 3/6</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="font-semibold text-green-800 mb-1">Final Answer</p>
              <p className="text-green-900 text-xl font-bold">1/2</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Step-by-step help</h3>
            <p className="text-gray-600">Students learn the process instead of copying answers.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Worksheets + tutor</h3>
            <p className="text-gray-600">Practice problems connect directly to the AI tutor.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Built for math</h3>
            <p className="text-gray-600">Focused on math learning, not random chatbot answers.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
