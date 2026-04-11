"use client"

import { useState } from "react"

export default function WorksheetPage() {
  const [answers, setAnswers] = useState({})

  const problems = [
    { id: 1, question: "Example problem 1 =" },
    { id: 2, question: "Example problem 2 =" },
    { id: 3, question: "Example problem 3 =" }
  ]

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value })
  }

  const openTutor = (question) => {
    window.location.href = `/session?question=${encodeURIComponent(question)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-10">

      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">
          Worksheet Practice (Free + Step-by-Step Help)
        </h1>
        <p className="text-gray-600 mb-5">
          Practice problems and get instant step-by-step explanations with your AI tutor.
        </p>

        <button
          onClick={() => openTutor("Help me solve this worksheet")}
          className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
        >
          Start Solving with AI Tutor
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {problems.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-lg font-medium mb-3">
              {p.id}. {p.question}
            </p>

            <input
              type="text"
              placeholder="Your answer"
              value={answers[p.id] || ""}
              onChange={(e) => handleChange(p.id, e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <button
              onClick={() => openTutor(p.question)}
              className="text-sm text-blue-600 hover:underline"
            >
              Get step-by-step help →
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center mt-12 bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-2">
          Stuck on a problem?
        </h2>
        <p className="text-gray-600 mb-4">
          Get instant step-by-step help from your AI tutor.
        </p>

        <button
          onClick={() => openTutor("I need help with this worksheet")}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Start Free Session
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-12 text-sm text-gray-600 leading-relaxed">
        <h3 className="font-semibold mb-2">
          About this worksheet
        </h3>
        <p>
          These worksheets help students practice core math skills with guided,
          step-by-step solutions. Use the AI tutor to understand each step and
          improve your problem-solving skills.
        </p>
      </div>

    </div>
  )
}
