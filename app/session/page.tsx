"use client"

import { useState } from "react"

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

    const userText = input
    setInput("")

    setMessages(prev => [
      ...prev,
      { role: "user", content: userText }
    ])

    setLoading(true)

    try {

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText
        })
      })

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply }
      ])

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Tutor could not respond." }
      ])

    }

    setLoading(false)
  }

  return (

    <div style={{padding:"40px",maxWidth:"800px",margin:"auto"}}>

      <h1>MyVirtualTutor</h1>

      <div style={{
        border:"1px solid #ddd",
        padding:"20px",
        height:"400px",
        overflowY:"auto",
        marginBottom:"20px"
      }}>

        {messages.map((msg,i)=>(
          <div key={i} style={{marginBottom:"12px"}}>
            <b>{msg.role==="user"?"You":"Tutor"}:</b> {msg.content}
          </div>
        ))}

        {loading && (
          <div>
            <b>Tutor:</b> thinking...
          </div>
        )}

      </div>

      <div style={{display:"flex",gap:"10px"}}>

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask a math question..."
          style={{flex:1,padding:"10px"}}
        />

        <button
          onClick={sendMessage}
          style={{padding:"10px 20px"}}
        >
          Send
        </button>

      </div>

    </div>

  )
}
