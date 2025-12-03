"use client"

import { motion } from "framer-motion"
import { Clock, Award, Shield } from "lucide-react"
import { TextureOverlay } from "./texture-overlay"
import { SectionLabel } from "./section-label"
import { AccentText } from "./accent-text"

const HERO_STATS = [
  { icon: Clock, text: "30-45 min" },
  { icon: Award, text: "Certyfikowani specjaliści" },
  { icon: Shield, text: "Pełna diagnostyka" }
]

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 bg-[#1a1a1a] overflow-hidden">
      <TextureOverlay />
      
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#C4A77D]/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl">
          <SectionLabel text="Usługi" animate />
          
          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]"
            >
              Badanie
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em]"
            >
              <AccentText underlineOpacity={0.3}>Wzroku</AccentText>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl leading-[1.8] max-w-2xl mb-12 font-light"
          >
            Kompleksowa diagnostyka wzroku przy użyciu najnowocześniejszego sprzętu. 
            Twoje oczy zasługują na precyzję i profesjonalizm.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            {HERO_STATS.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 bg-[#C4A77D]/10">
                  <item.icon className="w-5 h-5 text-[#C4A77D]" />
                </div>
                <span className="text-white/70 font-light">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A77D]/30 to-transparent origin-center"
      />
    </section>
  )
}

