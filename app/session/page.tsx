"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

const API_BASE = "https://myvirtualtutor-backend-2.onrender.com"

export default function SessionPage() {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your math tutor. What problem would you like help with?"
    }
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {

    if (!input.trim()) return

    const userMessage = input
    setInput("")

    setMessages(prev => [
      ...prev,
      { role: "user", content: userMessage }
    ])

    setLoading(true)

    try {

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      })

      const data = await res.json()

      typeWriter(data.reply)

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Tutor could not respond."
        }
      ])

    }

    setLoading(false)
  }

  function typeWriter(text:string){

    let index = 0

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: "" }
    ])

    const interval = setInterval(()=>{

      index++

      setMessages(prev=>{
        const last = prev[prev.length-1]

        const updated = {
          ...last,
          content: text.slice(0,index)
        }

        return [...prev.slice(0,-1),updated]
      })

      if(index >= text.length){
        clearInterval(interval)
      }

    },20)

  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "40px"
    }}>

      <h1>MyVirtualTutor</h1>

      <div style={{
        border: "1px solid #ddd",
        height: "400px",
        overflowY: "auto",
        padding: "20px",
        marginBottom: "20px"
      }}>

        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <b>{m.role === "user" ? "You" : "Tutor"}:</b>

            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {m.content}
            </ReactMarkdown>

          </div>
        ))}

        {loading && (
          <div>
            <b>Tutor:</b> thinking...
          </div>
        )}

      </div>

      <div style={{ display: "flex", gap: "10px" }}>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
          placeholder="Ask a math question..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white"
          }}
        >
          Send
        </button>

      </div>

    </div>
  )
}
