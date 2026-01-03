"use client"

import { motion } from "framer-motion"
import { PricingCard } from "./pricing-card"
import { PRICING_PLANS } from "./constants"

interface PricingSectionProps {
  isInView: boolean
}

export function PricingSection({ isInView }: PricingSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-5 mb-8">
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent to-[#E31F25]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              Cennik
            </span>
            <motion.div
              className="h-px w-12 bg-gradient-to-l from-transparent to-[#E31F25]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
            <span className="font-extralight">Przejrzyste</span>{" "}
            <span className="italic text-[#E31F25] font-medium">ceny</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              note={plan.note}
              features={plan.features}
              popular={plan.popular}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
