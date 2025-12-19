import { Article } from "./types"
import { SanityArticle, getSanityImageUrl } from "@/lib/sanity"

export const getCategoryStyle = (category: string): string => {
  switch (category) {
    case 'zdrowie':
      return 'bg-[#E31F25]/10 text-[#9A7B5A] border-[#E31F25]/20'
    case 'technologia':
      return 'bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10'
    case 'styl':
      return 'bg-[#E31F25]/5 text-[#E31F25] border-[#E31F25]/10'
    default:
      return 'bg-[#E31F25]/10 text-[#9A7B5A] border-[#E31F25]/20'
  }
}

/**
 * Transform Sanity article to frontend Article format
 */
export function transformSanityArticle(sanityArticle: SanityArticle): Article {
  const publishedDate = sanityArticle.publishedAt || sanityArticle._createdAt
  const date = new Date(publishedDate)
  const formattedDate = date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Get image URL from Sanity
  const imageUrl = getSanityImageUrl(sanityArticle.cover)

  return {
    id: sanityArticle._id,
    title: sanityArticle.title,
    excerpt: sanityArticle.excerpt || '',
    category: sanityArticle.category || 'zdrowie',
    readTime: sanityArticle.readTime || '5 min',
    date: formattedDate,
    featured: sanityArticle.featured || false,
    image: imageUrl || 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800',
    slug: sanityArticle.slug?.current
  }
}

/**
 * Transform array of Sanity articles
 */
export function transformSanityArticles(sanityArticles: SanityArticle[]): Article[] {
  return sanityArticles.map(transformSanityArticle)
}
