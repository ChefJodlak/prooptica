"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CATEGORIES } from "./constants"

interface FilterBarProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}: FilterBarProps) {
  return (
    <section className="py-6 bg-white border-b border-[#e5e5e5] sticky top-[88px] z-30 backdrop-blur-lg bg-white/95">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-medium whitespace-nowrap transition-all duration-300 text-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#f5f5f5] text-[#5a5a5a] hover:bg-[#e5e5e5]'
                }`}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <Input
              type="text"
              placeholder="Szukaj artykułu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11 bg-[#f5f5f5] border-0 focus:ring-2 focus:ring-[#C4A77D]/30 text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

