"use client"

import { motion } from "framer-motion"
import { Phone, Clock, CheckCircle2 } from "lucide-react"
import type { Location } from "@/lib/constants/locations"
import { containerVariants, fadeUpVariants } from "./animation-variants"

interface LocationInfoProps {
  location: Location
  isInView: boolean
}

const features = [
  "Badanie wzroku",
  "Dobór soczewek",
  "Naprawa okularów",
  "Konsultacje"
]

export function LocationInfo({ location, isInView }: LocationInfoProps) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Header */}
      <motion.div variants={fadeUpVariants} className="mb-10">
        <div className="flex items-center gap-5 mb-6">
          <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
            {location.postal} {location.city}
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#E31F25] to-transparent" />
        </div>
        
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
          {location.city}
        </h2>
        <p className="font-display text-xl lg:text-2xl font-light text-[#5a5a5a] tracking-[-0.01em]">
          {location.address}
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="flex items-start gap-4 p-5 bg-white border border-[#e0ded8]">
          <div className="p-3 bg-[#1a1a1a]">
            <Phone className="w-4 h-4 text-[#E31F25]" />
          </div>
          <div>
            <div className="text-[9px] text-[#999] tracking-[0.2em] uppercase mb-1">Telefon</div>
            <a 
              href={`tel:${location.phone}`}
              className="text-base font-medium text-[#1a1a1a] hover:text-[#E31F25] transition-colors"
            >
              {location.phone}
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-white border border-[#e0ded8]">
          <div className="p-3 bg-[#1a1a1a]">
            <Clock className="w-4 h-4 text-[#E31F25]" />
          </div>
          <div>
            <div className="text-[9px] text-[#999] tracking-[0.2em] uppercase mb-1">Godziny otwarcia</div>
            <div className="text-base font-medium text-[#1a1a1a] whitespace-pre-line">
              {location.openingHours || "Pn-Pt: 10-18\nSob: 10-14"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-4 mb-10">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-[#5a5a5a]">
            <CheckCircle2 className="w-5 h-5 text-[#E31F25]" />
            <span className="text-sm font-light">{feature}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

