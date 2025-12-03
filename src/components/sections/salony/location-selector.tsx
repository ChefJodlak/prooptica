"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Location } from "@/lib/constants/locations"

interface LocationSelectorProps {
  locations: Location[]
  selectedLocation: number
  onSelectLocation: (index: number) => void
}

export function LocationSelector({ 
  locations, 
  selectedLocation, 
  onSelectLocation 
}: LocationSelectorProps) {
  const handleSelect = (index: number, locationId: string) => {
    onSelectLocation(index)
    document.getElementById(`location-${locationId}`)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }

  const getLocationLabel = (loc: Location) => {
    if (loc.address.includes("Puławska")) return `${loc.city} II`
    if (loc.address.includes("Wojska")) return `${loc.city} I`
    return loc.city
  }

  return (
    <section className="py-6 bg-[#F8F7F4] border-b border-[#e0ded8] sticky top-[88px] z-30 backdrop-blur-lg bg-[#F8F7F4]/95">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-8 px-8 md:-mx-16 md:px-16 lg:-mx-24 lg:px-24 scrollbar-hide">
          {locations.map((loc, i) => (
            <motion.button
              key={loc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => handleSelect(i, loc.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition-all duration-500 text-[11px] tracking-[0.15em] uppercase ${
                selectedLocation === i
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white text-[#5a5a5a] hover:bg-[#1a1a1a] hover:text-white border border-[#e0ded8]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {getLocationLabel(loc)}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

