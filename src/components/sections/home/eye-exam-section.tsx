"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const HIGHLIGHTS = [
  "Topcon",
  "Nidek", 
  "Huvitz",
  "Licencjonowani optometryści",
]

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
        <div className="relative h-[60vh] lg:h-auto overflow-hidden order-2 lg:order-1">
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
            className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-auto lg:max-w-sm"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 lg:p-8">
              <p className="font-display text-lg lg:text-xl text-white/90 leading-relaxed italic">
                "Każde badanie to dla nas okazja, by zadbać o coś bezcennego — Twój wzrok."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right - Content */}
        <motion.div 
          style={{ y: contentY }}
          className="relative flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-32 order-1 lg:order-2"
        >
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-8 bg-[#E31F25]" />
            <span className="text-xs font-medium tracking-[0.3em] text-[#E31F25] uppercase">
              Badanie wzroku
            </span>
          </motion.div>

          {/* Main Headline - Staggered Lines */}
          <div className="mb-12">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-white leading-[0.95] tracking-tight"
              >
                Precyzja
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-white leading-[0.95] tracking-tight"
              >
                na najwyższym
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold text-white leading-[0.95] tracking-tight"
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
            className="text-white/60 text-lg lg:text-xl leading-relaxed max-w-lg mb-12"
          >
            Wykorzystujemy sprzęt diagnostyczny światowych liderów. 
            Nasi optometryści to certyfikowani specjaliści z wieloletnim doświadczeniem.
          </motion.p>

          {/* Equipment Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                className="px-5 py-2.5 text-sm text-white/80 border border-white/20 bg-white/5 tracking-wide"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 origin-left mb-12"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button 
              size="lg"
              className="bg-[#E31F25] hover:bg-[#c91b20] text-white rounded-none px-10 h-14 text-sm font-medium tracking-wider uppercase transition-all duration-500"
            >
              Umów badanie
            </Button>
            <Link href="/oferta/badanie-wzroku">
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white/60 hover:text-white hover:bg-transparent rounded-none px-8 h-14 text-sm group tracking-wider uppercase"
              >
                <span className="relative">
                  Dowiedz się więcej
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 group-hover:bg-white transition-colors" />
                </span>
                <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Large decorative number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.03 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -bottom-20 right-0 font-display text-[30vw] font-bold text-white leading-none pointer-events-none select-none hidden xl:block"
          >
            20
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
