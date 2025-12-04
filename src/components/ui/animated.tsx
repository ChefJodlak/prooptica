"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Smooth easing curves
const smoothEasing = [0.16, 1, 0.3, 1] as const
const bounceEasing = [0.34, 1.56, 0.64, 1] as const

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

export function FadeUp({ children, delay = 0, duration = 0.8, className, once = true }: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={className}
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: smoothEasing
    }
  }
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
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
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: smoothEasing
            }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.02,
            ease: smoothEasing
          }}
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
  duration = 0.8, 
  className,
  once = true 
}: SlideInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  const directionMap = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={className}
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

export function ScaleIn({ children, delay = 0, duration = 0.6, className, once = true }: ScaleInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration, delay, ease: bounceEasing }}
      className={className}
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

export function BlurIn({ children, delay = 0, duration = 0.8, className, once = true }: BlurInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(20px)" }}
      transition={{ duration, delay, ease: smoothEasing }}
      className={className}
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

export function Floating({ children, className, duration = 6, y = 20 }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-y/2, y/2, -y/2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
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

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef(null)
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      style={{ y: 0 }}
      className={className}
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

function CounterNumber({ from, to, duration }: { from: number; to: number; duration: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: 0 }}
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

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 1, delay, ease: smoothEasing }}
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
          className="absolute left-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20]
          }}
          transition={{
            duration: interval / 1000,
            delay: i * (interval / 1000),
            repeat: Infinity,
            repeatDelay: (words.length - 1) * (interval / 1000),
            ease: smoothEasing
          }}
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

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-[100px] animate-pulse-glow",
        colorMap[color] || colorMap.red,
        className
      )}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}


