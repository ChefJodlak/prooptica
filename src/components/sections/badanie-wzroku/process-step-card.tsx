"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ProcessStepCardProps {
  number: string
  title: string
  description: string
  index: number
  isLast: boolean
  isInView: boolean
}

export function ProcessStepCard({ number, title, description, index, isLast, isInView }: ProcessStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="relative group"
    >
      <div className="bg-white p-8 h-full transition-all duration-500 hover:-translate-y-2 relative">
        {/* Elegant border */}
        <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#C4A77D] transition-all duration-500" />
        
        {/* Gold accent corner */}
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#C4A77D] rotate-45" />
        </div>
        
        {/* Number */}
        <div className="mb-6 relative">
          <span className="font-display text-[4rem] font-thin text-[#C4A77D]/25 leading-none tracking-tighter">
            {number}
          </span>
          <div className="absolute bottom-2 left-0 w-8 h-px bg-[#C4A77D]/40 group-hover:w-12 group-hover:bg-[#C4A77D] transition-all duration-500" />
        </div>
        
        <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-2 group-hover:text-[#C4A77D] transition-colors">
          {title}
        </h3>
        <p className="text-[#737373] font-light">
          {description}
        </p>
      </div>
      
      {/* Arrow */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
          <ArrowRight className="w-6 h-6 text-[#C4A77D]/40" />
        </div>
      )}
    </motion.div>
  )
}

