"use client"

import { useState } from "react"
import UploadButton from "../../components/UploadButton"

const API_BASE = "https://myvirtualtutor-backend-2.onrender.com"

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

async function sendMessage(){

if(!input.trim())return

const userMessage=input
setInput("")

setChat(prev=>[...prev,{role:"user",text:userMessage}])
setLoading(true)

try{

const res=await fetch(`${API_BASE}/chat`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:userMessage,session_id:"default"})
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

function nextStep(){

if(stepIndex>=allSteps.length)return

setSteps(prev=>[...prev,allSteps[stepIndex]])
setStepIndex(stepIndex+1)

setAnswerInput("")
setFeedback("")

}

function handleUploadSteps(uploadSteps){

const filtered=filterSteps(uploadSteps)

setAllSteps(filtered)
setSteps([filtered[0]])
setStepIndex(1)

setAnswerInput("")
setFeedback("")

setChat(prev=>[
...prev,
{role:"assistant",text:"Homework uploaded. Let's solve it."}
])

}

function extractAnswer(){

for(let step of allSteps){

if(step.includes("=")&&!step.includes("?")){

const match=step.match(/[-]?\d+(\.\d+)?$/)

if(match)return match[0]

}

}

return null

}

function checkAnswer(){

const correct=extractAnswer()

if(!correct){
setFeedback("Try again.")
return
}

if(answerInput.trim()===correct){

setFeedback("Correct! ✅")

setTimeout(()=>{nextStep()},900)

}else{

setFeedback("Not quite. Hint: think about the numbers.")

}

}

const currentText=steps[steps.length-1]||""
const isQuestion=currentText.includes("= ?")

return(

<div style={{display:"flex",height:"100vh",fontFamily:"sans-serif"}}>

<div style={{width:"35%",borderRight:"1px solid #ddd",display:"flex",flexDirection:"column"}}>

<div style={{padding:"20px",fontWeight:"bold"}}>MyVirtualTutor</div>

<div style={{flex:1,overflowY:"auto",padding:"20px"}}>

{chat.map((m,i)=>(
<div key={i} style={{marginBottom:"12px"}}>
<b>{m.role==="user"?"You":"Tutor"}:</b> {m.text}
</div>
))}

{loading&&<div>Tutor is thinking...</div>}

</div>

<div style={{padding:"15px",borderTop:"1px solid #ddd",display:"flex",gap:"10px"}}>

<input
value={input}
onChange={e=>setInput(e.target.value)}
onKeyDown={e=>{
if(e.key==="Enter" && !isQuestion) sendMessage()
}}
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

<div style={{flex:1,background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

<div style={{fontSize:"18px",marginBottom:"10px",fontWeight:"bold"}}>
Step {steps.length} of {allSteps.length}
</div>

<div style={{width:"80%",maxWidth:"700px",fontSize:"28px",lineHeight:"1.8"}}>

{steps.map((s,i)=>(
<div key={i} style={{marginBottom:"18px"}}>{s}</div>
))}

</div>

{isQuestion&&(

<div style={{marginTop:"20px"}}>

<input
value={answerInput}
onChange={e=>setAnswerInput(e.target.value)}
placeholder="Type your answer"
style={{padding:"10px",fontSize:"16px"}}
/>

<button
onClick={checkAnswer}
style={{marginLeft:"10px",padding:"10px 18px",background:"black",color:"white"}}
>
Check Answer
</button>

{feedback&&(
<div style={{marginTop:"10px",fontWeight:"bold"}}>{feedback}</div>
)}

</div>

)}

{!isQuestion&&stepIndex<allSteps.length&&(

<button
onClick={nextStep}
style={{marginTop:"20px",padding:"12px 24px",fontSize:"16px",background:"black",color:"white",border:"none"}}
>
Next Step
</button>

)}

</div>

</div>

)

}
