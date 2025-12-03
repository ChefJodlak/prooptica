"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  NOISE_TEXTURE,
  HeroSection,
  ContactMethodsSection,
  FormAndLocationsSection,
  CtaBanner
} from "@/components/sections/kontakt"
import { ContactPageSchema } from "@/components/seo/schema-org"

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      <ContactPageSchema />
      {/* Subtle texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: NOISE_TEXTURE }} 
      />
      
      <HeroSection />
      <ContactMethodsSection isInView={isInView} />
      <FormAndLocationsSection isInView={isInView} />
      <CtaBanner isInView={isInView} />
    </div>
  )
}
