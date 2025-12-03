"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [contentReady, setContentReady] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Disable scrolling during intro and reset scroll position
  useLayoutEffect(() => {
    if (showIntro) {
      // Lock scroll completely - this works with Lenis too
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      // Unlock scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [showIntro])

  useEffect(() => {
    const timer1 = setTimeout(() => setShowIntro(false), 1800)
    const timer2 = setTimeout(() => setContentReady(true), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]"
    >
      {/* ═══════════════════════════════════════════════════════════════
          INTRO OVERLAY
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src="/logo-prooptica.svg" 
                alt="Prooptica" 
                width={280} 
                height={60}
                className="h-10 md:h-14 w-auto"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          style={{ scale }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={contentReady ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero.webm" type="video/webm" />
            </video>
          </motion.div>
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-center"
        style={{ opacity }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full">
          <div className="max-w-3xl">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contentReady ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10"
            >
              <span className="text-[#C4A77D] text-[10px] sm:text-xs font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Od 2004 roku
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2 sm:mb-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={contentReady ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2.5rem,10vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]"
              >
                Doskonałość
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-10">
              <motion.h1
                initial={{ y: "100%" }}
                animate={contentReady ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2.5rem,10vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em]"
              >
                <span className="relative inline-block">
                  <span className="italic text-[#C4A77D]">widzenia</span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#C4A77D]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 text-base sm:text-lg lg:text-xl leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-10 max-w-lg font-light"
            >
              Ponad 50 światowych marek. Najnowocześniejsza diagnostyka. 
              Cztery ekskluzywne salony w Polsce.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              <Link href="/umow-wizyte" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#C4A77D] text-[#1a1a1a] px-6 sm:px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-500">
                  Umów wizytę
                </button>
              </Link>
              
              <Link href="/salony" className="group inline-flex items-center gap-4">
                <span className="text-white/70 text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                  Nasze salony
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-px bg-white/30 group-hover:bg-[#C4A77D] group-hover:w-10 sm:group-hover:w-12 transition-all duration-500" />
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#C4A77D] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
