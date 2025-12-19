import { LucideIcon } from "lucide-react"

export interface Category {
  id: string
  name: string
  icon: LucideIcon | null
}

// Frontend Article type (used by components)
export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  featured: boolean
  image: string
  slug?: string
}

// Re-export Sanity types for backward compatibility
export type { SanityArticle } from "@/lib/sanity"

