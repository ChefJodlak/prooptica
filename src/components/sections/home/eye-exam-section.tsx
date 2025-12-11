"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { cn } from "@/lib/utils"

// GPU-optimized styles for Safari
const gpuStyles = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
}

export function EyeExamSection() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-10%" })

  return (
    <section ref={containerRef} className={cn("relative bg-[#0A0A0A] overflow-hidden content-auto-heavy", getSectionVisibilityClass(isVisible))}>
      
      {/* Full-height split layout */}
      <div className="grid lg:grid-cols-2 min-h-[100svh]">
        
        {/* Left - Image (removed parallax for Safari performance) */}
        <div className="relative h-[35vh] sm:h-[60vh] lg:h-auto overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 transform-gpu" style={gpuStyles}>
            <Image
              src="/exams/exam2.png"
              alt="Profesjonalne badanie wzroku"
              fill
              className="object-cover scale-105"
            />
          </div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/30" />
          
          {/* Vertical line accent */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 bottom-0 w-px bg-[#E31F25]/50 origin-top block opacity-30 lg:opacity-100"
          />
          
          {/* Floating quote - visible on mobile now */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-16 lg:left-16 lg:right-auto lg:max-w-sm block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8">
              <p className="font-display text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed italic">
                "Każde badanie to dla nas okazja, by zadbać o coś bezcennego — Twój wzrok."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right - Content (removed parallax for Safari performance) */}
        <div 
          ref={contentRef}
          className="relative flex flex-col justify-center px-5 sm:px-8 lg:px-16 xl:px-24 py-6 sm:py-16 lg:py-32 order-1 lg:order-2"
        >
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-5 mb-3 sm:mb-10"
          >
            <span className="text-[#E31F25] text-[9px] sm:text-[10px] font-medium tracking-[0.2em] sm:tracking-[0.5em] uppercase">
              Badanie wzroku
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-px flex-1 max-w-[40px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left" 
            />
          </motion.div>

          {/* Main Headline - Compact on mobile */}
          <div className="mb-4 sm:mb-12">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-display text-[1.6rem] sm:text-[clamp(2rem,7vw,5rem)] font-light text-white leading-[1.15] tracking-tight"
              >
                Precyzja na najwyższym <span className="font-semibold">poziomie<span className="text-[#E31F25]">.</span></span>
              </motion.h2>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/60 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-lg mb-4 sm:mb-12"
          >
            Wykorzystujemy sprzęt diagnostyczny światowych liderów. 
            Nasi optometryści to certyfikowani specjaliści z wieloletnim doświadczeniem.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 origin-left mb-4 sm:mb-12"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-4"
          >
            <Link href="/umow-wizyte" className="w-full sm:w-auto group/btn">
              <button className="relative w-full sm:w-auto overflow-hidden bg-[#E31F25] text-white rounded-none px-6 sm:px-10 h-10 sm:h-14 text-[10px] sm:text-sm font-semibold tracking-wider uppercase transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(227,31,37,0.5)] hover:scale-[1.02] cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                <span className="absolute inset-0 border border-white/20" />
                <span className="relative flex items-center justify-center gap-2">
                  <span>Umów badanie</span>
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            <Link href="/oferta/badanie-wzroku" className="w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="lg"
                className="w-full sm:w-auto text-white/60 hover:text-white hover:bg-transparent rounded-none px-4 sm:px-8 h-10 sm:h-14 text-[10px] sm:text-sm group tracking-wider uppercase cursor-pointer"
              >
                <span className="relative">
                  Dowiedz się więcej
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 group-hover:bg-white transition-colors" />
                </span>
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2 sm:ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Large decorative text - using CSS animation instead of Framer Motion */}
          <div
            className="absolute -bottom-10 right-0 font-display text-[12vw] font-bold text-white leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em] opacity-[0.03]"
          >
            BADANIA
          </div>
        </div>
      </div>
    </section>
  )
}
