"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NOISE_TEXTURE_BG } from "./constants"

interface CtaSectionProps {
  isInView: boolean
}

export function CtaSection({ isInView }: CtaSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1a1a1a] p-10 lg:p-16 overflow-hidden text-center"
        >
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: NOISE_TEXTURE_BG }} 
          />
          
          {/* Decorative glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E31F25]/15 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Top red line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E31F25] to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="h-px flex-1 max-w-[40px] bg-gradient-to-l from-[#E31F25] to-transparent" />
              <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                Ekskluzywna oferta
              </span>
              <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#E31F25] to-transparent" />
            </div>
            
            <h2 className="font-display text-3xl lg:text-5xl font-extralight text-white tracking-[-0.02em] mb-4">
              Szukasz konkretnego{" "}
              <span className="italic text-[#E31F25] font-medium">modelu?</span>
            </h2>
            <p className="text-lg text-white/50 mb-10 font-light">
              Skontaktuj się z nami — pomożemy znaleźć idealne okulary z naszej bogatej kolekcji.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/kontakt">
                <Button className="rounded-none bg-[#E31F25] hover:bg-white text-[#1a1a1a] px-8 py-6 font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500">
                  Skontaktuj się
                </Button>
              </Link>
              <Link href="/salony" className="group inline-flex items-center gap-4 px-6 py-4">
                <span className="text-white/70 text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                  Odwiedź salon
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-white/30 group-hover:bg-[#E31F25] group-hover:w-12 transition-all duration-500" />
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

