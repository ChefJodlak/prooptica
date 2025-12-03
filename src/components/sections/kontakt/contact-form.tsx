"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { fadeUpVariants } from "./animation-variants"

export function ContactForm() {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="lg:col-span-6"
    >
      {/* Section Label */}
      <div className="flex items-center gap-5 mb-8">
        <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">
          Formularz
        </span>
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
      </div>
      
      <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
        Wyślij
      </h2>
      <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
        <span className="relative inline-block">
          <span className="italic text-[#C4A77D]">wiadomość</span>
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
            <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
      </h2>
      
      <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
        Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
      </p>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-medium text-[#1a1a1a] tracking-[0.2em] uppercase">
              Imię i nazwisko
            </Label>
            <Input 
              id="name" 
              placeholder="Jan Kowalski" 
              className="h-14 px-5 bg-white border-[#e0ded8] rounded-none focus:border-[#C4A77D] focus:ring-[#C4A77D]/20 transition-all font-light"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[10px] font-medium text-[#1a1a1a] tracking-[0.2em] uppercase">
              Telefon
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+48 000 000 000" 
              className="h-14 px-5 bg-white border-[#e0ded8] rounded-none focus:border-[#C4A77D] focus:ring-[#C4A77D]/20 transition-all font-light"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[10px] font-medium text-[#1a1a1a] tracking-[0.2em] uppercase">
            Email
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="jan@przykład.pl" 
            className="h-14 px-5 bg-white border-[#e0ded8] rounded-none focus:border-[#C4A77D] focus:ring-[#C4A77D]/20 transition-all font-light"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-[10px] font-medium text-[#1a1a1a] tracking-[0.2em] uppercase">
            Temat
          </Label>
          <Input 
            id="subject" 
            placeholder="W czym możemy pomóc?" 
            className="h-14 px-5 bg-white border-[#e0ded8] rounded-none focus:border-[#C4A77D] focus:ring-[#C4A77D]/20 transition-all font-light"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-[10px] font-medium text-[#1a1a1a] tracking-[0.2em] uppercase">
            Wiadomość
          </Label>
          <Textarea 
            id="message" 
            placeholder="Opisz swoją sprawę..." 
            className="min-h-[180px] px-5 py-4 bg-white border-[#e0ded8] rounded-none focus:border-[#C4A77D] focus:ring-[#C4A77D]/20 transition-all resize-none font-light"
          />
        </div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            type="submit" 
            className="w-full h-14 rounded-none bg-[#C4A77D] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white font-semibold text-[11px] tracking-[0.2em] uppercase transition-all duration-500"
          >
            <span className="flex items-center gap-3">
              Wyślij wiadomość
              <Send className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

