/**
 * Strapi API Client
 * Utility functions for fetching data from Strapi CMS
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
}

interface FetchOptions {
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  locale?: string;
  fields?: string[];
  revalidate?: number | false;
  cache?: RequestCache;
}

/**
 * Build query string from options
 */
function buildQueryString(options: FetchOptions): string {
  const params = new URLSearchParams();

  if (options.populate) {
    if (typeof options.populate === 'string') {
      params.append('populate', options.populate);
    } else if (Array.isArray(options.populate)) {
      options.populate.forEach((field) => {
        params.append('populate', field);
      });
    } else {
      // Deep populate
      params.append('populate', JSON.stringify(options.populate));
    }
  }

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
          params.append(`filters[${key}][${op}]`, String(val));
        });
      } else {
        params.append(`filters[${key}]`, String(value));
      }
    });
  }

  if (options.sort) {
    if (Array.isArray(options.sort)) {
      options.sort.forEach((s) => params.append('sort', s));
    } else {
      params.append('sort', options.sort);
    }
  }

  if (options.pagination) {
    Object.entries(options.pagination).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(`pagination[${key}]`, String(value));
      }
    });
  }

  if (options.locale) {
    params.append('locale', options.locale);
  }

  if (options.fields) {
    options.fields.forEach((field) => {
      params.append('fields', field);
    });
  }

  return params.toString();
}

/**
 * Fetch data from Strapi API
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const queryString = buildQueryString(options);
  const url = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const fetchOptions: RequestInit = {
    headers,
    cache: options.cache,
  };

  // Handle revalidation for Next.js
  if (options.revalidate !== undefined) {
    (fetchOptions as { next?: { revalidate: number | false } }).next = {
      revalidate: options.revalidate,
    };
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error: StrapiError = await response.json();
    throw new Error(`Strapi Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single item by ID
 */
export async function fetchStrapiById<T>(
  endpoint: string,
  id: string | number,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  return fetchStrapi<T>(`${endpoint}/${id}`, options);
}

/**
 * Fetch single type (like homepage, site settings)
 */
export async function fetchStrapiSingle<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  return fetchStrapi<T>(endpoint, options);
}

/**
 * Get Strapi media URL
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // If already absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}

/**
 * Type helpers for Strapi responses
 */
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Example content types - customize based on your Strapi schema
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  cover?: StrapiMedia;
  category?: Category;
  author?: Author;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  bio?: string;
  avatar?: StrapiMedia;
}

// Usage examples:
// 
// // Fetch all articles
// const { data: articles } = await fetchStrapi<Article[]>('/articles', {
//   populate: '*',
//   sort: 'publishedAt:desc',
//   pagination: { pageSize: 10 },
// });
//
// // Fetch single article by ID
// const { data: article } = await fetchStrapiById<Article>('/articles', 1, {
//   populate: ['cover', 'category', 'author'],
// });
//
// // Fetch with filters
// const { data: techArticles } = await fetchStrapi<Article[]>('/articles', {
//   filters: { category: { slug: { $eq: 'technology' } } },
//   populate: '*',
// });

