"use client"

import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "zdrowie", name: "Zdrowie oczu" },
  { id: "technologia", name: "Technologia" },
  { id: "styl", name: "Styl życia" }
]

const ARTICLES = [
  {
    id: 1,
    title: "Jak dbać o wzrok pracując przy komputerze?",
    excerpt: "Praktyczne porady dla osób spędzających dużo czasu przed ekranem. Dowiedz się, jak chronić swoje oczy i unikać zmęczenia wzroku podczas pracy zdalnej.",
    category: "zdrowie",
    readTime: "5 min",
    date: "15 Lis 2024",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800"
  },
  {
    id: 2,
    title: "Trendy w oprawach okularowych na 2025 rok",
    excerpt: "Poznaj najmodniejsze style i kształty opraw, które będą dominować w nadchodzącym sezonie.",
    category: "styl",
    readTime: "4 min",
    date: "12 Lis 2024",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800"
  },
  {
    id: 3,
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
    <section ref={containerRef} className={cn("relative min-h-[calc(100vh-88px)] bg-[#fafafa] overflow-hidden flex flex-col justify-center py-10 sm:py-12 content-auto", getSectionVisibilityClass(isVisible))}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-6 sm:w-8 h-px bg-[#C4A77D]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] text-[#C4A77D] uppercase font-medium">
                Blog & Porady
              </span>
            </div>

            <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
              Wiedza o zdrowym{" "}
              <span className="relative inline-block">
                <span className="italic text-[#C4A77D] font-medium">wzroku</span>
                <svg className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-1.5 sm:h-2 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-8">
            <p className="text-[#666] text-sm sm:text-base leading-relaxed font-light max-w-xs lg:text-right">
              Porady ekspertów, nowości ze świata optyki i inspiracje dla Twoich oczu.
            </p>
            <Link 
              href="/artykuly"
              className="group inline-flex items-center gap-3"
            >
              <span className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-[#1a1a1a] uppercase font-medium">
                Wszystkie
              </span>
              <div className="w-5 sm:w-6 h-px bg-[#1a1a1a] group-hover:w-8 sm:group-hover:w-10 group-hover:bg-[#C4A77D] transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Content: Featured + List Layout */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Featured Article - Left */}
          <div className="lg:col-span-7 transform-gpu">
            <Link href={`/artykuly/${featuredArticle.id}`} className="group block relative">
              {/* Artistic frame - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -inset-3 lg:-inset-4 border border-[#C4A77D]/20 pointer-events-none" />
              
              <div className="relative overflow-hidden bg-white">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                    <Badge className="bg-emerald-500/90 text-white border-0 text-[9px] sm:text-[10px] tracking-wider uppercase px-2 sm:px-3 py-0.5 sm:py-1">
                      {CATEGORIES.find(c => c.id === featuredArticle.category)?.name}
                    </Badge>
                  </div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-white/70">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-display font-medium text-white leading-tight group-hover:text-[#C4A77D] transition-colors duration-200">
                      {featuredArticle.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <p className="text-[#5a5a5a] text-sm sm:text-base leading-relaxed font-light mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-[#1a1a1a] uppercase font-medium group-hover:text-[#C4A77D] transition-colors duration-200">
                      Czytaj artykuł
                    </span>
                    <div className="w-6 sm:w-8 h-px bg-[#1a1a1a]/30 group-hover:bg-[#C4A77D] group-hover:w-10 sm:group-hover:w-12 transition-all duration-200" />
                    <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C4A77D] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Articles List - Right */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Section label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#C4A77D]" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#999] uppercase font-medium">
                Więcej artykułów
              </span>
            </div>
            
            {/* Article list */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6">
              {sideArticles.map((article, index) => (
                <div key={article.id} className="transform-gpu">
                  <Link href={`/artykuly/${article.id}`} className="group flex gap-3 sm:gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0 overflow-hidden">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#1a1a1a]/10 group-hover:bg-transparent transition-colors duration-200" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 py-0.5 sm:py-1">
                      {/* Category & Date */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <Badge className={`border-0 text-[7px] sm:text-[8px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 ${
                          article.category === 'technologia'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                        }`}>
                          {CATEGORIES.find(c => c.id === article.category)?.name}
                        </Badge>
                        <span className="text-[9px] sm:text-[10px] text-[#999]">{article.date}</span>
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-display text-sm sm:text-base lg:text-lg font-medium text-[#1a1a1a] leading-snug mb-1.5 sm:mb-2 group-hover:text-[#C4A77D] transition-colors duration-200 line-clamp-2">
                        {article.title}
                      </h4>
                      
                      {/* Read time & arrow */}
                      <div className="flex items-center gap-2 text-[#999]">
                        <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                        <span className="text-[10px] sm:text-xs">{article.readTime}</span>
                        <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#C4A77D] transition-all duration-200 hidden sm:block" />
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
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#e5e5e5]">
              <Link 
                href="/artykuly"
                className="group inline-flex items-center gap-3 sm:gap-4"
              >
                <span className="text-[#1a1a1a] text-[10px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Zobacz wszystkie artykuły
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-px bg-[#1a1a1a]/30 group-hover:bg-[#C4A77D] group-hover:w-12 sm:group-hover:w-14 transition-all duration-200" />
                  <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C4A77D] group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
