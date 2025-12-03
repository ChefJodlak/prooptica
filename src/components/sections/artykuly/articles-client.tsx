"use client"

import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import {
  HeroSection,
  FilterBar,
  FeaturedArticlesSection,
  ArticlesGrid,
  NewsletterCta,
} from "@/components/sections/artykuly"
import { ArticlesPageSchema } from "@/components/seo/schema-org"
import type { Article } from "./types"

interface ArticlesClientProps {
  articles: Article[]
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  const showFeatured = featuredArticles.length > 0 && selectedCategory === "all" && !searchQuery
  const articlesToShow = searchQuery || selectedCategory !== "all" ? filteredArticles : regularArticles

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafa]">
      <ArticlesPageSchema />
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <HeroSection />

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {showFeatured && (
        <FeaturedArticlesSection 
          articles={featuredArticles} 
          isInView={isInView} 
        />
      )}

      <ArticlesGrid
        articles={articlesToShow}
        selectedCategory={selectedCategory}
        isInView={isInView}
      />

      <NewsletterCta isInView={isInView} />
    </div>
  )
}

