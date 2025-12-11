"use client"

import { motion } from "framer-motion"
import { Navigation } from "lucide-react"
import Image from "next/image"
import type { Location } from "@/lib/constants/locations"

interface LocationImageProps {
  location: Location
  index: number
  isInView: boolean
}

export function LocationImage({ location, index, isInView }: LocationImageProps) {
  return (
    <div className="relative">
      {/* Artistic frames */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/20 pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        className="absolute -inset-6 lg:-inset-8 border border-[#E31F25]/10 pointer-events-none" 
      />
      
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden group">
        <Image
          src={location.image}
          alt={`Salon ${location.city}`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-[#1a1a1a]/10" />
        
        {/* Location badge */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-sm">
            <span className="text-[#E31F25] text-[9px] font-medium tracking-[0.3em] uppercase">
              Salon {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
        
        {/* CTA overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <a 
            href={location.map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#1a1a1a] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#E31F25] transition-all duration-300"
          >
            <Navigation className="w-4 h-4" />
            Wyznacz trasę
          </a>
        </div>
      </div>
      
      {/* Map below image */}
      <div className="relative mt-4 aspect-[16/9] overflow-hidden">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }} 
          src={`https://maps.google.com/maps?q=${encodeURIComponent('Prooptica ' + location.city + ' ' + location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
          loading="lazy"
          title={`Mapa ${location.city}`}
          className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Elegant corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#E31F25]/40 pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#E31F25]/40 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#E31F25]/40 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#E31F25]/40 pointer-events-none" />
      </div>
    </div>
  )
}

