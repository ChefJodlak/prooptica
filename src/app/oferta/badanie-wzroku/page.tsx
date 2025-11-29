"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Check, Eye, Scan, Activity, Shield, Clock, Award, Phone, Calendar, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const EXAM_FEATURES = [
  {
    icon: Scan,
    title: "Precyzyjny pomiar wady wzroku",
    description: "Wykorzystujemy najnowocześniejsze autorefraktometry do dokładnego pomiaru wady refrakcji.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Eye,
    title: "Badanie dna oka",
    description: "Nieinwazyjna diagnostyka siatkówki i nerwu wzrokowego przy pomocy kamery fundus.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Activity,
    title: "Pomiar ciśnienia wewnątrzgałkowego",
    description: "Wczesne wykrywanie jaskry dzięki bezdotykowej tonometrii.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Dobór soczewek kontaktowych",
    description: "Profesjonalne dopasowanie soczewek z uwzględnieniem krzywizny rogówki.",
    color: "from-amber-500 to-orange-500"
  }
]

const PROCESS_STEPS = [
  { number: "01", title: "Wywiad", description: "Rozmowa o historii wzroku i potrzebach" },
  { number: "02", title: "Badanie", description: "Kompleksowa diagnostyka przy użyciu nowoczesnego sprzętu" },
  { number: "03", title: "Analiza", description: "Omówienie wyników i rekomendacji" },
  { number: "04", title: "Dobór", description: "Profesjonalne doradztwo w wyborze okularów" }
]

export default function EyeExamPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-blue-500" />
              <span className="text-blue-500 font-semibold tracking-[0.2em] uppercase text-sm">
                Usługi
              </span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              >
                Badanie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Wzroku</span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-zinc-400 max-w-2xl mb-10"
            >
              Kompleksowa diagnostyka wzroku przy użyciu najnowocześniejszego sprzętu. 
              Twoje oczy zasługują na precyzję i profesjonalizm.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Clock, text: "30-45 min" },
                { icon: Award, text: "Certyfikowani specjaliści" },
                { icon: Shield, text: "Pełna diagnostyka" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-400">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-8">
                  Dlaczego warto badać wzrok{" "}
                  <span className="text-gradient">regularnie?</span>
                </h2>
                
                <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
                  Regularne badanie wzroku to nie tylko kwestia komfortu widzenia. 
                  To także profilaktyka zdrowotna, która pozwala wykryć wiele schorzeń 
                  na wczesnym etapie.
                </p>
                
                <div className="space-y-4">
                  {EXAM_FEATURES.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-100/50 transition-all duration-300 bg-white"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Image */}
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
                  alt="Badanie wzroku"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 lg:-left-12"
              >
                <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-zinc-200/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-100">
                      <Eye className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-zinc-900">50k+</div>
                      <div className="text-sm text-zinc-500">Badań wykonanych</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-600 font-semibold tracking-[0.2em] uppercase text-sm">
                Proces
              </span>
              <div className="w-8 h-px bg-blue-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
              Jak przebiega badanie?
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-zinc-100">
                  <span className="text-6xl font-bold text-zinc-100 group-hover:text-blue-100 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-4 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                    <ArrowRight className="w-8 h-8 text-zinc-200" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 font-semibold tracking-[0.2em] uppercase text-sm">
                Cennik
              </span>
              <div className="w-8 h-px bg-blue-400" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Przejrzyste ceny
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Podstawowe",
                price: "Gratis*",
                note: "przy zakupie okularów",
                features: ["Pomiar wady wzroku", "Dobór korekcji", "Konsultacja"],
                popular: false
              },
              {
                name: "Kompleksowe",
                price: "149 zł",
                note: "",
                features: ["Pełna diagnostyka", "Badanie dna oka", "Pomiar ciśnienia", "Tonometria", "Konsultacja specjalisty"],
                popular: true
              },
              {
                name: "Premium",
                price: "249 zł",
                note: "",
                features: ["Badanie kompleksowe", "OCT siatkówki", "Perymetria", "Raport cyfrowy", "Kontrola po 3 mies."],
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ring-2 ring-blue-400 ring-offset-4 ring-offset-zinc-950' 
                    : 'bg-zinc-900 text-white border border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-white text-blue-600 border-0 px-4 py-1">
                      Najpopularniejsze
                    </Badge>
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                {plan.note && (
                  <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-200' : 'text-zinc-400'}`}>
                    {plan.note}
                  </p>
                )}
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-blue-200' : 'text-blue-400'}`} />
                      <span className={plan.popular ? 'text-blue-100' : 'text-zinc-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full rounded-full py-6 font-semibold ${
                    plan.popular 
                      ? 'bg-white text-blue-600 hover:bg-blue-50' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  Umów wizytę
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[60px]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Zadbaj o swój wzrok
                </div>
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3">
                  Umów badanie już dziś
                </h3>
                <p className="text-blue-100 max-w-lg">
                  Nie czekaj — regularne badania to klucz do zdrowego wzroku przez całe życie.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="tel:+4822XXXXXXX"
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+48 22 XXX XX XX</span>
                </a>
                <Link href="/kontakt">
                  <Button className="rounded-full bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 font-semibold shadow-lg">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Rezerwuj termin
                    </span>
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

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {children}
    </span>
  )
}
