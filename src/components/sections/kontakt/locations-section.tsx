"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LOCATIONS } from "@/lib/constants/locations"
import { fadeUpVariants } from "./animation-variants"
import { LocationCard } from "./location-card"
import { MapPreview } from "./map-preview"

interface LocationsSectionProps {
  isInView: boolean
}

export function LocationsSection({ isInView }: LocationsSectionProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="lg:col-span-6"
    >
      {/* Section Label */}
      <div className="flex items-center gap-5 mb-8">
        <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">
          Lokalizacje
        </span>
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
      </div>
      
      <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
        Odwiedź
      </h2>
      <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
        <span className="relative inline-block">
          <span className="italic text-[#C4A77D]">nas</span>
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
            <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
      </h2>
      
      <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
        Zapraszamy do naszych salonów w Warszawie, Piasecznie i Grójcu.
      </p>
      
      <div className="space-y-4">
        {LOCATIONS.map((loc, i) => (
          <LocationCard
            key={loc.id}
            id={loc.id}
            city={loc.city}
            address={loc.address}
            phone={loc.phone}
            openingHours={loc.openingHours}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>
      
      {/* CTA Link */}
      <div className="mt-8 pt-8 border-t border-[#e0ded8]">
        <Link href="/salony" className="group inline-flex items-center gap-6">
          <span className="text-[#1a1a1a] text-[11px] font-medium tracking-[0.25em] uppercase">
            Wszystkie lokalizacje
          </span>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-[#1a1a1a]/30 group-hover:bg-[#C4A77D] group-hover:w-16 transition-all duration-500" />
              <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C4A77D] group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </Link>
      </div>
      
      {/* Map Preview */}
      <MapPreview isInView={isInView} />
    </motion.div>
  )
}

