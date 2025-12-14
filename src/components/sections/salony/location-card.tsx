"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Location } from "@/lib/constants/locations"
import { LocationImage } from "./location-image"
import { LocationInfo } from "./location-info"
import { containerVariants } from "./animation-variants"

interface LocationCardProps {
  location: Location
  index: number
  isInView: boolean
}

export function LocationCard({ location, index, isInView }: LocationCardProps) {
  const isReversed = index % 2 === 1

  return (
    <div className="flex flex-col gap-8 mb-24 last:mb-0">
      {/* Header - Moved above photo and map */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="mb-10 lg:mb-12"
      >
        <h2 className="font-display text-[3.5rem] lg:text-[4.5rem] font-medium text-[#1a1a1a] leading-[0.9] tracking-[-0.03em] mb-4">
          {location.city}
        </h2>
        <div className="flex items-center gap-3 text-[#5a5a5a]">
          <div className="w-10 h-[1px] bg-[#E31F25]"></div>
          <p className="font-display text-xl lg:text-2xl font-light tracking-wide text-[#1a1a1a]">
            {location.address}
          </p>
        </div>
      </motion.div>

      <motion.div
        id={`location-${location.id}`}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
      >
        {/* Image Column */}
        <div className={`${isReversed ? 'lg:order-2' : ''}`}>
          <LocationImage location={location} index={index} isInView={isInView} />
        </div>

        {/* Content Column */}
        <motion.div 
          className={`${isReversed ? 'lg:order-1' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <LocationInfo location={location} isInView={isInView} />
        </motion.div>
      </motion.div>
    </div>
  )
}

