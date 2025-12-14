"use client"

import { motion } from "framer-motion"
import { Navigation } from "lucide-react"
import Image from "next/image"
import type { Location } from "@/lib/constants/locations"

interface LocationImageProps {
  location: Location
  index: number
  isInView: boolean
}

export function LocationImage({ location, index, isInView }: LocationImageProps) {
  return (
    <div className="relative">
      {/* Artistic frames */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/20 pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        className="absolute -inset-6 lg:-inset-8 border border-[#E31F25]/10 pointer-events-none" 
      />
      
      {/* Image */}
      <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden group">
        <Image
          src={location.image}
          alt={`Salon ${location.city}`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 via-transparent to-[#1a1a1a]/10" />
      </div>
    </div>
  )
}

