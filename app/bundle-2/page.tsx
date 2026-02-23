import Link from "next/link";

export default function BundleTwoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-24 text-white">

        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">

          <div>
            <div className="text-sm uppercase tracking-widest text-blue-100">
              MyVirtualTutor
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
              Calm, Structured Math Help
              That Builds Real Confidence
            </h1>

            <p className="mt-6 text-blue-100 text-lg">
              Voice guidance. Clear explanations. Visual whiteboard.
              Built for parents who want focus — not chaos.
            </p>

            <div className="mt-8">
              <Link
                href="/session"
                className="inline-block rounded-2xl bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-lg hover:bg-blue-50"
              >
                Start Free Session
              </Link>
            </div>
          </div>

          {/* MOCK SESSION PREVIEW */}
          <div className="rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex justify-between items-center border-b pb-3">
              <div className="font-semibold text-slate-700">
                Live Tutor Session
              </div>
              <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Active
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">

              {/* Tutor Chat */}
              <div className="space-y-3">
                <div className="bg-slate-100 p-3 rounded-xl text-sm">
                  Let’s solve: <strong>2(x + 3) = 10</strong>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-sm">
                  First divide both sides by 2.
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-sm">
                  Then subtract 3.
                </div>
              </div>

              {/* Whiteboard */}
              <div className="bg-slate-50 rounded-xl p-4 font-mono text-center text-slate-700">
                <div>2(x + 3) = 10</div>
                <div>÷ 2</div>
                <div>x + 3 = 5</div>
                <div>− 3</div>
                <div className="font-bold text-indigo-600 mt-2">x = 2</div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            Designed With Structure and Safety
          </h2>
          <p className="mt-6 text-slate-600">
            No distractions. No random AI responses.
            Every explanation follows a step-by-step logic pattern.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">

            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-xl font-semibold">Clear Steps</div>
              <p className="mt-3 text-sm text-slate-600">
                Every solution is broken into understandable pieces.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-xl font-semibold">Visual Reinforcement</div>
              <p className="mt-3 text-sm text-slate-600">
                Whiteboard writing reinforces comprehension.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-xl font-semibold">Calm Teaching Style</div>
              <p className="mt-3 text-sm text-slate-600">
                Built to reduce anxiety, not increase it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 bg-white text-center">
        <h2 className="text-3xl font-bold">
          Give Your Child Calm Math Support Tonight
        </h2>

        <div className="mt-8">
          <Link
            href="/session"
            className="rounded-2xl bg-blue-600 px-10 py-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-500"
          >
            Launch Tutor Session
          </Link>
        </div>
      </section>

    </main>
  );
}
