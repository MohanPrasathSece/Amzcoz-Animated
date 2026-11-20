"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import createGlobe from "cobe"

// Cobe texture projection requires a +90 deg offset to align spherical coordinates with the landmass dots
const toGlobeLoc = (lat: number, lon: number): [number, number] => [lat, lon + 90]

export interface CityPin {
  id: string
  name: string
  flag: string
  location: [number, number]
  role?: string
}

export const GLOBAL_CITIES: CityPin[] = [
  { id: "pune", name: "Pune HQ", flag: "🇮🇳", location: toGlobeLoc(18.5204, 73.8567), role: "Global HQ" },
  { id: "delhi", name: "New Delhi", flag: "🇮🇳", location: toGlobeLoc(28.7041, 77.1025), role: "Metro Hub" },
  { id: "dubai", name: "Dubai", flag: "🇦🇪", location: toGlobeLoc(25.2048, 55.2708), role: "MENA Expansion" },
  { id: "london", name: "London", flag: "🇬🇧", location: toGlobeLoc(51.5074, -0.1278), role: "UK & Europe" },
  { id: "ny", name: "New York", flag: "🇺🇸", location: toGlobeLoc(40.7128, -74.006), role: "US Marketplace" },
  { id: "sf", name: "San Francisco", flag: "🇺🇸", location: toGlobeLoc(37.7749, -121.5), role: "West Coast" },
  { id: "singapore", name: "Singapore", flag: "🇸🇬", location: toGlobeLoc(1.3521, 103.8198), role: "APAC Hub" },
  { id: "tokyo", name: "Tokyo", flag: "🇯🇵", location: toGlobeLoc(35.6762, 139.6503), role: "East Asia" },
  { id: "frankfurt", name: "Frankfurt", flag: "🇩🇪", location: toGlobeLoc(50.1109, 8.6821), role: "EU Distribution" },
  { id: "sydney", name: "Sydney", flag: "🇦🇺", location: toGlobeLoc(-33.8688, 151.2093), role: "Oceania" },
]

export interface GlobeAnalyticsProps {
  className?: string
  speed?: number
  dark?: number
}

interface ProjectedPin extends CityPin {
  x: number
  y: number
  visible: boolean
  opacity: number
}

export function GlobeAnalytics({
  className = "",
  speed = 0.005,
  dark = 1,
}: GlobeAnalyticsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiBaseRef = useRef(0)
  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiBaseRef.current += pointerInteractionMovement.current
      pointerInteractionMovement.current = 0
      pointerInteracting.current = null
    }
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerInteracting.current) {
      const delta = e.clientX - pointerInteracting.current.x
      pointerInteractionMovement.current = delta / 200
    }
  }, [])

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (pointerInteracting.current) {
        phiBaseRef.current += pointerInteractionMovement.current
        pointerInteractionMovement.current = 0
        pointerInteracting.current = null
      }
      if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    }

    window.addEventListener("pointerup", handleGlobalPointerUp)
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let width = canvas.offsetWidth || 440
    const theta = 0.22

    // Precalculate Cartesian unit vectors for pins using calibrated Cobe coordinates
    const pinCoords = GLOBAL_CITIES.map((pin) => {
      const latRad = (pin.location[0] * Math.PI) / 180
      const lonRad = (pin.location[1] * Math.PI) / 180
      return {
        ...pin,
        x0: Math.cos(latRad) * Math.sin(lonRad),
        y0: Math.sin(latRad),
        z0: Math.cos(latRad) * Math.cos(lonRad),
      }
    })

    function init() {
      if (!canvas) return
      width = canvas.offsetWidth || 440
      if (width === 0 || globe) return

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768
      // On mobile, clamp DPR to 1 and reduce resolution to prevent mobile GPU thermal throttling
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      const renderSize = Math.round(width * (isMobile ? 1.3 : 2))

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: renderSize,
        height: renderSize,
        phi: 0,
        theta,
        dark,
        diffuse: 1.4,
        // 3500 samples on mobile, 7500 on desktop ensures 60/120fps locked rendering
        mapSamples: isMobile ? 3500 : 7500,
        mapBrightness: 8.5,
        baseColor: [0.22, 0.26, 0.38],
        markerColor: [0.0, 0.7, 1.0],
        glowColor: [0.12, 0.18, 0.32],
        markerElevation: 0,
        markers: [],
        arcs: [],
      })

      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)

      const effectiveSpeed = isMobile ? 0.0085 : speed
      let frameCount = 0
      let isVisible = true
      let isRunning = false

      function animate() {
        if (!isVisible) {
          isRunning = false
          return
        }
        isRunning = true

        if (!pointerInteracting.current) {
          phiBaseRef.current += effectiveSpeed
        }
        const currentPhi = phiBaseRef.current + pointerInteractionMovement.current

        globe?.update({
          phi: currentPhi,
          theta,
        })

        const cosPhi = Math.cos(currentPhi)
        const sinPhi = Math.sin(currentPhi)

        frameCount++
        // Throttle React pin state dispatch (every 4 frames on mobile, 2 on desktop) to eliminate UI thread lag
        if (frameCount % (isMobile ? 4 : 2) === 0) {
          const newPins: ProjectedPin[] = pinCoords.map((pin) => {
            // Project 3D vector rotated by current phi and theta
            const c = cosPhi * pin.x0 + sinPhi * pin.z0
            const s = sinPhi * sinTheta * pin.x0 + cosTheta * pin.y0 - cosPhi * sinTheta * pin.z0
            const z = -sinPhi * cosTheta * pin.x0 + sinTheta * pin.y0 + cosPhi * cosTheta * pin.z0

            const isPinVisible = z > 0.05
            const opacity = isPinVisible ? Math.min(1, Math.max(0, (z - 0.05) * 4)) : 0

            return {
              id: pin.id,
              name: pin.name,
              flag: pin.flag,
              location: pin.location,
              role: pin.role,
              x: (c * 0.4 + 0.5) * 100,
              y: (-s * 0.4 + 0.5) * 100,
              visible: isPinVisible,
              opacity,
            }
          })
          setProjectedPins(newPins)
        }

        animationId = requestAnimationFrame(animate)
      }

      // Intersection Observer: Pause globe rendering completely when offscreen
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
          if (isVisible && !isRunning) {
            animate()
          }
        },
        { threshold: 0.05 }
      )
      observer.observe(canvas)

      animate()
      canvas.style.opacity = "1"
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [speed, dark])

  return (
    <div className={`relative aspect-square w-full select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 0.8s ease",
          borderRadius: "50%",
          // On touch/mobile devices, use pan-y so vertical scrolling never hangs or freezes
          touchAction: "pan-y",
        }}
      />

      {/* Dynamic 3D Projected City Pins with Flags */}
      {projectedPins.map((pin) => {
        if (!pin.visible || pin.opacity <= 0.05) return null

        return (
          <div
            key={pin.id}
            style={{
              position: "absolute",
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -100%)",
              opacity: pin.opacity,
              pointerEvents: "none",
              transition: "opacity 0.15s ease-out",
            }}
            className="flex flex-col items-center z-20"
          >
            {/* Pill Pin Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-white/20 shadow-xl text-[11px] font-medium text-white whitespace-nowrap">
              <span className="text-xs leading-none">{pin.flag}</span>
              <span className="font-semibold text-slate-100">{pin.name}</span>
            </div>
            {/* Subtle pointer tip */}
            <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white/40 -mt-[0.5px]" />
          </div>
        )
      })}
    </div>
  )
}
