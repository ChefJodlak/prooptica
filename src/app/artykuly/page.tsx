import { fetchStrapi } from "@/lib/strapi"
import {
  ArticlesClient,
  transformStrapiArticles,
  ARTICLES,
  type StrapiArticle,
} from "@/components/sections/artykuly"

async function getArticles() {
  try {
    const { data } = await fetchStrapi<StrapiArticle[]>('/articles', {
      populate: ['cover'],
      sort: 'publishedAt:desc',
      pagination: { pageSize: 100 },
      revalidate: 60, // Revalidate every 60 seconds
    })
    
    // Transform Strapi data to frontend format
    return transformStrapiArticles(data)
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error)
    // Fallback to mock data if Strapi is not available
    return ARTICLES
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return <ArticlesClient articles={articles} />
}
