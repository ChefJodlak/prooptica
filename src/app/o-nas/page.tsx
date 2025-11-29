"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Award, Users, Heart, Target, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TIMELINE = [
  { year: "2004", title: "Początek", description: "Otwarcie pierwszego salonu w Warszawie. Realizacja marzenia o własnej firmie optycznej." },
  { year: "2010", title: "Rozwój", description: "Ekspansja do Piaseczna. Wprowadzenie najnowocześniejszego sprzętu diagnostycznego." },
  { year: "2015", title: "Innowacje", description: "Partnerstwo z ZEISS i HOYA. Wprowadzenie soczewek premium." },
  { year: "2020", title: "Dziś", description: "4 salony, 50+ tysięcy zadowolonych klientów, ciągły rozwój i innowacje." }
]

const VALUES = [
  {
    icon: Heart,
    title: "Pasja",
    description: "Optyka to nasza pasja, którą dzielimy z klientami każdego dnia.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Award,
    title: "Jakość",
    description: "Oferujemy tylko najwyższej jakości produkty i usługi.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Rodzina",
    description: "Jesteśmy firmą rodzinną i tak traktujemy naszych klientów.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Precyzja",
    description: "Precyzja w diagnozowaniu i doborze okularów to nasz priorytet.",
    color: "from-emerald-500 to-teal-500"
  }
]

const TEAM = [
  { name: "Dr Anna Nowak", role: "Optometrysta", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400" },
  { name: "Mgr Piotr Kowalski", role: "Optyk", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400" },
  { name: "Maria Wiśniewska", role: "Doradca Klienta", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400" },
  { name: "Tomasz Lewandowski", role: "Specjalista Soczewek", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-20%" })
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-red-500" />
              <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm">
                O Nas
              </span>
            </motion.div>
            
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight"
              >
                Historia rodzinnej{" "}
                <span className="text-gradient">pasji i precyzji.</span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-zinc-400 max-w-2xl mb-10"
            >
              Od 2004 roku łączymy tradycję rodzinnego rzemiosła z najnowocześniejszymi 
              technologiami optycznymi. Twoje oczy są w najlepszych rękach.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { value: "20+", label: "Lat doświadczenia" },
                { value: "50k+", label: "Zadowolonych klientów" },
                { value: "4", label: "Salony premium" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-4xl lg:text-5xl font-bold text-white tabular-nums mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-8">
                Od małego salonu do sieci{" "}
                <span className="text-gradient">premium.</span>
              </h2>
              
              <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
                <p>
                  Prooptica powstała z pasji do optyki i chęci niesienia pomocy osobom 
                  z wadami wzroku. Założyciele, rodzina z wieloletnim doświadczeniem 
                  w branży, postanowili stworzyć miejsce, gdzie najnowsza technologia 
                  spotyka się z ciepłą, rodzinną atmosferą.
                </p>
                <p>
                  Dziś, po dwóch dekadach, Prooptica to cztery ekskluzywne salony 
                  w Warszawie, Piasecznie i Grójcu. Każdy z nich utrzymuje te same 
                  standardy jakości i obsługi, które definiują naszą markę od samego początku.
                </p>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/salony">
                  <Button className="rounded-full bg-zinc-900 hover:bg-red-600 text-white px-8 py-6 font-semibold group">
                    <span className="flex items-center gap-2">
                      Nasze Salony
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1000"
                  alt="Wnętrze salonu Prooptica"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 lg:-left-12"
              >
                <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-zinc-200/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-red-100">
                      <Award className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-zinc-900">2004</div>
                      <div className="text-sm text-zinc-500">Rok założenia</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-red-500" />
              <span className="text-red-600 font-semibold tracking-[0.2em] uppercase text-sm">
                Nasze wartości
              </span>
              <div className="w-8 h-px bg-red-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
              Co nas definiuje
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group bg-white rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-red-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-red-500" />
              <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm">
                Historia
              </span>
              <div className="w-8 h-px bg-red-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Nasza droga
            </h2>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-zinc-800 hidden lg:block">
              <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-red-500"
              />
            </div>
            
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-red-500/30 transition-colors">
                    <span className="text-red-500 font-bold text-4xl mb-4 block">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
                
                {/* Dot */}
                <div className="absolute left-[50%] -translate-x-1/2 hidden lg:flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-red-500 border-4 border-zinc-950 z-10" />
                </div>
                
                <div className="hidden lg:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-red-500" />
              <span className="text-red-600 font-semibold tracking-[0.2em] uppercase text-sm">
                Zespół
              </span>
              <div className="w-8 h-px bg-red-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
              Poznaj naszych ekspertów
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Nasz zespół to wykwalifikowani specjaliści z pasją do optyki.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-zinc-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative bg-zinc-900 rounded-3xl p-8 lg:p-16 overflow-hidden text-center"
          >
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/20 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full text-red-500 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Dołącz do nas
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Przekonaj się sam
              </h2>
              <p className="text-xl text-zinc-400 mb-10">
                Umów wizytę i doświadcz różnicy, jaką daje 20 lat doświadczenia w optyce.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/kontakt">
                  <Button className="rounded-full bg-red-600 hover:bg-red-500 text-white px-8 py-6 font-semibold">
                    UMÓW WIZYTĘ
                  </Button>
                </Link>
                <Link href="/salony">
                  <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 py-6 font-semibold">
                    NASZE SALONY
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
