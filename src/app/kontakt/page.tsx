"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, Send, ArrowUpRight, MessageCircle, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { LOCATIONS } from "@/lib/constants/locations"

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  const contactMethods = [
    {
      icon: Phone,
      title: "Zadzwoń do nas",
      description: "Infolinia czynna Pn-Pt 10-18",
      value: "+48 22 XXX XX XX",
      href: "tel:+4822XXXXXXX",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Napisz do nas",
      description: "Odpowiadamy w ciągu 24h",
      value: "kontakt@prooptica.pl",
      href: "mailto:kontakt@prooptica.pl",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "Czat na żywo",
      description: "Dostępny w godzinach pracy",
      value: "Rozpocznij czat",
      href: "#",
      color: "from-emerald-500 to-teal-500"
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-zinc-950 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-red-500" />
            <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm">
              Kontakt
            </span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6"
            >
              Skontaktuj się{" "}
              <span className="text-gradient">z nami.</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            Masz pytania? Chcesz umówić wizytę? Jesteśmy do Twojej dyspozycji.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.color} mb-6`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-zinc-500 mb-4">{method.description}</p>
                <p className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  {method.value}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">
                  Wyślij wiadomość
                </h2>
                <p className="text-zinc-600">
                  Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-zinc-700">
                      Imię i nazwisko
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Jan Kowalski" 
                      className="h-14 px-4 bg-white border-zinc-200 rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-zinc-700">
                      Telefon
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+48 000 000 000" 
                      className="h-14 px-4 bg-white border-zinc-200 rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jan@przykład.pl" 
                    className="h-14 px-4 bg-white border-zinc-200 rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-zinc-700">
                    Temat
                  </Label>
                  <Input 
                    id="subject" 
                    placeholder="W czym możemy pomóc?" 
                    className="h-14 px-4 bg-white border-zinc-200 rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-zinc-700">
                    Wiadomość
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder="Opisz swoją sprawę..." 
                    className="min-h-[180px] px-4 py-4 bg-white border-zinc-200 rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all resize-none"
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-base tracking-wide shadow-lg shadow-red-600/20"
                  >
                    <span className="flex items-center gap-2">
                      Wyślij wiadomość
                      <Send className="w-4 h-4" />
                    </span>
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">
                  Odwiedź nas
                </h2>
                <p className="text-zinc-600">
                  Zapraszamy do naszych salonów w Warszawie, Piasecznie i Grójcu.
                </p>
              </div>
              
              <div className="space-y-4">
                {LOCATIONS.map((loc, i) => (
                  <motion.div
                    key={loc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    className="group relative bg-white rounded-2xl p-6 border border-zinc-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-red-600 transition-colors">
                          {loc.city}
                        </h3>
                        <p className="text-zinc-500 mb-3">{loc.address}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
                          <a href={`tel:${loc.phone}`} className="flex items-center gap-1 hover:text-red-600 transition-colors">
                            <Phone className="w-4 h-4" />
                            {loc.phone}
                          </a>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {loc.openingHours || "Pn-Pt 10-18"}
                          </span>
                        </div>
                      </div>
                      
                      <Link 
                        href="/salony"
                        className="p-2 rounded-full bg-zinc-100 text-zinc-400 hover:bg-red-100 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Map Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 relative rounded-3xl overflow-hidden h-[300px] bg-zinc-200"
              >
                <iframe 
                  src="https://maps.google.com/maps?q=Warszawa&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  title="Mapa lokalizacji"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-50 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-zinc-900 rounded-3xl p-8 lg:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 font-medium">Szybka rezerwacja</span>
                </div>
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3">
                  Wolisz porozmawiać?
                </h3>
                <p className="text-zinc-400 max-w-md">
                  Zadzwoń do nas i umów wizytę telefonicznie. Nasi konsultanci chętnie pomogą.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="tel:+4822XXXXXXX"
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+48 22 XXX XX XX</span>
                </a>
                <Button className="rounded-full bg-red-600 hover:bg-red-500 px-8 py-6 font-semibold">
                  UMÓW WIZYTĘ
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
