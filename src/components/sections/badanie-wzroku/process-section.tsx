"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "./section-label"
import { AccentText } from "./accent-text"
import { ProcessStepCard } from "./process-step-card"
import { PROCESS_STEPS } from "./constants"

interface ProcessSectionProps {
  isInView: boolean
}

export function ProcessSection({ isInView }: ProcessSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F8F7F4]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel text="Proces" centered />
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
            Jak przebiega
          </h2>
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em]">
            <AccentText>badanie?</AccentText>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              index={i}
              isLast={i === PROCESS_STEPS.length - 1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

