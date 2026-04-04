"use client"

import { useState, useEffect } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [file, setFile] = useState(null)
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
    if (!input.trim() && !file) return

    setLoading(true)

    const formData = new FormData()
    formData.append("message", input)
    formData.append("sessionId", sessionId)
    if (file) formData.append("file", file)

    setMessages(prev => [...prev, { role: "user", text: input || "[uploaded file]" }])
    setInput("")
    setFile(null)

    const res = await fetch(API_BASE + "/chat", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    const lines = data.reply.split("\n")

    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 400))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>MyVirtualTutor</h2>

      <div style={{ height: "350px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "You" : "Tutor"}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask or upload..."
      />

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  )
}
