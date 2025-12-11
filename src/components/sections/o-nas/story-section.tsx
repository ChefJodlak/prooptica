"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { containerVariants, fadeUpVariants, scaleInVariants, noiseTextureStyle } from "./animation-variants"

export function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: "-15%" })

  return (
    <section ref={storyRef} className="relative py-20 lg:py-32 bg-[#F8F7F4] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={noiseTextureStyle} />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isStoryInView ? "visible" : "hidden"}
        >
          {/* Image - Takes 5 columns */}
          <motion.div 
            variants={scaleInVariants}
            className="lg:col-span-5 relative h-[45vh] lg:h-[70vh]"
          >
            {/* Artistic frame */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isStoryInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/30" 
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isStoryInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -inset-6 lg:-inset-8 border border-[#E31F25]/10" 
            />
            
            <div className="relative h-full w-full overflow-hidden">
              <Image 
                src="/salons/piaseczno-1.jpg"
                alt="Wnętrze salonu Prooptica"
                fill
                className="object-cover"
              />
              {/* Elegant vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/20" />
              
              {/* Refined badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
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

          {/* Content - Takes 7 columns */}
          <div className="lg:col-span-7 lg:pl-8">
            {/* Header */}
            <motion.div variants={fadeUpVariants} className="mb-12 lg:mb-16">
              <div className="flex items-center gap-5 mb-8">
                <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">Nasza Historia</span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isStoryInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent origin-left" 
                />
              </div>
              <h2 className="font-display text-[2.5rem] lg:text-[4rem] xl:text-[4.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em]">
                Od małego salonu
              </h2>
              <h2 className="font-display text-[2.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mt-2">
                do sieci{" "}
                <span className="relative inline-block">
                  <span className="italic text-[#E31F25]">premium</span>
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div 
              variants={fadeUpVariants}
              className="space-y-6 text-[#5a5a5a] text-base lg:text-lg leading-[1.8] mb-10 max-w-xl font-light"
            >
              <p>
                Prooptica powstała z pasji do optyki i chęci niesienia pomocy osobom 
                z wadami wzroku. Założyciele, rodzina z wieloletnim doświadczeniem 
                w branży, postanowili stworzyć miejsce, gdzie najnowsza technologia 
                spotyka się z ciepłą, rodzinną atmosferą.
              </p>
              <p>
                Dziś, po dwóch dekadach, Prooptica to cztery ekskluzywne salony 
                w Warszawie, Piasecznie i Grójcu. Każdy z nich utrzymuje te same 
                standardy jakości i obsługi, które definiują naszą markę od samego początku.
              </p>
            </motion.div>
            
            {/* CTA */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center justify-between pt-8 border-t border-[#e0ded8]"
            >
              <Link href="/salony" className="group inline-flex items-center gap-6">
                <span className="text-[#1a1a1a] text-[11px] font-medium tracking-[0.25em] uppercase">
                  Nasze salony
                </span>
                <div className="relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-16 transition-all duration-500" />
                    <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

