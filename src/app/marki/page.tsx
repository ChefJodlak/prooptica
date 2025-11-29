"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Search, Filter, ArrowUpRight, Sparkles, Award, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const BRAND_CATEGORIES = [
  { id: "all", name: "Wszystkie" },
  { id: "luxury", name: "Luksusowe" },
  { id: "premium", name: "Premium" },
  { id: "sport", name: "Sportowe" },
  { id: "lenses", name: "Soczewki" }
]

const BRANDS = [
  { name: "Ray-Ban", category: "premium", description: "Kultowa marka okularów znana na całym świecie", tier: "Premium" },
  { name: "Oakley", category: "sport", description: "Innowacyjne okulary sportowe najwyższej jakości", tier: "Sport" },
  { name: "Prada", category: "luxury", description: "Włoski dom mody z elegancką linią okularów", tier: "Luksusowa" },
  { name: "Tom Ford", category: "luxury", description: "Ekskluzywne oprawy dla wymagających klientów", tier: "Luksusowa" },
  { name: "Gucci", category: "luxury", description: "Ikoniczna marka z bogatą historią", tier: "Luksusowa" },
  { name: "Versace", category: "luxury", description: "Odważny włoski design premium", tier: "Luksusowa" },
  { name: "Persol", category: "premium", description: "Ręcznie wykonywane okulary z Włoch", tier: "Premium" },
  { name: "Dolce & Gabbana", category: "luxury", description: "Elegancja i włoski temperament", tier: "Luksusowa" },
  { name: "Burberry", category: "luxury", description: "Brytyjska elegancja i tradycja", tier: "Luksusowa" },
  { name: "Armani", category: "luxury", description: "Minimalistyczny luksus z Mediolanu", tier: "Luksusowa" },
  { name: "ZEISS", category: "lenses", description: "Światowy lider technologii optycznej", tier: "Technologia" },
  { name: "HOYA", category: "lenses", description: "Japońska precyzja w soczewkach", tier: "Technologia" },
  { name: "Essilor", category: "lenses", description: "Innowacyjne rozwiązania dla wzroku", tier: "Technologia" },
  { name: "Carrera", category: "sport", description: "Sportowy styl i funkcjonalność", tier: "Sport" },
  { name: "Boss", category: "premium", description: "Biznesowa elegancja w każdym detalu", tier: "Premium" },
  { name: "Michael Kors", category: "premium", description: "Amerykański glamour i luksus", tier: "Premium" }
]

export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBrands = BRANDS.filter(brand => {
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[120px]"
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
            <div className="w-12 h-px bg-amber-500" />
            <span className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-sm">
              Kolekcja
            </span>
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
            >
              Nasze <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Marki</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl mb-12"
          >
            Współpracujemy z najlepszymi producentami na świecie. 
            Tylko oryginalne produkty z pełną gwarancją.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { icon: Award, value: "50+", label: "Marek premium" },
              { icon: Shield, value: "100%", label: "Oryginalne produkty" },
              { icon: Star, value: "1000+", label: "Modeli opraw" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <stat.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white tabular-nums">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-zinc-100 sticky top-[72px] z-30 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
              {BRAND_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Szukaj marki..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-zinc-100 border-0 rounded-full focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {filteredBrands.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Brak wyników</h3>
              <p className="text-zinc-500">Spróbuj innych kryteriów wyszukiwania</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBrands.map((brand, i) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative bg-white rounded-3xl p-6 lg:p-8 border border-zinc-100 hover:border-zinc-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                >
                  {/* Tier Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      brand.category === 'luxury' 
                        ? 'bg-amber-100 text-amber-700'
                        : brand.category === 'lenses'
                        ? 'bg-blue-100 text-blue-700'
                        : brand.category === 'sport'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {brand.tier}
                    </span>
                  </div>
                  
                  {/* Logo Placeholder */}
                  <div className="aspect-video flex items-center justify-center mb-6 rounded-2xl bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                    <span className="text-3xl lg:text-4xl font-bold text-zinc-300 group-hover:text-zinc-400 transition-colors tracking-tighter">
                      {brand.name}
                    </span>
                  </div>
                  
                  {/* Info */}
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">
                    {brand.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-red-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 lg:py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-sm">
                Wyróżnione
              </span>
              <div className="w-8 h-px bg-amber-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Partnerzy technologiczni
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "ZEISS", description: "Lider w precyzyjnej optyce i rozwiązaniach wizyjnych. Niemiecka jakość od 1846 roku." },
              { name: "HOYA", description: "Japońska innowacja w produkcji soczewek okularowych i rozwiązań medycznych." },
              { name: "Essilor", description: "Francuski gigant optyczny. Twórcy soczewek Varilux i Transitions." }
            ].map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="relative bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-amber-500/30 transition-all duration-500 group"
              >
                <div className="aspect-video flex items-center justify-center mb-6 rounded-2xl bg-zinc-800/50">
                  <span className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">
                    {partner.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 lg:p-16 overflow-hidden text-center"
          >
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/20 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-500 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Ekskluzywna oferta
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Szukasz konkretnego modelu?
              </h2>
              <p className="text-xl text-zinc-400 mb-10">
                Skontaktuj się z nami — pomożemy znaleźć idealne okulary z naszej bogatej kolekcji.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/kontakt">
                  <Button className="rounded-full bg-amber-500 hover:bg-amber-400 text-black px-8 py-6 font-semibold">
                    SKONTAKTUJ SIĘ
                  </Button>
                </Link>
                <Link href="/salony">
                  <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 py-6 font-semibold">
                    ODWIEDŹ SALON
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
