"use client"

import type { Location } from "@/lib/constants/locations"
import { LocationCard } from "./location-card"
import { noiseTextureStyle } from "./animation-variants"

interface LocationsListProps {
  locations: Location[]
  isInView: boolean
}

export function LocationsList({ locations, isInView }: LocationsListProps) {
  return (
    <section className="py-20 lg:py-32 bg-[#F8F7F4]">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={noiseTextureStyle} 
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="space-y-32 lg:space-y-40">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

