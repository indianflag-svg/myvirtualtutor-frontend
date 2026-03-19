import Link from "next/link"

export const metadata = {
  title: "Math Worksheets by Grade | MyVirtualTutor",
  description: "Browse math worksheets by grade level, from Grade 3 through pre-algebra."
}

export default function GradesPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>Math Worksheets by Grade</h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "32px" }}>
        Explore printable-style practice pages by grade and topic. Click any worksheet to practice, then use the AI tutor if you get stuck.
      </p>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Grade 3</h2>
        <ul>
          <li><Link href="/worksheets/grade-3-addition-worksheet">Grade 3 Addition Worksheet</Link></li>
          <li><Link href="/worksheets/grade-3-subtraction-worksheet">Grade 3 Subtraction Worksheet</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Grade 4</h2>
        <ul>
          <li><Link href="/worksheets/grade-4-multiplication-worksheet">Grade 4 Multiplication Worksheet</Link></li>
          <li><Link href="/worksheets/grade-4-division-worksheet">Grade 4 Division Worksheet</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Grade 5</h2>
        <ul>
          <li><Link href="/worksheets/grade-5-fractions-worksheet">Grade 5 Fractions Worksheet</Link></li>
          <li><Link href="/worksheets/grade-5-decimals-worksheet">Grade 5 Decimals Worksheet</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Grade 6</h2>
        <ul>
          <li><Link href="/worksheets/grade-6-ratios-worksheet">Grade 6 Ratios Worksheet</Link></li>
          <li><Link href="/worksheets/grade-6-percentages-worksheet">Grade 6 Percentages Worksheet</Link></li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Pre-Algebra</h2>
        <ul>
          <li><Link href="/worksheets/pre-algebra-equations-worksheet">Pre Algebra Equations Worksheet</Link></li>
          <li><Link href="/worksheets/long-division-worksheet">Long Division Worksheet</Link></li>
        </ul>
      </section>
    </main>
  )
}
