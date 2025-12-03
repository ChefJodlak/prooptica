"use client"

import { motion } from "framer-motion"
import { containerVariants } from "./animation-variants"
import { BrandCard } from "./brand-card"
import type { Brand } from "./types"

interface BrandsGridProps {
  brands: Brand[]
  isInView: boolean
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="font-display text-2xl font-medium text-[#1a1a1a] mb-2">Brak wyników</h3>
      <p className="text-[#737373] font-light">Spróbuj innych kryteriów wyszukiwania</p>
    </div>
  )
}

export function BrandsGrid({ brands, isInView }: BrandsGridProps) {
  if (brands.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
          <EmptyState />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

