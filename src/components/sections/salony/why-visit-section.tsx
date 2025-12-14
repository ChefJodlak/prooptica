"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Microscope, Armchair, Glasses, Sparkles } from "lucide-react"

const features = [
  {
    title: "Nowoczesna Diagnostyka",
    description: "Gabinet wyposażony w najnowszy sprzęt optometryczny, pozwalający na precyzyjne badanie wzroku.",
    icon: Microscope
  },
  {
    title: "Wyjątkowa Atmosfera",
    description: "Przestrzeń zaprojektowana z myślą o Twoim komforcie, gdzie wybór okularów staje się przyjemnością.",
    icon: Armchair
  },
  {
    title: "Selekcja Opraw",
    description: "Starannie dobrane kolekcje od światowych projektantów i niszowych manufaktur.",
    icon: Glasses
  },
  {
    title: "Ekspercka Wiedza",
    description: "Zespół doświadczonych optyków i stylistów, którzy pomogą dopasować idealne rozwiązanie.",
    icon: Sparkles
  }
]

export function WhyVisitSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-24"
        >
          <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase block mb-6">
            Dlaczego Prooptica?
          </span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
            Więcej niż <span className="text-[#E31F25] font-medium italic">salon optyczny</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center mb-6 group-hover:border-[#E31F25] group-hover:bg-[#E31F25]/5 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#1a1a1a] group-hover:text-[#E31F25] transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5a5a5a] text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

