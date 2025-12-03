"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

// Premium brands - displayed prominently
const FEATURED_BRANDS = [
  "TOM FORD",
  "DIOR",
  "GUCCI",
  "PRADA",
  "VERSACE",
  "RAY-BAN",
]

// All brands for the flowing marquee
const ALL_BRANDS = [
  "TOM FORD", "DIOR", "GUCCI", "DSQUARED2", "CHLOE", "ANA HICKMANN",
  "BYBLOS MILANO", "CALVIN KLEIN", "CAROLINA HERRERA", "CARRERA", 
  "CHRISTIAN LACROIX", "DOLCE&GABBANA", "EMPORIO ARMANI", "ESCADA",
  "ETNIA BARCELONA", "FILA", "FURLA", "GENNY", "GIGI BARCELONA",
  "GUESS", "HUGO BOSS", "KOALI", "LAURA BIAGIOTTI", "LIGHTECH",
  "LIU JO", "LOVE MOSCHINO", "LUCAS", "LUCKY DUCKY", "MARC JACOBS",
  "MARCO POLO", "MAX MARA", "OAKLEY", "OGA", "POLO RALPH LAUREN",
  "PORSCHE DESIGN", "PRADA", "PRADA SPORT", "PUMA", "RAY BAN",
  "SALVATORE FERRAGAMO", "SILHOUETTE", "SOLANO", "SONIA RYKIEL",
  "STEPPER", "TAN", "TOMMY HILFIGER", "TOUS", "VERDO", "VERSACE",
  "VOGUE", "WES", "XAVIER GARCIA"
]

// Individual featured brand with elegant hover
function FeaturedBrand({ 
  name, 
  index, 
  isInView 
}: { 
  name: string
  index: number
  isInView: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.3 + index * 0.08,
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <span className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[-0.02em] text-[#1a1a1a] transition-all duration-500 group-hover:text-[#C4A77D]">
        {name}
      </span>
      
      {/* Elegant underline on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#C4A77D] origin-left"
      />
    </motion.div>
  )
}

export function BrandsMarquee() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex items-center"
    >
      {/* === DECORATIVE LINES === */}
      
      {/* Elegant line - top left corner accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-0 w-[25%] h-[1px] bg-gradient-to-r from-[#C4A77D]/50 via-[#C4A77D]/25 to-transparent origin-left hidden lg:block"
      />
      
      {/* Vertical accent - left side */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-[25%] w-[1px] h-16 bg-gradient-to-b from-[#C4A77D]/25 to-transparent origin-top hidden lg:block"
      />
      
      {/* Elegant line - bottom right corner accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 right-0 w-[20%] h-[1px] bg-gradient-to-l from-[#C4A77D]/40 via-[#C4A77D]/20 to-transparent origin-right hidden lg:block"
      />
      
      {/* Vertical accent - right side */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 right-[20%] w-[1px] h-16 bg-gradient-to-t from-[#C4A77D]/20 to-transparent origin-bottom hidden lg:block"
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full py-12 sm:py-16 lg:py-20">
        
        {/* Header Section */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 mb-10 sm:mb-16 lg:mb-20">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6 lg:gap-16">
            
            <div className="flex-1">
              {/* Elegant label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-5"
              >
                <div className="h-px w-8 sm:w-10 bg-[#C4A77D]" />
                <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.25em] sm:tracking-[0.4em] uppercase">
                  Kolekcja Premium
                </span>
              </motion.div>
              
              {/* Main headline */}
              <div className="space-y-0">
                <div className="overflow-hidden pb-0.5 sm:pb-1">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="font-display text-[clamp(1.75rem,6vw,4.5rem)] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]"
                  >
                    Światowe marki
                  </motion.h2>
                </div>
                <div className="overflow-hidden pb-0.5 sm:pb-1">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    className="font-display text-[clamp(1.75rem,6vw,4.5rem)] font-medium text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]"
                  >
                    w naszej <span className="text-[#C4A77D] italic">ofercie</span>
                  </motion.h2>
                </div>
              </div>
            </div>
            
            {/* Side description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:max-w-xs lg:text-right"
            >
              <p className="text-[#737373] text-base sm:text-lg leading-[1.7] font-light">
                Starannie wyselekcjonowana oferta od najbardziej prestiżowych domów mody i producentów okularów.
              </p>
              <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 lg:justify-end">
                <div className="w-1.5 h-1.5 bg-[#C4A77D] rounded-full" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#A3A3A3] uppercase">
                  Oryginalne produkty
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Brands - Elegant Display */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 mb-10 sm:mb-16 lg:mb-20">
          {/* First row - 3 brands */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-8 lg:gap-x-0 gap-y-4 sm:gap-y-6 mb-6 sm:mb-8 lg:mb-12">
            {FEATURED_BRANDS.slice(0, 3).map((name, i) => (
              <div key={name} className="flex items-center">
                <FeaturedBrand 
                  name={name} 
                  index={i} 
                  isInView={isInView} 
                />
                {i < 2 && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hidden lg:block mx-12 xl:mx-16 text-[#C4A77D]/30 text-2xl font-light"
                  >
                    ·
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          
          {/* Second row - 3 brands */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-8 lg:gap-x-0 gap-y-4 sm:gap-y-6">
            {FEATURED_BRANDS.slice(3, 6).map((name, i) => (
              <div key={name} className="flex items-center">
                <FeaturedBrand 
                  name={name} 
                  index={i + 3} 
                  isInView={isInView} 
                />
                {i < 2 && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="hidden lg:block mx-12 xl:mx-16 text-[#C4A77D]/30 text-2xl font-light"
                  >
                    ·
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Section - Infinite Flowing Elegance */}
        <div className="relative">
          
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 lg:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 lg:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent" />
          
          {/* First Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex overflow-hidden py-3"
          >
            <div className="flex animate-marquee items-center">
              {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
                <span 
                  key={`row1-${i}`} 
                  className="text-sm font-medium text-[#A3A3A3] uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10 transition-colors duration-300 hover:text-[#C4A77D]"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee items-center" aria-hidden>
              {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
                <span 
                  key={`row1-dup-${i}`} 
                  className="text-sm font-medium text-[#A3A3A3] uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Second Row - Reverse direction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex overflow-hidden py-3"
          >
            <div className="flex animate-marquee-reverse items-center">
              {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
                <span 
                  key={`row2-${i}`} 
                  className="text-sm font-medium text-[#D4D4D4] uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee-reverse items-center" aria-hidden>
              {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
                <span 
                  key={`row2-dup-${i}`} 
                  className="text-sm font-medium text-[#D4D4D4] uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center px-5 sm:px-6 mt-10 sm:mt-16 lg:mt-20"
        >
          <p className="text-xs sm:text-sm text-[#A3A3A3] tracking-[0.1em] sm:tracking-[0.15em] uppercase">
            Wszystkie oprawy oryginalne · Pełna gwarancja producenta
          </p>
        </motion.div>
      </div>
    </section>
  )
}
