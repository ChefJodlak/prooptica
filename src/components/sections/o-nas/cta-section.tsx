"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { noiseTextureStyle } from "./animation-variants"

export function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-15%" })

  return (
    <section ref={ctaRef} className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isCtaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#1a1a1a] p-10 lg:p-20 overflow-hidden text-center"
        >
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={noiseTextureStyle} />
          
          {/* Gradient orb */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C4A77D]/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-[#C4A77D]/30" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-[#C4A77D]/30" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-[#C4A77D]/30" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-[#C4A77D]/30" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4A77D]/10 text-[#C4A77D] text-[10px] font-medium tracking-[0.3em] uppercase mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Dołącz do nas
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-white leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Przekonaj się{" "}
              <span className="italic text-[#C4A77D]">sam</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 text-lg font-light leading-relaxed mb-10"
            >
              Umów wizytę i doświadcz różnicy, jaką daje 20 lat doświadczenia w optyce.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/umow-wizyte">
                <button className="bg-[#C4A77D] text-[#1a1a1a] px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500">
                  Umów wizytę
                </button>
              </Link>
              <Link href="/salony">
                <button className="border border-white/20 text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:border-[#C4A77D] hover:text-[#C4A77D] transition-all duration-500">
                  Nasze salony
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

