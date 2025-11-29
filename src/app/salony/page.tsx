"use client"

import { LOCATIONS } from "@/lib/constants/locations"
import { Button } from "@/components/ui/button"
import { Phone, Clock, MapPin, Navigation, ArrowRight, Sparkles, Calendar, CheckCircle2 } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"

export default function LocationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedLocation, setSelectedLocation] = useState(0)

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
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
              Lokalizacje
            </span>
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
            >
              Nasze <span className="text-gradient">Salony</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            Zapraszamy do naszych salonów w Warszawie, Piasecznie i Grójcu. 
            W każdym znajdziesz ten sam profesjonalizm i jakość.
          </motion.p>
        </div>
      </section>

      {/* Quick Location Selector */}
      <section className="py-8 bg-white border-b border-zinc-100 sticky top-[72px] z-30 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {LOCATIONS.map((loc, i) => (
              <motion.button
                key={loc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => {
                  setSelectedLocation(i)
                  document.getElementById(`location-${loc.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedLocation === i
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                {loc.city}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Locations List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-24 lg:space-y-32">
            {LOCATIONS.map((loc, index) => (
              <motion.div
                key={loc.id}
                id={`location-${loc.id}`}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Map */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 group">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0 }} 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent('Prooptica ' + loc.city + ' ' + loc.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                      loading="lazy"
                      title={`Mapa ${loc.city}`}
                      className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    
                    {/* Overlay with CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <a 
                        href={loc.map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-zinc-900 font-semibold hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        Wyznacz trasę
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  {/* Header */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
                      Salon {index + 1}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-2">
                      {loc.city}
                    </h2>
                    <p className="text-xl text-zinc-500">{loc.address}</p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-zinc-100">
                      <div className="p-3 rounded-xl bg-red-50 text-red-600">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Telefon</div>
                        <a 
                          href={`tel:${loc.phone}`}
                          className="text-lg font-semibold text-zinc-900 hover:text-red-600 transition-colors"
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-zinc-100">
                      <div className="p-3 rounded-xl bg-red-50 text-red-600">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Godziny otwarcia</div>
                        <div className="text-lg font-semibold text-zinc-900">
                          {loc.openingHours || "Pn-Pt: 10-18, Sob: 10-14"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Badanie wzroku",
                      "Dobór soczewek",
                      "Naprawa okularów",
                      "Konsultacje"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-zinc-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full sm:w-auto rounded-full bg-red-600 hover:bg-red-700 text-white px-8 py-6 font-semibold shadow-lg shadow-red-600/20">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Umów wizytę
                        </span>
                      </Button>
                    </motion.div>
                    
                    <a href={loc.map_link} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto rounded-full border-zinc-300 hover:border-red-500 hover:text-red-600 px-8 py-6 font-semibold"
                      >
                        <span className="flex items-center gap-2">
                          <Navigation className="w-4 h-4" />
                          Jak dojechać
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
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
              className="absolute -top-20 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full text-red-500 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Bezpłatna konsultacja
                </div>
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3">
                  Nie wiesz, który salon wybrać?
                </h3>
                <p className="text-zinc-400 max-w-lg">
                  Zadzwoń do nas — pomożemy wybrać najbliższy salon i umówimy wizytę w dogodnym terminie.
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
                <Link href="/kontakt">
                  <Button className="rounded-full bg-red-600 hover:bg-red-500 px-8 py-6 font-semibold">
                    <span className="flex items-center gap-2">
                      Kontakt
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
