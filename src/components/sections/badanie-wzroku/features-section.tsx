"use client"

import { motion, MotionValue } from "framer-motion"
import Image from "next/image"
import { containerVariants, fadeUpVariants } from "./animation-variants"
import { SectionLabel } from "./section-label"
import { AccentText } from "./accent-text"
import { FeatureCard } from "./feature-card"
import { EXAM_FEATURES } from "./constants"

interface FeaturesSectionProps {
  isInView: boolean
  imageY: MotionValue<number>
}

export function FeaturesSection({ isInView, imageY }: FeaturesSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Content - Takes 6 columns */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-6">
            <SectionLabel text="Diagnostyka" />
            
            <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
              Dlaczego warto
            </h2>
            <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-8">
              badać <AccentText>regularnie?</AccentText>
            </h2>
            
            <p className="text-[#5a5a5a] text-base lg:text-lg leading-[1.8] mb-10 max-w-lg font-light">
              Regularne badanie wzroku to nie tylko kwestia komfortu widzenia. 
              To także profilaktyka zdrowotna, która pozwala wykryć wiele schorzeń 
              na wczesnym etapie.
            </p>
            
            <div className="space-y-4">
              {EXAM_FEATURES.map((feature, i) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Image - Takes 6 columns */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-6 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              {/* Artistic frame */}
              <div className="absolute -inset-3 lg:-inset-4 border border-[#E31F25]/30 pointer-events-none z-10" />
              <div className="absolute -inset-6 lg:-inset-8 border border-[#E31F25]/10 pointer-events-none z-10" />
              
              <Image 
                src="/exams/exam1.png"
                alt="Badanie wzroku"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/20" />
            </motion.div>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

