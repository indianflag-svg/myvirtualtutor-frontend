"use client"

import { useState, useEffect, useRef } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const canvasRef = useRef(null)

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

  function clearBoard() {
    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, 500, 400)
  }

  async function writeToBoard(lines) {
    const ctx = canvasRef.current.getContext("2d")

    ctx.clearRect(0, 0, 500, 400)
    ctx.font = "16px Arial"
    ctx.fillStyle = "black"

    let y = 30

    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 700))
      ctx.fillText(lines[i], 20, y)
      y += 25
    }
  }

  async function sendMessage() {
    if (!input.trim()) return

    const userMsg = input
    setInput("")
    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setLoading(true)

    const res = await fetch(API_BASE + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg, sessionId })
    })

    const data = await res.json()
    const lines = data.reply.split("\n")

    // animate chat
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 400))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    // animate whiteboard
    await writeToBoard(lines)

    setLoading(false)
  }

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", fontFamily: "Arial" }}>

      {/* Chat */}
      <div style={{ width: "40%", border: "1px solid #ddd", borderRadius: "12px", padding: "15px" }}>
        <h3>Chat</h3>

        <div style={{ height: "350px", overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i}>
              <b>{m.role === "user" ? "You" : "Tutor"}:</b> {m.text}
            </div>
          ))}
          {loading && <div>Tutor is thinking...</div>}
        </div>

        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Whiteboard */}
      <div style={{ width: "60%", border: "1px solid #ddd", borderRadius: "12px", padding: "15px" }}>
        <h3>Whiteboard</h3>

        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ border: "2px solid #ccc", borderRadius: "8px" }}
        />
      </div>

    </div>
  )
}
