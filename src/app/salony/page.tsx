"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { 
  HeroSection, 
  CtaSection,
  WhyVisitSection,
  LocationsScroll
} from "@/components/sections/salony"

export default function LocationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#F8F7F4]">
      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <HeroSection isInView={isHeroInView} />
      </div>

      <WhyVisitSection />

      <LocationsScroll />

      <CtaSection isInView={isInView} />
    </div>
  )
}
