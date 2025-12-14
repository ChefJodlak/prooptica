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
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">

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

