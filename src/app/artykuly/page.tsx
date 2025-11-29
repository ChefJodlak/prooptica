"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Search, Clock, ArrowRight, Tag, ChevronRight, Sparkles, Eye, Monitor, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const CATEGORIES = [
  { id: "all", name: "Wszystkie", icon: null },
  { id: "zdrowie", name: "Zdrowie oczu", icon: Eye },
  { id: "technologia", name: "Technologia", icon: Monitor },
  { id: "styl", name: "Styl życia", icon: Sun }
]

const ARTICLES = [
  {
    id: 1,
    title: "Jak dbać o wzrok pracując przy komputerze?",
    excerpt: "Praktyczne porady dla osób spędzających dużo czasu przed ekranem. Dowiedz się, jak chronić swoje oczy.",
    category: "zdrowie",
    readTime: "5 min",
    date: "15 Lis 2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800"
  },
  {
    id: 2,
    title: "Trendy w oprawach okularowych na 2025 rok",
    excerpt: "Poznaj najmodniejsze style i kształty opraw, które będą dominować w nadchodzącym sezonie.",
    category: "styl",
    readTime: "4 min",
    date: "12 Lis 2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800"
  },
  {
    id: 3,
    title: "Soczewki progresywne - wszystko co musisz wiedzieć",
    excerpt: "Kompletny przewodnik po soczewkach wieloogniskowych. Dla kogo są odpowiednie i jak się do nich przyzwyczaić.",
    category: "technologia",
    readTime: "8 min",
    date: "10 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800"
  },
  {
    id: 4,
    title: "Ochrona przed niebieskim światłem - fakty i mity",
    excerpt: "Czy filtry blue light naprawdę działają? Rozwiewamy wątpliwości i przedstawiamy naukowe dowody.",
    category: "zdrowie",
    readTime: "6 min",
    date: "8 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800"
  },
  {
    id: 5,
    title: "Jak wybrać idealne okulary przeciwsłoneczne?",
    excerpt: "Nie tylko styl, ale przede wszystkim ochrona. Na co zwrócić uwagę przy wyborze okularów na lato.",
    category: "styl",
    readTime: "5 min",
    date: "5 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800"
  },
  {
    id: 6,
    title: "Innowacje ZEISS w technologii soczewek",
    excerpt: "Przegląd najnowszych osiągnięć technologicznych niemieckiego lidera w optyce precyzyjnej.",
    category: "technologia",
    readTime: "7 min",
    date: "1 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"
  }
]

export default function ArticlesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-emerald-500" />
            <span className="text-emerald-500 font-semibold tracking-[0.2em] uppercase text-sm">
              Blog
            </span>
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
            >
              Artykuły <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">&amp; Porady</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            Baza wiedzy o zdrowiu Twoich oczu. Porady ekspertów, nowości ze świata optyki i inspiracje.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-zinc-100 sticky top-[72px] z-30 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat.icon && <cat.icon className="w-4 h-4" />}
                  {cat.name}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Szukaj artykułu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-zinc-100 border-0 rounded-full focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && selectedCategory === "all" && !searchQuery && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900">
                Wyróżnione
              </h2>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 px-4 py-1.5">
                <Sparkles className="w-4 h-4 mr-2" />
                Polecane
              </Badge>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-zinc-50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <Badge className="bg-white/90 text-zinc-900 border-0 mb-4">
                        {CATEGORIES.find(c => c.id === article.category)?.name}
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-zinc-300 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/artykuly/${article.id}`} className="absolute inset-0" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Brak artykułów</h3>
              <p className="text-zinc-500">Spróbuj innych kryteriów wyszukiwania</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900">
                  {selectedCategory === "all" ? "Wszystkie artykuły" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-zinc-500">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'artykuł' : 'artykułów'}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedCategory !== "all" ? filteredArticles : regularArticles).map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className={`border-0 ${
                          article.category === 'zdrowie' 
                            ? 'bg-emerald-50 text-emerald-700'
                            : article.category === 'technologia'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {CATEGORIES.find(c => c.id === article.category)?.name}
                        </Badge>
                        <span className="text-sm text-zinc-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-zinc-500 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <span className="text-sm text-zinc-400">{article.date}</span>
                        <span className="text-sm font-medium text-emerald-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Czytaj więcej
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    <Link href={`/artykuly/${article.id}`} className="absolute inset-0" />
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 lg:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[60px]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3">
                  Nie przegap nowych artykułów
                </h3>
                <p className="text-emerald-100 max-w-md">
                  Zapisz się do newslettera i otrzymuj powiadomienia o nowych wpisach na blogu.
                </p>
              </div>
              
              <div className="flex gap-3 w-full lg:w-auto max-w-md">
                <Input 
                  type="email" 
                  placeholder="Twój email" 
                  className="h-14 px-5 bg-white/10 border-white/20 rounded-full text-white placeholder:text-white/60 focus:border-white focus:ring-0"
                />
                <Button className="h-14 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 px-6 font-semibold">
                  Zapisz się
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
