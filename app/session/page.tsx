"use client"

import { Suspense } from "react"
import SessionContent from "./SessionContent"

export default function SessionPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading tutor...</div>}>
      <SessionContent />
    </Suspense>
  )
}
