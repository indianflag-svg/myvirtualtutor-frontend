"use client"

export const dynamic = "force-dynamic"

import { useState,useEffect } from "react"
import UploadButton from "../../components/UploadButton"

const API_BASE="https://myvirtualtutor-backend-2.onrender.com"

export default function SessionPage(){

const [chat,setChat]=useState([
{role:"assistant",text:"Hi! I'm your math tutor. Ask a problem or upload homework."}
])

const [allSteps,setAllSteps]=useState([])
const [steps,setSteps]=useState([])
const [stepIndex,setStepIndex]=useState(0)

const [input,setInput]=useState("")
const [loading,setLoading]=useState(false)

const [answerInput,setAnswerInput]=useState("")
const [feedback,setFeedback]=useState("")

function filterSteps(raw){
return raw.filter(s=>{
if(!s)return false
if(s.startsWith("Original Problem"))return false
return true
})
}

async function solveProblem(problem){

setChat(prev=>[...prev,{role:"user",text:problem}])
setLoading(true)

try{

const res=await fetch(`${API_BASE}/chat`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:problem,session_id:"default"})
})

const data=await res.json()

const received=filterSteps(data.steps||[])

setAllSteps(received)
setSteps([received[0]])
setStepIndex(1)

setAnswerInput("")
setFeedback("")

setChat(prev=>[
...prev,
{role:"assistant",text:"Let's solve this step-by-step."}
])

}catch{

setChat(prev=>[
...prev,
{role:"assistant",text:"Tutor had trouble solving that."}
])

}

setLoading(false)

}

async function sendMessage(){
if(!input.trim())return
const userMessage=input
setInput("")
solveProblem(userMessage)
}

useEffect(()=>{

const params = new URLSearchParams(window.location.search)
const problem = params.get("problem")

if(problem){
solveProblem(problem)
}

},[])

function nextStep(){
if(stepIndex>=allSteps.length)return
setSteps(prev=>[...prev,allSteps[stepIndex]])
setStepIndex(stepIndex+1)
}

function handleUploadSteps(uploadSteps){

const received=filterSteps(uploadSteps)

setAllSteps(received)
setSteps([received[0]])
setStepIndex(1)

setAnswerInput("")
setFeedback("")

setChat(prev=>[
...prev,
{role:"assistant",text:"I read the homework. Let's solve it."}
])

}

const currentStepNumber=steps.length
const totalSteps=allSteps.length

function cleanProblemText(text){
if(text.startsWith("Problem")){
const parts=text.split(":")
if(parts.length>1){
return parts.slice(1).join(":").trim()
}
}
return text
}

return(

<div style={{display:"flex",height:"100vh",fontFamily:"sans-serif"}}>

<div style={{width:"35%",borderRight:"1px solid #ddd",display:"flex",flexDirection:"column"}}>

<div style={{padding:"20px",fontWeight:"bold"}}>
MyVirtualTutor
</div>

<div style={{flex:1,overflowY:"auto",padding:"20px"}}>

{chat.map((m,i)=>(
<div key={i} style={{marginBottom:"12px"}}>
<b>{m.role==="user"?"You":"Tutor"}:</b> {m.text}
</div>
))}

{loading && <div>Tutor is thinking...</div>}

</div>

<div style={{padding:"15px",borderTop:"1px solid #ddd",display:"flex",gap:"10px"}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>{if(e.key==="Enter")sendMessage()}}
placeholder="Ask a math question..."
style={{flex:1,padding:"10px"}}
/>

<button
onClick={sendMessage}
style={{padding:"10px 18px",background:"black",color:"white"}}
>
Send
</button>

</div>

<div style={{padding:"15px"}}>
<UploadButton onUpload={handleUploadSteps}/>
</div>

</div>

<div style={{flex:1,background:"#ffffff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

<div style={{width:"80%",maxWidth:"700px",fontSize:"28px",lineHeight:"1.8"}}>

{totalSteps>0 && (
<div style={{marginBottom:"20px",fontSize:"16px",color:"#666"}}>
Step {currentStepNumber} of {totalSteps}
</div>
)}

{steps.map((s,i)=>(
<div key={i}>{cleanProblemText(s)}</div>
))}

</div>

<button
onClick={nextStep}
style={{marginTop:"30px",padding:"12px 24px",fontSize:"16px"}}
>
Next Step
</button>

</div>

</div>

)

}
