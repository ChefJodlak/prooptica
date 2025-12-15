"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Smooth easing curves for animations
const smoothEasing = [0.22, 1, 0.36, 1] as const
const bounceEasing = [0.34, 1.56, 0.64, 1] as const

// GPU acceleration styles - minimal version for Safari compatibility
// Note: willChange removed as it causes memory issues on Safari macOS
const gpuStyles = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
}

// ═══════════════════════════════════════════════════════════════════════════
// FADE UP ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function FadeUp({ children, delay = 0, duration = 0.6, className, once = true }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, z: 0 }}
      animate={isInView ? { opacity: 1, y: 0, z: 0 } : { opacity: 0, y: 30, z: 0 }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={cn("transform-gpu", className)}
      style={gpuStyles}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGGER CONTAINER
// ═══════════════════════════════════════════════════════════════════════════

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  })
}

export function StaggerContainer({ children, className, staggerDelay = 0.1, once = true }: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-5%" })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGGER ITEM
// ═══════════════════════════════════════════════════════════════════════════

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

// Removed blur animation as it's very expensive
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, z: 0 },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    transition: {
      duration: 0.5,
      ease: smoothEasing
    }
  }
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div 
      variants={itemVariants} 
      className={cn("transform-gpu", className)}
      style={gpuStyles}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TEXT REVEAL
// ═══════════════════════════════════════════════════════════════════════════

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export function TextReveal({ children, className, delay = 0, once = true }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  const words = children.split(" ")

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block transform-gpu"
            initial={{ y: "100%", opacity: 0, z: 0 }}
            animate={isInView ? { y: 0, opacity: 1, z: 0 } : { y: "100%", opacity: 0, z: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + i * 0.04,
              ease: smoothEasing
            }}
            style={gpuStyles}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHARACTER REVEAL
// ═══════════════════════════════════════════════════════════════════════════

interface CharRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export function CharReveal({ children, className, delay = 0, once = true }: CharRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="transform-gpu"
          initial={{ opacity: 0, y: 15, z: 0 }}
          animate={isInView ? { opacity: 1, y: 0, z: 0 } : { opacity: 0, y: 15, z: 0 }}
          transition={{
            duration: 0.25,
            delay: delay + i * 0.015,
            ease: smoothEasing
          }}
          style={gpuStyles}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE IN
// ═══════════════════════════════════════════════════════════════════════════

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function SlideIn({ 
  children, 
  direction = "left", 
  delay = 0, 
  duration = 0.6, 
  className,
  once = true 
}: SlideInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  const directionMap = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 60 },
    down: { x: 0, y: -60 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction], z: 0 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, z: 0 } : { opacity: 0, ...directionMap[direction], z: 0 }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={cn("transform-gpu", className)}
      style={gpuStyles}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SCALE IN
// ═══════════════════════════════════════════════════════════════════════════

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className, once = true }: ScaleInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, z: 0 }}
      animate={isInView ? { opacity: 1, scale: 1, z: 0 } : { opacity: 0, scale: 0.95, z: 0 }}
      transition={{ duration, delay, ease: bounceEasing }}
      className={cn("transform-gpu", className)}
      style={gpuStyles}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// BLUR IN
// ═══════════════════════════════════════════════════════════════════════════

interface BlurInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function BlurIn({ children, delay = 0, duration = 0.5, className, once = true }: BlurInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  // Use simple fade + subtle scale instead of blur (blur is expensive and causes hydration issues)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98, z: 0 }}
      animate={isInView ? { opacity: 1, scale: 1, z: 0 } : { opacity: 0, scale: 0.98, z: 0 }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={cn("transform-gpu", className)}
      style={gpuStyles}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * strength
    const y = (e.clientY - top - height / 2) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("transition-transform duration-300 ease-out", className)}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING ELEMENT
// ═══════════════════════════════════════════════════════════════════════════

interface FloatingProps {
  children: ReactNode
  className?: string
  duration?: number
  y?: number
}

export function Floating({ children, className, duration = 6, y = 12 }: FloatingProps) {
  // Use CSS animation for infinite floating (better Safari performance than JS-driven animations)
  return (
    <div
      className={cn("transform-gpu animate-float", className)}
      style={{
        ...gpuStyles,
        // CSS custom properties for animation customization
        "--float-duration": `${duration}s`,
        "--float-y": `${y}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className }: ParallaxProps) {
  const ref = useRef(null)
  // Note: speed parameter is reserved for future scroll-based parallax implementation
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 0, z: 0 }}
      style={{ y: 0 }}
      className={cn("transform-gpu", className)}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// COUNTER
// ═══════════════════════════════════════════════════════════════════════════

interface CounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
  once?: boolean
}

export function Counter({ from = 0, to, duration = 2, className, suffix = "", prefix = "", once = true }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {isInView && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <CounterNumber from={from} to={to} duration={duration} />
          </motion.span>
        )}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function CounterNumber({ to, duration }: { from: number; to: number; duration: number }) {
  // Note: from parameter is reserved for animated counting implementation
  return (
    <motion.span
      initial={{ opacity: 0, z: 0 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.3 }}
      className="transform-gpu"
      style={gpuStyles}
    >
      <motion.span
        initial={{ y: 0, z: 0 }}
        animate={{ y: 0, z: 0 }}
        transition={{ duration }}
      >
        {to}
      </motion.span>
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// REVEAL MASK
// ═══════════════════════════════════════════════════════════════════════════

interface RevealMaskProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function RevealMask({ children, className, delay = 0, once = true }: RevealMaskProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  // Use transform-based reveal instead of clipPath (clipPath is not GPU-accelerated)
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className="transform-gpu"
        initial={{ x: "-100%", z: 0 }}
        animate={isInView ? { x: 0, z: 0 } : { x: "-100%", z: 0 }}
        transition={{ duration: 0.8, delay, ease: smoothEasing }}
        style={gpuStyles}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// ROTATING TEXT
// ═══════════════════════════════════════════════════════════════════════════

interface RotatingTextProps {
  words: string[]
  className?: string
  interval?: number
}

export function RotatingText({ words, className, interval = 3000 }: RotatingTextProps) {
  return (
    <span className={cn("inline-block relative", className)}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="absolute left-0 transform-gpu"
          initial={{ opacity: 0, y: 20, z: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
            z: [0, 0, 0, 0]
          }}
          transition={{
            duration: interval / 1000,
            delay: i * (interval / 1000),
            repeat: Infinity,
            repeatDelay: (words.length - 1) * (interval / 1000),
            ease: "linear" // Simpler easing for infinite animations
          }}
          style={gpuStyles}
        >
          {word}
        </motion.span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// GLOWING ORB
// ═══════════════════════════════════════════════════════════════════════════

interface GlowingOrbProps {
  className?: string
  color?: string
  size?: number
}

export function GlowingOrb({ className, color = "red", size = 400 }: GlowingOrbProps) {
  const colorMap: Record<string, string> = {
    red: "bg-red-500/30",
    blue: "bg-blue-500/30",
    purple: "bg-purple-500/30",
    orange: "bg-orange-500/30"
  }

  // Use CSS animation instead of Framer Motion for infinite animations (better Safari performance)
  // Reduced blur from 60px to 40px for Safari
  return (
    <div
      className={cn(
        "absolute rounded-full animate-pulse transform-gpu blur-2xl",
        colorMap[color] || colorMap.red,
        className
      )}
      style={{ 
        width: size, 
        height: size,
        ...gpuStyles
      }}
    />
  )
}
