"use client"

import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NOISE_TEXTURE } from "./animation-variants"

interface CtaBannerProps {
  isInView: boolean
}

export function CtaBanner({ isInView }: CtaBannerProps) {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative bg-[#1a1a1a] p-10 lg:p-16 overflow-hidden"
        >
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: NOISE_TEXTURE }} 
          />
          
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
              <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
                <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">
                  Szybka rezerwacja
                </span>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
              </div>
              <h3 className="font-display text-3xl lg:text-5xl font-extralight text-white mb-3 tracking-[-0.02em]">
                Wolisz{" "}
                <span className="italic text-[#C4A77D] font-medium">porozmawiać?</span>
              </h3>
              <p className="text-white/50 max-w-md font-light">
                Zadzwoń do nas i umów wizytę telefonicznie. Nasi konsultanci chętnie pomogą.
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
              <Link href="/umow-wizyte">
                <Button className="rounded-none bg-[#C4A77D] hover:bg-white text-[#1a1a1a] px-8 py-6 font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500">
                  Umów wizytę
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

