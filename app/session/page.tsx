"use client"

import { useState } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    const userMsg = input
    setInput("")

    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch(API_BASE + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      })

      const data = await res.json()

      setMessages(prev => [...prev, { role: "assistant", text: data.reply }])

    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Error contacting server" }])
    }

    setLoading(false)
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h2 style={{ textAlign: "center" }}>MyVirtualTutor</h2>

      <div style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        background: "#fafafa"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: "10px",
            textAlign: m.role === "user" ? "right" : "left"
          }}>
            <div style={{
              display: "inline-block",
              padding: "10px",
              borderRadius: "10px",
              background: m.role === "user" ? "#007bff" : "#e5e5ea",
              color: m.role === "user" ? "white" : "black",
              maxWidth: "80%",
              whiteSpace: "pre-wrap"
            }}>
              {m.text.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a math question..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#007bff",
            color: "white"
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

    </div>
  )
}
