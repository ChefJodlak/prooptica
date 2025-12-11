"use client"

import { motion } from "framer-motion"
import { Building2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Salon } from "./types"

interface SalonCardProps {
  salon: Salon
  isSelected: boolean
  onClick: () => void
}

export function SalonCard({ 
  salon, 
  isSelected, 
  onClick 
}: SalonCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full text-left p-6 transition-all duration-300 cursor-pointer",
        "ring-1 ring-inset",
        isSelected 
          ? "bg-[#1a1a1a] ring-[#E31F25] shadow-lg" 
          : "bg-white ring-[#e0ded8] hover:ring-[#E31F25] hover:shadow-md hover:bg-[#FAFAF8]"
      )}
    >
      {/* Red accent corner when selected */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#E31F25] rotate-45" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 transition-all duration-300",
          isSelected ? "bg-[#E31F25]" : "bg-[#F5F5F5] group-hover:bg-[#E31F25]/20 group-hover:scale-110"
        )}>
          <Building2 className={cn(
            "w-5 h-5 transition-colors duration-300",
            isSelected ? "text-[#1a1a1a]" : "text-[#E31F25]"
          )} />
        </div>
        
        <div className="flex-1">
          <h3 className={cn(
            "font-display text-xl font-medium mb-1 transition-colors duration-300",
            isSelected ? "text-white" : "text-[#1a1a1a] group-hover:text-[#E31F25]"
          )}>
            {salon.city}
          </h3>
          <p className={cn(
            "text-sm font-light transition-colors duration-300",
            isSelected ? "text-white/70" : "text-[#737373]"
          )}>
            {salon.address}
          </p>
          <p className={cn(
            "text-xs font-light mt-1 transition-colors duration-300",
            isSelected ? "text-white/50" : "text-[#a3a3a3]"
          )}>
            {salon.postal} {salon.city}
          </p>
        </div>
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-[#E31F25] flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-[#1a1a1a]" />
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}

