"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { VALUES } from "./constants"
import { containerVariants } from "./animation-variants"

export function ValuesSection() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-15%" })

  return (
    <section ref={valuesRef} className="relative py-24 lg:py-32 bg-[#fafafa] overflow-hidden">
      {/* Decorative large text - background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isValuesInView ? { opacity: 0.02 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-20 right-8 font-display text-[8vw] font-bold text-[#1a1a1a] leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em]"
      >
        WARTOŚCI
      </motion.div>
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isValuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-5 mb-8"
            >
              <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">Nasze Wartości</span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]"
            >
              Co nas{" "}
              <span className="relative inline-block">
                <span className="italic text-[#C4A77D]">definiuje</span>
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#5a5a5a] text-base leading-relaxed font-light max-w-sm lg:text-right"
          >
            Fundamenty, na których budujemy zaufanie naszych klientów od ponad 20 lat.
          </motion.p>
        </div>
        
        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isValuesInView ? "visible" : "hidden"}
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
              className="group"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 bg-[#C4A77D]/10 group-hover:bg-[#C4A77D]/20 transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-[#C4A77D]" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="font-display text-lg lg:text-xl font-medium text-[#1a1a1a] mb-2 tracking-[-0.01em] group-hover:text-[#C4A77D] transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed font-light">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

