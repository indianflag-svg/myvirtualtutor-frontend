"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default function SessionContent() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("question")

  const [messages, setMessages] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (initialQuestion) {
      startSolving(initialQuestion)
    }
  }, [initialQuestion])

  const formatInlineMath = (text) => {
    return text.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
  }

  const renderLine = (text) => {
    const parts = text.split(/(\d+\/\d+)/g)

    return parts.map((part, i) => {
      if (/\d+\/\d+/.test(part)) {
        return <InlineMath key={i} math={formatInlineMath(part)} />
      }
      return <span key={i}>{part}</span>
    })
  }

  const parseSteps = (text) => {
    return text
      .split("\n")
      .filter(l => l.trim() !== "")
  }

  const startSolving = async (question) => {
    setMessages([{ role: "user", content: question }])
    setLoading(true)

    try {
      const res = await fetch("https://myvirtualtutor-backend-2.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: question })
      })

      const data = await res.json()
      const reply = data.reply || ""

      const parsedSteps = parseSteps(reply)
      setSteps(parsedSteps)

      // show first step only
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: parsedSteps[0] },
        { role: "assistant", content: "What should we do next?" }
      ])

      setCurrentStep(1)

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response." }
      ])
    }

    setLoading(false)
  }

  const handleUserAnswer = (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }])

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

  const [input, setInput] = useState("")

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
            Preparing steps...
          </div>
        )}

        <div ref={bottomRef} />

        {/* INPUT BOX */}
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer..."
            className="flex-1 p-2 rounded-lg text-black"
          />
          <button
            onClick={() => {
              handleUserAnswer(input)
              setInput("")
            }}
            className="bg-blue-600 px-4 rounded-lg"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  )
}
