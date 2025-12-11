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
        <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#E31F25] transition-all duration-500" />
        
        {/* Red accent corner */}
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#E31F25] rotate-45" />
        </div>
        
        {/* Number */}
        <div className="mb-6 relative">
          <span className="font-display text-[4rem] font-thin text-[#E31F25]/25 leading-none tracking-tighter">
            {number}
          </span>
          <div className="absolute bottom-2 left-0 w-8 h-px bg-[#E31F25]/40 group-hover:w-12 group-hover:bg-[#E31F25] transition-all duration-500" />
        </div>
        
        <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-2 group-hover:text-[#E31F25] transition-colors">
          {title}
        </h3>
        <p className="text-[#737373] font-light">
          {description}
        </p>
      </div>
      
      {/* Arrow - positioned in the center of the gap between cards */}
      {!isLast && (
        <div 
          className="hidden lg:flex absolute top-1/2 z-20 items-center justify-center"
          style={{ 
            right: '-16px',
            transform: 'translateY(-50%) translateX(50%)',
            width: '32px',
            height: '32px'
          }}
        >
          <ArrowRight className="w-5 h-5 text-[#E31F25]" />
        </div>
      )}
    </motion.div>
  )
}

