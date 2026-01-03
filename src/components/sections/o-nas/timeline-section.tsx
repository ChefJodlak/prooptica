"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TIMELINE } from "./constants"

export function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-15%" })

  return (
    <section ref={timelineRef} className="py-24 lg:py-32 bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-5 mb-8">
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent to-[#E31F25]"
              initial={{ scaleX: 0 }}
              animate={isTimelineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              Historia
            </span>
            <motion.div
              className="h-px w-12 bg-gradient-to-l from-transparent to-[#E31F25]"
              initial={{ scaleX: 0 }}
              animate={isTimelineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
            Nasza{" "}
            <span className="italic text-[#E31F25]">droga</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-[#e0ded8] hidden lg:block">
            <motion.div
              initial={{ height: "0%" }}
              animate={isTimelineInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#E31F25]"
            />
          </div>

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 }}
              animate={isTimelineInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`relative flex flex-col items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                <div className="bg-white p-8 border border-[#e0ded8] hover:border-[#E31F25]/30 hover:shadow-lg transition-all duration-300">
                  <span className="font-display text-4xl text-[#E31F25] font-light mb-4 block tracking-tight">{item.year}</span>
                  <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-[#5a5a5a] font-light leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isTimelineInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute left-[50%] -translate-x-1/2 hidden lg:flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-[#E31F25] rounded-full border-4 border-[#F8F7F4] z-10 shadow-sm" />
              </motion.div>

              <div className="hidden lg:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

