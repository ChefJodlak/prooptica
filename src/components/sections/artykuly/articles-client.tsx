"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  HeroSection,
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

  const featuredArticles = articles.filter(a => a.featured)
  const regularArticles = articles.filter(a => !a.featured)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">

      <HeroSection />

      {featuredArticles.length > 0 && (
        <FeaturedArticlesSection
          articles={featuredArticles}
          isInView={isInView}
        />
      )}

      <ArticlesGrid
        articles={regularArticles}
        selectedCategory="all"
        isInView={isInView}
      />

      <NewsletterCta isInView={isInView} />
    </div>
  )
}

