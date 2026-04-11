"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default function SessionContent() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("question")

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (initialQuestion) {
      sendMessage(initialQuestion)
    }
  }, [initialQuestion])

  // 🔥 Convert fractions → LaTeX inline
  const formatInlineMath = (text) => {
    return text.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
  }

  // 🔥 Split into structured steps
  const parseSteps = (text) => {
    const lines = text.split("\n").filter(l => l.trim() !== "")

    return lines.map((line) => {
      if (line.toLowerCase().includes("step")) {
        return { type: "step", content: line }
      }
      if (line.toLowerCase().includes("final")) {
        return { type: "final", content: line }
      }
      return { type: "text", content: line }
    })
  }

  const sendMessage = async (text) => {
    if (!text) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setLoading(true)

    try {
      const res = await fetch("https://myvirtualtutor-backend-2.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      })

      const data = await res.json()
      const reply = data.reply || "Here’s the solution."

      const structured = parseSteps(reply)

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: structured }
      ])

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: [{ type: "text", content: "Error getting response." }] }
      ])
    }

    setLoading(false)
  }

  // 🔥 Render text with inline math
  const renderLine = (text) => {
    const parts = text.split(/(\d+\/\d+)/g)

    return parts.map((part, i) => {
      if (/\d+\/\d+/.test(part)) {
        return <InlineMath key={i} math={formatInlineMath(part)} />
      }
      return <span key={i}>{part}</span>
    })
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
            {msg.role === "user" && msg.content}

            {msg.role === "assistant" && (
              <div className="space-y-2">

                {msg.content.map((block, idx) => {
                  if (block.type === "step") {
                    return (
                      <div key={idx} className="text-blue-400 font-semibold">
                        {renderLine(block.content)}
                      </div>
                    )
                  }

                  if (block.type === "final") {
                    return (
                      <div key={idx} className="mt-3 text-green-400 font-bold text-lg">
                        {renderLine(block.content)}
                      </div>
                    )
                  }

                  return (
                    <div key={idx} className="text-gray-200">
                      {renderLine(block.content)}
                    </div>
                  )
                })}

              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            Solving step-by-step...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  )
}
