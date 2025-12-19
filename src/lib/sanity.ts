/**
 * Sanity.io Client
 * Configuration and utility functions for fetching data from Sanity CMS
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity image source type
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]

// Sanity configuration
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nxzxyhd6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Create the Sanity client
export const sanityClient = createClient(config)

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

/**
 * Get image URL from Sanity image reference
 */
export function getSanityImageUrl(source: SanityImageSource | null | undefined): string | null {
  if (!source) return null
  return builder.image(source).auto('format').url()
}

/**
 * Get optimized image URL with specific dimensions
 */
export function getSanityImageUrlWithDimensions(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!source) return null
  const img = builder.image(source).width(width).auto('format')
  if (height) {
    return img.height(height).url()
  }
  return img.url()
}

// ===== Sanity Types =====

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityArticle {
  _id: string
  _type: 'article'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: SanitySlug
  excerpt?: string
  cover?: SanityImage
  category?: 'zdrowie' | 'technologia' | 'styl'
  readTime?: string
  featured?: boolean
  content?: unknown[] // Portable Text blocks
  publishedAt?: string
}

// ===== GROQ Queries =====

/**
 * Fetch all articles
 */
export async function getArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    cover,
    category,
    readTime,
    featured,
    publishedAt
  }`
  
  return sanityClient.fetch(query, {}, { next: { revalidate: 60 } })
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    cover,
    category,
    readTime,
    featured,
    content,
    publishedAt
  }`
  
  return sanityClient.fetch(query, { slug }, { next: { revalidate: 60 } })
}

/**
 * Fetch related articles (excluding the current one)
 */
export async function getRelatedArticles(currentSlug: string, limit: number = 3): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && slug.current != $slug] | order(publishedAt desc)[0...$limit] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    cover,
    category,
    readTime,
    featured,
    publishedAt
  }`
  
  return sanityClient.fetch(query, { slug: currentSlug, limit }, { next: { revalidate: 60 } })
}

/**
 * Fetch featured articles
 */
export async function getFeaturedArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && featured == true] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    cover,
    category,
    readTime,
    featured,
    publishedAt
  }`
  
  return sanityClient.fetch(query, {}, { next: { revalidate: 60 } })
}

/**
 * Fetch articles by category
 */
export async function getArticlesByCategory(category: string): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    cover,
    category,
    readTime,
    featured,
    publishedAt
  }`
  
  return sanityClient.fetch(query, { category }, { next: { revalidate: 60 } })
}
