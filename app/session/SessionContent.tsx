"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"

export default function SessionContent() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("question")

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m your math tutor. Ask me anything." }
  ])
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

  // 🔥 FORMAT RESPONSE INTO STEPS
  const formatSteps = (text) => {
    const lines = text.split("\n").filter(l => l.trim() !== "")

    return lines.map((line, i) => {
      if (line.toLowerCase().includes("step")) {
        return { type: "step", content: line }
      }
      if (line.toLowerCase().includes("final")) {
        return { type: "final", content: line }
      }
      return { type: "text", content: line }
    })
  }

  const typeMessage = async (text) => {
    const formatted = formatSteps(text)

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: formatted }
    ])
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

      await typeMessage(reply)

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: [{ type: "text", content: "Error getting response." }] }
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
            {typeof msg.content === "string" ? (
              msg.content
            ) : (
              msg.content.map((block, idx) => {
                if (block.type === "step") {
                  return (
                    <div key={idx} className="mb-2">
                      <div className="text-blue-400 font-semibold">
                        {block.content}
                      </div>
                    </div>
                  )
                }

                if (block.type === "final") {
                  return (
                    <div key={idx} className="mt-3 text-green-400 font-bold">
                      {block.content}
                    </div>
                  )
                }

                return (
                  <div key={idx} className="text-gray-200">
                    {block.content}
                  </div>
                )
              })
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
