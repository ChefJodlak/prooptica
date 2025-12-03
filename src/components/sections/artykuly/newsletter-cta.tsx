"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NewsletterCtaProps {
  isInView: boolean
}

export function NewsletterCta({ isInView }: NewsletterCtaProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1a1a1a] p-8 lg:p-16 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A77D]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C4A77D]/5 rounded-full blur-[80px]" />
          <div className="absolute top-8 right-8 w-32 h-32 border border-[#C4A77D]/10 rounded-full" />
          <div className="absolute top-12 right-12 w-20 h-20 border border-[#C4A77D]/20 rounded-full" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="w-8 h-px bg-[#C4A77D]" />
                <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.4em] uppercase">
                  Newsletter
                </span>
              </div>
              <h3 className="font-display text-2xl lg:text-4xl font-light text-white mb-4 tracking-[-0.02em]">
                Nie przegap nowych{" "}
                <span className="italic text-[#C4A77D] font-medium">artykułów</span>
              </h3>
              <p className="text-white/50 max-w-md font-light">
                Zapisz się do newslettera i otrzymuj powiadomienia o nowych wpisach na blogu.
              </p>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto max-w-md">
              <Input 
                type="email" 
                placeholder="Twój email" 
                className="h-14 px-5 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#C4A77D] focus:ring-0"
              />
              <Button className="h-14 bg-[#C4A77D] text-[#1a1a1a] hover:bg-white px-6 font-medium text-[11px] tracking-[0.15em] uppercase transition-all duration-300">
                Zapisz się
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

