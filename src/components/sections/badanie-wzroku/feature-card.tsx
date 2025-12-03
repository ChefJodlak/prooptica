"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
  isInView: boolean
}

export function FeatureCard({ icon: Icon, title, description, index, isInView }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="group flex items-start gap-4 p-5 bg-[#F8F7F4] transition-all duration-500 hover:-translate-y-1"
    >
      {/* Elegant border */}
      <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#C4A77D] transition-all duration-500" />
      
      <div className="p-3 bg-[#1a1a1a] shrink-0">
        <Icon className="w-5 h-5 text-[#C4A77D]" />
      </div>
      <div>
        <h3 className="font-display text-lg font-medium text-[#1a1a1a] mb-1 group-hover:text-[#C4A77D] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

