"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

// Premium brands - displayed prominently with logo images
const FEATURED_BRANDS = [
  { name: "Tom Ford", logo: "/brands/tom-ford.svg" },
  { name: "Saint Laurent", logo: "/brands/saint-laurent.svg" },
  { name: "Gucci", logo: "/brands/gucci.svg" },
  { name: "Prada", logo: "/brands/prada.svg" },
  { name: "Versace", logo: "/brands/versace.svg" },
  { name: "Ray-Ban", logo: "/brands/ray-ban.svg" },
]

// All brands for the flowing marquee
const ALL_BRANDS = [
  "PRADA", "SAINT LAURENT", "BVLGARI", "TOM FORD", "MIU MIU", "FENDI",
  "GUCCI", "DOLCE GABBANA", "VERSACE", "GIVENCHY", "CELINE", "MAX MARA",
  "MAX&CO", "FURLA", "ROBERTA DI CAMERINO", "WOODYS", "ETNIA BARCELONA",
  "CHROMA", "SWAROVSKI", "CAROLINA HERRERA", "TOUS", "SILHOUETTE", "ESCADA",
  "YALEYA", "DAVIDOFF", "EMPORIO ARMANI", "ARMANI EXCHANGE", "POLO RALPH LAUREN",
  "MONTBLANC", "SALVATORE FERRAGAMO", "ANA HICKMANN", "HICKMANN", "MARCIANO",
  "VOGUE", "RAY BAN", "GUESS", "WES", "TAN", "WES XS", "TAN CLIP", "LUCAS",
  "LUCAS XS", "VERDO", "LUCKY DUCKY", "JIMMY CHOO", "TAG HEUER", "CHLOE"
]

// Individual featured brand with elegant hover
function FeaturedBrand({
  brand,
  index,
  isInView
}: {
  brand: { name: string; logo: string }
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.4 + index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer flex items-center justify-center"
    >
      <div className="relative h-6 sm:h-8 lg:h-10 w-auto flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          height={40}
          width={160}
          className="h-full w-auto object-contain brightness-0 invert opacity-80 transition-all duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Elegant underline on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#E31F25] origin-left"
      />
    </motion.div>
  )
}

export function BrandsMarquee() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] py-16 lg:py-24 bg-[#0f0f0f] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#0f0f0f]" />

      {/* Vertical accent lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E31F25]/20 to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E31F25]/20 to-transparent origin-bottom"
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full flex-1 flex flex-col">

        {/* Header Section */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 mb-auto pt-8 sm:pt-12 lg:pt-16">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 lg:gap-16">

            <div className="flex-1 text-center lg:text-left">
              {/* Elegant label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-4 sm:mb-6"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent origin-right lg:hidden"
                />
                <span className="text-[#E31F25] text-[10px] sm:text-[11px] font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase">
                  Kolekcja Premium
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left"
                />
              </motion.div>

              {/* Main headline */}
              <div className="overflow-hidden pb-3 sm:pb-4">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display text-[2.5rem] sm:text-[clamp(2rem,7vw,5rem)] font-extralight text-white leading-[1.1] tracking-[-0.02em]"
                >
                  Światowe marki w naszej{" "}
                  <span className="relative inline-block">
                    <span className="font-medium text-[#E31F25] italic">ofercie</span>
                    <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[6px] sm:h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" fill="none" stroke="#E31F25" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Side description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:max-w-xs text-center lg:text-right"
            >
              <p className="text-white/50 text-base sm:text-lg leading-[1.7] font-light">
                Starannie wyselekcjonowana oferta od najbardziej prestiżowych domów mody oraz polskich producentów.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Featured Brands - 2 rows x 3 columns grid */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16 my-auto py-12 lg:py-16">
          <div className="grid grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-20 gap-y-10 sm:gap-y-12 lg:gap-y-16">
            {FEATURED_BRANDS.map((brand, i) => (
              <div key={brand.name} className="flex items-center justify-center">
                <FeaturedBrand
                  brand={brand}
                  index={i}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pb-10 sm:pb-14">
          {/* Marquee Section */}
          <div className="relative mb-8 sm:mb-10 lg:mb-12">

            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-40 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-40 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />

            {/* First Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex overflow-hidden py-3"
            >
              <div className="flex animate-marquee items-center">
                {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
                  <span
                    key={`row1-${i}`}
                    className="text-sm font-medium text-white/30 uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10 transition-colors duration-300 hover:text-[#E31F25]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <div className="flex animate-marquee items-center" aria-hidden>
                {[...ALL_BRANDS, ...ALL_BRANDS].map((brand, i) => (
                  <span
                    key={`row1-dup-${i}`}
                    className="text-sm font-medium text-white/30 uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Second Row - Reverse direction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="flex overflow-hidden py-3"
            >
              <div className="flex animate-marquee-reverse items-center">
                {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
                  <span
                    key={`row2-${i}`}
                    className="text-sm font-medium text-white/15 uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <div className="flex animate-marquee-reverse items-center" aria-hidden>
                {[...ALL_BRANDS.slice().reverse(), ...ALL_BRANDS.slice().reverse()].map((brand, i) => (
                  <span
                    key={`row2-dup-${i}`}
                    className="text-sm font-medium text-white/15 uppercase tracking-[0.2em] whitespace-nowrap px-6 lg:px-10"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center px-5 sm:px-6"
          >
            <p className="text-[10px] sm:text-sm text-white/30 tracking-[0.1em] sm:tracking-[0.2em] uppercase">
              Wszystkie oprawy oryginalne · Pełna gwarancja producenta
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
