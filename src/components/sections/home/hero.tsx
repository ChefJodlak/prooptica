"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [loadingPhase, setLoadingPhase] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingPhase(1), 800)
    const t2 = setTimeout(() => setLoadingPhase(2), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      
      {/* === CINEMATIC INTRO === */}
      <AnimatePresence>
        {loadingPhase < 2 && (
          <>
            {/* Split curtains */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 left-0 w-1/2 bg-[#0A0A0A] z-[100] pointer-events-none"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 w-1/2 bg-[#0A0A0A] z-[100] pointer-events-none"
            />
            
            {/* Center logo reveal */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image 
                  src="/logo-prooptica.svg" 
                  alt="Prooptica" 
                  width={280} 
                  height={60}
                  className="h-14 md:h-16 w-auto"
                  priority
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === BACKGROUND === */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/salons/warszawa-1.webp"
            alt="Salon optyczny Prooptica"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]/30" />
      </motion.div>

      {/* === MAIN CONTENT === */}
      <motion.div 
        className="relative z-20 h-full"
        style={{ opacity: contentOpacity }}
      >
        <div className="h-full flex flex-col">
          
          {/* Main content area */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-3xl">
                
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={loadingPhase >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <span className="text-[#E31F25] text-[11px] font-semibold tracking-[0.5em] uppercase">
                    Prooptica
                  </span>
                  <div className="h-px flex-1 max-w-[100px] bg-[#E31F25]" />
                </motion.div>

                {/* Main headline with TextGenerateEffect */}
                {loadingPhase >= 2 && (
                  <div className="space-y-2 mb-8">
                    <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light text-white leading-[1] tracking-[-0.02em]">
                      <TextGenerateEffect 
                        words="Twoje oczy."
                        delay={0.3}
                        duration={0.8}
                        staggerDelay={0.12}
                        filter={true}
                      />
                    </h1>
                    
                    <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[1] tracking-[-0.02em]">
                      <span className="text-white">
                        <TextGenerateEffect 
                          words="Nasza"
                          delay={0.6}
                          duration={0.8}
                          staggerDelay={0.12}
                          filter={true}
                          className="inline"
                        />
                      </span>
                      {" "}
                      <motion.span 
                        className="relative inline-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <span className="italic text-[#E31F25]">
                          <TextGenerateEffect 
                            words="pasja"
                            delay={0.9}
                            duration={0.8}
                            staggerDelay={0.12}
                            filter={true}
                            className="inline"
                          />
                        </span>
                      </motion.span>
                      <motion.span 
                        className="text-white/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                      >.</motion.span>
                    </h1>
                  </div>
                )}

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={loadingPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-white/60 text-lg md:text-xl max-w-md mb-12 leading-relaxed"
                >
                  20 lat doświadczenia. Najnowsze technologie. 
                  Cztery salony w Polsce. Ponad 50 prestiżowych marek.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={loadingPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Button 
                    size="lg" 
                    className="bg-[#E31F25] hover:bg-[#B91C1C] text-white border-0 rounded-none h-14 px-10 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.25em]"
                  >
                    Umów wizytę
                  </Button>
                  
                  <Link href="/salony" className="group">
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="text-white hover:text-white hover:bg-white/10 rounded-none h-14 px-8 text-xs font-medium tracking-[0.15em] uppercase"
                    >
                      Odkryj salony
                      <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom bar with stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={loadingPhase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="border-t border-white/10 bg-[#0A0A0A]/50 backdrop-blur-sm"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
              <div className="flex items-center justify-between py-5">
                
                {/* Locations */}
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Lokalizacje</span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-sm text-white/70 tracking-wide">
                    Warszawa · Piaseczno · Grójec
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 md:gap-12">
                  {[
                    { num: "20", suffix: "+", label: "LAT" },
                    { num: "4", suffix: "", label: "SALONY" },
                    { num: "50", suffix: "+", label: "MAREK" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={loadingPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex items-baseline justify-center">
                        <span className="font-display text-3xl md:text-4xl font-semibold text-white">{s.num}</span>
                        {s.suffix && <span className="text-[#E31F25] text-lg md:text-xl font-display">{s.suffix}</span>}
                      </div>
                      <span className="text-[9px] tracking-[0.25em] text-white/40">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loadingPhase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.3 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
