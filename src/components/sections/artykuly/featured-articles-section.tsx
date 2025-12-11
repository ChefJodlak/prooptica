"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { Article } from "./types"
import { containerVariants } from "./animation-variants"
import { FeaturedArticleCard } from "./featured-article-card"

interface FeaturedArticlesSectionProps {
  articles: Article[]
  isInView: boolean
}

export function FeaturedArticlesSection({ articles, isInView }: FeaturedArticlesSectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <BookOpen className="w-5 h-5 text-[#E31F25]" />
            <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#1a1a1a] tracking-[-0.02em]">
              Wyróżnione
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] text-[#E31F25] uppercase font-medium">
              Polecane
            </span>
            <div className="w-6 h-px bg-[#E31F25]" />
          </div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {articles.map((article) => (
            <FeaturedArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

