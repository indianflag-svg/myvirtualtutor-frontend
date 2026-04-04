"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
          Learn Math Step-by-Step with an AI Tutor
        </h1>

        <p style={{ fontSize: "18px", color: "#555", marginBottom: "30px" }}>
          Get guided help, not just answers. Upload homework or ask questions.
        </p>

        <Link href="/session">
          <button style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            border: "none"
          }}>
            Start Learning
          </button>
        </Link>
      </div>

      {/* DEMO */}
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>See How It Works</h2>

        <div style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "20px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}>
          <p>Problem: 2x + 6 = 10</p>
          <p>Step 1: Subtract 6</p>
          <p>Step 2: 2x = 4</p>
          <p>Step 3: x = 2</p>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Why Students Love It</h2>

        <div style={{ marginTop: "20px" }}>
          <p>📚 Step-by-step explanations</p>
          <p>📷 Upload homework</p>
          <p>🧠 Remembers your progress</p>
          <p>✏️ Interactive whiteboard</p>
        </div>
      </div>

      {/* PRICING */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Simple Pricing</h2>

        <div style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "30px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}>
          <h3>$10 / month</h3>
          <p>Unlimited questions</p>
          <p>Upload homework</p>
          <p>Step-by-step tutoring</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Start Learning Smarter Today</h2>

        <Link href="/session">
          <button style={{
            padding: "12px 24px",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            border: "none"
          }}>
            Get Started
          </button>
        </Link>
      </div>

    </div>
  )
}
