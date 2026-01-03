"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-15%" })

  return (
    <section ref={ctaRef} className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
      {/* Gradient orb */}
      <motion.div
        className="absolute -top-20 left-1/4 w-64 h-64 bg-[#E31F25]/20 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
              <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                Dołącz do nas
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
            </div>

            <h3 className="font-display text-[2rem] lg:text-[3rem] font-extralight text-white leading-[1.1] tracking-[-0.02em] mb-4">
              Przekonaj się{" "}
              <span className="relative inline-block">
                <span className="italic text-[#E31F25] font-medium">sam</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </h3>
            <p className="text-white/50 max-w-md font-light leading-relaxed">
              Umów wizytę i doświadcz różnicy, jaką daje 20 lat doświadczenia w optyce.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link href="/salony">
              <button className="flex items-center gap-3 px-6 py-4 border border-white/20 text-white hover:border-[#E31F25] hover:text-[#E31F25] transition-all duration-300">
                <span className="font-medium tracking-wide">Nasze salony</span>
              </button>
            </Link>
            <Link href="/umow-wizyte" className="group">
              <button className="relative overflow-hidden bg-[#E31F25] text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-3">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span className="relative z-10">Umów wizytę</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

