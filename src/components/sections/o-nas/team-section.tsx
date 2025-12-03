"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TEAM } from "./constants"
import { containerVariants, noiseTextureStyle } from "./animation-variants"

export function TeamSection() {
  const teamRef = useRef<HTMLDivElement>(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: "-15%" })

  return (
    <section ref={teamRef} className="relative py-24 lg:py-32 bg-[#F8F7F4] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={noiseTextureStyle} />
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-5 mb-8"
            >
              <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">Zespół</span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]"
            >
              Poznaj naszych{" "}
              <span className="relative inline-block">
                <span className="italic text-[#C4A77D]">ekspertów</span>
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#5a5a5a] text-base leading-relaxed font-light max-w-sm lg:text-right"
          >
            Nasz zespół to wykwalifikowani specjaliści z pasją do optyki.
          </motion.p>
        </div>
        
        {/* Team Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isTeamInView ? "visible" : "hidden"}
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
              className="group"
            >
              {/* Image with artistic frame */}
              <div className="relative mb-6">
                {/* Outer frame */}
                <div className="absolute -inset-2 border border-[#C4A77D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  />
                  {/* Elegant overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <h3 className="font-display text-lg font-medium text-[#1a1a1a] group-hover:text-[#C4A77D] transition-colors tracking-tight">
                {member.name}
              </h3>
              <p className="text-[#737373] text-sm font-light">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

