"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const LENS_TYPES = [
  {
    id: "progressive",
    name: "Progresywne",
    subtitle: "Wieloogniskowe",
    description: "Płynna korekcja na każdą odległość. Jedno rozwiązanie zamiast kilku par okularów — idealne dla osób po 40. roku życia.",
    features: ["Widzenie na każdą odległość", "Komfort przez cały dzień", "Naturalna korekta"],
  },
  {
    id: "photochromic",
    name: "Fotochromowe",
    subtitle: "Adaptacyjne",
    description: "Inteligentne soczewki reagujące na intensywność światła. Automatycznie przyciemniają się na słońcu i rozjaśniają w pomieszczeniach.",
    features: ["Automatyczna adaptacja", "100% ochrony UV", "Idealne na co dzień"],
  },
  {
    id: "bluecontrol",
    name: "Blue Control",
    subtitle: "Ochronne",
    description: "Zaawansowana filtracja niebieskiego światła z ekranów. Redukcja zmęczenia oczu podczas pracy przy komputerze i korzystania ze smartfona.",
    features: ["Ochrona przed ekranami", "Mniej zmęczenia oczu", "Lepszy sen"],
  },
  {
    id: "antireflective",
    name: "Antyrefleksyjne",
    subtitle: "Klarowne",
    description: "Eliminacja odbić i odblasków dla krystalicznie czystego widzenia. Szczególnie przydatne podczas prowadzenia samochodu nocą.",
    features: ["Zero odbić", "Ostry obraz", "Bezpieczna jazda nocą"],
  },
]

const PARTNERS = [
  { id: "hoya", name: "HOYA", logo: "/lenses/hoya.png" },
  { id: "rodenstock", name: "RODENSTOCK", logo: "/lenses/rodenstock.png" },
  { id: "coopervision", name: "COOPER VISION", logo: "/lenses/cooper-vision.png" },
  { id: "acuvue", name: "ACUVUE", logo: "/lenses/acuvue.png" },
  { id: "alcon", name: "ALCON", logo: "/lenses/alcon.jpg" },
]

const AUTO_ROTATE_INTERVAL = 5000

export function LensesSection() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-10%" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || !isVisible) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LENS_TYPES.length)
    }, AUTO_ROTATE_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused, isVisible])

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const activeLens = LENS_TYPES[activeIndex]

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative min-h-0 lg:min-h-[100svh] py-12 sm:py-24 lg:py-32 bg-[#F8F7F4] overflow-hidden content-auto flex flex-col justify-center",
        getSectionVisibilityClass(isVisible)
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Decorative large text - background */}
      <div className="absolute top-20 right-8 font-display text-[8vw] font-bold text-[#1a1a1a] leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em] opacity-[0.02]">
        OPTYKA
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 w-full">
        
        {/* Header */}
        <div className="mb-8 sm:mb-16 lg:mb-20 text-center sm:text-left">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 mb-3 sm:mb-8"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent origin-right lg:hidden" 
            />
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
              Technologie
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left" 
            />
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-16">
            {/* Main headline */}
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display text-[2.25rem] sm:text-[clamp(2rem,6vw,4.5rem)] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.03em] pb-4 pr-4"
                >
                  Soczewki nowej{" "}
                  <span className="relative inline-block">
                    <span className="font-medium italic text-[#E31F25]">generacji</span>
                    <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[6px] sm:h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" fill="none" stroke="#E31F25" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Description - visible on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-[#5a5a5a] text-base sm:text-base lg:text-lg leading-[1.6] sm:leading-[1.8] max-w-sm lg:max-w-md font-light text-center lg:text-right mb-2 lg:mb-0 mx-auto sm:mx-0"
            >
              Najnowsze technologie od światowych liderów optyki, dobrane precyzyjnie do Twojego stylu życia.
            </motion.p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Right - Lens Type Selector - ORDER CHANGE: Selector first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 space-y-2 sm:space-y-3 col-span-full order-1 lg:order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Grid layout for mobile selector */}
            <div className="grid grid-cols-2 gap-2 sm:block sm:space-y-3">
              {LENS_TYPES.map((lens, index) => (
                <button
                  key={lens.id}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "relative w-full text-left p-3 sm:p-6 transition-all duration-500 group border sm:border-0",
                    activeIndex === index 
                      ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[#E31F25] sm:border-transparent" 
                      : "bg-white/50 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-transparent"
                  )}
                >
                  {/* Selection indicator - left border (desktop) / bottom border (mobile active) */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 hidden sm:block",
                    activeIndex === index 
                      ? "bg-[#E31F25]" 
                      : "bg-transparent group-hover:bg-[#E31F25]/30"
                  )} />
                  
                  {/* Progress bar for active item */}
                  {activeIndex === index && (
                    <div className="absolute left-0 top-0 w-[3px] h-full bg-[#e0ded8] overflow-hidden hidden sm:block">
                      <motion.div
                        className="w-full bg-[#E31F25]"
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ 
                          duration: isPaused ? 0 : AUTO_ROTATE_INTERVAL / 1000,
                          ease: "linear"
                        }}
                        key={isPaused ? 'paused' : 'running'}
                      />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 h-full">
                    <div className="flex-1">
                      {/* Name */}
                      <span className={cn(
                        "block font-display text-sm sm:text-2xl transition-colors duration-300 font-medium sm:font-normal",
                        activeIndex === index ? "text-[#1a1a1a]" : "text-[#666] group-hover:text-[#1a1a1a]"
                      )}>
                        {lens.name}
                      </span>
                      
                      {/* Subtitle */}
                      <span className={cn(
                        "block text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase mt-0.5 sm:mt-1 transition-colors duration-300 truncate",
                        activeIndex === index ? "text-[#E31F25]" : "text-[#bbb] group-hover:text-[#999]"
                      )}>
                        {lens.subtitle}
                      </span>
                    </div>

                    <ArrowRight className={cn(
                      "w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-1 transition-all duration-300 hidden sm:block",
                      activeIndex === index 
                        ? "text-[#E31F25] translate-x-0 opacity-100" 
                        : "text-[#ccc] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    )} />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Left - Visual showcase - ORDER CHANGE: Content second on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block lg:col-span-7 relative mb-0 lg:mb-0 order-2 lg:order-1"
          >
            {/* Artistic frame like intro section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -inset-3 sm:-inset-4 border border-[#E31F25]/30 pointer-events-none block" 
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -inset-6 sm:-inset-8 border border-[#E31F25]/10 pointer-events-none block" 
            />

            <div className="relative bg-white overflow-hidden shadow-xl">
              {/* Main content area */}
              <div className="relative min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-[#E31F25]/40" />
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-[#E31F25]/40" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    {/* Content */}
                    <div className="flex-1">
                      {/* Subtitle */}
                      <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] text-[#E31F25] uppercase mb-3 sm:mb-4">
                        {activeLens.subtitle}
                      </span>
                      
                      {/* Title */}
                      <h3 className="font-display text-[2rem] sm:text-4xl lg:text-5xl xl:text-6xl font-light text-[#1a1a1a] mb-4 sm:mb-6 tracking-[-0.02em] leading-tight">
                        {activeLens.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[#5a5a5a] text-sm sm:text-lg leading-relaxed font-light max-w-lg mb-6 sm:mb-8">
                        {activeLens.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="border-t border-[#e0ded8] pt-5 sm:pt-6">
                      <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3">
                        {activeLens.features.map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-1.5 h-1.5 bg-[#E31F25]" />
                            <span className="text-[#737373] text-xs sm:text-sm font-light">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partners + CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-20 lg:mt-24 pt-4 sm:pt-12 border-t border-[#e0ded8]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-8">
            
            {/* Partners - visible on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <span className="text-[10px] tracking-[0.25em] text-[#999] uppercase font-medium">
                Nasi Partnerzy
              </span>
              
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
                {PARTNERS.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="relative h-5 sm:h-6 w-16 sm:w-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-70 transition-all duration-500"
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 sm:gap-8">
              <Link href="/marki" className="group inline-flex items-center gap-3 sm:gap-6">
                <span className="text-[#1a1a1a] text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase group-hover:text-[#E31F25] transition-colors duration-300">
                  Marki
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 sm:w-10 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-10 sm:group-hover:w-14 transition-all duration-500" />
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
