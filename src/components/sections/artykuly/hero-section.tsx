"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "../badanie-wzroku/section-label"
import { AccentText } from "../badanie-wzroku/accent-text"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#1a1a1a] overflow-hidden">
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: NOISE_TEXTURE
      }} />

      {/* Decorative background elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(227,31,37,0.3) 0%, rgba(227,31,37,0) 70%)",
          willChange: "transform"
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl">
          <SectionLabel text="Blog & Porady" animate />
          
          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] text-white leading-none tracking-[-0.03em]"
            >
              <span className="font-extralight">Artykuły </span>
              <span className="font-medium">
                <AccentText underlineOpacity={0.3}>& Porady</AccentText>
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl leading-[1.8] max-w-2xl mb-8 font-light"
          >
            Baza wiedzy o zdrowiu Twoich oczu. Porady ekspertów, nowości ze świata optyki i inspiracje.
          </motion.p>
        </div>
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

