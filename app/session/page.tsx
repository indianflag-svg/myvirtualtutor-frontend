"use client"

import { useState, useEffect, useRef } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)

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

  function startDraw(e) {
    setDrawing(true)
    draw(e)
  }

  function endDraw() {
    setDrawing(false)
  }

  function draw(e) {
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  function clearBoard() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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

    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 500))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    setLoading(false)
  }

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      {/* Chat */}
      <div style={{ width: "40%" }}>
        <h2>MyVirtualTutor</h2>

        <div style={{ height: "400px", overflowY: "auto" }}>
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
      <div style={{ width: "60%" }}>
        <h3>Whiteboard</h3>

        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ border: "1px solid black", background: "white" }}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
          onMouseLeave={endDraw}
        />

        <button onClick={clearBoard}>Clear</button>
      </div>

    </div>
  )
}
