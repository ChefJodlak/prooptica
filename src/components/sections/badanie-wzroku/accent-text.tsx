"use client"

import { ReactNode } from "react"

interface AccentTextProps {
  children: ReactNode
  underlineOpacity?: number
}

export function AccentText({ children, underlineOpacity = 0.2 }: AccentTextProps) {
  return (
    <span className="relative inline-block">
      <span className="italic text-[#E31F25]">{children}</span>
      <span 
        className="absolute -bottom-2 left-0 w-full h-[2px] rounded-full" 
        style={{ 
          background: `linear-gradient(to right, rgba(227, 31, 37, ${underlineOpacity * 2}), rgba(227, 31, 37, ${underlineOpacity}), transparent)` 
        }}
      />
    </span>
  )
}

