"use client";

import React from "react";

export default function FeatureCard({
  icon,
  title,
  description,
  delay = "0s",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition"
      style={{ animationDelay: delay }}
    >
      <div className="text-slate-900 mb-4">{icon}</div>

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {description}
      </p>
    </div>
  );
}
