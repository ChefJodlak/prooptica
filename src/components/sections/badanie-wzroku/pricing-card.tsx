"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

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
      className={`relative p-8 h-full flex flex-col border rounded-2xl transition-all duration-300 ${
        popular
          ? 'bg-[#F8F7F4] border-[#E31F25]/30 hover:border-[#E31F25]/50 shadow-lg'
          : 'bg-[#F8F7F4] border-[#e0ded8] hover:border-[#E31F25]/30'
      }`}
    >
      <div className="mb-2 text-center">
        <span
          className={`text-5xl lg:text-6xl text-[#1a1a1a] tracking-tight ${price.startsWith('GRATIS') ? 'font-bold text-[#E31F25]' : 'font-light'}`}
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          {price.endsWith('*') ? (
            <>
              {price.slice(0, -1)}
              <span className="text-2xl relative -top-5">*</span>
            </>
          ) : (
            price
          )}
        </span>
      </div>
      {/* Fixed height container for note to ensure alignment */}
      <div className="h-8 mb-4 text-center">
        {note && (
          <p className="text-sm text-[#5a5a5a]">
            {note}
          </p>
        )}
      </div>

      <ul className="space-y-3 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#E31F25]/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-[#E31F25]" />
            </div>
            <span className="text-[#5a5a5a] font-light">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
