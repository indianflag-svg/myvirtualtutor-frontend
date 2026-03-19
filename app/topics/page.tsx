import Link from "next/link"

export const metadata = {
  title: "Math Worksheet Topics | MyVirtualTutor",
  description: "Browse math worksheets by topic including addition, subtraction, multiplication, division, fractions, decimals, ratios, percentages, and pre-algebra."
}

export default function TopicsPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>Math Worksheet Topics</h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "32px" }}>
        Explore math worksheets by topic and use the AI tutor when you get stuck.
      </p>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Basic Operations</h2>
        <ul>
          <li><Link href="/worksheets/grade-3-addition-worksheet">Addition Worksheet</Link></li>
          <li><Link href="/worksheets/grade-3-subtraction-worksheet">Subtraction Worksheet</Link></li>
          <li><Link href="/worksheets/grade-4-multiplication-worksheet">Multiplication Worksheet</Link></li>
          <li><Link href="/worksheets/grade-4-division-worksheet">Division Worksheet</Link></li>
          <li><Link href="/worksheets/long-division-worksheet">Long Division Worksheet</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Fractions and Decimals</h2>
        <ul>
          <li><Link href="/worksheets/grade-5-fractions-worksheet">Fractions Worksheet</Link></li>
          <li><Link href="/worksheets/grade-5-decimals-worksheet">Decimals Worksheet</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Ratios and Percentages</h2>
        <ul>
          <li><Link href="/worksheets/grade-6-ratios-worksheet">Ratios Worksheet</Link></li>
          <li><Link href="/worksheets/grade-6-percentages-worksheet">Percentages Worksheet</Link></li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Pre-Algebra</h2>
        <ul>
          <li><Link href="/worksheets/pre-algebra-equations-worksheet">Pre Algebra Equations Worksheet</Link></li>
        </ul>
      </section>
    </main>
  )
}
