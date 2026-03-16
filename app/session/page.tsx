"use client"

import { useState } from "react"
import UploadButton from "../../components/UploadButton"

const API_BASE = "https://myvirtualtutor-backend-2.onrender.com"

export default function SessionPage() {

  const [chat, setChat] = useState([
    { role:"assistant", text:"Hi! I'm your math tutor. Ask me a math problem or upload homework." }
  ])

  const [allSteps, setAllSteps] = useState([])
  const [steps, setSteps] = useState([])
  const [stepIndex, setStepIndex] = useState(0)

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
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          message:userMessage,
          session_id:"default"
        })
      })

      const data = await res.json()

      const receivedSteps = data.steps || []

      setAllSteps(receivedSteps)
      setSteps([receivedSteps[0]])
      setStepIndex(1)

      setChat(prev=>[
        ...prev,
        { role:"assistant", text:"Let's solve this step-by-step." }
      ])

    }catch{

      setChat(prev=>[
        ...prev,
        { role:"assistant", text:"Tutor had trouble solving that." }
      ])

    }

    setLoading(false)

  }

  function nextStep(){

    if(stepIndex >= allSteps.length) return

    setSteps(prev=>[
      ...prev,
      allSteps[stepIndex]
    ])

    setStepIndex(stepIndex + 1)

  }

  function handleUploadSteps(uploadSteps){

    setAllSteps(uploadSteps)
    setSteps([uploadSteps[0]])
    setStepIndex(1)

    setChat(prev=>[
      ...prev,
      { role:"assistant", text:"I read the homework. Let's solve it." }
    ])

  }

  const currentStepNumber = steps.length
  const totalSteps = allSteps.length

  return (

    <div style={{
      display:"flex",
      height:"100vh",
      fontFamily:"sans-serif"
    }}>

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

        <div style={{padding:"15px"}}>
          <UploadButton onUpload={handleUploadSteps} />
        </div>

      </div>

      <div style={{
        flex:1,
        background:"#ffffff",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}>

        {totalSteps > 0 && (

          <div style={{
            fontSize:"18px",
            marginBottom:"10px",
            fontWeight:"bold"
          }}>
            Step {currentStepNumber} of {totalSteps}
          </div>

        )}

        <div style={{
          width:"80%",
          maxWidth:"700px",
          fontSize:"28px",
          lineHeight:"1.8"
        }}>

          {steps.map((s,i)=>(
            <div key={i} style={{marginBottom:"18px"}}>
              {s}
            </div>
          ))}

        </div>

        {stepIndex < allSteps.length && (

          <button
            onClick={nextStep}
            style={{
              marginTop:"20px",
              padding:"12px 24px",
              fontSize:"16px",
              background:"black",
              color:"white",
              border:"none",
              cursor:"pointer"
            }}
          >
            Next Step
          </button>

        )}

      </div>

    </div>

  )

}
