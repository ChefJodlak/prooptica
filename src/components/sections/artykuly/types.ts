import { LucideIcon } from "lucide-react"

export interface Category {
  id: string
  name: string
  icon: LucideIcon | null
}

// Frontend Article type (used by components)
export interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  featured: boolean
  image: string
  slug?: string
}

// Strapi Article response type
export interface StrapiArticle {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: unknown // Rich text blocks
  category: "zdrowie" | "technologia" | "styl" | null
  readTime: string | null
  featured: boolean
  cover: {
    id: number
    url: string
    alternativeText: string | null
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
  } | null
  publishedAt: string
  createdAt: string
  updatedAt: string
}

