"use client"

import { motion } from "framer-motion"
import { containerVariants } from "./animation-variants"
import { ContactForm } from "./contact-form"
import { LocationsSection } from "./locations-section"

interface FormAndLocationsSectionProps {
  isInView: boolean
}

export function FormAndLocationsSection({ isInView }: FormAndLocationsSectionProps) {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ContactForm />
          <LocationsSection isInView={isInView} />
        </motion.div>
      </div>
    </section>
  )
}

