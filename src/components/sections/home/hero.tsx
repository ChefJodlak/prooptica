"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { cn } from "@/lib/utils"

export function Hero() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [introPhase, setIntroPhase] = useState<'visible' | 'hiding' | 'hidden'>('visible')
  const [contentReady, setContentReady] = useState(false)
  // Start with null to indicate "not yet determined" - this prevents hydration mismatch
  const [mounted, setMounted] = useState<boolean | null>(null)

  // Pause/play video based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isVisible) {
      // Play video when visible
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      })
    } else {
      // Pause video when not visible
      video.pause()
    }
  }, [isVisible])

  // Mark as mounted after hydration completes
  useEffect(() => {
    // Use requestAnimationFrame to ensure we're past the hydration phase
    const frame = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  // Disable scrolling during intro and reset scroll position
  useEffect(() => {
    // Only run scroll locking after component is confirmed mounted
    if (mounted !== true) return
    
    if (introPhase !== 'hidden') {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
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
  }, [introPhase, mounted])

  useEffect(() => {
    if (mounted !== true) return
    
    const timer1 = setTimeout(() => setIntroPhase('hiding'), 1500)
    const timer2 = setTimeout(() => setIntroPhase('hidden'), 2000)
    const timer3 = setTimeout(() => setContentReady(true), 2200)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [mounted])

  // Calculate if we're in client-side mode (after hydration)
  const isClient = mounted === true
  
  // Calculate styles - use consistent initial values for SSR
  const introOpacity = isClient ? (introPhase === 'visible' ? 1 : 0) : 1
  const introVisible = isClient ? (introPhase !== 'hidden') : true
  const showContent = isClient && contentReady

  return (
    <section 
      ref={containerRef} 
      className={cn("relative h-screen w-full overflow-hidden bg-[#1a1a1a]", getSectionVisibilityClass(isVisible))}
    >
      {/* Intro Overlay - suppressHydrationWarning for dynamic styles */}
      <div
        className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center transition-opacity duration-500 ease-out"
        style={{
          opacity: introOpacity,
          pointerEvents: introVisible ? 'auto' : 'none',
          visibility: introVisible ? 'visible' : 'hidden',
        }}
        suppressHydrationWarning
      >
        {/* Use data attribute for animation trigger instead of conditional className */}
        <div 
          className="hero-logo-container"
          data-mounted={isClient ? "true" : "false"}
          suppressHydrationWarning
        >
          <img 
            src="/logo-prooptica.svg" 
            alt="Prooptica" 
            width={280} 
            height={60}
            className="h-10 md:h-14 w-auto"
          />
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 transform-gpu">
          <div
            className="relative h-full w-full transform-gpu transition-opacity duration-700 ease-out"
            style={{ opacity: showContent ? 1 : 0 }}
            suppressHydrationWarning
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
              <source src="/hero.webm" type="video/webm" />
            </video>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full">
          <div className="max-w-3xl">
            
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10 transition-all duration-500 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateX(0)' : 'translateX(-2rem)',
                transitionDelay: '100ms'
              }}
              suppressHydrationWarning
            >
              <span className="text-[#C4A77D] text-[10px] sm:text-xs font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Od 2004 roku
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-2 sm:mb-3">
              <h1
                className="font-display text-[clamp(2.5rem,10vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em] transition-transform duration-700 ease-out"
                style={{
                  transform: showContent ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: '200ms'
                }}
                suppressHydrationWarning
              >
                Doskonałość
              </h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-10">
              <h1
                className="font-display text-[clamp(2.5rem,10vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em] transition-transform duration-700 ease-out"
                style={{
                  transform: showContent ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: '300ms'
                }}
                suppressHydrationWarning
              >
                <span className="relative inline-block">
                  <span className="italic text-[#C4A77D]">widzenia</span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#C4A77D]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className="text-white/60 text-base sm:text-lg lg:text-xl leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-10 max-w-lg font-light transition-all duration-500 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                transitionDelay: '500ms'
              }}
              suppressHydrationWarning
            >
              Ponad 50 światowych marek. Najnowocześniejsza diagnostyka. 
              Cztery ekskluzywne salony w Polsce.
            </p>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-500 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                transitionDelay: '700ms'
              }}
              suppressHydrationWarning
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
