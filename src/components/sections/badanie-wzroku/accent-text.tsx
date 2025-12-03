"use client"

import { ReactNode } from "react"

interface AccentTextProps {
  children: ReactNode
  underlineOpacity?: number
}

export function AccentText({ children, underlineOpacity = 0.2 }: AccentTextProps) {
  return (
    <span className="relative inline-block">
      <span className="italic text-[#C4A77D]">{children}</span>
      <svg 
        className="absolute -bottom-2 left-0 w-full h-3" 
        style={{ color: `rgba(196, 167, 125, ${underlineOpacity})` }}
        viewBox="0 0 100 12" 
        preserveAspectRatio="none"
      >
        <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </span>
  )
}

