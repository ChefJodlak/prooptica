"use client"

import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { LOCATIONS } from "@/lib/constants/locations"
import Image from "next/image"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function LocationsScroll() {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newActiveCard = Math.min(
      Math.floor(latest * LOCATIONS.length),
      LOCATIONS.length - 1
    )
    setActiveCard(newActiveCard)
  })

  return (
    <section className="bg-[#F8F7F4] relative">
      {/* Subtle texture overlay from Home Page */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Mobile View (Simple Stack) */}
      <div className="lg:hidden px-4 py-16 space-y-20 relative z-10">
        {LOCATIONS.map((location) => (
          <div key={location.id} className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={location.image}
                alt={`Salon Prooptica ${location.city}`}
                fill
                className="object-cover"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
            </div>
            <div>
              <div className="mb-4">
                <span className="block font-display text-sm font-medium text-[#E31F25] uppercase tracking-widest mb-1">Salon</span>
                <h3 className="font-display text-4xl font-medium text-[#1a1a1a] leading-none">
                  {location.city}
                </h3>
              </div>
              <p className="text-[#5a5a5a] text-lg font-light mb-6">{location.address}</p>
              
              <div className="space-y-4 mb-8">
                <a href={`tel:${location.phone}`} className="flex items-center gap-3 text-[#5a5a5a]">
                  <Phone className="w-5 h-5 text-[#E31F25]" />
                  <span>{location.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-[#5a5a5a]">
                  <Clock className="w-5 h-5 text-[#E31F25] mt-1" />
                  <span className="whitespace-pre-line">{location.openingHours}</span>
                </div>
              </div>

              <Link 
                href="/umow-wizyte"
                className="group relative inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#E31F25] text-white overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-[#C91A1F]"
              >
                <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase">
                  Umów wizytę
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Sticky Scroll) */}
      <div 
        ref={containerRef} 
        className="hidden lg:block relative z-10"
        style={{ height: `${LOCATIONS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="w-full max-w-[1800px] mx-auto px-16 xl:px-24 grid grid-cols-2 gap-20 items-center h-full">
            
            {/* Left Side: Content */}
            <div className="relative h-[450px]">
              {LOCATIONS.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: activeCard === index ? 1 : 0,
                    x: activeCard === index ? 0 : -20,
                    pointerEvents: activeCard === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.4em] uppercase">
                      Lokalizacja {index + 1}/{LOCATIONS.length}
                    </span>
                    <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
                  </div>

                  {/* Typography - Clean & Premium */}
                  <div className="mb-4">
                    <span className="block font-display text-2xl font-light text-[#5a5a5a] mb-2">Salon</span>
                    <h2 className="font-display text-6xl xl:text-7xl font-medium text-[#1a1a1a] leading-[0.9] tracking-[-0.03em]">
                      {location.city}
                    </h2>
                  </div>
                  
                  <div className="w-16 h-1 bg-[#E31F25] mb-8" />
                  
                  <p className="font-display text-xl lg:text-2xl font-light text-[#1a1a1a] mb-12 max-w-md">
                    {location.address}
                  </p>

                  <div className="grid grid-cols-2 gap-12 mb-14 border-t border-[#e0ded8] pt-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[#1a1a1a] font-medium text-xs tracking-widest uppercase">
                        <Phone className="w-4 h-4 text-[#E31F25]" />
                        Telefon
                      </div>
                      <a href={`tel:${location.phone}`} className="block text-lg font-light text-[#5a5a5a] hover:text-[#E31F25] transition-colors">
                        {location.phone}
                      </a>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[#1a1a1a] font-medium text-xs tracking-widest uppercase">
                        <Clock className="w-4 h-4 text-[#E31F25]" />
                        Godziny otwarcia
                      </div>
                      <p className="text-lg font-light text-[#5a5a5a] whitespace-pre-line leading-relaxed">
                        {location.openingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <Link href="/umow-wizyte" className="group">
                      <button className="relative overflow-hidden bg-[#E31F25] text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-[#C91A1F] flex items-center gap-3">
                        {/* Shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                        <span className="relative z-10">Umów wizytę</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    
                    <a 
                      href={location.map_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#E31F25] transition-colors"
                    >
                      <span className="w-8 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-12 transition-all duration-300" />
                      Zobacz na mapie
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Image */}
            <div className="relative h-[75vh] w-full">
               {/* Artistic Frames (matching Intro section) */}
              <div className="absolute -inset-4 border border-[#E31F25]/10 z-0 hidden lg:block" />
              <div className="absolute -inset-8 border border-[#E31F25]/5 z-0 hidden lg:block" />

              <div className="relative h-full w-full overflow-hidden bg-[#fafafa] shadow-2xl z-10">
                <div className="absolute inset-0 bg-[#1a1a1a]/10 z-10 pointer-events-none" />
                
                {LOCATIONS.map((location, index) => (
                  <motion.div
                    key={location.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: activeCard === index ? 1 : 0,
                      scale: activeCard === index ? 1 : 1.1,
                      zIndex: activeCard === index ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={location.image}
                      alt={`Salon Prooptica ${location.city}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
                
                {/* Decorative elements on image */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                   <div className="flex justify-between items-end">
                      <div className="text-white/90 font-mono text-xs tracking-[0.2em] uppercase border-l-2 border-[#E31F25] pl-4">
                         {LOCATIONS[activeCard].postal} {LOCATIONS[activeCard].city}
                      </div>
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-[#E31F25] transition-colors duration-300 cursor-pointer">
                         <MapPin className="w-5 h-5 text-white" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
