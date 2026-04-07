"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SessionContent() {
  const searchParams = useSearchParams()
  const problem = searchParams.get("problem")

  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

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
    setVisibleSteps([])

    try {
      const res = await fetch("https://myvirtualtutor-backend-new.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageToSend })
      })

      const data = await res.json()

      const newMessage = { role: "assistant", text: data.reply || "Error" }

      setMessages((prev) => [...prev, newMessage])

      // 🔥 ANIMATE STEPS
      const stepsCount = data.reply.split("Step").length - 1

      let i = 0
      const interval = setInterval(() => {
        setVisibleSteps((prev) => [...prev, i])
        i++
        if (i >= stepsCount + 1) clearInterval(interval)
      }, 700)

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error" }
      ])
    }
  }

  const formatSteps = (text: string) => {
    const parts = text.split("Final answer:")
    const stepsPart = parts[0]
    const finalAnswer = parts[1]

    const steps = stepsPart.split("Step").slice(1).map((chunk) => {
      const lines = chunk.split("\n").filter(l => l.trim() !== "")
      return {
        title: "Step " + lines[0],
        details: lines.slice(1)
      }
    })

    return { steps, finalAnswer }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col p-6">

      <div className="flex-1 overflow-y-auto space-y-6 mb-4">

        {messages.map((msg, i) => {
          if (msg.role === "user") {
            return (
              <div key={i} className="bg-blue-600 text-white p-3 rounded-xl max-w-md ml-auto">
                {msg.text}
              </div>
            )
          }

          const { steps, finalAnswer } = formatSteps(msg.text)

          return (
            <div key={i} className="space-y-4 max-w-md">

              {steps.map((step, idx) =>
                visibleSteps.includes(idx) ? (
                  <div
                    key={idx}
                    className="bg-white border p-4 rounded-xl shadow-sm transition-opacity duration-500"
                  >
                    <p className="font-semibold mb-2">{step.title}</p>
                    {step.details.map((d, j) => (
                      <p key={j} className="text-gray-600">{d}</p>
                    ))}
                  </div>
                ) : null
              )}

              {finalAnswer && visibleSteps.includes(steps.length) && (
                <div className="bg-green-100 border border-green-300 p-4 rounded-xl">
                  <p className="font-semibold text-green-800">Final Answer</p>
                  <p className="text-green-900 text-lg mt-1">{finalAnswer.trim()}</p>
                </div>
              )}

            </div>
          )
        })}

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
