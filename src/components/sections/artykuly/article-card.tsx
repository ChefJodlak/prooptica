"use client"

import { motion } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { SanityArticle, getSanityImageUrl } from "@/lib/sanity"
import { CATEGORIES } from "./constants"
import { fadeUpVariants } from "./animation-variants"
import { getCategoryStyle } from "./utils"

interface ArticleCardProps {
  article: SanityArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = getSanityImageUrl(article.cover)
  const categoryName = CATEGORIES.find(c => c.id === article.category)?.name || article.category || 'Artykuł'
  const date = new Date(article.publishedAt || article._createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <motion.article
      variants={fadeUpVariants}
      className="group"
    >
      <Link href={`/artykuly/${article.slug?.current}`} className="block bg-white hover:shadow-lg hover:shadow-[#1a1a1a]/5 transition-all duration-500 rounded-lg overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          {imageUrl && (
            <img 
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-[#1a1a1a]/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={`${getCategoryStyle(article.category || 'zdrowie')} border text-[8px] tracking-wider uppercase px-2.5 py-0.5`}>
              {categoryName}
            </Badge>
            {article.readTime && (
              <span className="text-[11px] text-[#999] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            )}
          </div>
          
          <h3 className="font-display text-lg font-medium text-[#1a1a1a] mb-3 group-hover:text-[#E31F25] transition-colors duration-300 line-clamp-2 leading-snug">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-[#737373] text-sm mb-5 line-clamp-2 font-light leading-relaxed">
              {article.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
            <span className="text-[11px] text-[#999]">{date}</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-medium text-[#E31F25] tracking-[0.1em] uppercase">
                Czytaj
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E31F25]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
