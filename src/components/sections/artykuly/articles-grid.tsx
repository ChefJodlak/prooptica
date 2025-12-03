"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { Article } from "./types"
import { CATEGORIES } from "./constants"
import { containerVariants } from "./animation-variants"
import { ArticleCard } from "./article-card"

interface ArticlesGridProps {
  articles: Article[]
  selectedCategory: string
  isInView: boolean
}

export function ArticlesGrid({ articles, selectedCategory, isInView }: ArticlesGridProps) {
  if (articles.length === 0) {
    return (
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 border border-[#C4A77D]/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#C4A77D]" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[#1a1a1a] mb-3">Brak artykułów</h3>
            <p className="text-[#737373] font-light">Spróbuj innych kryteriów wyszukiwania</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="w-8 h-px bg-[#C4A77D] origin-left" 
            />
            <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#1a1a1a] tracking-[-0.02em]">
              {selectedCategory === "all" ? "Wszystkie artykuły" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
          </div>
          <span className="text-[#999] text-sm font-light">
            {articles.length} {articles.length === 1 ? 'artykuł' : 'artykułów'}
          </span>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

