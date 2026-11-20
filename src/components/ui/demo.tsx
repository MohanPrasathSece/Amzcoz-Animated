"use client"

import { GlobeAnalytics } from "@/components/ui/cobe-globe-analytics"

export default function GlobeAnalyticsDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#090a10] p-8 overflow-hidden">
      <div className="w-full max-w-lg">
        <GlobeAnalytics />
      </div>
    </div>
  )
}
