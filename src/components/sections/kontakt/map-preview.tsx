"use client"

import { motion } from "framer-motion"

interface MapPreviewProps {
  isInView: boolean
}

export function MapPreview({ isInView }: MapPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-10 relative h-[280px] overflow-hidden"
    >
      {/* Artistic frame */}
      <div className="absolute -inset-2 border border-[#C4A77D]/20 pointer-events-none z-10" />
      <div className="absolute -inset-4 border border-[#C4A77D]/10 pointer-events-none z-10" />
      
      <iframe 
        src="https://maps.google.com/maps?q=Warszawa&t=&z=10&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-700"
        loading="lazy"
        title="Mapa lokalizacji"
      />
      
      {/* Elegant corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-20" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-20" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-20" />
    </motion.div>
  )
}

