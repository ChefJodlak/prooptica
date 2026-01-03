"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  HeroSection,
  BrandsGrid,
  PartnersSection,
  CtaSection,
  BRANDS,
  NOISE_TEXTURE_BG
} from "@/components/sections/marki"

export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      {/* Subtle texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: NOISE_TEXTURE_BG }}
      />

      <HeroSection />

      <BrandsGrid brands={BRANDS} isInView={isInView} />

      <PartnersSection isInView={isInView} />

      <CtaSection isInView={isInView} />
    </div>
  )
}
