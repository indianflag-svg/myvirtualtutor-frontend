"use client"

import { useState, useEffect } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    let id = localStorage.getItem("sessionId")
    if (!id) {
      id = Math.random().toString(36).substring(2)
      localStorage.setItem("sessionId", id)
    }
    setSessionId(id)
  }, [])

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
        body: JSON.stringify({ message: userMsg, sessionId })
      })

      const data = await res.json()

      const lines = data.reply.split("\n")

      for (let i = 0; i < lines.length; i++) {
        await new Promise(r => setTimeout(r, 600))
        setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
      }

    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Error contacting server" }])
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>MyVirtualTutor</h2>

      <div style={{ height: "400px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "You" : "Tutor"}:</b> {m.text}
          </div>
        ))}
        {loading && <div>Tutor is thinking...</div>}
      </div>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage} disabled={loading}>Send</button>
    </div>
  )
}
