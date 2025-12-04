"use client"

import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import {
  HeroSection,
  FiltersSection,
  BrandsGrid,
  PartnersSection,
  CtaSection,
  BRANDS,
  NOISE_TEXTURE_BG
} from "@/components/sections/marki"

export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBrands = BRANDS.filter(brand => {
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      {/* Subtle texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: NOISE_TEXTURE_BG }} 
      />
      
      <HeroSection />
      
      <FiltersSection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <BrandsGrid brands={filteredBrands} isInView={isInView} />
      
      <PartnersSection isInView={isInView} />
      
      <CtaSection isInView={isInView} />
    </div>
  )
}
