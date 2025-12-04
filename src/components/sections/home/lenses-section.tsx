"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const LENS_TYPES = [
  {
    id: "progressive",
    name: "Progresywne",
    subtitle: "Wieloogniskowe",
    description: "Płynna korekcja na każdą odległość. Jedno rozwiązanie zamiast kilku par okularów.",
  },
  {
    id: "photochromic",
    name: "Fotochromowe",
    subtitle: "Adaptacyjne",
    description: "Inteligentne soczewki reagujące na światło. Automatyczna ochrona UV.",
  },
  {
    id: "bluecontrol",
    name: "Blue Control",
    subtitle: "Ochronne",
    description: "Zaawansowana filtracja niebieskiego światła. Redukcja zmęczenia oczu.",
  },
  {
    id: "antireflective",
    name: "Antyrefleksyjne",
    subtitle: "Klarowne",
    description: "Eliminacja odbić i odblasków. Krystalicznie czyste widzenie.",
  },
]

const PARTNERS = [
  { id: "hoya", name: "HOYA", logo: "/lenses/hoya.png" },
  { id: "rodenstock", name: "RODENSTOCK", logo: "/lenses/rodenstock.png" },
  { id: "coopervision", name: "COOPER VISION", logo: "/lenses/cooper-vision.png" },
  { id: "acuvue", name: "ACUVUE", logo: "/lenses/acuvue.png" },
  { id: "alcon", name: "ALCON", logo: "/lenses/alcon.jpg" },
]

const AUTO_ROTATE_INTERVAL = 4000 // 4 seconds

// GPU-optimized styles for Safari
const gpuStyles = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
}

export function LensesSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate effect
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LENS_TYPES.length)
    }, AUTO_ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true)
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000)
  }

  return (
    <section 
      ref={containerRef} 
      className="relative py-16 sm:py-24 lg:py-32 bg-[#fafafa] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <div className="w-6 sm:w-8 h-px bg-[#E31F25]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] text-[#E31F25] uppercase font-medium">
                Technologie
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]"
            >
              Soczewki nowej generacji
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#666] text-base sm:text-lg leading-relaxed font-light max-w-sm lg:text-right"
          >
            Najnowsze technologie od światowych liderów, dopasowane do Twojego stylu życia.
          </motion.p>
        </div>

        {/* Lens cards with progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          {LENS_TYPES.map((lens, index) => (
            <button
              key={lens.id}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={cn(
                "relative sm:flex-1 sm:min-w-[160px] p-4 sm:p-5 lg:p-6 text-left transition-all duration-500 group overflow-hidden",
                activeIndex === index 
                  ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-[#1a1a1a]/10" 
                  : "bg-white/60 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-[#1a1a1a]/5"
              )}
            >
              {/* Progress bar for active card */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#eee]">
                <motion.div
                  className="h-full bg-[#E31F25]"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: activeIndex === index && !isPaused ? "100%" : activeIndex === index ? "100%" : "0%" 
                  }}
                  transition={{ 
                    duration: activeIndex === index && !isPaused ? AUTO_ROTATE_INTERVAL / 1000 : 0.3,
                    ease: "linear"
                  }}
                  key={activeIndex === index ? `active-${activeIndex}` : `inactive-${index}`}
                />
              </div>

              <span className={cn(
                "block text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1.5 sm:mb-2 transition-colors duration-300",
                activeIndex === index ? "text-[#E31F25]" : "text-[#999] group-hover:text-[#E31F25]"
              )}>
                {lens.subtitle}
              </span>
              <span className={cn(
                "block font-display text-lg sm:text-xl lg:text-2xl transition-colors duration-300",
                activeIndex === index ? "text-[#1a1a1a]" : "text-[#666] group-hover:text-[#1a1a1a]"
              )}>
                {lens.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Active lens description */}
        <div className="relative min-h-[120px] sm:min-h-[140px] lg:min-h-[120px] mb-10 sm:mb-14 pb-10 sm:pb-14 border-b border-[#e5e5e5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 transform-gpu"
              style={gpuStyles}
            >
              <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
                {/* Large number */}
                <div className="hidden sm:block">
                  <span className="font-display text-5xl sm:text-7xl lg:text-8xl font-extralight text-[#1a1a1a]/[0.07] leading-none select-none">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-1 pt-0 sm:pt-2">
                  <p className="text-[#555] text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-xl">
                    {LENS_TYPES[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#888] uppercase font-medium">
            Partnerzy
          </p>
          
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="relative h-4 sm:h-5 lg:h-6 w-12 sm:w-14 lg:w-18 grayscale opacity-40 hover:grayscale-0 hover:opacity-70 transition-all duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className={cn(
                    "object-contain",
                    partner.id === 'acuvue' && "invert opacity-60"
                  )}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
