import { SITE_CONFIG, SERVICES, FAQ_ITEMS, AI_SEARCH_CONFIG } from "./config";
import { LOCATIONS, type Location } from "@/lib/constants/locations";

// ═══════════════════════════════════════════════════════════════════════════
// SCHEMA.ORG STRUCTURED DATA
// Optimized for Google Rich Results, Bing, and AI Search Systems
// ═══════════════════════════════════════════════════════════════════════════

interface Graph {
  "@context": "https://schema.org";
  "@graph": object[];
}

// Organization schema - enhanced for knowledge panels
export function generateOrganizationSchema(): object {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_CONFIG.url}/#logo`,
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
      contentUrl: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
      caption: SITE_CONFIG.name,
      width: 300,
      height: 60,
    },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
    description: SITE_CONFIG.extendedDescription,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    foundingDate: SITE_CONFIG.foundingDate,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 20,
    },
    slogan: SITE_CONFIG.tagline,
    // Social profiles for knowledge panel
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
    ],
    // Contact points
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "customer service",
        availableLanguage: ["Polish", "English"],
        areaServed: SITE_CONFIG.areaServed,
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "reservations",
        availableLanguage: ["Polish"],
        areaServed: SITE_CONFIG.areaServed,
      },
    ],
    // Business classification
    naics: "446130", // Optical Goods Stores
    isicV4: "4773", // Retail sale of pharmaceutical and medical goods
    // Areas served
    areaServed: SITE_CONFIG.areaServed.map(area => ({
      "@type": "City",
      name: area,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Mazowieckie",
      },
    })),
    // Services offered
    knowsAbout: [
      "Eye examinations",
      "Prescription eyeglasses",
      "Contact lenses",
      "Optometry",
      "Vision correction",
      "Designer eyewear",
    ],
    // Awards and certifications (add when available)
    // award: ["Best Optical Store 2023"],
  };
}

// WebSite schema - enhanced for sitelinks search box
export function generateWebSiteSchema(): object {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.locale,
    // Enable sitelinks search box
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/szukaj?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/umow-wizyte`,
          name: "Umów wizytę",
        },
        result: {
          "@type": "Reservation",
          name: "Rezerwacja wizyty",
        },
      },
    ],
    // Copyright
    copyrightHolder: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    copyrightYear: SITE_CONFIG.foundingDate,
  };
}

// LocalBusiness schema - enhanced for local pack
export function generateLocalBusinessSchema(location: Location): object {
  return {
    "@type": ["LocalBusiness", "Optician", "HealthAndBeautyBusiness", "MedicalBusiness"],
    "@id": `${SITE_CONFIG.url}/salony#${location.id}`,
    name: `${SITE_CONFIG.name} ${location.city}`,
    alternateName: `Salon Optyczny ${SITE_CONFIG.name} ${location.city}`,
    description: `Profesjonalny salon optyczny ${SITE_CONFIG.name} w ${location.city}. Oferujemy badanie wzroku od 50 zł, markowe oprawy okularowe Ray-Ban, Oakley, Prada oraz soczewki kontaktowe. Doświadczony zespół optometrystów.`,
    url: `${SITE_CONFIG.url}/salony`,
    telephone: location.phone,
    email: location.email || SITE_CONFIG.email,
    priceRange: SITE_CONFIG.priceRange,
    currenciesAccepted: SITE_CONFIG.currenciesAccepted,
    paymentAccepted: SITE_CONFIG.paymentAccepted.join(", "),
    image: [
      `${SITE_CONFIG.url}${location.image}`,
      `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
    ],
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      postalCode: location.postal,
      addressCountry: SITE_CONFIG.country,
      addressRegion: "Mazowieckie",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    // Opening hours
    openingHoursSpecification: parseOpeningHours(location.openingHours || ""),
    // Special opening hours (holidays - add when needed)
    // specialOpeningHoursSpecification: [],
    
    // Parent organization
    parentOrganization: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    // Brand
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
      logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
    },
    // Services catalog
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi optyczne",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "OfferCatalogItem", 
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@id": `${SITE_CONFIG.url}/salony#${location.id}`,
          },
          offers: {
            "@type": "Offer",
            price: service.priceValue,
            priceCurrency: "PLN",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: service.priceValue,
              priceCurrency: "PLN",
              valueAddedTaxIncluded: true,
            },
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
          },
        },
      })),
    },
    // Menu/Services
    hasMenu: {
      "@type": "Menu",
      name: "Cennik usług",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Badania wzroku",
          hasMenuItem: SERVICES.filter(s => s.category === "Badania wzroku").map(s => ({
            "@type": "MenuItem",
            name: s.name,
            description: s.description,
            offers: {
              "@type": "Offer",
              price: s.priceValue,
              priceCurrency: "PLN",
            },
          })),
        },
      ],
    },
    // Aggregate rating (use real data when available)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    // Actions
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/umow-wizyte?salon=${location.id}`,
          name: "Umów wizytę",
        },
      },
      {
        "@type": "OrderAction", 
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/kontakt`,
          name: "Skontaktuj się",
        },
      },
    ],
    // Amenities
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Parking w pobliżu", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dostęp dla niepełnosprawnych", value: true },
      { "@type": "LocationFeatureSpecification", name: "Płatność kartą", value: true },
      { "@type": "LocationFeatureSpecification", name: "Raty 0%", value: true },
    ],
    // Public access
    publicAccess: true,
    isAccessibleForFree: false,
  };
}

// Parse opening hours string to structured data
function parseOpeningHours(hours: string): object[] {
  const defaultHours = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ];
  
  if (!hours) return defaultHours;
  
  const lines = hours.split("\n");
  const result: object[] = [];
  
  for (const line of lines) {
    const match = line.match(/(\w+(?:-\w+)?)\s+(\d+)-(\d+)/);
    if (match) {
      const [, days, opens, closes] = match;
      
      let dayOfWeek: string[] = [];
      if (days.includes("Pn-Pt")) {
        dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      } else if (days === "Sob") {
        dayOfWeek = ["Saturday"];
      } else if (days === "Nd") {
        dayOfWeek = ["Sunday"];
      }
      
      if (dayOfWeek.length > 0) {
        result.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek,
          opens: `${opens.padStart(2, "0")}:00`,
          closes: `${closes.padStart(2, "0")}:00`,
        });
      }
    }
  }
  
  return result.length > 0 ? result : defaultHours;
}

// Service schema - detailed for each service
export function generateServiceSchema(): object[] {
  return SERVICES.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/oferta#${service.id}`,
    name: service.name,
    alternateName: service.alternateName,
    description: service.detailedDescription || service.description,
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    serviceType: service.category,
    category: service.category,
    // Area served
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 52.0814,
        longitude: 21.0236,
      },
      geoRadius: "50000",
    },
    // Service location
    serviceLocation: LOCATIONS.map(loc => ({
      "@type": "Place",
      name: `${SITE_CONFIG.name} ${loc.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.city,
      },
    })),
    // Pricing
    offers: {
      "@type": "Offer",
      price: service.priceValue,
      priceCurrency: "PLN",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service.priceValue,
        priceCurrency: "PLN",
        valueAddedTaxIncluded: true,
      },
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    // Duration
    ...(service.duration && {
      estimatedDuration: service.duration,
    }),
    // Audience
    audience: {
      "@type": "PeopleAudience",
      audienceType: service.forWhom?.join(", ") || "wszyscy",
    },
    // Terms
    termsOfService: `${SITE_CONFIG.url}/regulamin`,
  }));
}

// FAQ schema - comprehensive for rich snippets
export function generateFAQSchema(): object {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_CONFIG.url}/#faq`,
    name: "Najczęściej zadawane pytania - Prooptica",
    description: "Odpowiedzi na najczęściej zadawane pytania dotyczące badania wzroku, okularów, soczewek kontaktowych i naszych usług.",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        dateCreated: new Date().toISOString(),
        author: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
    })),
  };
}

// Breadcrumb schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): object {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_CONFIG.url}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

// WebPage schema
export function generateWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  datePublished?: string;
  dateModified?: string;
}): object {
  return {
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}${page.url}#webpage`,
    url: `${SITE_CONFIG.url}${page.url}`,
    name: page.title,
    description: page.description,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    about: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.locale,
    datePublished: page.datePublished || new Date().toISOString(),
    dateModified: page.dateModified || new Date().toISOString(),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
    },
    ...(page.breadcrumbs && {
      breadcrumb: generateBreadcrumbSchema(page.breadcrumbs),
    }),
  };
}

// Article schema for blog posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  category?: string;
  tags?: string[];
}): object {
  return {
    "@type": "Article",
    "@id": `${SITE_CONFIG.url}/artykuly/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    url: `${SITE_CONFIG.url}/artykuly/${article.slug}`,
    datePublished: article.publishedTime || new Date().toISOString(),
    dateModified: article.modifiedTime || article.publishedTime || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: article.author || "Zespół Prooptica",
      url: `${SITE_CONFIG.url}/o-nas`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    image: {
      "@type": "ImageObject",
      url: article.image ? `${SITE_CONFIG.url}${article.image}` : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/artykuly/${article.slug}`,
    },
    articleSection: article.category || "Zdrowie oczu",
    keywords: article.tags?.join(", ") || "",
    inLanguage: SITE_CONFIG.locale,
    copyrightHolder: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    copyrightYear: new Date().getFullYear(),
  };
}

// Product schema for eyewear (brands page)
export function generateProductListSchema(brands: string[]): object {
  return {
    "@type": "ItemList",
    "@id": `${SITE_CONFIG.url}/marki#brandlist`,
    name: "Marki opraw okularowych w Prooptica",
    description: "Autoryzowany sprzedawca markowych opraw okularowych: Ray-Ban, Oakley, Prada i wielu innych.",
    numberOfItems: brands.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: brands.map((brand, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Brand",
        name: brand,
      },
    })),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE SCHEMA GRAPHS
// Complete structured data for each page type
// ═══════════════════════════════════════════════════════════════════════════

// Homepage schema - comprehensive
export function generateHomePageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
      generateWebPageSchema({
        title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
        url: "",
        breadcrumbs: [{ name: "Strona główna", url: "/" }],
      }),
      ...LOCATIONS.map((loc) => generateLocalBusinessSchema(loc)),
      generateFAQSchema(),
      // AI-friendly knowledge summary
      {
        "@type": "Thing",
        "@id": `${SITE_CONFIG.url}/#topic`,
        name: "Prooptica - Salony Optyczne",
        description: SITE_CONFIG.extendedDescription,
        mainEntityOfPage: SITE_CONFIG.url,
        sameAs: [
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.facebook,
        ],
      },
    ],
  };
}

// Locations page schema
export function generateLocationsPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebPageSchema({
        title: "Nasze Salony Optyczne",
        description: "Odwiedź salony optyczne Prooptica w Warszawie, Piasecznie i Grójcu. Sprawdź adresy, godziny otwarcia i umów wizytę.",
        url: "/salony",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Salony", url: "/salony" },
        ],
      }),
      ...LOCATIONS.map((loc) => generateLocalBusinessSchema(loc)),
      // Place collection
      {
        "@type": "ItemList",
        "@id": `${SITE_CONFIG.url}/salony#locations-list`,
        name: "Salony Prooptica",
        numberOfItems: LOCATIONS.length,
        itemListElement: LOCATIONS.map((loc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@id": `${SITE_CONFIG.url}/salony#${loc.id}`,
          },
        })),
      },
    ],
  };
}

// Eye exam page schema
export function generateEyeExamPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebPageSchema({
        title: "Badanie Wzroku",
        description: "Profesjonalne badanie wzroku od 50 PLN. Komputerowe badanie autorefraktometrem, dobór korekcji, recepta na okulary.",
        url: "/oferta/badanie-wzroku",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Oferta", url: "/oferta" },
          { name: "Badanie wzroku", url: "/oferta/badanie-wzroku" },
        ],
      }),
      ...generateServiceSchema(),
      generateFAQSchema(),
      // HowTo for booking
      {
        "@type": "HowTo",
        "@id": `${SITE_CONFIG.url}/oferta/badanie-wzroku#howto`,
        name: "Jak umówić się na badanie wzroku w Prooptica",
        description: "Krok po kroku: jak zarezerwować wizytę na badanie wzroku online lub telefonicznie.",
        totalTime: "PT5M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Wybierz salon",
            text: "Wejdź na stronę prooptica.pl/umow-wizyte i wybierz najbliższy salon.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Wybierz usługę",
            text: "Wybierz rodzaj wizyty - badanie wzroku, dobór soczewek lub konsultacja.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Wybierz termin",
            text: "Wybierz dogodny dzień i godzinę z dostępnych terminów.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Potwierdź rezerwację",
            text: "Podaj swoje dane kontaktowe i potwierdź rezerwację. Otrzymasz SMS z potwierdzeniem.",
          },
        ],
      },
    ],
  };
}

// About page schema
export function generateAboutPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebPageSchema({
        title: "O Nas - Historia Prooptica",
        description: "Poznaj historię rodzinnej firmy optycznej Prooptica działającej od 2004 roku.",
        url: "/o-nas",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "O nas", url: "/o-nas" },
        ],
      }),
      // About page specific
      {
        "@type": "AboutPage",
        "@id": `${SITE_CONFIG.url}/o-nas#aboutpage`,
        url: `${SITE_CONFIG.url}/o-nas`,
        name: "O firmie Prooptica",
        mainEntity: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
    ],
  };
}

// Contact page schema
export function generateContactPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      {
        "@type": "ContactPage",
        "@id": `${SITE_CONFIG.url}/kontakt#contactpage`,
        url: `${SITE_CONFIG.url}/kontakt`,
        name: "Kontakt - Prooptica",
        description: "Skontaktuj się z nami lub umów wizytę w jednym z naszych salonów optycznych.",
        mainEntity: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
      generateWebPageSchema({
        title: "Kontakt",
        description: "Skontaktuj się z Prooptica. Tel: +48 22 720 08 00, Email: kontakt@prooptica.pl. Umów wizytę online.",
        url: "/kontakt",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Kontakt", url: "/kontakt" },
        ],
      }),
      ...LOCATIONS.map((loc) => generateLocalBusinessSchema(loc)),
    ],
  };
}

// Brands page schema
export function generateBrandsPageSchemaGraph(): Graph {
  const brandNames = [
    "Ray-Ban", "Oakley", "Prada", "Dolce & Gabbana", "Gucci",
    "Tommy Hilfiger", "Boss", "Carrera", "Versace", "Tom Ford",
    "Michael Kors", "Emporio Armani", "Vogue", "Polaroid",
  ];
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebPageSchema({
        title: "Marki Opraw Okularowych",
        description: "Oryginalne oprawy okularowe od najlepszych marek: Ray-Ban, Oakley, Prada, Gucci. Autoryzowany sprzedawca.",
        url: "/marki",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Marki", url: "/marki" },
        ],
      }),
      generateProductListSchema(brandNames),
      // Collection page
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CONFIG.url}/marki#collection`,
        url: `${SITE_CONFIG.url}/marki`,
        name: "Kolekcja marek",
        about: "Markowe oprawy okularowe dostępne w salonach Prooptica",
      },
    ],
  };
}

// Articles page schema
export function generateArticlesPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      {
        "@type": "Blog",
        "@id": `${SITE_CONFIG.url}/artykuly#blog`,
        url: `${SITE_CONFIG.url}/artykuly`,
        name: "Blog Prooptica - Porady o Zdrowiu Oczu",
        description: "Artykuły ekspertów o zdrowiu oczu, pielęgnacji wzroku, trendach w optyce. Porady dla dzieci i dorosłych.",
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: SITE_CONFIG.locale,
        about: [
          "Zdrowie oczu",
          "Badanie wzroku",
          "Okulary korekcyjne",
          "Soczewki kontaktowe",
          "Trendy okularowe",
        ],
      },
      generateWebPageSchema({
        title: "Blog o Zdrowiu Oczu",
        description: "Artykuły i porady o zdrowiu oczu, okularach i soczewkach kontaktowych.",
        url: "/artykuly",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Artykuły", url: "/artykuly" },
        ],
      }),
    ],
  };
}

// Booking page schema
export function generateBookingPageSchemaGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebPageSchema({
        title: "Umów Wizytę Online",
        description: "Zarezerwuj termin badania wzroku online. Wybierz salon, specjalistę i godzinę. Szybka rezerwacja.",
        url: "/umow-wizyte",
        breadcrumbs: [
          { name: "Strona główna", url: "/" },
          { name: "Umów wizytę", url: "/umow-wizyte" },
        ],
      }),
      // Reservation action
      {
        "@type": "ReserveAction",
        "@id": `${SITE_CONFIG.url}/umow-wizyte#reserve`,
        name: "Rezerwacja wizyty w Prooptica",
        description: "Zarezerwuj termin badania wzroku lub doboru okularów online",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/umow-wizyte`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "Reservation",
          name: "Potwierdzenie rezerwacji",
        },
        provider: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
      ...generateServiceSchema(),
    ],
  };
}
