"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SessionPage() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("question")

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m your math tutor. Ask me anything." }
  ])
  const [loading, setLoading] = useState(false)

  // 🔥 AUTO-SEND ON LOAD
  useEffect(() => {
    if (initialQuestion) {
      sendMessage(initialQuestion)
    }
  }, [initialQuestion])

  const sendMessage = async (text) => {
    if (!text) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: text }])

    // ⚡ INSTANT RESPONSE (fix latency)
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Got it — let’s solve this step by step 👇" }
    ])

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

      // Replace loading message with real response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Here’s the solution." }
      ])

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response. Try again." }
      ])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">

      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg ${
            msg.role === "user" ? "bg-gray-200" : "bg-gray-100"
          }`}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm">
            Thinking...
          </div>
        )}
      </div>

    </div>
  )
}
