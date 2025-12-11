"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
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
          ? 'bg-[#E31F25] text-[#1a1a1a]' 
          : 'bg-white/5 text-white ring-1 ring-white/10'
      }`}
    >
      <div className="mb-2 text-center">
        <span className={`font-display text-5xl lg:text-6xl ${price.startsWith('GRATIS') ? 'font-bold' : 'font-light'}`}>{price}</span>
      </div>
      {/* Fixed height container for note to ensure alignment */}
      <div className="h-8 mb-4 text-center">
        {note && (
          <p className={`text-sm ${popular ? 'text-[#1a1a1a]/60' : 'text-white/50'}`}>
            {note}
          </p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckCircle2 className={`w-5 h-5 ${popular ? 'text-[#1a1a1a]/70' : 'text-[#E31F25]'}`} />
            <span className={popular ? 'text-[#1a1a1a]/80' : 'text-white/70'}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href="/umow-wizyte" className="block w-full group/price">
        <button 
          className={`relative overflow-hidden w-full rounded-none py-5 font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.02] ${
            popular 
              ? 'bg-[#1a1a1a] text-white hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]' 
              : 'bg-[#E31F25] text-white hover:shadow-[0_15px_30px_-10px_rgba(227,31,37,0.4)]'
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/price:translate-x-full transition-transform duration-700 ease-out" />
          <span className={`absolute inset-0 border ${popular ? 'border-white/10' : 'border-white/20'}`} />
          <span className="relative flex items-center justify-center gap-2">
            Umów wizytę
            <ArrowRight className="w-4 h-4 group-hover/price:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </Link>
    </motion.div>
  )
}

