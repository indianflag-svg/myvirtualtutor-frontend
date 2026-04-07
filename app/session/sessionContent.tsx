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
      const res = await fetch("https://myvirtualtutor-backend-new.onrender.com/chat", {
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
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error" }
      ])
    }
  }

  // 🔥 SPLIT STEPS CLEANLY
  const formatSteps = (text: string) => {
    return text.split("\n").filter(line => line.trim() !== "")
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col p-6">

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">

        {messages.map((msg, i) => (
          <div key={i}>

            {msg.role === "user" && (
              <div className="bg-blue-600 text-white p-3 rounded-xl max-w-md ml-auto">
                {msg.text}
              </div>
            )}

            {msg.role === "assistant" && (
              <div className="space-y-3 max-w-md">

                {formatSteps(msg.text).map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white border p-4 rounded-xl shadow-sm"
                  >
                    {step}
                  </div>
                ))}

              </div>
            )}

          </div>
        ))}

      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a math question..."
        />

        <button
          onClick={() => handleSend()}
          className="bg-blue-600 text-white px-4 rounded-xl"
        >
          Send
        </button>
      </div>

    </main>
  )
}
