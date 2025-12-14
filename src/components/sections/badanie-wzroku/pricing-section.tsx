"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "./section-label"
import { AccentText } from "./accent-text"
import { PricingCard } from "./pricing-card"
import { PRICING_PLANS } from "./constants"

interface PricingSectionProps {
  isInView: boolean
}

export function PricingSection({ isInView }: PricingSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <SectionLabel text="Cennik" centered />
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] text-white leading-none tracking-[-0.03em]">
            <span className="font-extralight">Przejrzyste</span>{" "}
            <span className="font-medium">
              <AccentText underlineOpacity={0.3}>ceny</AccentText>
            </span>
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
