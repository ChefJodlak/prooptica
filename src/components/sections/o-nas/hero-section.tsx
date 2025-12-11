"use client"

import { motion } from "framer-motion"
import { STATS } from "./constants"
import { noiseTextureStyle } from "./animation-variants"

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 bg-[#1a1a1a] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={noiseTextureStyle} />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#E31F25]/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-5 mb-10"
          >
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              O Nas
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
              Historia rodzinnej
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
                <span className="italic text-[#E31F25]">pasji i precyzji</span>
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl leading-[1.8] mb-12 max-w-xl font-light"
          >
            Od 2004 roku łączymy tradycję rodzinnego rzemiosła z najnowocześniejszymi 
            technologiami optycznymi. Twoje oczy są w najlepszych rękach.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-12"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                {i > 0 && <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />}
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="font-display text-4xl lg:text-5xl font-light text-white tracking-tight tabular-nums">{stat.value}</span>
                  {stat.suffix && <span className="font-display text-xl lg:text-2xl text-[#E31F25] font-light">{stat.suffix}</span>}
                </div>
                <span className="block text-[9px] tracking-[0.2em] text-white/40 uppercase mt-2 font-light">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

