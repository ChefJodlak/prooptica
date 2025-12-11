"use client"

import { motion } from "framer-motion"
import { Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { noiseTextureStyle } from "./animation-variants"

interface CtaSectionProps {
  isInView: boolean
}

export function CtaSection({ isInView }: CtaSectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={noiseTextureStyle} 
      />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute -top-20 left-1/4 w-64 h-64 bg-[#E31F25]/20 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
              <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                Bezpłatna konsultacja
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
            </div>
            
            <h3 className="font-display text-[2rem] lg:text-[3rem] font-extralight text-white leading-[1.1] tracking-[-0.02em] mb-4">
              Nie wiesz, który salon{" "}
              <span className="relative inline-block">
                <span className="italic text-[#E31F25] font-medium">wybrać?</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </h3>
            <p className="text-white/50 max-w-md font-light leading-relaxed">
              Zadzwoń do nas — pomożemy wybrać najbliższy salon i umówimy wizytę w dogodnym terminie.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <a 
              href="tel:+4822XXXXXXX"
              className="flex items-center gap-3 px-6 py-4 border border-white/20 text-white hover:border-[#E31F25] hover:text-[#E31F25] transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium tracking-wide">+48 22 XXX XX XX</span>
            </a>
            <Link href="/kontakt">
              <button className="bg-[#E31F25] text-[#1a1a1a] px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 flex items-center gap-3">
                Kontakt
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

