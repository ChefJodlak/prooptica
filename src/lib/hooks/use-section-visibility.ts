"use client"

import { useEffect, useRef, useState, RefObject } from "react"

interface UseSectionVisibilityOptions {
  /** How much of the element must be visible (0-1). Default: 0 (any part visible) */
  threshold?: number
  /** Margin around the viewport. Default: "100px" (pre-render buffer) */
  rootMargin?: string
}

/**
 * Hook to track if a section is visible in the viewport.
 * Used to pause animations when sections scroll out of view.
 */
export function useSectionVisibility<T extends HTMLElement = HTMLElement>(
  options: UseSectionVisibilityOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = "100px" } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(true) // Start as visible to avoid flash

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      return // Keep visible if not supported
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin, // Buffer zone so animations start before entering viewport
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return [ref, isVisible]
}

/**
 * Returns class names for section visibility state
 */
export function getSectionVisibilityClass(isVisible: boolean): string {
  return isVisible ? "section-visible" : "section-hidden"
}

/**
 * Hook to detect if the current browser is Safari.
 * Returns true on Safari (macOS/iOS), false on Chrome/Firefox/Edge.
 * Starts as false during SSR to avoid hydration mismatch.
 */
export function useIsSafari(): boolean {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Detect Safari: has Safari in UA but not Chrome/Chromium
    const ua = navigator.userAgent
    const isSafariBrowser = /^((?!chrome|android|crios|fxios).)*safari/i.test(ua)
    setIsSafari(isSafariBrowser)
  }, [])

  return isSafari
}

