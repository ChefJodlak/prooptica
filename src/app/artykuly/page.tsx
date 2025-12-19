import { getArticles } from "@/lib/sanity"
import {
  ArticlesClient,
  transformSanityArticles,
  ARTICLES,
} from "@/components/sections/artykuly"

async function fetchArticles() {
  try {
    const sanityArticles = await getArticles()
    
    // Transform Sanity data to frontend format
    return transformSanityArticles(sanityArticles)
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error)
    // Fallback to mock data if Sanity is not available
    return ARTICLES
  }
}

export default async function ArticlesPage() {
  const articles = await fetchArticles()

  return <ArticlesClient articles={articles} />
}
