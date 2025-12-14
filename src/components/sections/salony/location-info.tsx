"use client"

import { motion } from "framer-motion"
import { Phone, Clock, Calendar, ExternalLink, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import type { Location } from "@/lib/constants/locations"
import { containerVariants, fadeUpVariants } from "./animation-variants"
import { SalonMap } from "./salon-map"
import { cn } from "@/lib/utils"

interface LocationInfoProps {
  location: Location
  isInView: boolean
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

const actionsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.9,
      ease: "easeOut"
    }
  }
}

export function LocationInfo({ location, isInView }: LocationInfoProps) {
  const bookingSalonId = getBookingSalonId(location.id)

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col h-full"
    >
      {/* Combined Map & Info Card - No Header */}
      <motion.div 
        variants={fadeUpVariants} 
        className="flex-1 flex flex-col mb-6 border border-[#e0ded8] bg-white group hover:border-[#E31F25] transition-all duration-300"
      >
         {/* Map Area */}
         <div className="relative w-full h-[450px] border-b border-[#e0ded8]">
            <SalonMap location={location} />
         </div>

         {/* Info Section - Compact & Inline */}
        <div className="flex flex-col lg:flex-row">
          
          {/* Phone Section */}
          <a 
            href={`tel:${location.phone}`}
            className="flex-1 px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b lg:border-b-0 lg:border-r border-[#e0ded8]"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#f5f5f5] rounded-full text-[#E31F25] shrink-0 group-hover:bg-[#E31F25] group-hover:text-white transition-colors duration-300">
               <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-medium mb-1">Telefon</span>
              <span className="font-display text-lg font-medium text-[#1a1a1a] group-hover:text-[#E31F25] transition-colors leading-none">{location.phone}</span>
            </div>
          </a>

          {/* Hours Section */}
          <div className="flex-1 px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-[#f5f5f5] rounded-full text-[#E31F25] shrink-0 group-hover:bg-[#E31F25] group-hover:text-white transition-colors duration-300">
               <Clock className="w-4 h-4" />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-medium mb-1">Godziny otwarcia</span>
              <div className="font-display text-base text-[#1a1a1a] leading-tight font-medium">
                {location.openingHours ? (
                  <span className="whitespace-pre-line block">{location.openingHours}</span>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex gap-2">
                      <span className="text-[#5a5a5a] w-[45px]">Pn-Pt</span>
                      <span className="font-bold">10:00 - 18:00</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#5a5a5a] w-[45px]">Sob</span>
                      <span className="font-bold">10:00 - 14:00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={actionsVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href={`/umow-wizyte?salon=${bookingSalonId}`} className="group w-full">
          <button className="w-full bg-[#E31F25] text-white py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#c91a1f] transition-colors duration-300 shadow-sm hover:shadow-md">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Umów wizytę</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>


        <a 
          href={location.map_link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group w-full bg-transparent border border-[#1a1a1a] text-[#1a1a1a] py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Jak dojechać</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

    </motion.div>
  )
}

