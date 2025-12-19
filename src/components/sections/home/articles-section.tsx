"use client"

import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

const CATEGORIES = [
  { id: "zdrowie", name: "Zdrowie oczu" },
  { id: "technologia", name: "Technologia" },
  { id: "styl", name: "Styl życia" }
]

const ARTICLES = [
  {
    id: 1,
    slug: "jak-dbac-o-wzrok-pracujac-przy-komputerze",
    title: "Jak dbać o wzrok pracując przy komputerze?",
    excerpt: "Praktyczne porady dla osób spędzających dużo czasu przed ekranem. Dowiedz się, jak chronić swoje oczy i unikać zmęczenia wzroku podczas pracy zdalnej.",
    category: "zdrowie",
    readTime: "5 min",
    date: "15 Lis 2024",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800"
  },
  {
    id: 2,
    slug: "trendy-w-oprawach-okularowych-na-2025-rok",
    title: "Trendy w oprawach okularowych na 2025 rok",
    excerpt: "Poznaj najmodniejsze style i kształty opraw, które będą dominować w nadchodzącym sezonie.",
    category: "styl",
    readTime: "4 min",
    date: "12 Lis 2024",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800"
  },
  {
    id: 3,
    slug: "soczewki-progresywne-wszystko-co-musisz-wiedziec",
    title: "Soczewki progresywne - wszystko co musisz wiedzieć",
    excerpt: "Kompletny przewodnik po soczewkach wieloogniskowych. Dla kogo są odpowiednie i jak się do nich przyzwyczaić.",
    category: "technologia",
    readTime: "8 min",
    date: "10 Lis 2024",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800"
  }
]

export function ArticlesSection() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const featuredArticle = ARTICLES[0]
  const sideArticles = ARTICLES.slice(1)

  return (
    <section ref={containerRef} className={cn("relative min-h-0 py-12 sm:py-24 lg:py-32 bg-[#fafafa] overflow-hidden content-auto flex flex-col justify-center", getSectionVisibilityClass(isVisible))}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: NOISE_TEXTURE
      }} />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 sm:gap-6 mb-8 sm:mb-14 lg:mb-20">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 mb-3 sm:mb-5">
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-l from-[#E31F25] to-transparent sm:hidden" />
              <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase whitespace-nowrap">
                Blog & Porady
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
            </div>

            <h2 className="font-display text-[2.25rem] sm:text-[clamp(1.75rem,5vw,3.5rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.03em] text-center sm:text-left pb-4 pr-4">
              Wiedza o zdrowym{" "}
              <span className="relative inline-block">
                <span className="italic text-[#E31F25] font-medium">wzroku</span>
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[6px] sm:h-[8px]" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4" fill="none" stroke="#E31F25" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-8">
            <p className="text-[#666] text-sm sm:text-base leading-relaxed font-light max-w-xs lg:text-right">
              Porady ekspertów, nowości ze świata optyki i inspiracje dla Twoich oczu.
            </p>
          </div>
        </div>

        {/* Content: Featured + List Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Featured Article - Left - visible on mobile now */}
          <div className="block lg:col-span-7 transform-gpu mb-4 lg:mb-0">
            <Link href={`/artykuly/${featuredArticle.slug}`} className="group block relative">
              {/* Artistic frame - Visible on mobile */}
              <div className="block absolute -inset-3 lg:-inset-4 border border-[#E31F25]/20 pointer-events-none" />
              
              <div className="relative overflow-hidden bg-white shadow-lg">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                    <Badge className="bg-emerald-500/90 text-white border-0 text-[10px] tracking-wider uppercase px-3 py-1">
                      {CATEGORIES.find(c => c.id === featuredArticle.category)?.name}
                    </Badge>
                  </div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2 text-xs sm:text-sm text-white/80">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-white leading-tight group-hover:text-[#E31F25] transition-colors duration-200">
                      {featuredArticle.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 lg:p-8">
                  <p className="text-[#5a5a5a] text-sm sm:text-base leading-relaxed font-light mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-[#1a1a1a] uppercase font-medium group-hover:text-[#E31F25] transition-colors duration-200">
                      Czytaj artykuł
                    </span>
                    <div className="w-8 sm:w-10 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-12 transition-all duration-200" />
                    <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Articles List - Full width on mobile, side on desktop */}
          <div className="lg:col-span-5 flex flex-col col-span-full sm:col-auto mt-4 lg:mt-0">
            
            {/* Section label */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BookOpen className="w-4 h-4 text-[#E31F25]" />
              <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase font-medium">
                Najnowsze artykuły
              </span>
            </div>
            
            {/* Article list - show all articles on mobile */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6">
              {sideArticles.map((article, index) => (
                <div key={article.id} className="transform-gpu">
                  <Link href={`/artykuly/${article.slug}`} className="group flex gap-4 sm:gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0 overflow-hidden shadow-sm">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#1a1a1a]/10 group-hover:bg-transparent transition-colors duration-200" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 py-1">
                      {/* Category & Date */}
                      <div className="flex items-center gap-3 mb-1.5">
                        <Badge className={`border-0 text-[8px] tracking-wider uppercase px-2 py-0.5 ${
                          article.category === 'technologia'
                            ? 'bg-blue-500/90 text-white'
                            : article.category === 'styl'
                            ? 'bg-[#E31F25]/90 text-white'
                            : 'bg-emerald-500/90 text-white'
                        }`}>
                          {CATEGORIES.find(c => c.id === article.category)?.name}
                        </Badge>
                        <span className="text-[10px] text-[#999]">{article.date}</span>
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-display text-base sm:text-base lg:text-lg font-medium text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#E31F25] transition-colors duration-200 line-clamp-2">
                        {article.title}
                      </h4>
                      
                      {/* Read time & arrow */}
                      <div className="flex items-center gap-2 text-[#999]">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px]">{article.readTime}</span>
                        <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#E31F25] transition-all duration-200 hidden sm:block" />
                      </div>
                    </div>
                  </Link>
                  
                  {/* Divider */}
                  {index < sideArticles.length - 1 && (
                    <div className="mt-4 sm:mt-6 h-px bg-[#e5e5e5]" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-[#e5e5e5]">
              <Link 
                href="/artykuly"
                className="group inline-flex items-center gap-3 sm:gap-4"
              >
                <span className="text-[#1a1a1a] text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                  Wszystkie artykuły
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 sm:w-10 h-px bg-[#1a1a1a]/30 group-hover:bg-[#E31F25] group-hover:w-10 sm:group-hover:w-14 transition-all duration-200" />
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-[#1a1a1a]/50 group-hover:text-[#E31F25] group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
