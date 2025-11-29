"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

// Premium brands - displayed prominently
const FEATURED_BRANDS = [
  "TOM FORD",
  "DIOR", 
  "GUCCI",
  "PRADA",
  "VERSACE",
  "RAY-BAN",
]

// All available brands for marquee
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

export function BrandsMarquee() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax for the marquee - moves opposite directions
  const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"])

  return (
    <section ref={containerRef} className="relative py-24 lg:py-40 bg-white overflow-hidden">
      
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E5E5]" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-20 lg:mb-32">
        
        {/* Section Header - Editorial Style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-20">
          
          <div className="flex-1">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-8 bg-[#E31F25]" />
              <span className="text-xs font-medium tracking-[0.3em] text-[#E31F25] uppercase">
                Ponad 50 marek
              </span>
            </motion.div>
            
            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display text-display-lg text-[#0A0A0A]"
              >
                Światowe marki
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-display text-display-lg text-[#A3A3A3]"
              >
                w naszej ofercie
              </motion.h2>
            </div>
          </div>
          
          {/* Side description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#737373] text-base lg:text-lg leading-relaxed max-w-sm lg:text-right"
          >
            Oferujemy oprawy od najbardziej prestiżowych domów mody i czołowych producentów okularów na świecie.
          </motion.p>
        </div>
      </div>

      {/* Featured Brands - Large Typography */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="mb-16 lg:mb-24"
      >
        <div className="flex flex-wrap justify-center items-center gap-x-8 lg:gap-x-16 gap-y-4 px-6">
          {FEATURED_BRANDS.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#0A0A0A] tracking-tight hover:text-[#E31F25] transition-colors duration-500 cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      {/* Elegant Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-[#E5E5E5] origin-left"
        />
      </div>

      {/* Marquee - All Brands */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
        
        {/* First Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ x: marqueeX1 }}
          className="flex overflow-hidden mb-3"
        >
          <div className="flex animate-marquee items-center">
            {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
              <span 
                key={`row1-${i}`} 
                className="text-sm font-medium text-[#A3A3A3] uppercase tracking-[0.15em] whitespace-nowrap px-6 lg:px-8"
              >
                {brand}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee items-center" aria-hidden>
            {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
              <span 
                key={`row1-dup-${i}`} 
                className="text-sm font-medium text-[#A3A3A3] uppercase tracking-[0.15em] whitespace-nowrap px-6 lg:px-8"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Second Row - Reverse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ x: marqueeX2 }}
          className="flex overflow-hidden"
        >
          <div className="flex animate-marquee-reverse items-center">
            {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
              <span 
                key={`row2-${i}`} 
                className="text-sm font-medium text-[#D4D4D4] uppercase tracking-[0.15em] whitespace-nowrap px-6 lg:px-8"
              >
                {brand}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee-reverse items-center" aria-hidden>
            {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
              <span 
                key={`row2-dup-${i}`} 
                className="text-sm font-medium text-[#D4D4D4] uppercase tracking-[0.15em] whitespace-nowrap px-6 lg:px-8"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center text-xs text-[#A3A3A3] tracking-wider mt-16 px-6"
      >
        Wszystkie oprawy dostępne w naszych salonach są oryginalne i objęte pełną gwarancją producenta.
      </motion.p>
      
      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E5E5]" />
    </section>
  )
}
