"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const steps = [
    "Step 1: Find a common denominator",
    "5/6 = 5/6",
    "1/3 = 2/6",
    "Step 2: Subtract",
    "5/6 - 2/6 = 3/6",
    "Final Answer: 1/2"
  ]

  const [visibleSteps, setVisibleSteps] = useState<string[]>([])

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (i >= steps.length) return prev
        return [...prev, steps[i]]
      })

      i++

      if (i >= steps.length) {
        clearInterval(interval)
      }
    }, 700)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900">

      {/* NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
              M
            </div>

            <span className="font-semibold text-lg">
              MyVirtualTutor
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/worksheets"
              className="text-gray-600 hover:text-black transition"
            >
              Worksheets
            </Link>

            <Link
              href="/pricing"
              className="text-gray-600 hover:text-black transition"
            >
              Pricing
            </Link>

            <Link href="/session?problem=2x+6=10">
              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl font-medium shadow-sm">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            AI Tutor for Grades 6–12
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Learn Math
            <span className="text-blue-600"> Step-by-Step</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
            A calm AI tutor that explains the process — not just the answer.
            Practice algebra, fractions, percentages, and more with guided help.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">

            <Link href="/session?problem=5/6-1/3">
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

          <div className="flex items-center gap-8 text-sm text-gray-500">

            <div>
              <p className="font-semibold text-gray-800">Step-by-step</p>
              <p>Teaching-focused</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Homework Help</p>
              <p>Guided explanations</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Interactive</p>
              <p>Animated tutor flow</p>
            </div>

          </div>

        </div>

        {/* RIGHT DEMO */}
        <div className="relative">

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

            {/* HEADER */}
            <div className="border-b border-gray-100 px-5 py-4 flex items-center justify-between bg-gray-50">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                  AI
                </div>

                <div>
                  <p className="font-semibold">
                    MyVirtualTutor
                  </p>

                  <p className="text-sm text-gray-500">
                    Step-by-step tutoring
                  </p>
                </div>

              </div>

              <div className="text-xs text-green-600 font-medium">
                Live Demo
              </div>

            </div>

            {/* CHAT */}
            <div className="p-6 space-y-4 bg-[#fbfcfe] min-h-[500px]">

              {/* USER */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-sm">
                  5/6 - 1/3
                </div>
              </div>

              {/* AI STEPS */}
              <div className="space-y-3">

                {visibleSteps.map((step, index) => {

                  const isFinal = step.includes("Final Answer")

                  return (
                    <div
                      key={index}
                      className={`rounded-2xl p-4 shadow-sm border transition-all duration-500 ${
                        isFinal
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <p
                        className={`${
                          isFinal
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  )
                })}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Students Love It
          </h2>

          <p className="text-gray-600 text-lg">
            Built to help students actually understand math.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="font-semibold mb-2">
              Step-by-Step
            </h3>
            <p className="text-gray-600 text-sm">
              Guided explanations instead of answer dumps.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">📷</div>
            <h3 className="font-semibold mb-2">
              Homework Help
            </h3>
            <p className="text-gray-600 text-sm">
              Practice with fractions, algebra, percentages, and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="font-semibold mb-2">
              Understand Concepts
            </h3>
            <p className="text-gray-600 text-sm">
              Learn the reasoning behind every step.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">
              Fast & Interactive
            </h3>
            <p className="text-gray-600 text-sm">
              Animated tutor-style explanations in real time.
            </p>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-6xl mx-auto px-6 py-24">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Students & Parents Say
            </h2>

            <p className="text-gray-600 text-lg">
              Early feedback from students using MyVirtualTutor.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                “This actually explains math better than my teacher.
                I finally understand algebra.”
              </p>

              <p className="font-semibold">
                — 8th Grade Student
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                “My son stopped guessing answers and started understanding the steps.”
              </p>

              <p className="font-semibold">
                — Parent
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                “Way better than just getting answers.
                It actually teaches.”
              </p>

              <p className="font-semibold">
                — High School Student
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Simple Pricing
        </h2>

        <p className="text-gray-600 text-lg mb-12">
          Affordable tutoring help anytime you need it.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl max-w-lg mx-auto p-10">

          <p className="text-5xl font-bold mb-2">
            $10
            <span className="text-xl text-gray-500 font-medium">
              /month
            </span>
          </p>

          <p className="text-gray-500 mb-8">
            Unlimited access to step-by-step tutoring
          </p>

          <div className="space-y-4 text-left mb-10">

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Unlimited questions</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Homework help</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Step-by-step tutoring</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Interactive learning experience</span>
            </div>

          </div>

          <Link href="/session?problem=2x+6=10">
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold shadow-md">
              Start Learning
            </button>
          </Link>

        </div>

      </section>

    </main>
  )
}
