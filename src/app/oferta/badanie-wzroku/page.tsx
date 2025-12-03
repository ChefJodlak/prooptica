"use client"

import { useRef } from "react"
import { useInView, useScroll, useTransform } from "framer-motion"
import {
  HeroSection,
  FeaturesSection,
  ProcessSection,
  PricingSection,
  CtaSection,
  TextureOverlay
} from "@/components/sections/badanie-wzroku"
import { EyeExamPageSchema } from "@/components/seo/schema-org"

export default function EyeExamPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      <EyeExamPageSchema />
      <TextureOverlay fixed />
      <HeroSection />
      <FeaturesSection isInView={isInView} imageY={imageY} />
      <ProcessSection isInView={isInView} />
      <PricingSection isInView={isInView} />
      <CtaSection isInView={isInView} />
    </div>
  )
}
