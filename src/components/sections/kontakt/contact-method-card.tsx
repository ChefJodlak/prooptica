"use client"

import { motion } from "framer-motion"
import { ArrowRight, LucideIcon } from "lucide-react"

interface ContactMethodCardProps {
  icon: LucideIcon
  title: string
  description: string
  value: string
  href: string
  index: number
  isInView: boolean
}

export function ContactMethodCard({
  icon: Icon,
  title,
  description,
  value,
  href,
  index,
  isInView
}: ContactMethodCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#F8F7F4] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2"
    >
      {/* Elegant border */}
      <div className="absolute inset-0 ring-1 ring-[#e0ded8] group-hover:ring-[#C4A77D] transition-all duration-500" />
      
      {/* Gold accent corner */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#C4A77D] rotate-45" />
      </div>
      
      {/* Icon */}
      <div className="inline-flex p-4 bg-[#1a1a1a] mb-6">
        <Icon className="w-6 h-6 text-[#C4A77D]" />
      </div>
      
      <h3 className="font-display text-xl font-medium text-[#1a1a1a] mb-2 group-hover:text-[#C4A77D] transition-colors">
        {title}
      </h3>
      <p className="text-[#737373] mb-4 text-sm font-light">{description}</p>
      <p className="text-base font-medium text-[#1a1a1a] flex items-center gap-2">
        {value}
        <ArrowRight className="w-4 h-4 text-[#C4A77D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
      </p>
    </motion.a>
  )
}

