import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "MyVirtualTutor",
  description: "AI Math Tutor for Grades 6–12"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f7fb] text-gray-900">

        {/* GLOBAL NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                M
              </div>

              <span className="font-semibold text-lg">
                MyVirtualTutor
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center gap-6">

              <Link
                href="/worksheets"
                className="text-gray-600 hover:text-black transition"
              >
                Worksheets
              </Link>

              <Link
                href="/pricing"
                className="text-gray-600 hover:text-black transition"
              >
                Pricing
              </Link>

              <Link
                href="/session?problem=2x+6=10"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl font-medium shadow-sm"
              >
                Start Learning
              </Link>

            </div>

          </div>
        </nav>

        {children}

      </body>
    </html>
  )
}
