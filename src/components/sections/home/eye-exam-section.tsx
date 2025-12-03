"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function EyeExamSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1])
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section ref={containerRef} className="relative bg-[#0A0A0A] overflow-hidden">
      
      {/* Full-height split layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left - Image with Parallax */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-auto overflow-hidden order-2 lg:order-1">
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-0"
          >
            <Image
              src="/exams/exam2.png"
              alt="Profesjonalne badanie wzroku"
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/30" />
          
          {/* Vertical line accent */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 bottom-0 w-px bg-[#E31F25]/50 origin-top hidden lg:block"
          />
          
          {/* Floating quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-16 lg:left-16 lg:right-auto lg:max-w-sm"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8">
              <p className="font-display text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed italic">
                "Każde badanie to dla nas okazja, by zadbać o coś bezcennego — Twój wzrok."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right - Content */}
        <motion.div 
          style={{ y: contentY }}
          className="relative flex flex-col justify-center px-5 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-32 order-1 lg:order-2"
        >
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10"
          >
            <div className="h-px w-6 sm:w-8 bg-[#E31F25]" />
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] text-[#E31F25] uppercase">
              Badanie wzroku
            </span>
          </motion.div>

          {/* Main Headline - Staggered Lines */}
          <div className="mb-8 sm:mb-12">
            <div className="overflow-hidden py-0.5 sm:py-1">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-display text-[clamp(2rem,7vw,5rem)] font-light text-white leading-[1.1] tracking-tight"
              >
                Precyzja
              </motion.h2>
            </div>
            <div className="overflow-hidden py-0.5 sm:py-1">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="font-display text-[clamp(2rem,7vw,5rem)] font-light text-white leading-[1.1] tracking-tight"
              >
                na najwyższym
              </motion.h2>
            </div>
            <div className="overflow-hidden py-0.5 sm:py-1">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="font-display text-[clamp(2rem,7vw,5rem)] font-semibold text-white leading-[1.1] tracking-tight"
              >
                poziomie<span className="text-[#E31F25]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/60 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mb-8 sm:mb-12"
          >
            Wykorzystujemy sprzęt diagnostyczny światowych liderów. 
            Nasi optometryści to certyfikowani specjaliści z wieloletnim doświadczeniem.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 origin-left mb-8 sm:mb-12"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4"
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-[#E31F25] hover:bg-[#c91b20] text-white rounded-none px-8 sm:px-10 h-12 sm:h-14 text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-500"
            >
              Umów badanie
            </Button>
            <Link href="/oferta/badanie-wzroku" className="w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="lg"
                className="w-full sm:w-auto text-white/60 hover:text-white hover:bg-transparent rounded-none px-6 sm:px-8 h-12 sm:h-14 text-xs sm:text-sm group tracking-wider uppercase"
              >
                <span className="relative">
                  Dowiedz się więcej
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 group-hover:bg-white transition-colors" />
                </span>
                <ArrowRight className="w-4 h-4 ml-2 sm:ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Large decorative text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.03 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -bottom-10 right-0 font-display text-[12vw] font-bold text-white leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em]"
          >
            BADANIA
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
