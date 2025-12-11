"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useSectionVisibility, getSectionVisibilityClass, useIsSafari } from "@/lib/hooks"
import { cn } from "@/lib/utils"

export function Hero() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSafari = useIsSafari()
  const [animationsReady, setAnimationsReady] = useState(false)

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

  // Trigger entrance animations after mount (small delay for smooth start)
  useEffect(() => {
    const timer = setTimeout(() => setAnimationsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // On Safari, show content immediately without animations
  const showContent = isSafari || animationsReady

  return (
    <section 
      ref={containerRef} 
      className={cn("relative h-screen w-full overflow-hidden bg-[#1a1a1a]", getSectionVisibilityClass(isVisible))}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 transform-gpu">
          <div 
            className={cn(
              "relative h-full w-full transform-gpu transition-opacity duration-700 ease-out",
              isSafari ? "" : (showContent ? "opacity-100" : "opacity-0")
            )}
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
            
            {/* Headline */}
            <div className="overflow-hidden mb-2 sm:mb-3">
              <h1 
                className={cn(
                  "font-display text-[clamp(2.5rem,10vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]",
                  !isSafari && "transition-transform duration-700 ease-out"
                )}
                style={{
                  transform: !isSafari ? (showContent ? 'translateY(0)' : 'translateY(100%)') : undefined,
                  transitionDelay: !isSafari ? '200ms' : undefined,
                  textShadow: '0 3px 12px rgba(0, 0, 0, 0.4)'
                }}
              >
                Doskonałość
              </h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-10">
              <h1 
                className={cn(
                  "font-display text-[clamp(2.5rem,10vw,6.5rem)] font-medium leading-[1] tracking-[-0.03em]",
                  !isSafari && "transition-transform duration-700 ease-out"
                )}
                style={{
                  transform: !isSafari ? (showContent ? 'translateY(0)' : 'translateY(100%)') : undefined,
                  transitionDelay: !isSafari ? '300ms' : undefined
                }}
              >
                <span 
                  className="italic text-[#E31F25]"
                  style={{ textShadow: '0 3px 12px rgba(0, 0, 0, 0.45)' }}
                >
                  widzenia
                </span>
              </h1>
            </div>

            {/* Description */}
            <p 
              className={cn(
                "text-white/60 text-base sm:text-lg lg:text-xl leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-10 max-w-lg font-light",
                !isSafari && "transition-all duration-500 ease-out"
              )}
              style={isSafari ? {} : {
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                transitionDelay: '500ms'
              }}
            >
              Ponad 50 światowych marek. Najnowocześniejsza diagnostyka. 
              Cztery ekskluzywne salony w Polsce.
            </p>

            {/* CTA */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6",
                !isSafari && "transition-all duration-500 ease-out"
              )}
              style={isSafari ? {} : {
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                transitionDelay: '700ms'
              }}
            >
              <Link href="/umow-wizyte" className="w-full sm:w-auto group/btn">
                <button className="relative w-full sm:w-auto overflow-hidden bg-[#E31F25] hover:bg-[#c91a1f] text-white px-8 sm:px-10 py-4 sm:py-5 text-[11px] font-semibold tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(227,31,37,0.5)] hover:scale-[1.02]">
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                  {/* Border glow */}
                  <span className="absolute inset-0 border border-white/20" />
                  {/* Text */}
                  <span className="relative flex items-center justify-center gap-3">
                    <span>Umów wizytę</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              
              <Link href="/salony" className="group inline-flex items-center gap-4">
                <span className="text-white/70 text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                  Nasze salony
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-px bg-white/30 group-hover:bg-[#E31F25] group-hover:w-10 sm:group-hover:w-12 transition-all duration-500" />
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
