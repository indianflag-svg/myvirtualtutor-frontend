"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"

export default function SessionContent() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("problem") || searchParams.get("question")

  const [messages, setMessages] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (initialQuestion) {
      startSolving(initialQuestion)
    }
  }, [initialQuestion])

  const startSolving = async (question) => {
    setMessages([{ role: "user", content: question }])
    setLoading(true)

    const res = await fetch("https://myvirtualtutor-backend-2.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    })

    const data = await res.json()
    const parsedSteps = parseSteps(data.reply || "")

    setSteps(parsedSteps)

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: parsedSteps[0] },
      { role: "assistant", content: "What should we do next?" }
    ])

    setCurrentStep(1)
    setLoading(false)
  }

  // 🔥 SMART FEEDBACK CHECK
  const checkAnswer = async (userAnswer) => {
    const prompt = `
We are solving a math problem step-by-step.

Current step: ${steps[currentStep - 1]}
Student answer: ${userAnswer}

Is the student correct? Respond in this format:
CORRECT or INCORRECT
Then a short explanation.
`

    const res = await fetch("https://myvirtualtutor-backend-2.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
    })

    const data = await res.json()
    return data.reply || ""
  }

  const handleUserAnswer = async () => {
    if (!input) return

    const userInput = input
    setInput("")

    setMessages((prev) => [...prev, { role: "user", content: userInput }])
    setLoading(true)

    const feedback = await checkAnswer(userInput)

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: feedback }
    ])

    // 🔥 If correct → move forward
    if (feedback.toLowerCase().includes("correct")) {
      if (currentStep < steps.length) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: steps[currentStep] }
        ])

        setCurrentStep((prev) => prev + 1)

        if (currentStep + 1 < steps.length) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "What should we do next?" }
          ])
        }
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">

      <div className="max-w-2xl mx-auto space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto"
                : "bg-gray-800"
            }`}
          >
            {renderLine(msg.content)}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            Checking your answer...
          </div>
        )}

        <div ref={bottomRef} />

        {/* INPUT */}
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer..."
            className="flex-1 p-2 rounded-lg text-black"
          />
          <button
            onClick={handleUserAnswer}
            className="bg-blue-600 px-4 rounded-lg"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  )
}
