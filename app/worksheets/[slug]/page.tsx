"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

function generateProblems(slug:string){

slug = slug.toLowerCase()

if(slug.includes("addition")) return ["24 + 15","31 + 46","58 + 27","63 + 18"]
if(slug.includes("subtraction")) return ["52 - 17","64 - 28","91 - 36","73 - 19"]
if(slug.includes("multiplication")) return ["7 * 8","9 * 6","12 * 4","15 * 3"]
if(slug.includes("division")) return ["144 / 12","225 / 15","360 / 9","420 / 7"]
if(slug.includes("fraction")) return ["3/4 + 2/5","7/8 - 1/4","2/3 * 3/5","5/6 / 2/3"]
if(slug.includes("decimal")) return ["3.4 + 2.7","7.5 - 1.8","6.2 * 4","9.6 / 3"]
if(slug.includes("percent")) return ["20% of 50","35% of 80","10% of 120","25% of 64"]
if(slug.includes("algebra") || slug.includes("equation")) return ["2x + 6 = 10","3x - 4 = 11","5x = 45","4x + 8 = 20"]

return ["12 + 8","15 * 3","24 / 6","9 + 11"]
}

function generateTitle(slug:string){
return slug.replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase())
}

const related = [
"grade-3-addition-worksheet",
"grade-4-multiplication-worksheet",
"grade-5-fractions-worksheet",
"long-division-worksheet",
"pre-algebra-equations-worksheet"
]

export default function WorksheetPage(){

const params = useParams()
const router = useRouter()

const slug = params.slug as string

const title = generateTitle(slug)
const problems = generateProblems(slug)

function solve(problem:string){
router.push(`/session?problem=${encodeURIComponent(problem)}`)
}

return(

<div style={{maxWidth:"900px",margin:"40px auto",fontFamily:"sans-serif"}}>

<h1>{title}</h1>

<p>Practice problems. Click <b>Solve with AI Tutor</b> if you get stuck.</p>

{problems.map((p:string,i:number)=>(
<div key={i} style={{marginBottom:"20px"}}>
<h3>{i+1}) {p}</h3>
<button onClick={()=>solve(p)} style={{padding:"10px 16px",background:"black",color:"white"}}>
Solve with AI Tutor
</button>
</div>
))}

<hr style={{margin:"40px 0"}}/>

<h2>Related Worksheets</h2>

<ul>
{related.map((r,i)=>(
<li key={i} style={{marginBottom:"10px"}}>
<a href={`/worksheets/${r}`}>{generateTitle(r)}</a>
</li>
))}
</ul>

</div>

)

}
