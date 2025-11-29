"use client"

import { LOCATIONS, Location } from "@/lib/constants/locations"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, Phone, Clock, ExternalLink, Calendar } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

function LocationCard({ 
  location, 
  isSelected, 
  onClick,
  index 
}: { 
  location: Location
  isSelected: boolean
  onClick: () => void
  index: number
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      onClick={onClick}
      className={cn(
        "w-full text-left overflow-hidden transition-all duration-500 group",
        isSelected 
          ? "ring-1 ring-[#E31F25]" 
          : "ring-1 ring-[#E5E5E5] hover:ring-[#D4D4D4]"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
        <Image
          src={location.image}
          alt={`Salon ${location.city}`}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isSelected ? "scale-105" : "group-hover:scale-105"
          )}
        />
        
        {/* Location badge */}
        <div className={cn(
          "absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors duration-300",
          isSelected 
            ? "bg-[#E31F25] text-white" 
            : "bg-white text-[#0A0A0A]"
        )}>
          <MapPin className="w-3 h-3" />
          {location.city}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 bg-white">
        <p className="text-sm text-[#737373] mb-3">{location.address}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#A3A3A3] tracking-wider">{location.postal} {location.city}</span>
          <ArrowRight className={cn(
            "w-4 h-4 transition-all duration-300",
            isSelected 
              ? "text-[#E31F25] translate-x-0" 
              : "text-[#D4D4D4] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          )} />
        </div>
      </div>
    </motion.button>
  )
}

function EmbeddedMap({ selectedLocation }: { selectedLocation: Location }) {
  const fallbackUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${selectedLocation.address}, ${selectedLocation.postal} ${selectedLocation.city}, Poland`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="relative w-full h-full">
      <iframe
        src={fallbackUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa - ${selectedLocation.city}`}
        className="w-full h-full"
      />
      
      {/* Open in Maps button */}
      <a
        href={selectedLocation.map_link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-white text-[#0A0A0A] text-xs font-medium tracking-wider uppercase hover:bg-[#E31F25] hover:text-white transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        Google Maps
      </a>
    </div>
  )
}

export function LocationsPreview() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedId, setSelectedId] = useState<string>(LOCATIONS[0].id)
  
  const selectedLocation = LOCATIONS.find(loc => loc.id === selectedId) || LOCATIONS[0]

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 bg-white overflow-hidden">
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E5E5]" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-8 bg-[#E31F25]" />
            <span className="text-xs font-medium tracking-[0.3em] text-[#E31F25] uppercase">
              Nasze Salony
            </span>
            <div className="h-px w-8 bg-[#E31F25]" />
          </motion.div>
          
          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-display-md text-[#0A0A0A]"
            >
              Znajdź nas
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-display text-display-md text-[#A3A3A3]"
            >
              blisko siebie
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#737373] text-lg mt-8 max-w-xl mx-auto"
          >
            Cztery salony w dogodnych lokalizacjach. Ta sama jakość obsługi wszędzie.
          </motion.p>
        </div>

        {/* Main Content - Two Column */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Location Cards - Left */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {LOCATIONS.map((location, index) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isSelected={selectedId === location.id}
                  onClick={() => setSelectedId(location.id)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Map & Details - Right */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="ring-1 ring-[#E5E5E5] bg-white h-full flex flex-col">
              
              {/* Map */}
              <div className="relative flex-1 min-h-[350px] lg:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <EmbeddedMap selectedLocation={selectedLocation} />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Location Details Bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 lg:p-8 border-t border-[#E5E5E5]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Location Info */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-14 h-14 overflow-hidden flex-shrink-0 ring-1 ring-[#E5E5E5]">
                        <Image
                          src={selectedLocation.image}
                          alt={selectedLocation.city}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-xl lg:text-2xl text-[#0A0A0A] mb-1">
                          {selectedLocation.city}
                        </h3>
                        <p className="text-[#737373] text-sm">
                          {selectedLocation.address}
                        </p>
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <a 
                        href={`tel:${selectedLocation.phone}`}
                        className="flex items-center gap-2 text-[#525252] hover:text-[#E31F25] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#E31F25]" />
                        {selectedLocation.phone}
                      </a>
                      <div className="hidden sm:flex items-center gap-2 text-[#525252]">
                        <Clock className="w-4 h-4 text-[#E31F25]" />
                        <span>Pn-Pt 10-18</span>
                      </div>
                      <Button className="bg-[#E31F25] text-white rounded-none font-medium tracking-wider uppercase text-xs hover:bg-[#c91b20] transition-colors px-6 h-11">
                        <Calendar className="w-4 h-4 mr-2" />
                        Umów wizytę
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
