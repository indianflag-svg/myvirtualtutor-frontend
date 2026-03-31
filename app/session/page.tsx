"use client"

import { useState } from "react"

const API_BASE = "https://myvirtualtutor-backend-new.onrender.com"

export default function SessionPage() {

  const [chat, setChat] = useState([
    { role:"assistant", text:"Hi! I'm your math tutor. Ask me a math problem." }
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage(){

    if(!input.trim()) return

    const userMessage = input
    setInput("")

    setChat(prev=>[
      ...prev,
      { role:"user", text:userMessage }
    ])

    setLoading(true)

    try{

      const res = await fetch(API_BASE + "/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ message:userMessage })
      })

      const data = await res.json()

      setChat(prev=>[
        ...prev,
        { role:"assistant", text:data.reply }
      ])

    }catch{
      setChat(prev=>[
        ...prev,
        { role:"assistant", text:"Error contacting tutor server" }
      ])
    }

    setLoading(false)
  }

  return (
    <div style={{padding:"20px"}}>
      <h2>MyVirtualTutor</h2>

      <div style={{marginBottom:"20px"}}>
        {chat.map((msg,i)=>(
          <div key={i}>
            <b>{msg.role === "user" ? "You" : "Tutor"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={e=>setInput(e.target.value)}
        placeholder="Type a math problem..."
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  )
}
