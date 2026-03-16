export default function sitemap() {

const base = "https://myvirtualtutor-frontend-swart.vercel.app"

const staticPages = [
"",
"/pricing",
"/login",
"/session"
]

const worksheetPages = [
"/worksheets/grade-3-addition-worksheet",
"/worksheets/grade-3-subtraction-worksheet",
"/worksheets/grade-4-multiplication-worksheet",
"/worksheets/grade-4-division-worksheet",
"/worksheets/grade-5-fractions-worksheet",
"/worksheets/grade-5-decimals-worksheet",
"/worksheets/grade-6-ratios-worksheet",
"/worksheets/grade-6-percentages-worksheet",
"/worksheets/pre-algebra-equations-worksheet",
"/worksheets/long-division-worksheet"
]

return [
...staticPages.map(p=>({
url: base + p,
lastModified: new Date(),
})),

...worksheetPages.map(p=>({
url: base + p,
lastModified: new Date(),
}))
]

}
