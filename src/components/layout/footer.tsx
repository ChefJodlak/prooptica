"use client"

import Link from "next/link"
import { LOCATIONS } from "@/lib/constants/locations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Send } from "lucide-react"
import Image from "next/image"

const FOOTER_LINKS = {
  company: [
    { label: "O Nas", href: "/o-nas" },
    { label: "Kariera", href: "#" },
    { label: "Blog", href: "/artykuly" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  services: [
    { label: "Badanie Wzroku", href: "/oferta/badanie-wzroku" },
    { label: "Okulary Korekcyjne", href: "#" },
    { label: "Okulary Przeciwsłoneczne", href: "#" },
    { label: "Soczewki Kontaktowe", href: "#" },
  ],
  legal: [
    { label: "Polityka Prywatności", href: "#" },
    { label: "Regulamin", href: "#" },
    { label: "Cookies", href: "#" },
  ]
}

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <footer ref={containerRef} className="relative bg-[#0A0A0A] text-white overflow-hidden">
      
      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10"
          >
            <div>
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#E31F25]" />
                <span className="text-xs font-medium tracking-[0.3em] text-[#E31F25] uppercase">
                  Newsletter
                </span>
              </div>
              
              <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight mb-4">
                Bądź na bieżąco
              </h3>
              <p className="text-white/50 max-w-md text-base">
                Zapisz się do newslettera i otrzymuj ekskluzywne oferty oraz porady ekspertów.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="flex gap-3 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input 
                    type="email" 
                    placeholder="Twój email" 
                    className="w-full pl-12 pr-4 py-6 bg-white/5 border-white/10 rounded-none text-white placeholder:text-white/30 focus:border-[#E31F25] focus:ring-0"
                  />
                </div>
                <Button className="rounded-none bg-[#E31F25] hover:bg-[#c91b20] px-6 h-[52px]">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/logo-prooptica.svg" 
                alt="Prooptica" 
                width={160} 
                height={35}
                className="h-8 w-auto invert"
              />
            </Link>
            <p className="text-white/50 mb-10 max-w-sm leading-relaxed">
              Rodzinna tradycja, nowoczesna precyzja i ekspertyza medyczna. 
              Dbamy o Twój wzrok od 20 lat.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 border border-white/10 text-white/50 hover:bg-[#E31F25] hover:border-[#E31F25] hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/30 mb-8">
              Firma
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/30 mb-8">
              Usługi
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/30 mb-8">
              Kontakt
            </h4>
            <ul className="space-y-5">
              <li>
                <a 
                  href="tel:+4822XXXXXXX"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E31F25]" />
                  +48 22 XXX XX XX
                </a>
              </li>
              <li>
                <a 
                  href="mailto:kontakt@prooptica.pl"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E31F25]" />
                  kontakt@prooptica.pl
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Clock className="w-4 h-4 text-[#E31F25] mt-0.5" />
                <span>Pn-Pt: 10:00 - 18:00<br/>Sob: 10:00 - 14:00</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Locations Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex items-center gap-8 mb-8">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Nasze Salony
            </h4>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map((loc) => (
              <Link 
                key={loc.id}
                href="/salony"
                className="group flex items-start gap-4 p-5 border border-white/10 hover:border-[#E31F25]/30 hover:bg-white/5 transition-all duration-300"
              >
                <div className="p-2 bg-[#E31F25]/10 text-[#E31F25] group-hover:bg-[#E31F25] group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-medium text-white mb-1">{loc.city}</span>
                  <span className="text-sm text-white/50">{loc.address}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Prooptica. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-8">
              {FOOTER_LINKS.legal.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
