"use client"

import { Suspense } from "react"
import SessionContent from "./sessionContent"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SessionContent />
    </Suspense>
  )
}
