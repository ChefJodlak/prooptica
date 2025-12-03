"use client"

import { motion } from "framer-motion"
import { Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TextureOverlay } from "./texture-overlay"
import { SectionLabel } from "./section-label"

interface CtaSectionProps {
  isInView: boolean
}

export function CtaSection({ isInView }: CtaSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1a1a1a] p-10 lg:p-16 overflow-hidden"
        >
          <TextureOverlay />
          
          {/* Decorative glow */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-[#C4A77D]/15 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4A77D] to-transparent" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <SectionLabel text="Zadbaj o wzrok" />
              <h3 className="font-display text-3xl lg:text-5xl font-extralight text-white mb-3 tracking-[-0.02em]">
                Umów badanie{" "}
                <span className="italic text-[#C4A77D] font-medium">już dziś</span>
              </h3>
              <p className="text-white/50 max-w-lg font-light">
                Nie czekaj — regularne badania to klucz do zdrowego wzroku przez całe życie.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="tel:+4822XXXXXXX"
                className="flex items-center gap-3 px-6 py-4 bg-white/5 ring-1 ring-white/10 text-white hover:bg-white/10 hover:ring-[#C4A77D]/50 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-[#C4A77D]" />
                <span className="font-medium tracking-wide">+48 22 XXX XX XX</span>
              </a>
              <Link href="/kontakt">
                <Button className="rounded-none bg-[#C4A77D] hover:bg-white text-[#1a1a1a] px-8 py-6 font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500">
                  <span className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    Rezerwuj termin
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

