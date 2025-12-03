"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
      className={`relative p-8 ${
        popular 
          ? 'bg-[#C4A77D] text-[#1a1a1a]' 
          : 'bg-white/5 text-white ring-1 ring-white/10'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 bg-[#1a1a1a] text-[#C4A77D] text-[10px] font-medium tracking-[0.2em] uppercase">
            Najpopularniejsze
          </span>
        </div>
      )}
      
      <h3 className="font-display text-xl font-medium mb-4">{name}</h3>
      <div className="mb-2">
        <span className="font-display text-4xl font-light">{price}</span>
      </div>
      {note && (
        <p className={`text-sm mb-6 ${popular ? 'text-[#1a1a1a]/60' : 'text-white/50'}`}>
          {note}
        </p>
      )}
      
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckCircle2 className={`w-5 h-5 ${popular ? 'text-[#1a1a1a]/70' : 'text-[#C4A77D]'}`} />
            <span className={popular ? 'text-[#1a1a1a]/80' : 'text-white/70'}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href="/umow-wizyte" className="block w-full">
        <Button 
          className={`w-full rounded-none py-6 font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 ${
            popular 
              ? 'bg-[#1a1a1a] text-[#C4A77D] hover:bg-white hover:text-[#1a1a1a]' 
              : 'bg-[#C4A77D] hover:bg-white text-[#1a1a1a]'
          }`}
        >
          Umów wizytę
        </Button>
      </Link>
    </motion.div>
  )
}

