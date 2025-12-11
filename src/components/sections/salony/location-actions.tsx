"use client"

import { motion } from "framer-motion"
import { Calendar, ExternalLink, ArrowRight } from "lucide-react"
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
      <Link href={`/umow-wizyte?salon=${bookingSalonId}`} className="group/btn">
        <button className="relative overflow-hidden bg-[#E31F25] text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(227,31,37,0.4)] hover:scale-[1.02] flex items-center gap-3">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
          <span className="absolute inset-0 border border-white/20" />
          <Calendar className="relative w-4 h-4" />
          <span className="relative">Umów wizytę</span>
          <ArrowRight className="relative w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </Link>
      
      <a 
        href={location.map_link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex items-center gap-3 px-8 py-4 border border-[#e0ded8] hover:border-[#E31F25] transition-all duration-500"
      >
        <ExternalLink className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] transition-all duration-300" />
        <span className="text-[#1a1a1a] text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-[#E31F25] transition-all duration-300">
          Jak dojechać
        </span>
      </a>
    </motion.div>
  )
}

