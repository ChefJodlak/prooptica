"use client"

import { motion } from "framer-motion"
import { Clock, Calendar, Facebook, ArrowRight, BookOpen } from "lucide-react"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SanityArticle, getSanityImageUrl } from "@/lib/sanity"
import { NOISE_TEXTURE } from "@/lib/constants/ui"
import { CATEGORIES } from "./constants"

interface ArticleContentProps {
  article: SanityArticle
  featuredArticles: SanityArticle[]
}

// Portable Text components for rendering rich content
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl font-medium text-[#1a1a1a] mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-medium text-[#1a1a1a] mb-5 mt-10 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-4 mt-8 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg font-medium text-[#1a1a1a] mb-3 mt-6 leading-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[#4a4a4a] text-base leading-[1.85] mb-5 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#E31F25] pl-5 my-6 italic text-[#555] text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 mb-5 space-y-2 text-[#4a4a4a] text-base font-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 space-y-2 text-[#4a4a4a] text-base font-light">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.75]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#1a1a1a]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#E31F25] hover:underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = getSanityImageUrl(value)
      if (!imageUrl) return null
      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || "Zdjęcie artykułu"}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-[#999] mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// Hero Section Component - Matching o-nas page styling
function HeroSection({ article }: { article: SanityArticle }) {
  const categoryName = CATEGORIES.find(c => c.id === article.category)?.name || article.category || 'Artykuł'
  const publishedDate = new Date(article.publishedAt || article._createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#1a1a1a] overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />

      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(227,31,37,0.3) 0%, rgba(227,31,37,0) 70%)",
          willChange: "transform"
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl">
          {/* Category Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-5 mb-6"
          >
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              {categoryName}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
          </motion.div>

          {/* Article Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,9vw,6.5rem)] text-white leading-none tracking-[-0.03em] font-medium"
            >
              {article.title}
            </motion.h1>
          </div>

          {/* Article Excerpt/Subtitle */}
          {article.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-lg lg:text-xl leading-[1.8] mb-8 max-w-xl font-light"
            >
              {article.excerpt}
            </motion.p>
          )}

          {/* Meta information - Date and Read Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-6 text-white/50"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-light">{publishedDate}</span>
            </div>
            {article.readTime && (
              <>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-light">{article.readTime} czytania</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Featured Article Card - Compact horizontal card for sidebar
function FeaturedArticleCard({ article, isLast }: { article: SanityArticle; isLast: boolean }) {
  const imageUrl = getSanityImageUrl(article.cover)
  const categoryName = CATEGORIES.find(c => c.id === article.category)?.name || article.category || 'Artykuł'
  const date = new Date(article.publishedAt || article._createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technologia':
        return 'bg-blue-500/90 text-white'
      case 'styl':
        return 'bg-[#E31F25]/90 text-white'
      default:
        return 'bg-emerald-500/90 text-white'
    }
  }

  return (
    <div className="group">
      <Link href={`/artykuly/${article.slug?.current}`} className="block">
        {/* Horizontal card layout */}
        <div className="flex gap-4">
          {/* Thumbnail - Square format */}
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#e5e5e5]">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-[#1a1a1a]/5 group-hover:bg-transparent transition-colors duration-200" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-0.5">
            {/* Category & Date row */}
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className={`border-0 text-[8px] tracking-wider uppercase px-1.5 py-0.5 ${getCategoryColor(article.category || 'zdrowie')}`}>
                {categoryName}
              </Badge>
              <span className="text-[10px] text-[#999]">{date}</span>
            </div>

            {/* Title - 2 lines max */}
            <h4 className="font-display text-sm font-medium text-[#1a1a1a] leading-snug group-hover:text-[#E31F25] transition-colors duration-200 line-clamp-2">
              {article.title}
            </h4>

            {/* Read time with arrow */}
            {article.readTime && (
              <div className="flex items-center gap-1.5 mt-2 text-[#999]">
                <Clock className="w-3 h-3" />
                <span className="text-[10px]">{article.readTime}</span>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#E31F25] transition-all duration-200" />
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Divider */}
      {!isLast && <div className="mt-4 h-px bg-[#e5e5e5]" />}
    </div>
  )
}

// Share on Facebook Button
function ShareButton({ article }: { article: SanityArticle }) {
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/artykuly/${article.slug?.current}`
    : ''

  const handleShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="pt-10 mt-10 border-t border-[#e5e5e5]">
      <div className="flex flex-col gap-4">
        <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase font-medium">
          Udostępnij artykuł
        </span>
        <button
          onClick={handleShare}
          className="w-fit hover:opacity-70 hover:scale-110 transition-all duration-200"
          aria-label="Udostępnij na Facebook"
        >
          <Facebook className="w-7 h-7 text-[#1877F2]" fill="#1877F2" />
        </button>
      </div>
    </div>
  )
}

// Main Article Content Component
export function ArticleContent({ article, featuredArticles }: ArticleContentProps) {
  const coverImageUrl = getSanityImageUrl(article.cover)

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <HeroSection article={article} />

      {/* Content Section */}
      <section className="relative py-16 lg:py-24 bg-[#fafafa]">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />

        <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative">
          {/* Two Column Layout: Article + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">

            {/* Main Article Content - Left Column */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Cover Image with artistic frame */}
              {coverImageUrl && (
                <div className="mb-10 lg:mb-14">
                  <div className="relative">
                    {/* Artistic red frame border */}
                    <div className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/20 pointer-events-none" />
                    <div className="aspect-[16/9] overflow-hidden shadow-xl">
                      <img
                        src={coverImageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content with Portable Text */}
              {article.content && (
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#1a1a1a] prose-p:text-[#4a4a4a] prose-p:leading-[1.85] prose-p:font-light">
                  <PortableText
                    value={article.content as never[]}
                    components={portableTextComponents}
                  />
                </div>
              )}

              {/* Share Button */}
              <ShareButton article={article} />
            </motion.article>

            {/* Sidebar - Right Column (Fixed 320px) */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#E31F25]" />
                  <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase font-medium">
                    Polecane artykuły
                  </span>
                </div>

                {/* Featured Articles List */}
                {featuredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {featuredArticles.map((featuredArticle, index) => (
                      <FeaturedArticleCard
                        key={featuredArticle._id}
                        article={featuredArticle}
                        isLast={index === featuredArticles.length - 1}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-[#999] text-sm">
                    Brak polecanych artykułów
                  </p>
                )}

                {/* CTA to all articles */}
                <div className="pt-4 border-t border-[#e5e5e5]">
                  <Link
                    href="/artykuly"
                    className="group inline-flex items-center gap-4"
                  >
                    <span className="text-[#1a1a1a] text-[11px] font-medium tracking-[0.2em] uppercase">
                      Wszystkie artykuły
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-14 transition-all duration-200" />
                      <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  )
}
