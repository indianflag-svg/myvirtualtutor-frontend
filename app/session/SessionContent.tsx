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

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔥 AUTO SEND
  useEffect(() => {
    if (initialQuestion) {
      sendMessage(initialQuestion)
    }
  }, [initialQuestion])

  const typeMessage = async (text) => {
    let displayed = ""
    for (let i = 0; i < text.length; i++) {
      displayed += text[i]

      await new Promise((res) => setTimeout(res, 10)) // typing speed

      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: displayed
        }
        return updated
      })
    }
  }

  const sendMessage = async (text) => {
    if (!text) return

    setMessages((prev) => [...prev, { role: "user", content: text }])

    // placeholder message for typing effect
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "" }
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
      const reply = data.reply || "Here’s the solution."

      await typeMessage(reply)

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
            className={`p-3 rounded-2xl max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto"
                : "bg-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  )
}
