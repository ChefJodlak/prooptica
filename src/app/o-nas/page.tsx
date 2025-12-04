"use client"

import {
  HeroSection,
  StorySection,
  ValuesSection,
  TimelineSection,
  TeamSection,
  CtaSection
} from "@/components/sections/o-nas"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <CtaSection />
    </div>
  )
}
