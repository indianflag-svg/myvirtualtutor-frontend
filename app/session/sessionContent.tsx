"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SessionContent() {
  const searchParams = useSearchParams()
  const problem = searchParams.get("problem")

  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    if (problem) {
      setInput(problem)
      handleSend(problem)
    }
  }, [problem])

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input
    if (!messageToSend) return

    setMessages((prev) => [...prev, { role: "user", text: messageToSend }])
    setInput("")

    try {
      const res = await fetch("http://localhost:10000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageToSend })
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "Error" }
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error" }
      ])
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6">

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-xl ${
              msg.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a math question..."
        />

        <button
          onClick={() => handleSend()}
          className="bg-blue-600 px-4 rounded-xl"
        >
          Send
        </button>
      </div>

    </main>
  )
}
