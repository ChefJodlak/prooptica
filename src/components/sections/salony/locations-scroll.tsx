"use client"

import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, AnimatePresence, useInView } from "framer-motion"
import { LOCATIONS } from "@/lib/constants/locations"
import Image from "next/image"
import { MapPin, ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { NOISE_TEXTURE } from "@/lib/constants/ui"
import { SalonMap } from "./salon-map"
import type { Location } from "@/lib/constants/locations"

// Map location IDs to booking salon IDs
function getBookingSalonId(locationId: string): string {
  const mapping: Record<string, string> = {
    'warszawa': 'warszawa',
    'piaseczno-1': 'piaseczno-wojska',
    'piaseczno-2': 'piaseczno-pulawska',
    'grojec': 'grojec',
  }
  return mapping[locationId] || locationId
}

function MobileLocationCard({ location, index }: { location: Location; index: number }) {
  const [showMap, setShowMap] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] uppercase">
          Salon {String(index + 1).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#E31F25]/40 to-transparent" />
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden mb-6">
        {/* Artistic frame */}
        <div className="absolute -inset-2 border border-[#E31F25]/20 z-0" />

        <div className="relative h-full w-full overflow-hidden z-10">
          <Image
            src={location.image}
            alt={`Salon Prooptica ${location.city}`}
            fill
            className="object-cover"
          />
          {/* Elegant vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-[#1a1a1a]/10" />

          {/* Pin button */}
          <button
            onClick={() => setShowMap(true)}
            className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-[#E31F25] hover:border-[#E31F25] transition-all duration-300"
          >
            <MapPin className="w-5 h-5 text-white" />
          </button>

          {/* Address overlay */}
          <div className="absolute bottom-4 left-4 right-20">
            <div className="border-l-2 border-[#E31F25] pl-3">
              <p className="text-white font-display text-sm font-medium leading-tight">
                {location.address}
              </p>
              <p className="text-white/60 text-[10px] tracking-[0.1em] uppercase mt-1">
                {location.postal}
              </p>
            </div>
          </div>

          {/* Map Overlay */}
          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-30"
              >
                <SalonMap location={location} />

                {/* Close button */}
                <button
                  onClick={() => setShowMap(false)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#E31F25] transition-all duration-300 shadow-lg group"
                >
                  <X className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" />
                </button>

                {/* Location info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#E31F25]" />
                      <div>
                        <h4 className="font-display text-sm text-white font-medium">
                          {location.city}
                        </h4>
                        <p className="text-white/60 text-[10px]">
                          {location.address}
                        </p>
                      </div>
                    </div>
                    <a
                      href={location.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] uppercase text-white hover:text-[#E31F25] transition-colors"
                    >
                      <span>Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display text-[2.5rem] font-medium text-[#1a1a1a] leading-[0.95] tracking-[-0.02em] mb-3">
          {location.city}
        </h3>

        <p className="text-[#6b6b6b] text-base font-light mb-6 leading-relaxed">
          {location.address}, {location.postal}
        </p>

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-4 py-5 border-y border-[#e8e6e3] mb-6">
          <div>
            <span className="block text-[10px] font-medium text-[#a0a0a0] tracking-[0.15em] uppercase mb-1.5">
              Telefon
            </span>
            <a href={`tel:${location.phone}`} className="text-[#1a1a1a] text-sm hover:text-[#E31F25] transition-colors">
              {location.phone}
            </a>
          </div>
          <div>
            <span className="block text-[10px] font-medium text-[#a0a0a0] tracking-[0.15em] uppercase mb-1.5">
              Godziny
            </span>
            <p className="text-[#1a1a1a] text-sm leading-relaxed">
              Pn–Pt 10–18
              <span className="block text-[#6b6b6b]">Sob 10–14</span>
            </p>
          </div>
        </div>

        <Link href={`/umow-wizyte?salon=${getBookingSalonId(location.id)}`} className="group block">
          <button className="relative w-full overflow-hidden bg-[#E31F25] text-white px-6 py-4 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md hover:brightness-110 flex items-center justify-center gap-3 cursor-pointer">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative z-10">Umów wizytę</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export function LocationsScroll() {
  const [activeCard, setActiveCard] = useState(0)
  const [showMap, setShowMap] = useState(false)
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
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: NOISE_TEXTURE
      }} />

      {/* Mobile View */}
      <div className="lg:hidden px-5 py-16 relative z-10">
        {/* Mobile Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-l from-[#E31F25] to-transparent" />
            <MapPin className="w-4 h-4 text-[#E31F25]" />
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] uppercase">
              Nasze Lokalizacje
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
          </div>
          <h2 className="font-display text-[2rem] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
            Znajdź nas
            <span className="block font-medium">
              blisko <span className="italic text-[#E31F25]">Ciebie</span>
            </span>
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-16">
          {LOCATIONS.map((location, index) => (
            <MobileLocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </div>

      {/* Desktop View (Sticky Scroll) */}
      <div
        ref={containerRef}
        className="hidden lg:block relative z-10"
        style={{ height: `${LOCATIONS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* Progress indicator */}
          <div className="absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {LOCATIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!containerRef.current) return
                  const rect = containerRef.current.getBoundingClientRect()
                  const containerAbsoluteTop = rect.top + window.scrollY
                  // Each location occupies 100vh of scroll, so scroll index * 100vh from container top
                  const scrollTarget = containerAbsoluteTop + (index * window.innerHeight)
                  window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
                }}
                className="group flex items-center gap-3"
              >
                <div className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${activeCard === index
                    ? 'bg-[#E31F25] scale-125'
                    : 'bg-[#1a1a1a]/20 group-hover:bg-[#1a1a1a]/40'
                  }
                `} />
                <span className={`
                  text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-300
                  ${activeCard === index
                    ? 'text-[#E31F25]'
                    : 'text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/60'
                  }
                `}>
                  {LOCATIONS[index].city}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full max-w-[1600px] mx-auto px-20 xl:px-32 grid grid-cols-12 gap-12 xl:gap-20 items-center h-full">

            {/* Left Side: Content */}
            <div className="col-span-5 relative h-[560px]">
              {LOCATIONS.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    y: activeCard === index ? 0 : 30,
                    pointerEvents: activeCard === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Eyebrow with animated line */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#E31F25] text-[11px] font-medium tracking-[0.3em] uppercase">
                      Salon {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    <span className="text-[#c0bdb8] text-[11px] tracking-[0.2em]">
                      / {String(LOCATIONS.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Main Heading with refined typography */}
                  <h2 className="font-display text-[5rem] xl:text-[6rem] font-medium text-[#1a1a1a] leading-[0.9] tracking-[-0.04em] mb-6">
                    {location.city}
                  </h2>

                  {/* Address block */}
                  <div className="mb-10">
                    <p className="text-[1.4rem] xl:text-[1.6rem] font-light text-[#5a5a5a] leading-[1.35] tracking-[-0.01em] max-w-[340px]">
                      {location.address}
                    </p>
                    <p className="text-[0.9rem] text-[#9a9a9a] mt-2 tracking-[0.05em]">
                      {location.postal} {location.city}
                    </p>
                  </div>

                  {/* Elegant divider */}
                  <div className="relative w-full max-w-[340px] mb-10">
                    <div className="h-px bg-[#e8e6e3]" />
                    <div className="absolute left-0 top-0 w-16 h-px bg-[#E31F25]" />
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-5 mb-12 max-w-[340px]">
                    <div>
                      <span className="block text-[10px] font-semibold text-[#a0a0a0] tracking-[0.15em] uppercase mb-2">
                        Telefon
                      </span>
                      <a
                        href={`tel:${location.phone}`}
                        className="block text-[1rem] text-[#1a1a1a] hover:text-[#E31F25] transition-colors duration-300"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-[#a0a0a0] tracking-[0.15em] uppercase mb-2">
                        Godziny
                      </span>
                      <p className="text-[1rem] text-[#1a1a1a] leading-[1.5]">
                        Pn–Pt 10:00–18:00
                        <span className="block text-[#6b6b6b]">Sob 10:00–14:00</span>
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-8">
                    <Link href={`/umow-wizyte?salon=${getBookingSalonId(location.id)}`} className="group">
                      <button className="relative overflow-hidden bg-[#E31F25] text-white px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.03] shadow-sm hover:shadow-lg hover:brightness-110 flex items-center gap-3 cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                        <span className="relative z-10">Umów wizytę</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>

                    <a
                      href={location.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-4"
                    >
                      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#6b6b6b] group-hover:text-[#1a1a1a] transition-colors duration-300">
                        Mapa
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-[#1a1a1a]/20 group-hover:bg-[#E31F25] group-hover:w-12 transition-all duration-300" />
                        <ArrowRight className="w-4 h-4 text-[#1a1a1a]/40 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Image */}
            <div className="col-span-7 relative h-[80vh] w-full">
              {/* Artistic Frames */}
              <div className="absolute -inset-3 border border-[#E31F25]/30 z-0" />
              <div className="absolute -inset-6 border border-[#E31F25]/10 z-0" />

              {/* Main image container */}
              <div className="relative h-full w-full overflow-hidden bg-[#1a1a1a] shadow-2xl z-10">
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/5 via-transparent to-[#1a1a1a]/10 z-10 pointer-events-none" />

                {LOCATIONS.map((location, index) => (
                  <motion.div
                    key={location.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0,
                      scale: activeCard === index ? 1 : 1.15,
                      zIndex: activeCard === index ? 1 : 0
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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

                {/* Elegant vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/10 to-[#1a1a1a]/20 z-10 pointer-events-none" />

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex justify-between items-end">
                    <div className="border-l-2 border-[#E31F25] pl-5">
                      <p className="text-white font-display text-lg font-medium mb-1 tracking-[-0.01em]">
                        {LOCATIONS[activeCard].address}
                      </p>
                      <p className="text-white/60 text-xs tracking-[0.15em] uppercase">
                        {LOCATIONS[activeCard].postal} {LOCATIONS[activeCard].city}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowMap(true)}
                      className="w-14 h-14 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-[#E31F25] hover:border-[#E31F25] transition-all duration-300 cursor-pointer group"
                    >
                      <MapPin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 z-10 pointer-events-none">
                  <div className="absolute top-4 right-4 w-12 h-px bg-white/30" />
                  <div className="absolute top-4 right-4 w-px h-12 bg-white/30" />
                </div>

                {/* Map Overlay */}
                <AnimatePresence>
                  {showMap && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-30"
                    >
                      <SalonMap location={LOCATIONS[activeCard]} />

                      {/* Close button */}
                      <button
                        onClick={() => setShowMap(false)}
                        className="absolute top-5 right-5 w-12 h-12 bg-white flex items-center justify-center hover:bg-[#E31F25] transition-all duration-300 cursor-pointer shadow-xl group"
                      >
                        <X className="w-5 h-5 text-[#1a1a1a] group-hover:text-white transition-colors" />
                      </button>

                      {/* Location info bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-1 h-10 bg-[#E31F25]" />
                            <div>
                              <h4 className="font-display text-xl text-white font-medium tracking-[-0.01em]">
                                {LOCATIONS[activeCard].city}
                              </h4>
                              <p className="text-white/50 text-sm">
                                {LOCATIONS[activeCard].address}
                              </p>
                            </div>
                          </div>
                          <a
                            href={LOCATIONS[activeCard].map_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.12em] uppercase text-white hover:text-[#E31F25] transition-colors"
                          >
                            <span>Google Maps</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
