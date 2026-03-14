"use client"

import { useState } from "react"

const API_BASE = "https://myvirtualtutor-backend-2.onrender.com"

export default function SessionPage() {

  const [chat, setChat] = useState([
    { role:"assistant", text:"Hi! I'm your math tutor. Ask me a math problem." }
  ])

  const [steps, setSteps] = useState([])
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

      const res = await fetch(`${API_BASE}/chat`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({message:userMessage})
      })

      const data = await res.json()

      animateSteps(data.steps || [])

      setChat(prev=>[
        ...prev,
        { role:"assistant", text:"Let's solve this on the board." }
      ])

    }catch{

      setChat(prev=>[
        ...prev,
        { role:"assistant", text:"Tutor had trouble solving that." }
      ])

    }

    setLoading(false)

  }

  function animateSteps(stepList){

    setSteps([])

    stepList.forEach((step,index)=>{

      setTimeout(()=>{

        setSteps(prev=>[
          ...prev,
          step
        ])

      }, index*1200)

    })

  }

  return (

    <div style={{
      display:"flex",
      height:"100vh",
      fontFamily:"sans-serif"
    }}>

      {/* CHAT PANEL */}

      <div style={{
        width:"35%",
        borderRight:"1px solid #ddd",
        display:"flex",
        flexDirection:"column"
      }}>

        <div style={{
          padding:"20px",
          fontWeight:"bold"
        }}>
          MyVirtualTutor
        </div>

        <div style={{
          flex:1,
          overflowY:"auto",
          padding:"20px"
        }}>

          {chat.map((m,i)=>(
            <div key={i} style={{marginBottom:"12px"}}>
              <b>{m.role==="user"?"You":"Tutor"}:</b> {m.text}
            </div>
          ))}

          {loading && <div>Tutor is thinking...</div>}

        </div>

        <div style={{
          padding:"15px",
          borderTop:"1px solid #ddd",
          display:"flex",
          gap:"10px"
        }}>

          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") sendMessage()
            }}
            placeholder="Ask a math question..."
            style={{
              flex:1,
              padding:"10px"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding:"10px 18px",
              background:"black",
              color:"white"
            }}
          >
            Send
          </button>

        </div>

      </div>

      {/* WHITEBOARD */}

      <div style={{
        flex:1,
        background:"#ffffff",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}>

        <div style={{
          width:"80%",
          maxWidth:"700px",
          fontSize:"28px",
          lineHeight:"1.8"
        }}>

          {steps.map((s,i)=>(
            <div key={i}>
              {s}
            </div>
          ))}

        </div>

      </div>

    </div>

  )

}
