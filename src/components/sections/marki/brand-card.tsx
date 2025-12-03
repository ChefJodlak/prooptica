"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { fadeUpVariants } from "./animation-variants"
import type { Brand } from "./types"

interface BrandCardProps {
  brand: Brand
}

function getTierStyles(category: string): string {
  switch (category) {
    case 'luxury':
      return 'bg-[#C4A77D]/20 text-[#8a7355]'
    case 'lenses':
    case 'sport':
      return 'bg-[#1a1a1a]/10 text-[#5a5a5a]'
    default:
      return 'bg-[#F8F7F4] text-[#737373]'
  }
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="group relative bg-white p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {/* Elegant border */}
      <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#C4A77D] transition-all duration-500" />
      
      {/* Gold accent corner */}
      <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#C4A77D] rotate-45" />
      </div>
      
      {/* Tier Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-[9px] font-medium tracking-[0.1em] uppercase ${getTierStyles(brand.category)}`}>
          {brand.tier}
        </span>
      </div>
      
      {/* Logo Placeholder */}
      <div className="aspect-video flex items-center justify-center mb-6 bg-[#F8F7F4] group-hover:bg-[#e0ded8] transition-colors">
        <span className="font-display text-2xl lg:text-3xl font-light text-[#737373] group-hover:text-[#1a1a1a] transition-colors tracking-tight">
          {brand.name}
        </span>
      </div>
      
      {/* Info */}
      <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-2 group-hover:text-[#C4A77D] transition-colors">
        {brand.name}
      </h3>
      <p className="text-sm text-[#737373] line-clamp-2 font-light">
        {brand.description}
      </p>
      
      {/* Hover Arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-5 h-5 text-[#C4A77D]" />
      </div>
    </motion.div>
  )
}

