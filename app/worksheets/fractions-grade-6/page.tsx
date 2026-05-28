import Link from "next/link"

const problems = [
  "3/4 + 2/5",
  "7/8 - 1/4",
  "2/3 * 3/5",
  "5/6 / 2/3"
]

export default function FractionsGrade6Page() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900 px-6 py-16">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          6th Grade Math
        </div>

        <h1 className="text-4xl font-bold mb-4">
          6th Grade Fractions Worksheet
        </h1>

        <p className="text-gray-600 text-lg">
          Practice fraction operations. If you get stuck, send the problem directly to MyVirtualTutor.
        </p>
      </section>

      <section className="max-w-2xl mx-auto space-y-5">
        {problems.map((problem, index) => (
          <div key={problem} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">
              Problem {index + 1}
            </p>

            <p className="text-2xl font-semibold mb-5">
              {problem}
            </p>

            <Link
              href={`/session?problem=${encodeURIComponent(problem)}`}
              className="inline-flex bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Solve with AI Tutor →
            </Link>
          </div>
        ))}
      </section>
    </main>
  )
}
