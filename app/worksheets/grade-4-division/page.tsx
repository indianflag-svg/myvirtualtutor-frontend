"use client"

import { useRouter } from "next/navigation"

export default function Worksheet(){

const router = useRouter()

function solve(problem:string){

const encoded = encodeURIComponent(problem)

router.push(`/session?problem=${encoded}`)

}

return(

<div style={{
maxWidth:"900px",
margin:"40px auto",
fontFamily:"sans-serif"
}}>

<h1>6th Grade Fractions Worksheet</h1>

<p>Practice fraction operations. If you get stuck, click <b>Solve with AI Tutor</b>.</p>

<hr/>

<div style={{marginTop:"30px"}}>

<h3>1) 3/4 + 2/5</h3>
<button onClick={()=>solve("3/4 + 2/5")}>
Solve with AI Tutor
</button>

<h3>2) 7/8 - 1/4</h3>
<button onClick={()=>solve("7/8 - 1/4")}>
Solve with AI Tutor
</button>

<h3>3) 2/3 × 3/5</h3>
<button onClick={()=>solve("2/3 * 3/5")}>
Solve with AI Tutor
</button>

<h3>4) 5/6 ÷ 2/3</h3>
<button onClick={()=>solve("5/6 / 2/3")}>
Solve with AI Tutor
</button>

</div>

</div>

)

}
