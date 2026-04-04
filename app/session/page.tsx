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

  function cleanLines(text) {
    return text
      .split("\n")
      .map(l => l.trim())
      .filter((l, i, arr) => l.length > 0 && l !== arr[i - 1])
  }

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
    const lines = cleanLines(data.reply)

    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 300))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    setLoading(false)
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#f4f6f8",
      fontFamily: "Arial"
    }}>

      {/* CHAT PANEL */}
      <div style={{
        width: "35%",
        background: "#ffffff",
        borderRight: "2px solid #e0e0e0",
        display: "flex",
        flexDirection: "column"
      }}>

        <div style={{
          padding: "15px",
          borderBottom: "1px solid #eee",
          fontWeight: "bold"
        }}>
          MyVirtualTutor
        </div>

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              marginBottom: "10px",
              textAlign: m.role === "user" ? "right" : "left"
            }}>
              <span style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                background: m.role === "user" ? "#007bff" : "#e9ecef",
                color: m.role === "user" ? "white" : "black",
                maxWidth: "80%"
              }}>
                {m.text}
              </span>
            </div>
          ))}
          {loading && <div style={{ color: "#888" }}>Tutor is thinking...</div>}
        </div>

        <div style={{
          padding: "10px",
          borderTop: "1px solid #eee"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a math question..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ marginBottom: "8px" }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              background: "#007bff",
              color: "white",
              border: "none"
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

      </div>

      {/* WHITEBOARD PANEL */}
      <div style={{
        flex: 1,
        background: "#ffffff",
        padding: "20px"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Whiteboard</h3>

        <div style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          height: "80%",
          background: "#fff"
        }}>
          {/* (canvas already exists in your logic) */}
        </div>
      </div>

    </div>
  )
}
