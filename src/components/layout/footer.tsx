"use client"

import Link from "next/link"
import { LOCATIONS } from "@/lib/constants/locations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { ArrowRight, Mail, Phone, MapPin, Clock, Instagram, Facebook, Send, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

// TikTok icon (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const FOOTER_LINKS = {
  company: [
    { label: "O Nas", href: "/o-nas" },
    { label: "Blog", href: "/artykuly" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Salony", href: "/salony" },
  ],
  services: [
    { label: "Badanie Wzroku", href: "/oferta/badanie-wzroku" },
    { label: "Marki", href: "/marki" },
    { label: "Umów Wizytę", href: "/umow-wizyte" },
  ],
  legal: [
    { label: "Polityka Prywatności", href: "#" },
  ]
}

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: TikTokIcon, href: "#", label: "TikTok" },
]

export function Footer() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()

  return (
    <footer 
      ref={containerRef} 
      className={cn(
        "relative bg-[#1a1a1a] text-white overflow-hidden content-auto-heavy",
        getSectionVisibilityClass(isVisible)
      )}
      role="contentinfo"
      aria-label="Stopka strony"
      suppressHydrationWarning
    >
      
      {/* Subtle texture overlay like other sections */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: NOISE_TEXTURE
      }} />
      
      {/* Top decorative line - static for Safari performance */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31F25]/40 to-transparent"
      />
      
      {/* Decorative large text - background */}
      <div
        className="absolute top-32 -right-12 font-display text-[12vw] font-bold text-white leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em] whitespace-nowrap opacity-[0.015]"
      >
        PROOPTICA
      </div>
      
      {/* Newsletter Section */}
      <div className="relative">
        <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 py-16 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left - Newsletter */}
            <div className="lg:col-span-6 transform-gpu text-center sm:text-left">
              {/* Label */}
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 mb-6 sm:mb-8">
                <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent sm:hidden" />
                <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                  Newsletter
                </span>
                <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
              </div>
              
              {/* Headline - static for Safari performance */}
              <div className="mb-2">
                <h3 className="font-display text-[2.25rem] sm:text-[clamp(2.5rem,5vw,4rem)] font-extralight text-white leading-[1] tracking-[-0.03em]">
                  Bądź na
                </h3>
              </div>
              <div className="mb-6 sm:mb-8">
                <h3 className="font-display text-[2.25rem] sm:text-[clamp(2.5rem,5vw,4rem)] font-medium text-white leading-[1] tracking-[-0.03em]">
                  <span className="relative inline-block">
                    <span className="italic text-[#E31F25]">bieżąco</span>
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
                  </span>
                </h3>
              </div>
              
              <p className="text-white/50 text-base sm:text-base lg:text-lg leading-[1.6] sm:leading-[1.8] mb-8 sm:mb-10 max-w-md font-light mx-auto sm:mx-0">
                Zapisz się do newslettera i otrzymuj ekskluzywne oferty oraz porady naszych ekspertów.
              </p>
              
              {/* Newsletter Form */}
              <div className="max-w-md mx-auto sm:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#E31F25] transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="Twój adres email" 
                      className="w-full pl-12 sm:pl-14 pr-5 py-6 sm:py-7 bg-white/5 border border-white/10 rounded-none text-white placeholder:text-white/30 focus:border-[#E31F25] focus:ring-0 focus:bg-white/[0.07] transition-all duration-300 text-sm"
                    />
                  </div>
                  <button className="group/btn relative overflow-hidden bg-[#E31F25] hover:bg-[#c91a1f] text-white px-6 h-[50px] sm:h-[58px] font-semibold tracking-[0.1em] uppercase text-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(227,31,37,0.5)] hover:scale-[1.02]">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                    <span className="absolute inset-0 border border-white/20" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Zapisz
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right - Quick Locations */}
            <div className="lg:col-span-6 transform-gpu text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 mb-6 sm:mb-8">
                <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent sm:hidden" />
                <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                  Nasze Salony
                </span>
                <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {LOCATIONS.map((loc) => (
                  <div key={loc.id}>
                    <Link 
                      href="/salony"
                      className="group block p-4 sm:p-5 border border-white/10 hover:border-[#E31F25]/40 hover:bg-white/[0.03] transition-all duration-300 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#E31F25]/10 text-[#E31F25] group-hover:bg-[#E31F25] group-hover:text-[#1a1a1a] transition-all duration-300 shrink-0 w-8 h-8 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="text-left">
                          <span className="block font-display text-base sm:text-lg text-white font-medium tracking-tight mb-0.5 sm:mb-1 group-hover:text-[#E31F25] transition-colors">
                            {loc.city}
                          </span>
                          <span className="text-[10px] sm:text-xs text-white/40 font-light line-clamp-1">{loc.address}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 py-12 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand - 4 columns */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="inline-block mb-6 sm:mb-8 group">
              <div className="relative">
                <Image 
                  src="/logo-prooptica.svg" 
                  alt="Prooptica" 
                  width={160} 
                  height={36}
                  className="h-8 sm:h-9 w-auto transition-all duration-300 group-hover:opacity-80"
                />
              </div>
            </Link>
            
            <p className="text-white/50 mb-8 sm:mb-10 max-w-xs leading-[1.8] text-sm sm:text-[15px] font-light">
              Rodzinna tradycja połączona z nowoczesną precyzją i ekspertyzą medyczną. 
              Dbamy o Twój wzrok od ponad 20 lat.
            </p>
            
            {/* Social Links - Simplified for Safari */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative p-3 sm:p-4 overflow-hidden"
                  aria-label={social.label}
                >
                  {/* Border frame */}
                  <div className="absolute inset-0 border border-white/10 group-hover:border-[#E31F25]/50 transition-colors duration-300" />
                  
                  {/* Background on hover */}
                  <div className="absolute inset-0 bg-[#E31F25] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300" />
                  
                  <social.icon className="relative w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-[#1a1a1a] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - 6 columns */}
          <div className="lg:col-span-5 lg:pl-12">
            <div className="grid grid-cols-2 gap-8 lg:gap-12 text-center sm:text-left">
              
              {/* Company Links */}
              <div>
                <h4 className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#E31F25] mb-6 sm:mb-8">
                  Firma
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="group flex items-center justify-center sm:justify-start gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      >
                        <span className="hidden sm:block w-0 h-px bg-[#E31F25] group-hover:w-3 transition-all duration-300" />
                        <span className="text-sm sm:text-[15px] font-light">{link.label}</span>
                        <ArrowUpRight className="hidden sm:block w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#E31F25]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h4 className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#E31F25] mb-6 sm:mb-8">
                  Usługi
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {FOOTER_LINKS.services.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="group flex items-center justify-center sm:justify-start gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      >
                        <span className="hidden sm:block w-0 h-px bg-[#E31F25] group-hover:w-3 transition-all duration-300" />
                        <span className="text-sm sm:text-[15px] font-light">{link.label}</span>
                        <ArrowUpRight className="hidden sm:block w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#E31F25]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact - 3 columns */}
          <div className="lg:col-span-3 text-center sm:text-left flex flex-col items-center sm:items-start">
            <h4 className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#E31F25] mb-6 sm:mb-8">
              Kontakt
            </h4>
            
            <div className="space-y-5 sm:space-y-6 flex flex-col items-start w-fit sm:w-full">
              <a 
                href="tel:+4822XXXXXXX"
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="p-2.5 sm:p-3 border border-white/10 group-hover:border-[#E31F25]/50 group-hover:bg-[#E31F25]/10 transition-all duration-300 shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E31F25]" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 mb-0.5 sm:mb-1">Telefon</span>
                  <span className="font-display text-base sm:text-lg text-white font-light whitespace-nowrap">+48 22 XXX XX XX</span>
                </div>
              </a>
              
              <a 
                href="mailto:kontakt@prooptica.pl"
                className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="p-2.5 sm:p-3 border border-white/10 group-hover:border-[#E31F25]/50 group-hover:bg-[#E31F25]/10 transition-all duration-300 shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E31F25]" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 mb-0.5 sm:mb-1">Email</span>
                  <span className="font-display text-base sm:text-lg text-white font-light whitespace-nowrap">kontakt@prooptica.pl</span>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="p-2.5 sm:p-3 border border-white/10 shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E31F25]" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 mb-0.5 sm:mb-1">Godziny</span>
                  <div className="flex flex-col sm:block">
                    <span className="text-white/70 text-xs sm:text-sm font-light whitespace-nowrap">Pn-Pt: 10:00 - 18:00</span>
                    <span className="text-white/70 text-xs sm:text-sm font-light sm:ml-3 whitespace-nowrap">Sob: 10:00 - 14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar - Refined */}
      <div className="relative">
        <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 py-6 sm:py-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <p className="text-white/30 text-[11px] sm:text-[13px] font-light text-center md:text-left">
              © {new Date().getFullYear()} Prooptica. Wszelkie prawa zastrzeżone.
            </p>
            
            {/* Legal Links */}
            <div className="flex items-center gap-1">
              {FOOTER_LINKS.legal.map((link, i) => (
                <span key={link.label} className="flex items-center">
                  <Link 
                    href={link.href}
                    className="text-[11px] sm:text-[13px] text-white/30 hover:text-[#E31F25] transition-colors duration-300 font-light px-2 sm:px-3 py-1"
                  >
                    {link.label}
                  </Link>
                  {i < FOOTER_LINKS.legal.length - 1 && (
                    <span className="text-white/20">·</span>
                  )}
                </span>
              ))}
            </div>
            
            {/* Back to top - Elegant */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3"
            >
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-[#E31F25] transition-colors duration-300">
                Powrót na górę
              </span>
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 border border-white/10 group-hover:border-[#E31F25]/50 transition-colors duration-300 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#E31F25] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <ArrowRight className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 -rotate-90 group-hover:text-[#1a1a1a] transition-colors duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Elegant corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#E31F25]/20 pointer-events-none hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#E31F25]/20 pointer-events-none hidden lg:block" />
    </footer>
  )
}
