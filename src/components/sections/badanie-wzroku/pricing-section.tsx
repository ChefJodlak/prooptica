"use client"

import { motion } from "framer-motion"
import { TextureOverlay } from "./texture-overlay"
import { SectionLabel } from "./section-label"
import { AccentText } from "./accent-text"
import { PricingCard } from "./pricing-card"
import { PRICING_PLANS } from "./constants"

interface PricingSectionProps {
  isInView: boolean
}

export function PricingSection({ isInView }: PricingSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#1a1a1a] overflow-hidden">
      <TextureOverlay />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel text="Cennik" centered />
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-extralight text-white leading-[1] tracking-[-0.03em] mb-2">
            Przejrzyste
          </h2>
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-medium text-white leading-[1] tracking-[-0.03em]">
            <AccentText underlineOpacity={0.3}>ceny</AccentText>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
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

