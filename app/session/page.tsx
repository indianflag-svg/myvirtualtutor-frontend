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
      await new Promise(r => setTimeout(r, 250))
      setMessages(prev => [...prev, { role: "assistant", text: lines[i] }])
    }

    setLoading(false)
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#eef2f7",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* CHAT PANEL */}
      <div style={{
        width: "32%",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
      }}>

        <div style={{
          padding: "18px",
          borderBottom: "1px solid #f1f1f1",
          fontWeight: "600",
          fontSize: "16px"
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
              marginBottom: "12px",
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                padding: "12px 14px",
                borderRadius: "14px",
                background: m.role === "user" ? "#2563eb" : "#e2e8f0",
                color: m.role === "user" ? "white" : "#111",
                maxWidth: "75%",
                fontSize: "14px",
                lineHeight: "1.4",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: "#888" }}>Tutor is thinking...</div>}
        </div>

        <div style={{
          padding: "15px",
          borderTop: "1px solid #f1f1f1"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a math question..."
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none"
            }}
          />

          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ marginBottom: "10px" }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

      </div>

      {/* WHITEBOARD PANEL */}
      <div style={{
        flex: 1,
        padding: "25px",
        background: "#f8fafc"
      }}>
        <h3 style={{
          marginBottom: "15px",
          fontWeight: "600"
        }}>
          Whiteboard
        </h3>

        <div style={{
          border: "2px solid #e5e7eb",
          borderRadius: "14px",
          height: "80%",
          background: "#ffffff",
          boxShadow: "0 6px 25px rgba(0,0,0,0.05)"
        }}>
        </div>
      </div>

    </div>
  )
}
