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
    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
  }

  function draw(e) {
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = "#111"

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
      await new Promise(r => setTimeout(r, 400))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    setLoading(false)
  }

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      {/* Chat */}
      <div style={{
        width: "40%",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        background: "#fafafa"
      }}>
        <h3>Chat</h3>

        <div style={{
          height: "350px",
          overflowY: "auto",
          marginBottom: "10px"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              marginBottom: "8px",
              textAlign: m.role === "user" ? "right" : "left"
            }}>
              <span style={{
                padding: "8px",
                borderRadius: "8px",
                background: m.role === "user" ? "#007bff" : "#e5e5ea",
                color: m.role === "user" ? "white" : "black"
              }}>
                {m.text}
              </span>
            </div>
          ))}
          {loading && <div style={{ color: "#888" }}>Tutor is thinking...</div>}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Whiteboard */}
      <div style={{
        width: "60%",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        background: "#fff"
      }}>
        <h3>Whiteboard</h3>

        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
            cursor: "crosshair",
            width: "100%"
          }}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
          onMouseLeave={endDraw}
        />

        <button
          onClick={clearBoard}
          style={{ marginTop: "10px", padding: "8px" }}
        >
          Clear Board
        </button>
      </div>

    </div>
  )
}
