"use client"

import { motion } from "framer-motion"
import { Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import { fadeUpVariants } from "./animation-variants"
import type { Location } from "@/lib/constants/locations"

interface LocationActionsProps {
  location: Location
}

// Map location IDs to booking salon IDs
function getBookingSalonId(locationId: string): string {
  const mapping: Record<string, string> = {
    'warszawa': 'warszawa',
    'piaseczno-1': 'piaseczno-wojska',
    'piaseczno-2': 'piaseczno-pulawska',
    'grojec': 'grojec',
  }
  return mapping[locationId] || locationId
}

export function LocationActions({ location }: LocationActionsProps) {
  const bookingSalonId = getBookingSalonId(location.id)
  
  return (
    <motion.div 
      variants={fadeUpVariants}
      className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-[#e0ded8]"
    >
      <Link href={`/umow-wizyte?salon=${bookingSalonId}`}>
        <button className="bg-[#C4A77D] text-[#1a1a1a] px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-500 flex items-center gap-3">
          <Calendar className="w-4 h-4" />
          Umów wizytę
        </button>
      </Link>
      
      <a 
        href={location.map_link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center gap-3 px-8 py-4 border border-[#e0ded8] hover:border-[#C4A77D] transition-all duration-500"
      >
        <ExternalLink className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C4A77D] transition-all duration-300" />
        <span className="text-[#1a1a1a] text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-[#C4A77D] transition-all duration-300">
          Jak dojechać
        </span>
      </a>
    </motion.div>
  )
}

