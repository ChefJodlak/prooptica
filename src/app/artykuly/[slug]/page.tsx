import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/lib/sanity"
import { ArticleContent } from "@/components/sections/artykuly/article-content"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const articles = await getArticles()
    return articles.map((article) => ({
      slug: article.slug?.current || '',
    })).filter(params => params.slug)
  } catch {
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      return {
        title: 'Artykuł nie znaleziony | Prooptica',
      }
    }

    return {
      title: `${article.title} | Prooptica`,
      description: article.excerpt || `Przeczytaj artykuł: ${article.title}`,
      openGraph: {
        title: article.title,
        description: article.excerpt || '',
        type: 'article',
        publishedTime: article.publishedAt || article._createdAt,
        authors: ['Prooptica'],
      },
    }
  } catch {
    return {
      title: 'Artykuł | Prooptica',
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Fetch other articles from Sanity (excluding current article)
  const relatedArticles = await getRelatedArticles(slug, 3)

  return <ArticleContent article={article} featuredArticles={relatedArticles} />
}
