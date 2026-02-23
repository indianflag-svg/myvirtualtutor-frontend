import Link from "next/link";

export default function HomePage() {
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

          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <div className="text-center font-mono text-slate-700">
              2(x + 3) = 10
              <div className="mt-4 space-y-1">
                <div>÷ 2</div>
                <div>x + 3 = 5</div>
                <div>− 3</div>
                <div className="font-bold text-indigo-600 mt-2">x = 2</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            Designed With Structure and Safety
          </h2>
          <p className="mt-6 text-slate-600">
            No distractions. No chaotic AI responses.
            Every explanation follows a step-by-step logic pattern.
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold">Simple Pricing</h2>
          <p className="mt-4 text-slate-600">
            Choose the level of support your child needs.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">

            {/* STARTER */}
            <div className="rounded-3xl border p-8">
              <div className="text-xl font-semibold">Starter</div>
              <div className="mt-4 text-4xl font-bold">$0</div>
              <div className="text-sm text-slate-500">Free trial</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>20 minutes per week</li>
                <li>Chat + Whiteboard</li>
                <li>No voice</li>
              </ul>
              <div className="mt-8">
                <Link href="/session" className="rounded-xl bg-slate-200 px-6 py-2 text-sm font-semibold">
                  Try Free
                </Link>
              </div>
            </div>

            {/* STANDARD */}
            <div className="rounded-3xl border-2 border-blue-600 p-8 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
                Most Popular
              </div>
              <div className="text-xl font-semibold">Standard</div>
              <div className="mt-4 text-4xl font-bold">$19</div>
              <div className="text-sm text-slate-500">per month</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Unlimited chat</li>
                <li>Voice explanations</li>
                <li>Whiteboard access</li>
                <li>Homework practice</li>
              </ul>
              <div className="mt-8">
                <Link href="/session" className="rounded-xl bg-blue-600 text-white px-6 py-2 text-sm font-semibold">
                  Get Standard
                </Link>
              </div>
            </div>

            {/* PREMIUM */}
            <div className="rounded-3xl border p-8">
              <div className="text-xl font-semibold">Premium</div>
              <div className="mt-4 text-4xl font-bold">$29</div>
              <div className="text-sm text-slate-500">per month</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Everything in Standard</li>
                <li>Priority response</li>
                <li>Advanced walkthroughs</li>
                <li>Extended sessions</li>
              </ul>
              <div className="mt-8">
                <Link href="/session" className="rounded-xl bg-slate-200 px-6 py-2 text-sm font-semibold">
                  Go Premium
                </Link>
              </div>
            </div>

          </div>

          <div className="mt-12">
            <Link href="/pricing" className="text-blue-600 font-semibold text-sm">
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
