import Link from "next/link"

const worksheets = [
  { title: "6th Grade Fractions", description: "Practice adding, subtracting, multiplying, and dividing fractions.", href: "/worksheets/fractions-grade-6", tag: "Fractions" },
  { title: "5th Grade Fractions", description: "Build fraction confidence with guided practice problems.", href: "/worksheets/grade-5-fractions", tag: "Fractions" },
  { title: "6th Grade Percentages", description: "Learn percentages with step-by-step examples.", href: "/worksheets/grade-6-percentages", tag: "Percentages" },
  { title: "6th Grade Ratios", description: "Practice ratios and proportional reasoning.", href: "/worksheets/grade-6-ratios", tag: "Ratios" },
  { title: "Pre-Algebra Equations", description: "Solve beginner algebra equations with guided help.", href: "/worksheets/pre-algebra-equations", tag: "Algebra" },
  { title: "4th Grade Multiplication", description: "Strengthen multiplication fluency with practice problems.", href: "/worksheets/grade-4-multiplication", tag: "Multiplication" },
  { title: "4th Grade Division", description: "Practice division step-by-step.", href: "/worksheets/grade-4-division", tag: "Division" },
  { title: "5th Grade Decimals", description: "Practice decimal operations and place value.", href: "/worksheets/grade-5-decimals", tag: "Decimals" }
]

export default function WorksheetsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Free Math Practice
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Math Worksheets with <span className="text-blue-600">AI Help</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Pick a worksheet, practice problems, and send anything you get stuck on directly to MyVirtualTutor.
        </p>

        <Link href="/session?problem=5/6-1/3" className="inline-block bg-blue-600 text-white px-7 py-4 rounded-2xl font-semibold shadow-md hover:bg-blue-700 transition">
          Try AI Tutor
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksheets.map((sheet) => (
            <div key={sheet.href} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition h-full">
              <div className="text-sm text-blue-700 bg-blue-50 inline-flex px-3 py-1 rounded-full font-medium mb-5">
                {sheet.tag}
              </div>

              <h2 className="text-2xl font-bold mb-3">{sheet.title}</h2>

              <p className="text-gray-600 mb-6">{sheet.description}</p>

              <Link href={sheet.href} className="inline-block text-blue-600 font-semibold hover:underline">
                Open worksheet →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
