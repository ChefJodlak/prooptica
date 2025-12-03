"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BRAND_CATEGORIES } from "./constants"

interface FiltersSectionProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function FiltersSection({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: FiltersSectionProps) {
  return (
    <section className="py-8 border-b border-[#e0ded8] sticky top-[88px] z-30 backdrop-blur-lg bg-white/95">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-8 px-8 lg:mx-0 lg:px-0 scrollbar-hide">
            {BRAND_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-5 py-2.5 font-medium whitespace-nowrap transition-all duration-300 text-[11px] tracking-[0.1em] uppercase ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#F8F7F4] text-[#5a5a5a] hover:bg-[#e0ded8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
            <Input
              type="text"
              placeholder="Szukaj marki..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-[#F8F7F4] border-[#e0ded8] rounded-none focus:ring-1 focus:ring-[#C4A77D] focus:border-[#C4A77D] font-light"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

