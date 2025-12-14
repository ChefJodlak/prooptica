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
      <span className="font-display text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[-0.02em] text-[#1a1a1a] transition-all duration-500 group-hover:text-[#E31F25]">
        {name}
      </span>
      
      {/* Elegant underline on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#E31F25] origin-left"
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
      className="relative min-h-[100svh] py-12 lg:py-20 bg-[#FAFAFA] overflow-hidden flex flex-col justify-between"
    >
      {/* === DECORATIVE LINES === */}
      
      {/* Elegant line - top left corner accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute top-6 left-0 w-[25%] h-[1px] bg-gradient-to-r from-[#E31F25]/50 via-[#E31F25]/25 to-transparent origin-left"
      />
      
      {/* Vertical accent - left side */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute top-6 left-[25%] w-[1px] h-16 bg-gradient-to-b from-[#E31F25]/25 to-transparent origin-top"
      />
      
      {/* Elegant line - bottom right corner accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute bottom-6 right-0 w-[20%] h-[1px] bg-gradient-to-l from-[#E31F25]/40 via-[#E31F25]/20 to-transparent origin-right"
      />
      
      {/* Vertical accent - right side */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute bottom-6 right-[20%] w-[1px] h-16 bg-gradient-to-t from-[#E31F25]/20 to-transparent origin-bottom"
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 mb-auto pt-8 sm:pt-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-6 lg:gap-16">
            
            <div className="flex-1 text-center sm:text-left">
              {/* Elegant label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 mb-3 sm:mb-5"
              >
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent origin-right lg:hidden" 
                />
                <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                  Kolekcja Premium
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left" 
                />
              </motion.div>
              
              {/* Main headline */}
              <div className="space-y-0">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display text-[2.25rem] sm:text-[clamp(1.75rem,6vw,4.5rem)] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] pb-4 pr-4"
                >
                  Światowe marki w naszej{" "}
                  <span className="relative inline-block">
                    <span className="font-medium text-[#E31F25] italic">ofercie</span>
                    <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[6px] sm:h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" fill="none" stroke="#E31F25" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h2>
              </div>
              </div>
            </div>
            
            {/* Side description - visible on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block sm:block lg:max-w-xs text-center lg:text-right mb-2 lg:mb-0"
            >
              <p className="text-[#737373] text-base sm:text-lg leading-[1.6] font-light">
                Starannie wyselekcjonowana oferta od najbardziej prestiżowych domów mody i producentów okularów.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Featured Brands - Elegant Display */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 my-auto">
          {/* First row - 3 brands */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 lg:gap-x-0 gap-y-10 sm:gap-y-12 mb-10 sm:mb-12 lg:mb-12">
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
                    className="hidden lg:block mx-12 xl:mx-16 text-[#E31F25]/30 text-2xl font-light"
                  >
                    ·
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          
          {/* Second row - 3 brands */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 lg:gap-x-0 gap-y-10 sm:gap-y-12">
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
                    className="hidden lg:block mx-12 xl:mx-16 text-[#E31F25]/30 text-2xl font-light"
                  >
                    ·
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pb-8 sm:pb-12">
          {/* Marquee Section - Infinite Flowing Elegance */}
          <div className="relative mb-6 sm:mb-8 lg:mb-10">
          
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
                  className="text-sm font-medium text-[#A3A3A3] uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10 transition-colors duration-300 hover:text-[#E31F25]"
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
            className="text-center px-5 sm:px-6"
          >
            <p className="text-[10px] sm:text-sm text-[#A3A3A3] tracking-[0.08em] sm:tracking-[0.15em] uppercase">
              Wszystkie oprawy oryginalne · Pełna gwarancja producenta
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
