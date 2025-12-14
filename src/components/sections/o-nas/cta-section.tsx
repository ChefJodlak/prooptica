"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-15%" })

  return (
    <section ref={ctaRef} className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isCtaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#050505] p-6 lg:p-20 overflow-hidden text-center"
        >

          
          {/* Gradient orb */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E31F25]/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-[#E31F25]/30" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-[#E31F25]/30" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-[#E31F25]/30" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-[#E31F25]/30" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31F25]/10 text-[#E31F25] text-[10px] font-medium tracking-[0.3em] uppercase mb-8"
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
              <span className="italic text-[#E31F25]">sam</span>
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
              <Link href="/umow-wizyte" className="group/btn">
                <button className="relative overflow-hidden bg-[#E31F25] text-white px-8 sm:px-10 py-4 sm:py-5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(227,31,37,0.5)] hover:scale-[1.02]">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="absolute inset-0 border border-white/20" />
                  <span className="relative flex items-center gap-3">
                    <span>Umów wizytę</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              <Link href="/salony">
                <button className="border border-white/20 text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:border-[#E31F25] hover:text-[#E31F25] transition-all duration-500">
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

