import type { Metadata, Viewport } from "next";
import { SITE_CONFIG, PAGE_SEO, SEO_KEYWORDS, AI_SEARCH_CONFIG, type PageSEOKey } from "./config";

// Generate viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  colorScheme: "light dark",
};

// Combine all global keywords for base metadata
const allGlobalKeywords = [
  ...SEO_KEYWORDS.global,
  ...SEO_KEYWORDS.primary,
  ...SEO_KEYWORDS.brand,
  ...SEO_KEYWORDS.semantic,
];

// Base metadata for all pages - AI-optimized
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  
  // Basic site info - enriched for AI systems
  title: {
    default: `${SITE_CONFIG.name} - Salon Optyczny Warszawa | Badanie Wzroku | Okulary`,
    template: `%s | ${SITE_CONFIG.name} - Salon Optyczny`,
  },
  description: SITE_CONFIG.description,
  keywords: allGlobalKeywords,
  
  // Authors and creators
  authors: [
    { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    { name: "Prooptica Sp. z o.o." },
  ],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  
  // Robots directives - optimized for maximum indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph - comprehensive configuration for social sharing
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - Salon Optyczny Warszawa, Piaseczno, Grójec`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Profesjonalne salony optyczne w Warszawie, Piasecznie i Grójcu`,
        type: "image/jpeg",
      },
    ],
    countryName: "Poland",
  },
  
  // Twitter Card configuration
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Salon Optyczny | Badanie Wzroku`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
    creator: "@prooptica",
    site: "@prooptica",
  },
  
  // Verification tokens (replace with real values)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // App configuration
  applicationName: SITE_CONFIG.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Category and classification
  category: "Usługi optyczne",
  classification: "Optical Services, Eye Care, Eyewear Retail",
  
  // Manifest
  manifest: "/manifest.json",
  
  // Icons configuration
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  
  // Other important meta tags - enhanced for AI
  other: {
    // Mobile & App
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#C4A77D",
    "msapplication-config": "/browserconfig.xml",
    
    // AI & Semantic signals
    "ai:description": SITE_CONFIG.extendedDescription,
    "ai:category": "Optical Services",
    "ai:location": "Warszawa, Piaseczno, Grójec, Poland",
    
    // Content signals
    "content-language": "pl",
    "audience": "all",
    "coverage": "Mazowieckie, Poland",
    "distribution": "global",
    "rating": "general",
    
    // Business signals
    "business:contact_data:street_address": "ul. Senatorska 22",
    "business:contact_data:locality": "Warszawa",
    "business:contact_data:postal_code": "00-095",
    "business:contact_data:country_name": "Poland",
    "business:contact_data:email": SITE_CONFIG.email,
    "business:contact_data:phone_number": SITE_CONFIG.phone,
    "business:contact_data:website": SITE_CONFIG.url,
    
    // Rich results hints
    "google-site-verification": "your-google-verification-code",
  },
  
  // Alternates for language/canonical
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "pl-PL": SITE_CONFIG.url,
      "pl": SITE_CONFIG.url,
    },
  },
  
  // Abstract (used by some search engines and AI systems)
  abstract: `${SITE_CONFIG.name} to rodzinna sieć salonów optycznych z 20-letnią tradycją. Oferujemy profesjonalne badanie wzroku, markowe oprawy okularowe i soczewki kontaktowe w Warszawie, Piasecznie i Grójcu.`,
};

// Helper function to generate page-specific metadata
export function generatePageMetadata(
  pageKey: PageSEOKey,
  overrides?: Partial<Metadata>
): Metadata {
  const pageSeo = PAGE_SEO[pageKey];
  
  // Map page keys to paths
  const pathMap: Record<PageSEOKey, string> = {
    home: "",
    about: "o-nas",
    eyeExam: "oferta/badanie-wzroku",
    locations: "salony",
    brands: "marki",
    contact: "kontakt",
    articles: "artykuly",
    booking: "umow-wizyte",
  };
  
  const path = pathMap[pageKey];
  const fullUrl = path ? `${SITE_CONFIG.url}/${path}` : SITE_CONFIG.url;
  
  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    
    openGraph: {
      title: pageSeo.title,
      description: pageSeo.description,
      url: fullUrl,
      type: pageKey === "articles" ? "website" : "website",
      images: [
        {
          url: SITE_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: pageSeo.title,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: pageSeo.title,
      description: pageSeo.description,
      images: [SITE_CONFIG.defaultOgImage],
    },
    
    alternates: {
      canonical: fullUrl,
    },
    
    // AI-specific signals per page
    other: {
      "page:type": pageKey,
      "page:section": getPageSection(pageKey),
    },
    
    ...overrides,
  };
}

// Helper to determine page section for AI understanding
function getPageSection(pageKey: PageSEOKey): string {
  const sections: Record<PageSEOKey, string> = {
    home: "Strona główna",
    about: "O firmie",
    eyeExam: "Usługi - Badanie wzroku",
    locations: "Lokalizacje salonów",
    brands: "Marki i produkty",
    contact: "Kontakt",
    articles: "Blog i porady",
    booking: "Rezerwacja wizyt",
  };
  return sections[pageKey];
}

// Helper for article/dynamic pages
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  category?: string;
}): Metadata {
  const fullUrl = `${SITE_CONFIG.url}/artykuly/${article.slug}`;
  
  return {
    title: article.title,
    description: article.description,
    
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: fullUrl,
      images: article.image ? [{ url: article.image, width: 1200, height: 630 }] : undefined,
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.author ? [article.author] : [SITE_CONFIG.name],
      tags: article.tags,
      section: article.category || "Zdrowie oczu",
    },
    
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : undefined,
    },
    
    alternates: {
      canonical: fullUrl,
    },
    
    // Article-specific signals
    other: {
      "article:author": article.author || SITE_CONFIG.name,
      "article:published_time": article.publishedTime || new Date().toISOString(),
      "article:modified_time": article.modifiedTime || new Date().toISOString(),
      "article:section": article.category || "Zdrowie oczu",
      "article:tag": article.tags?.join(", ") || "",
    },
  };
}

// Helper for location pages
export function generateLocationMetadata(location: {
  city: string;
  address: string;
  id: string;
}): Metadata {
  const title = `Salon Optyczny ${location.city} - ${location.address} | Prooptica`;
  const description = `Odwiedź salon optyczny Prooptica w ${location.city} przy ${location.address}. Profesjonalne badanie wzroku od 50 zł, markowe oprawy Ray-Ban, Oakley, soczewki kontaktowe. Umów wizytę online!`;
  const fullUrl = `${SITE_CONFIG.url}/salony/${location.id}`;
  
  return {
    title,
    description,
    keywords: [
      `optyk ${location.city}`,
      `salon optyczny ${location.city}`,
      `badanie wzroku ${location.city}`,
      `okulary ${location.city}`,
      `Prooptica ${location.city}`,
    ],
    
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    
    alternates: {
      canonical: fullUrl,
    },
    
    // Location-specific signals for AI
    other: {
      "geo.region": "PL-MZ",
      "geo.placename": location.city,
      "business:contact_data:street_address": location.address,
      "business:contact_data:locality": location.city,
    },
  };
}

// Generate keywords string for specific contexts
export function generateKeywordsString(
  categories: Array<keyof typeof SEO_KEYWORDS>,
  limit: number = 20
): string {
  const keywords: string[] = [];
  
  for (const category of categories) {
    const catKeywords = SEO_KEYWORDS[category];
    if (Array.isArray(catKeywords)) {
      keywords.push(...catKeywords);
    } else if (typeof catKeywords === "object") {
      for (const subCat of Object.values(catKeywords)) {
        if (Array.isArray(subCat)) {
          keywords.push(...subCat);
        }
      }
    }
  }
  
  // Remove duplicates and limit
  return [...new Set(keywords)].slice(0, limit).join(", ");
}
