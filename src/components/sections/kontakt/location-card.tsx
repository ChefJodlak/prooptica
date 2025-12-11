"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface LocationCardProps {
  id: string
  city: string
  address: string
  phone: string
  openingHours?: string
  index: number
  isInView: boolean
}

export function LocationCard({
  city,
  address,
  phone,
  openingHours,
  index,
  isInView
}: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      className="group relative bg-white p-6 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Elegant border */}
      <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#E31F25] transition-all duration-500" />
      
      {/* Red accent corner */}
      <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#E31F25] rotate-45" />
      </div>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#1a1a1a]">
          <MapPin className="w-5 h-5 text-[#E31F25]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-medium text-[#1a1a1a] mb-1 group-hover:text-[#E31F25] transition-colors">
            {city}
          </h3>
          <p className="text-[#737373] text-sm mb-3 font-light">{address}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#5a5a5a]">
            <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-[#E31F25] transition-colors">
              <Phone className="w-4 h-4 text-[#E31F25]" />
              <span className="font-light">{phone}</span>
            </a>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E31F25]" />
              <span className="font-light">{openingHours || "Pn-Pt 10-18"}</span>
            </span>
          </div>
        </div>
        
        <Link 
          href="/salony"
          className="p-2 bg-[#F8F7F4] text-[#737373] hover:bg-[#E31F25] hover:text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  )
}

