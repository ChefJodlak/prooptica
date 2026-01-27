"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
      className={cn("relative min-h-[100svh] h-screen w-full overflow-hidden bg-[#1a1a1a]", getSectionVisibilityClass(isVisible))}
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
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full h-full sm:h-auto">
          <div className="h-full sm:h-auto flex flex-col justify-between sm:block pb-12 pt-96 sm:py-0">

            {/* Text Content - Centered */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              {/* Logo */}
              <div
                className={cn(
                  "mb-10 sm:mb-12",
                  !isSafari && "transition-all duration-[800ms] ease-out"
                )}
                style={{
                  opacity: !isSafari ? (showContent ? 1 : 0) : 1,
                  transform: !isSafari ? (showContent ? 'translateY(0)' : 'translateY(1rem)') : undefined,
                  transitionDelay: !isSafari ? '200ms' : undefined,
                }}
              >
                <Image
                  src="/logo-prooptica.svg"
                  alt="Prooptica"
                  width={400}
                  height={88}
                  className="w-[280px] sm:w-[350px] md:w-[400px] h-auto mx-auto"
                  priority
                />
              </div>

              {/* Description */}
              <p
                className={cn(
                  "text-white/60 text-base sm:text-lg lg:text-xl leading-[1.6] sm:leading-[1.8] mb-10 sm:mb-12 max-w-lg font-light mx-auto",
                  !isSafari && "transition-all duration-500 ease-out"
                )}
                style={isSafari ? {} : {
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                  transitionDelay: '550ms'
                }}
              >
                Ponad 50 światowych marek. Najnowocześniejsza diagnostyka.
                Cztery ekskluzywne salony w Polsce.
              </p>
            </div>

            {/* CTA - Centered */}
            <div
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6",
                !isSafari && "transition-all duration-500 ease-out"
              )}
              style={isSafari ? {} : {
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(1.25rem)',
                transitionDelay: '750ms'
              }}
            >
              <Link href="/umow-wizyte" className="w-full sm:w-auto group/btn">
                <button className="relative w-full sm:w-auto overflow-hidden bg-[#E31F25] hover:bg-[#C91A1F] text-white px-6 sm:px-8 py-3 sm:py-4 text-[10px] font-semibold tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md shadow-sm rounded-full">
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                  {/* Text */}
                  <span className="relative flex items-center justify-center gap-3">
                    <span>Umów wizytę</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>

              <Link href="/salony" className="group inline-flex items-center justify-center gap-4 py-2 mb-6 sm:mb-0 sm:py-0">
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
