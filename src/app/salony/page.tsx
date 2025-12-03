"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { LOCATIONS } from "@/lib/constants/locations"
import { 
  HeroSection, 
  LocationsList, 
  CtaSection 
} from "@/components/sections/salony"
import { LocationsPageSchema } from "@/components/seo/schema-org"

export default function LocationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-x-hidden">
      <LocationsPageSchema />
      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <HeroSection isInView={isHeroInView} />
      </div>

      <LocationsList 
        locations={LOCATIONS} 
        isInView={isInView} 
      />

      <CtaSection isInView={isInView} />
    </div>
  )
}
