"use client"
import { useEffect, useSyncExternalStore } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Detect Safari browser using useSyncExternalStore for hydration safety
function getIsSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android')
}

function subscribe() {
  return () => {}
}

function useIsSafari() {
  return useSyncExternalStore(
    subscribe,
    getIsSafari,
    () => false
  )
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isSafari = useIsSafari()
  
  useEffect(() => {
    // Skip Lenis entirely on Safari - use native scrolling
    // Safari's native scroll is already smooth and Lenis causes jank
    if (isSafari) {
      // Just initialize ScrollTrigger for any GSAP scroll animations
      ScrollTrigger.refresh()
      return
    }
    
    // Non-Safari browsers get smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [isSafari])

  return <>{children}</>
}


