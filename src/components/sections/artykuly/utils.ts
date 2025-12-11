import { Article, StrapiArticle } from "./types"
import { getStrapiMediaUrl } from "@/lib/strapi"

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
 * Transform Strapi article to frontend Article format
 */
export function transformStrapiArticle(strapiArticle: StrapiArticle): Article {
  const date = new Date(strapiArticle.publishedAt)
  const formattedDate = date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Get the best available image
  const imageUrl = strapiArticle.cover 
    ? getStrapiMediaUrl(
        strapiArticle.cover.formats?.medium?.url || 
        strapiArticle.cover.formats?.small?.url || 
        strapiArticle.cover.url
      )
    : null

  return {
    id: strapiArticle.id,
    title: strapiArticle.title,
    excerpt: strapiArticle.excerpt || '',
    category: strapiArticle.category || 'zdrowie',
    readTime: strapiArticle.readTime || '5 min',
    date: formattedDate,
    featured: strapiArticle.featured || false,
    image: imageUrl || 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800',
    slug: strapiArticle.slug
  }
}

/**
 * Transform array of Strapi articles
 */
export function transformStrapiArticles(strapiArticles: StrapiArticle[]): Article[] {
  return strapiArticles.map(transformStrapiArticle)
}

