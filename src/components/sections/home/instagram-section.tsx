"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram, ArrowUpRight, ExternalLink } from "lucide-react"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"
import { cn } from "@/lib/utils"

// Configuration
const INSTAGRAM_URL = "https://www.instagram.com/prooptica_optyk/"
const INSTAGRAM_HANDLE = "@prooptica_optyk"

// SnapWidget Feed ID - Get yours free at https://snapwidget.com
// 1. Go to snapwidget.com and sign up (free)
// 2. Connect your Instagram account
// 3. Create a widget and copy the Feed ID from the embed code
const SNAPWIDGET_FEED_ID = "" // Add your SnapWidget feed ID here, e.g., "nf0123456789"

// Fallback placeholder posts when no widget is configured
const PLACEHOLDER_POSTS = [
  { id: "1", gradient: "from-[#833AB4] via-[#C13584] to-[#E1306C]" },
  { id: "2", gradient: "from-[#C13584] via-[#E1306C] to-[#F77737]" },
  { id: "3", gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]" },
  { id: "4", gradient: "from-[#F77737] via-[#FCAF45] to-[#FFDC80]" },
  { id: "5", gradient: "from-[#833AB4] via-[#5851DB] to-[#405DE6]" },
  { id: "6", gradient: "from-[#5851DB] via-[#405DE6] to-[#833AB4]" },
]

// GPU-optimized styles for Safari
const gpuStyles = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
}

function PlaceholderPost({ 
  post, 
  index, 
  isInView 
}: { 
  post: typeof PLACEHOLDER_POSTS[0]
  index: number
  isInView: boolean 
}) {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.4, 
        delay: 0.2 + index * 0.05
      }}
      style={gpuStyles}
      className="group relative aspect-square overflow-hidden cursor-pointer transform-gpu"
    >
      {/* Instagram gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-[#f8f7f4]" />
      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10`} />
      
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <Instagram className="w-10 h-10 text-[#C4A77D]/40 group-hover:text-[#C13584]/60 transition-colors duration-500" />
        <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase group-hover:text-[#C13584]/80 transition-colors duration-500">
          Zobacz post
        </span>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/90 via-[#C13584]/90 to-[#E1306C]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-white">
          <ExternalLink className="w-6 h-6" />
          <span className="text-xs font-medium">Otwórz Instagram</span>
        </div>
      </div>
    </motion.a>
  )
}

// SnapWidget embed component
function SnapWidgetEmbed({ feedId }: { feedId: string }) {
  useEffect(() => {
    // Load SnapWidget script
    const script = document.createElement('script')
    script.src = 'https://snapwidget.com/js/snapwidget.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://snapwidget.com/js/snapwidget.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [feedId])

  return (
    <iframe
      src={`https://snapwidget.com/embed/${feedId}`}
      className="snapwidget-widget w-full"
      style={{ border: 'none', overflow: 'hidden', width: '100%' }}
      scrolling="no"
      title="Instagram Feed"
    />
  )
}

export function InstagramSection() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-10%" })

  return (
    <section 
      ref={containerRef} 
      className={cn("relative py-16 sm:py-24 lg:py-32 bg-[#F8F7F4] overflow-hidden content-auto", getSectionVisibilityClass(isVisible))}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      
      {/* Decorative large text - background (static for Safari performance) */}
      <div
        className="absolute top-16 left-8 font-display text-[8vw] font-bold text-[#1a1a1a] leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em] opacity-[0.02]"
      >
        INSTAGRAM
      </div>
      
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0ded8] to-transparent"
      />
      
      <div ref={contentRef} className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
          
          {/* Left - Title */}
          <div className="lg:col-span-6">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-8"
            >
              <Instagram className="w-4 h-4 text-[#C4A77D]" />
              <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Social Media
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </motion.div>
            
            {/* Headline */}
            <div className="overflow-hidden pb-0.5 sm:pb-1">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extralight text-[#1a1a1a] leading-[1.1] tracking-[-0.03em]"
              >
                Śledź nas
              </motion.h2>
            </div>
            <div className="overflow-hidden pb-2 sm:pb-3">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium text-[#1a1a1a] leading-[1.1] tracking-[-0.03em]"
              >
                na{" "}
                <span className="relative inline-block">
                  <span className="italic text-[#C4A77D]">Instagramie</span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </motion.h2>
            </div>
          </div>
          
          {/* Right - Description & CTA */}
          <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#5a5a5a] text-sm sm:text-lg leading-[1.7] sm:leading-[1.8] mb-5 sm:mb-8 max-w-md font-light"
            >
              Bądź na bieżąco z najnowszymi trendami w optyce. 
              Pokazujemy inspiracje, nowości i kulisy naszej codziennej pracy.
            </motion.p>
            
            {/* Instagram Follow Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white text-xs sm:text-sm font-medium tracking-[0.1em] uppercase hover:shadow-lg hover:shadow-[#C13584]/30 transition-all duration-500 hover:-translate-y-1"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Obserwuj {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Instagram Posts Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Artistic frame - Hidden on mobile for cleaner look */}
          <div className="hidden sm:block absolute -inset-3 lg:-inset-4 border border-[#C4A77D]/20 pointer-events-none" />
          <div className="hidden sm:block absolute -inset-6 lg:-inset-8 border border-[#C4A77D]/10 pointer-events-none" />
          
          <div className="relative bg-white p-3 sm:p-4 lg:p-6">
            {SNAPWIDGET_FEED_ID ? (
              // Use SnapWidget if configured
              <SnapWidgetEmbed feedId={SNAPWIDGET_FEED_ID} />
            ) : (
              // Show placeholder posts grid
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
                {PLACEHOLDER_POSTS.map((post, index) => (
                  <PlaceholderPost
                    key={post.id}
                    post={post}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#e0ded8] flex justify-center sm:justify-end"
        >
          <a 
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 sm:gap-6"
          >
            <span className="text-[#1a1a1a] text-[10px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase">
              Zobacz więcej na Instagramie
            </span>
            <div className="relative overflow-hidden">
              <div className="flex items-center gap-2">
                <div className="w-8 sm:w-12 h-px bg-[#1a1a1a]/30 group-hover:bg-[#C13584] group-hover:w-12 sm:group-hover:w-16 transition-all duration-500" />
                <ArrowUpRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C13584] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

