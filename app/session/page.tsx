"use client"

import { Suspense } from "react"
import SessionContent from "./SessionContent"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading session...</div>}>
      <SessionContent />
    </Suspense>
  )
}
