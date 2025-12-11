"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Article } from "./types"
import { CATEGORIES } from "./constants"
import { fadeUpVariants } from "./animation-variants"
import { getCategoryStyle } from "./utils"

interface FeaturedArticleCardProps {
  article: Article
}

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="group relative"
    >
      {/* Artistic frame */}
      <div className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/15 pointer-events-none" />
      
      <Link href={`/artykuly/${article.id}`} className="block bg-white overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-[#1a1a1a]/20 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <Badge className={`${getCategoryStyle(article.category)} border mb-4 text-[9px] tracking-wider uppercase px-3 py-1`}>
              {CATEGORIES.find(c => c.id === article.category)?.name}
            </Badge>
            <h3 className="font-display text-xl lg:text-2xl font-medium text-white mb-3 group-hover:text-[#E31F25] transition-colors duration-300 leading-tight">
              {article.title}
            </h3>
            <p className="text-white/70 mb-4 line-clamp-2 text-sm font-light">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

