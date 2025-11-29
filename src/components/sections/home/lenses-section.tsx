"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const LENS_TYPES = [
  {
    id: "progressive",
    number: "01",
    name: "Progresywne",
    description: "Płynna korekcja na każdą odległość. Jedno rozwiązanie zamiast kilku par okularów.",
  },
  {
    id: "photochromic",
    number: "02",
    name: "Fotochromowe",
    description: "Inteligentne soczewki adaptujące się do światła. Pełna ochrona UV.",
  },
  {
    id: "bluecontrol",
    number: "03",
    name: "Blue Control",
    description: "Ochrona przed niebieskim światłem z ekranów. Mniej zmęczenia oczu.",
  },
  {
    id: "antireflective",
    number: "04",
    name: "Antyrefleksyjne",
    description: "Eliminacja odbić i odblasków. Krystalicznie czyste widzenie.",
  },
]

const PARTNERS = [
  { id: "hoya", name: "HOYA", logo: "/lenses/hoya.png" },
  { id: "rodenstock", name: "RODENSTOCK", logo: "/lenses/rodenstock.png" },
  { id: "coopervision", name: "COOPER VISION", logo: "/lenses/cooper-vision.png" },
  { id: "acuvue", name: "ACUVUE", logo: "/lenses/acuvue.png" },
  { id: "alcon", name: "ALCON", logo: "/lenses/alcon.jpg" },
]

export function LensesSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"])

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 lg:py-48 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E5E5]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header - Editorial Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20 lg:mb-32">
          
          <div className="lg:col-span-8">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-8 bg-[#E31F25]" />
              <span className="text-xs font-medium tracking-[0.3em] text-[#E31F25] uppercase">
                Technologie
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display text-display-lg text-[#0A0A0A]"
              >
                Soczewki nowej
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-display text-display-lg text-[#0A0A0A]"
              >
                generacji<span className="text-[#E31F25]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Side text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <p className="text-[#737373] text-base lg:text-lg leading-relaxed">
              Współpracujemy z najlepszymi producentami na świecie, 
              dostarczając rozwiązania dopasowane do Twojego stylu życia.
            </p>
          </motion.div>
        </div>

        {/* Animated line divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-[#E5E5E5] mb-16 lg:mb-24"
        />

        {/* Lens types - Elegant List */}
        <div className="grid lg:grid-cols-2 gap-px bg-[#E5E5E5] mb-24 lg:mb-32">
          {LENS_TYPES.map((lens, index) => (
            <motion.article
              key={lens.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative bg-[#FAFAFA] p-8 lg:p-12 cursor-pointer group transition-colors duration-500",
                hoveredIndex === index && "bg-white"
              )}
            >
              <div className="flex items-start gap-6 lg:gap-8">
                {/* Number */}
                <span className={cn(
                  "text-xs tracking-widest font-medium transition-colors duration-300 pt-2",
                  hoveredIndex === index ? "text-[#E31F25]" : "text-[#A3A3A3]"
                )}>
                  {lens.number}
                </span>

                <div className="flex-1">
                  {/* Name */}
                  <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl text-[#0A0A0A] mb-4 tracking-tight group-hover:text-[#E31F25] transition-colors duration-300">
                    {lens.name}
                  </h3>

                  {/* Description */}
                  <p className={cn(
                    "text-sm lg:text-base leading-relaxed transition-colors duration-300 max-w-md",
                    hoveredIndex === index ? "text-[#525252]" : "text-[#737373]"
                  )}>
                    {lens.description}
                  </p>
                </div>
              </div>

              {/* Hover indicator line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-8 right-8 lg:left-12 lg:right-12 h-px bg-[#E31F25] origin-left"
              />
            </motion.article>
          ))}
        </div>

        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Partners label */}
          <div className="flex items-center gap-8 mb-10">
            <span className="text-xs tracking-[0.2em] text-[#A3A3A3] uppercase">
              Nasi Partnerzy
            </span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>
          
          {/* Partners logos */}
          <div className="flex flex-wrap items-center justify-start gap-8 lg:gap-16">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                className="relative h-8 lg:h-10 w-24 lg:w-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className={cn(
                    "object-contain",
                    partner.id === 'acuvue' && "invert"
                  )}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E5E5]" />
    </section>
  )
}
