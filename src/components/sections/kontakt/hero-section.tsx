"use client"

import { motion } from "framer-motion"
import { NOISE_TEXTURE } from "./animation-variants"

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 bg-[#1a1a1a] overflow-hidden">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: NOISE_TEXTURE }} 
      />
      
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#E31F25]/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 mb-8"
        >
          <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
            Kontakt
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
        </motion.div>
        
        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(3rem,9vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]"
          >
            Skontaktuj się
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(3rem,9vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em]"
          >
            <span className="relative inline-block">
              <span className="italic text-[#E31F25]">z nami</span>
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
            </span>
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-lg lg:text-xl leading-[1.8] max-w-lg font-light"
        >
          Masz pytania? Chcesz umówić wizytę? Jesteśmy do Twojej dyspozycji.
        </motion.p>
      </div>
      
      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31F25]/30 to-transparent origin-center"
      />
    </section>
  )
}

