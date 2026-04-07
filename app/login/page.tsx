"use client"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      
      <div className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-sm">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
          Login
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          (Demo page — auth coming soon)
        </p>

      </div>

    </main>
  )
}
