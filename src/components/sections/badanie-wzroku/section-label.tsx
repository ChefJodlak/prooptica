"use client"

import { motion } from "framer-motion"

interface SectionLabelProps {
  text: string
  centered?: boolean
  animate?: boolean
}

export function SectionLabel({ text, centered = false, animate = false }: SectionLabelProps) {
  const content = (
    <div className={`flex items-center gap-5 mb-8 ${centered ? 'justify-center' : ''}`}>
      {centered && (
        <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-[#C4A77D] to-transparent" />
      )}
      <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.5em] uppercase">
        {text}
      </span>
      <div className={`h-px flex-1 max-w-[${centered ? '60px' : '80px'}] bg-gradient-to-r from-[#C4A77D] to-transparent`} />
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}

