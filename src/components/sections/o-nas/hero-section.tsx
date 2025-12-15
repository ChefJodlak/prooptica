"use client"

import { motion } from "framer-motion"
import { STATS } from "./constants"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#1a1a1a] overflow-hidden">
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: NOISE_TEXTURE
      }} />

      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(227,31,37,0.3) 0%, rgba(227,31,37,0) 70%)",
          willChange: "transform"
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-5 mb-6"
          >
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              O Nas
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
          </motion.div>
          
          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,9vw,6.5rem)] text-white leading-none tracking-[-0.03em]"
            >
              <span className="font-extralight">Nasza </span>
              <span className="relative inline-block font-medium">
                <span className="italic text-[#E31F25]">historia</span>
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl leading-[1.8] mb-8 max-w-xl font-light"
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

