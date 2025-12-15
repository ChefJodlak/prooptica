"use client"

import { NOISE_TEXTURE } from "@/lib/constants/ui"

interface TextureOverlayProps {
  opacity?: number
  fixed?: boolean
}

export function TextureOverlay({ opacity = 0.03, fixed = false }: TextureOverlayProps) {
  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 pointer-events-none`}
      style={{
        opacity,
        backgroundImage: NOISE_TEXTURE
      }} 
    />
  )
}

