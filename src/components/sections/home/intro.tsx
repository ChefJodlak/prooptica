"use client"

import { useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

const PILLARS = [
  { number: "01", title: "Precyzja", desc: "Sprzęt diagnostyczny światowych liderów" },
  { number: "02", title: "Tradycja", desc: "Dwie dekady doświadczenia" },
  { number: "03", title: "Ekspertyza", desc: "Certyfikowani optometryści" },
  { number: "04", title: "Jakość", desc: "Ponad 50 marek premium" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] py-10 sm:py-20 lg:py-32 bg-[#F8F7F4] flex flex-col justify-center overflow-x-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full h-full sm:h-auto flex flex-col justify-center">
        <motion.div 
          className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center h-auto content-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* Image - Full width on mobile */}
          <motion.div 
            variants={scaleInVariants}
            className="block lg:col-span-5 relative h-[35vh] sm:h-[50vh] lg:h-[70vh] mb-4 lg:mb-0 w-full"
          >
            {/* Artistic frame */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -inset-2 sm:-inset-3 lg:-inset-4 border border-[#E31F25]/30" 
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -inset-4 sm:-inset-6 lg:-inset-8 border border-[#E31F25]/10" 
            />
            
            <div className="relative h-full w-full overflow-hidden">
              <Image 
                src="/salons/grojec-1.jpg" 
                alt="Salon Prooptica" 
                fill 
                className="object-cover"
              />
              {/* Elegant vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/20" />
              
              {/* Refined quote */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 p-6 lg:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-4xl lg:text-5xl text-[#E31F25] leading-none">"</span>
                  <div>
                    <p className="font-display text-base lg:text-lg text-white/95 italic leading-relaxed">
                      Okulary to nie tylko korekcja wzroku — to element Twojego stylu.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Full width on mobile, 7 columns on desktop */}
          <div className="lg:col-span-7 lg:pl-8 flex flex-col justify-between h-auto pb-0">
            
            {/* Header */}
            <motion.div variants={fadeUpVariants} className="mb-6 sm:mb-12 lg:mb-16 text-left shrink-0">
              <div className="flex items-center justify-start gap-3 sm:gap-5 mb-4 sm:mb-8">
                <span className="text-[#E31F25] text-[10px] sm:text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">Nasza Historia</span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px flex-1 max-w-[50px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left" 
                />
              </div>
              <h2 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[4rem] xl:text-[4.5rem] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.03em]">
                Rodzinna firma
              </h2>
              <h2 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#1a1a1a] leading-[1.1] tracking-[-0.03em] mt-1 sm:mt-2">
                z pasją do{" "}
                <span className="relative inline-block">
                  <span className="italic text-[#E31F25]">optyki</span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[6px] sm:h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" fill="none" stroke="#E31F25" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </motion.div>

            {/* Mobile description - Full Text restored */}
            <motion.p 
              variants={fadeUpVariants}
              className="sm:hidden text-[#5a5a5a] text-sm leading-[1.7] mb-6 text-left font-light shrink-0"
            >
              Od 2004 roku łączymy precyzję z włoskim designem. Każda para okularów to kompozycja stylu i funkcjonalności.
            </motion.p>

            {/* Desktop description */}
            <motion.p 
              variants={fadeUpVariants}
              className="hidden sm:block text-[#5a5a5a] text-sm sm:text-base lg:text-lg leading-[1.7] sm:leading-[1.8] mb-6 lg:mb-8 max-w-lg font-light"
            >
              Od 2004 roku łączymy szwajcarską precyzję z włoskim designem. 
              Każda para okularów to starannie dobrana kompozycja stylu i funkcjonalności.
            </motion.p>
            
            {/* Mobile Stats - Visible on mobile */}
            <motion.div
              variants={fadeUpVariants}
              className="sm:hidden grid grid-cols-3 gap-4 py-6 mb-6 border-y border-[#e0ded8]"
            >
              {[
                { value: "20", suffix: "+", label: "Lat doświadczenia" }, 
                { value: "4", suffix: "", label: "Salony w Polsce" }, 
                { value: "50", suffix: "+", label: "Marek premium" }
              ].map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center"
                >
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="font-display text-3xl font-light text-[#1a1a1a] tracking-tight">{stat.value}</span>
                    {stat.suffix && <span className="font-display text-lg text-[#E31F25] font-light">{stat.suffix}</span>}
                  </div>
                  <span className="block text-[8px] tracking-[0.1em] text-[#737373] uppercase mt-1.5 font-light leading-tight">{stat.label}</span>
                </div>
              ))}
            </motion.div>
            
            {/* Luxury Pillars - Horizontal Scroll for Mobile, Grid for Desktop */}
            <motion.div 
              variants={containerVariants}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-x-6 lg:gap-x-10 sm:gap-y-8 mb-6 sm:mb-12 lg:mb-16 shrink-0 overflow-x-auto pb-4 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory pr-5 sm:pr-0"
            >
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.number}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1] as const
                      }
                    }
                  }}
                  className="group min-w-[220px] sm:min-w-0 snap-center bg-white sm:bg-transparent p-5 sm:p-0 border sm:border-0 border-[#E31F25]/10 shadow-sm sm:shadow-none first:pl-5 last:pr-5"
                >
                  {/* Elegant number */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-4 sm:block relative">
                    <span className="font-display text-4xl sm:text-[3.5rem] lg:text-[4.5rem] font-thin text-[#E31F25]/25 leading-none tracking-tighter">
                      {pillar.number}
                    </span>
                    <div className="h-px flex-1 bg-[#E31F25]/20 sm:hidden" />
                    <div className="hidden sm:block absolute bottom-2 left-0 w-8 h-px bg-[#E31F25]/40 group-hover:w-12 group-hover:bg-[#E31F25] transition-all duration-500" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-lg sm:text-lg lg:text-xl font-medium text-[#1a1a1a] mb-2 tracking-[-0.01em]">
                    {pillar.title}
                  </h3>
                  <p className="text-[#737373] text-xs sm:text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Tablet Stats - visible only between sm and lg */}
            <motion.div
              variants={fadeUpVariants}
              className="hidden sm:flex lg:hidden items-center justify-between gap-4 py-6 mb-6 border-y border-[#e0ded8]"
            >
              {[
                { value: "20", suffix: "+", label: "Lat" }, 
                { value: "4", suffix: "", label: "Salony" }, 
                { value: "50", suffix: "+", label: "Marek" }
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="text-center flex-1"
                >
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="font-display text-3xl font-light text-[#1a1a1a] tracking-tight">{stat.value}</span>
                    {stat.suffix && <span className="font-display text-lg text-[#E31F25] font-light">{stat.suffix}</span>}
                  </div>
                  <span className="block text-[9px] tracking-[0.15em] text-[#737373] uppercase mt-1 font-light">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA - Refined */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 pt-6 sm:pt-8 border-t border-[#e0ded8] lg:border-t-0 lg:pt-8 lg:border-t lg:border-[#e0ded8]"
            >
              <Link href="/o-nas" className="group inline-flex items-center gap-4 sm:gap-6">
                <span className="text-[#1a1a1a] text-[11px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                  Poznaj naszą historię
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-10 sm:w-12 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-14 sm:group-hover:w-16 transition-all duration-500" />
                  <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
              
              {/* Stats - More refined - Desktop only */}
              <div className="hidden lg:flex items-center gap-12">
                {[
                  { value: "20", suffix: "+", label: "Lat doświadczenia" }, 
                  { value: "4", suffix: "", label: "Ekskluzywne salony" }, 
                  { value: "50", suffix: "+", label: "Marek premium" }
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {i > 0 && <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-[#e0ded8]" />}
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="font-display text-3xl xl:text-4xl font-light text-[#1a1a1a] tracking-tight">{stat.value}</span>
                      {stat.suffix && <span className="font-display text-lg xl:text-xl text-[#E31F25] font-light">{stat.suffix}</span>}
                    </div>
                    <span className="block text-[9px] tracking-[0.2em] text-[#737373] uppercase mt-2 font-light">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
