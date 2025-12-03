"use client"

import { motion } from "framer-motion"
import type { Location } from "@/lib/constants/locations"
import { LocationImage } from "./location-image"
import { LocationInfo } from "./location-info"
import { LocationActions } from "./location-actions"
import { containerVariants } from "./animation-variants"

interface LocationCardProps {
  location: Location
  index: number
  isInView: boolean
}

export function LocationCard({ location, index, isInView }: LocationCardProps) {
  const isReversed = index % 2 === 1

  return (
    <motion.div
      id={`location-${location.id}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center"
    >
      {/* Image & Map Column */}
      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
        <LocationImage location={location} index={index} isInView={isInView} />
      </div>

      {/* Content Column */}
      <motion.div 
        className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <LocationInfo location={location} isInView={isInView} />
        <LocationActions location={location} />
      </motion.div>
    </motion.div>
  )
}

