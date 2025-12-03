"use client"

import { motion } from "framer-motion"
import { NOISE_TEXTURE_BG, TECH_PARTNERS } from "./constants"

interface PartnersSectionProps {
  isInView: boolean
}

export function PartnersSection({ isInView }: PartnersSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 bg-[#1a1a1a] overflow-hidden">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: NOISE_TEXTURE_BG }} 
      />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-[#C4A77D] to-transparent" />
            <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">
              Wyróżnione
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
          </div>
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-extralight text-white leading-[1] tracking-[-0.03em] mb-2">
            Partnerzy
          </h2>
          <h2 className="font-display text-[2.5rem] lg:text-[4rem] font-medium text-white leading-[1] tracking-[-0.03em]">
            <span className="relative inline-block">
              <span className="italic text-[#C4A77D]">technologiczni</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C4A77D]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TECH_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative bg-white/5 p-8 ring-1 ring-white/10 hover:ring-[#C4A77D]/50 transition-all duration-500 group"
            >
              {/* Gold accent corner */}
              <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#C4A77D] rotate-45" />
              </div>
              
              <div className="aspect-video flex items-center justify-center mb-6 bg-white/5">
                <span className="font-display text-4xl lg:text-5xl font-light text-white tracking-tight">
                  {partner.name}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium text-white mb-3 group-hover:text-[#C4A77D] transition-colors">
                {partner.name}
              </h3>
              <p className="text-white/50 leading-relaxed font-light">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

