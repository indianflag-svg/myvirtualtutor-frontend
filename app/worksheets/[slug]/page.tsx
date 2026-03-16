"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

const worksheets:any = {

"grade-3-addition-worksheet":{
title:"Grade 3 Addition Worksheet",
problems:["24 + 15","31 + 46","58 + 27","63 + 18"]
},

"grade-3-addition-word-problems":{
title:"Grade 3 Addition Word Problems",
problems:[
"Tom has 24 apples and buys 15 more. How many total?",
"A class has 18 boys and 17 girls. How many students?",
"Sara read 12 pages Monday and 23 Tuesday. Total?"
]
},

"grade-3-subtraction-worksheet":{
title:"Grade 3 Subtraction Worksheet",
problems:["52 - 17","64 - 28","91 - 36","73 - 19"]
},

"grade-4-multiplication-worksheet":{
title:"Grade 4 Multiplication Worksheet",
problems:["7 * 8","9 * 6","12 * 4","15 * 3"]
},

"grade-4-multiplication-word-problems":{
title:"Grade 4 Multiplication Word Problems",
problems:[
"A box has 8 rows of 6 apples. Total?",
"5 bags with 9 candies each. Total?",
"12 students each have 4 pencils. Total?"
]
},

"grade-4-division-worksheet":{
title:"Grade 4 Division Worksheet",
problems:["84 / 7","72 / 8","96 / 6","63 / 9"]
},

"long-division-worksheet":{
title:"Long Division Worksheet",
problems:["144 / 12","225 / 15","360 / 9","420 / 7"]
},

"grade-5-fractions-worksheet":{
title:"Grade 5 Fractions Worksheet",
problems:["3/4 + 2/5","7/8 - 1/4","2/3 * 3/5","5/6 / 2/3"]
},

"adding-fractions-unlike-denominators":{
title:"Adding Fractions Unlike Denominators",
problems:["2/3 + 5/8","4/7 + 3/5","6/11 + 2/3"]
},

"grade-5-decimals-worksheet":{
title:"Grade 5 Decimals Worksheet",
problems:["3.4 + 2.7","7.5 - 1.8","6.2 * 4","9.6 / 3"]
},

"decimal-multiplication-worksheet":{
title:"Decimal Multiplication Worksheet",
problems:["2.5 * 3","4.2 * 6","1.8 * 7"]
},

"grade-6-ratios-worksheet":{
title:"Grade 6 Ratios Worksheet",
problems:["6:3","10:5","15:3","18:6"]
},

"ratio-word-problems":{
title:"Ratio Word Problems",
problems:[
"The ratio of boys to girls is 3:2. If 15 boys, how many girls?",
"A recipe uses 2:1 sugar to flour. If 6 cups sugar, flour?"
]
},

"grade-6-percentages-worksheet":{
title:"Grade 6 Percentages Worksheet",
problems:["20% of 50","35% of 80","10% of 120","25% of 64"]
},

"percentage-word-problems":{
title:"Percentage Word Problems",
problems:[
"What is 20% of 150?",
"A $50 item is 30% off. New price?",
"In a class of 40, 25% are absent. How many?"
]
},

"pre-algebra-equations-worksheet":{
title:"Pre-Algebra Equations Worksheet",
problems:["2x + 6 = 10","3x - 4 = 11","5x = 45","4x + 8 = 20"]
},

"one-step-equations-worksheet":{
title:"One Step Equations Worksheet",
problems:["x + 5 = 12","x - 3 = 9","2x = 10","x / 4 = 6"]
},

"two-step-equations-worksheet":{
title:"Two Step Equations Worksheet",
problems:["2x + 3 = 11","3x - 5 = 16","4x + 8 = 20"]
}

}

export default function WorksheetPage(){

const params = useParams()
const router = useRouter()

const slug = params.slug as string
const sheet = worksheets[slug]

if(!sheet){
return <div style={{padding:"40px"}}>Worksheet not found</div>
}

function solve(problem:string){
router.push(`/session?problem=${encodeURIComponent(problem)}`)
}

return(

<div style={{maxWidth:"900px",margin:"40px auto",fontFamily:"sans-serif"}}>

<h1>{sheet.title}</h1>

<p>Practice problems. Click <b>Solve with AI Tutor</b> if you get stuck.</p>

{sheet.problems.map((p:string,i:number)=>(
<div key={i} style={{marginBottom:"20px"}}>

<h3>{i+1}) {p}</h3>

<button
onClick={()=>solve(p)}
style={{
padding:"10px 16px",
background:"black",
color:"white",
borderRadius:"6px"
}}
>
Solve with AI Tutor
</button>

</div>
))}

</div>

)

}
