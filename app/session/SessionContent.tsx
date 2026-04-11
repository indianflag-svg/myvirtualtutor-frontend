"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

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

  // 🔥 Convert simple fractions → LaTeX
  const formatMath = (text) => {
    return text.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: formatMath(reply) }
      ])

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response." }
      ])
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
            {msg.role === "assistant"
              ? <BlockMath math={msg.content} />
              : msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            Solving...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  )
}
