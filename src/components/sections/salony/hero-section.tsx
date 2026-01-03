"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "@/components/sections/badanie-wzroku/section-label"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

interface HeroSectionProps {
  isInView: boolean
}

export function HeroSection({ isInView }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#1a1a1a] overflow-hidden min-h-[60vh] flex items-center">
      
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

      {/* Abstract Map Background Decoration */}
      <svg className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[400px] h-[600px] opacity-[0.03] pointer-events-none hidden lg:block" viewBox="0 0 400 600">
        <path d="M200,100 L180,300 L220,500" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
        <circle cx="200" cy="100" r="10" fill="white" />
        <circle cx="180" cy="300" r="10" fill="white" />
        <circle cx="220" cy="500" r="10" fill="white" />
        <text x="220" y="100" fill="white" fontSize="14" fontFamily="monospace">WARSZAWA</text>
        <text x="200" y="300" fill="white" fontSize="14" fontFamily="monospace">PIASECZNO</text>
        <text x="240" y="500" fill="white" fontSize="14" fontFamily="monospace">GRÓJEC</text>
      </svg>

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <SectionLabel text="Lokalizacje" animate={isInView} />
          
          {/* Headline */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.5rem,10vw,7.5rem)] text-white leading-[0.9] tracking-[-0.03em]"
            >
              <span className="font-extralight">Nasze </span>
              <span className="relative inline-block font-medium">
                <span className="italic text-[#E31F25]">Salony</span>
                <span className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </motion.h1>
          </div>
          
          <div className="flex flex-col gap-12 items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 text-lg lg:text-xl leading-[1.8] max-w-lg font-light"
            >
              Zapraszamy do naszych salonów w Warszawie, Piasecznie i Grójcu. 
              Stworzyliśmy miejsca, w których profesjonalna diagnostyka łączy się 
              z komfortem i wyjątkową atmosferą.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31F25]/20 to-transparent" />
    </section>
  )
}

