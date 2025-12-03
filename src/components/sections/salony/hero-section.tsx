"use client"

import { motion } from "framer-motion"
import { noiseTextureStyle } from "./animation-variants"

interface HeroSectionProps {
  isInView: boolean
}

const stats = [
  { value: "4", label: "Salony" },
  { value: "3", label: "Miasta" },
  { value: "20+", label: "Lat tradycji" },
]

export function HeroSection({ isInView }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 bg-[#1a1a1a] overflow-hidden">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={noiseTextureStyle} 
      />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C4A77D]/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="text-[#C4A77D] text-xs font-medium tracking-[0.5em] uppercase">
            Lokalizacje
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
        </motion.div>
        
        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]"
          >
            Nasze
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em]"
          >
            <span className="relative inline-block">
              <span className="italic text-[#C4A77D]">Salony</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C4A77D]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 text-lg lg:text-xl leading-[1.8] mb-10 max-w-lg font-light"
        >
          Zapraszamy do naszych salonów w Warszawie, Piasecznie i Grójcu. 
          W każdym znajdziesz ten sam profesjonalizm i jakość.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center relative">
              {i > 0 && <div className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />}
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="font-display text-3xl lg:text-4xl font-light text-white tracking-tight">{stat.value}</span>
              </div>
              <span className="block text-[9px] tracking-[0.2em] text-white/40 uppercase mt-2 font-light">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

