"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface PricingCardProps {
  name: string
  price: string
  note: string
  features: string[]
  popular: boolean
  index: number
  isInView: boolean
}

export function PricingCard({ name, price, note, features, popular, index, isInView }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className={`relative p-8 rounded-3xl h-full flex flex-col ${
        popular 
          ? 'bg-[#151515] text-white border border-[#E31F25]' 
          : 'bg-white/5 text-white border border-white/10'
      }`}
    >
      <div className="mb-2 text-center">
        <span className={`font-display text-5xl lg:text-6xl ${price.startsWith('GRATIS') ? 'font-bold' : 'font-light'}`}>{price}</span>
      </div>
      {/* Fixed height container for note to ensure alignment */}
      <div className="h-8 mb-4 text-center">
        {note && (
          <p className="text-sm text-white/50">
            {note}
          </p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E31F25]" />
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
