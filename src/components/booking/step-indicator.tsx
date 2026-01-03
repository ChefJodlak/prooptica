"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  step: number
  currentStep: number
  title: string
  icon: React.ElementType
}

export function StepIndicator({ 
  step, 
  currentStep, 
  title, 
  icon: Icon 
}: StepIndicatorProps) {
  const isActive = currentStep === step
  const isCompleted = currentStep > step
  const isClickable = currentStep > step

  return (
    <div className={cn(
      "group flex items-center gap-4 transition-all duration-300",
      isClickable && "cursor-pointer"
    )}>
      <div className={cn(
        "relative w-12 h-12 flex items-center justify-center transition-all duration-300",
        isCompleted
          ? "bg-[#E31F25] group-hover:bg-[#b39669] group-hover:scale-105"
          : isActive
            ? "bg-[#e8e6e2]"
            : "bg-[#F5F5F5] group-hover:bg-[#e8e6e2]"
      )}>
        {isCompleted ? (
          <Check className="w-5 h-5 text-[#1a1a1a]" />
        ) : (
          <Icon className={cn(
            "w-5 h-5 transition-all duration-300",
            isActive ? "text-[#E31F25]" : "text-[#737373] group-hover:text-[#E31F25] group-hover:scale-110"
          )} />
        )}
        {/* Corner accents */}
        <span className={cn(
          "absolute -top-px -left-px w-2 h-2 border-t border-l transition-colors duration-300",
          isActive ? "border-[#E31F25]" : isClickable ? "border-transparent group-hover:border-[#E31F25]/50" : "border-transparent"
        )} />
        <span className={cn(
          "absolute -bottom-px -right-px w-2 h-2 border-b border-r transition-colors duration-300",
          isActive ? "border-[#E31F25]" : isClickable ? "border-transparent group-hover:border-[#E31F25]/50" : "border-transparent"
        )} />
      </div>
      <div>
        <span className={cn(
          "text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
          isClickable ? "text-[#737373] group-hover:text-[#E31F25]" : "text-[#737373]"
        )}>
          Krok {step}
        </span>
        <h4 className={cn(
          "font-display text-lg transition-colors duration-300",
          isActive || isCompleted 
            ? "text-[#1a1a1a]" 
            : isClickable 
              ? "text-[#a3a3a3] group-hover:text-[#1a1a1a]" 
              : "text-[#a3a3a3]"
        )}>
          {title}
        </h4>
      </div>
    </div>
  )
}

