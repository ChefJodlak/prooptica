"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-10 h-px bg-[#C4A77D]" />
          <span className="text-[#C4A77D] text-[11px] font-medium tracking-[0.4em] uppercase">
            Blog & Porady
          </span>
        </motion.div>
        
        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={isHeroInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em]"
          >
            Artykuły
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={isHeroInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em]"
          >
            <span className="relative inline-block">
              <span className="italic text-[#C4A77D]">& Porady</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#5a5a5a] text-lg lg:text-xl leading-[1.8] max-w-xl font-light"
        >
          Baza wiedzy o zdrowiu Twoich oczu. Porady ekspertów, nowości ze świata optyki i inspiracje.
        </motion.p>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-20 right-10 lg:right-32 w-32 h-32 lg:w-48 lg:h-48 border border-[#C4A77D]/10 rounded-full"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-32 right-16 lg:right-44 w-20 h-20 lg:w-28 lg:h-28 border border-[#C4A77D]/20 rounded-full"
      />
    </section>
  )
}

