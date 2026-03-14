"use client"

import { useState } from "react"

const API_BASE = "https://myvirtualtutor-backend-2.onrender.com"

export default function SessionPage() {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      steps: ["Hi! I'm your math tutor. What problem would you like help with?"]
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
      { role: "user", text: userMessage }
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

      animateSteps(data.steps || ["Tutor could not generate steps."])

    } catch {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          steps: ["Tutor could not respond."]
        }
      ])

    }

    setLoading(false)
  }

  function animateSteps(steps){

    let visibleSteps = []

    setMessages(prev => [
      ...prev,
      { role: "assistant", steps: [] }
    ])

    steps.forEach((step, index)=>{

      setTimeout(()=>{

        visibleSteps.push(step)

        setMessages(prev=>{
          const last = prev[prev.length-1]
          const updated = { ...last, steps: [...visibleSteps] }
          return [...prev.slice(0,-1), updated]
        })

      }, index * 1200)

    })

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

          <div key={i} style={{ marginBottom: "16px" }}>

            <b>{m.role === "user" ? "You" : "Tutor"}:</b>

            {m.role === "user" && (
              <div>{m.text}</div>
            )}

            {m.role === "assistant" && m.steps && (

              <div style={{ marginTop: "8px" }}>

                {m.steps.map((step, s)=>(
                  <div key={s} style={{
                    padding:"6px 0",
                    fontSize:"18px"
                  }}>
                    {step}
                  </div>
                ))}

              </div>

            )}

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
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter") sendMessage()
          }}
          placeholder="Ask a math question..."
          style={{
            flex:1,
            padding:"10px",
            border:"1px solid #ccc"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding:"10px 20px",
            background:"black",
            color:"white"
          }}
        >
          Send
        </button>

      </div>

    </div>
  )
}
