export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Pricing Details</h1>
        <p className="mt-6 text-slate-600">
          MyVirtualTutor is subscription-based and cancel anytime.
        </p>

        <div className="mt-12 space-y-8 text-left">

          <div>
            <h2 className="text-xl font-semibold">Starter (Free)</h2>
            <p className="text-slate-600 mt-2">
              20 minutes per week. Chat + whiteboard only.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Standard ($19/month)</h2>
            <p className="text-slate-600 mt-2">
              Unlimited chat, voice explanations, and whiteboard access.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Premium ($29/month)</h2>
            <p className="text-slate-600 mt-2">
              Everything in Standard plus priority response and extended sessions.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
