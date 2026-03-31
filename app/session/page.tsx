"use client"

import { useState } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  async function sendMessage() {
    if (!input.trim()) return

    const userMsg = input
    setInput("")

    setMessages(prev => [...prev, { role: "user", text: userMsg }])

    const res = await fetch(API_BASE + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    })

    const data = await res.json()

    setMessages(prev => [...prev, { role: "assistant", text: data.reply }])
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>MyVirtualTutor</h2>

      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.role === "user" ? "You" : "Tutor"}:</b> {m.text}
        </div>
      ))}

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask a math question..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
