import type { BrandCategory, Brand, TechPartner } from "./types"

export const BRAND_CATEGORIES: BrandCategory[] = [
  { id: "all", name: "Wszystkie" },
  { id: "luxury", name: "Luksusowe" },
  { id: "premium", name: "Premium" },
  { id: "sport", name: "Sportowe" },
  { id: "lenses", name: "Soczewki" }
]

export const BRANDS: Brand[] = [
  // Luxury brands
  { name: "Prada", category: "luxury", description: "Włoski dom mody z elegancką linią okularów", tier: "Luksusowa" },
  { name: "Saint Laurent", category: "luxury", description: "Paryski dom mody z ikonicznym stylem", tier: "Luksusowa" },
  { name: "Bvlgari", category: "luxury", description: "Włoski jubiler z luksusowymi oprawami", tier: "Luksusowa" },
  { name: "Tom Ford", category: "luxury", description: "Ekskluzywne oprawy dla wymagających klientów", tier: "Luksusowa" },
  { name: "Miu Miu", category: "luxury", description: "Młodsza linia domu Prada", tier: "Luksusowa" },
  { name: "Fendi", category: "luxury", description: "Rzymski dom mody z wyjątkowym designem", tier: "Luksusowa" },
  { name: "Gucci", category: "luxury", description: "Ikoniczna marka z bogatą historią", tier: "Luksusowa" },
  { name: "Dolce Gabbana", category: "luxury", description: "Elegancja i włoski temperament", tier: "Luksusowa" },
  { name: "Versace", category: "luxury", description: "Odważny włoski design premium", tier: "Luksusowa" },
  { name: "Givenchy", category: "luxury", description: "Francuski dom mody z eleganckim stylem", tier: "Luksusowa" },
  { name: "Celine", category: "luxury", description: "Paryska elegancja i minimalizm", tier: "Luksusowa" },
  { name: "Jimmy Choo", category: "luxury", description: "Luksusowa marka z Londynu", tier: "Luksusowa" },
  { name: "Chloe", category: "luxury", description: "Francuski dom mody z romantycznym stylem", tier: "Luksusowa" },
  // Premium brands
  { name: "Max Mara", category: "premium", description: "Włoska elegancja i jakość", tier: "Premium" },
  { name: "Max&Co", category: "premium", description: "Młodszy styl od Max Mara", tier: "Premium" },
  { name: "Furla", category: "premium", description: "Włoska marka z nowoczesnym designem", tier: "Premium" },
  { name: "Roberta Di Camerino", category: "premium", description: "Wenecka tradycja i elegancja", tier: "Premium" },
  { name: "Swarovski", category: "premium", description: "Austriacki kryształ i blask", tier: "Premium" },
  { name: "Carolina Herrera", category: "premium", description: "Wenezuelska elegancja", tier: "Premium" },
  { name: "Tous", category: "premium", description: "Hiszpańska marka z charakterem", tier: "Premium" },
  { name: "Escada", category: "premium", description: "Niemiecka moda luksusowa", tier: "Premium" },
  { name: "Davidoff", category: "premium", description: "Szwajcarska elegancja", tier: "Premium" },
  { name: "Emporio Armani", category: "premium", description: "Młodsza linia Armani", tier: "Premium" },
  { name: "Armani Exchange", category: "premium", description: "Miejski styl Armani", tier: "Premium" },
  { name: "Polo Ralph Lauren", category: "premium", description: "Amerykański klasyk", tier: "Premium" },
  { name: "Montblanc", category: "premium", description: "Szwajcarska precyzja i luksus", tier: "Premium" },
  { name: "Salvatore Ferragamo", category: "premium", description: "Florencka tradycja i elegancja", tier: "Premium" },
  { name: "Ana Hickmann", category: "premium", description: "Brazylijska elegancja", tier: "Premium" },
  { name: "Hickmann", category: "premium", description: "Nowoczesny brazylijski design", tier: "Premium" },
  { name: "Marciano", category: "premium", description: "Elegancka linia Guess", tier: "Premium" },
  { name: "Vogue", category: "premium", description: "Modne oprawy w przystępnej cenie", tier: "Premium" },
  { name: "Ray Ban", category: "premium", description: "Kultowa marka okularów znana na całym świecie", tier: "Premium" },
  { name: "Guess", category: "premium", description: "Amerykański styl i glamour", tier: "Premium" },
  { name: "Tag Heuer", category: "premium", description: "Szwajcarska precyzja sportowa", tier: "Premium" },
  { name: "Silhouette", category: "premium", description: "Austriacka lekkość i minimalizm", tier: "Premium" },
  // Designer brands
  { name: "Woodys", category: "premium", description: "Barcelońska marka z naturalnych materiałów", tier: "Premium" },
  { name: "Etnia Barcelona", category: "premium", description: "Kolorowe oprawy z Barcelony", tier: "Premium" },
  { name: "Chroma", category: "premium", description: "Nowoczesny design i kolory", tier: "Premium" },
  { name: "Yaleya", category: "premium", description: "Wyjątkowy design", tier: "Premium" },
  // House brands
  { name: "Wes", category: "premium", description: "Kolekcja Prooptica", tier: "Premium" },
  { name: "Tan", category: "premium", description: "Kolekcja Prooptica", tier: "Premium" },
  { name: "Wes XS", category: "premium", description: "Kolekcja dziecięca Prooptica", tier: "Premium" },
  { name: "Tan Clip", category: "premium", description: "Kolekcja z nakładkami Prooptica", tier: "Premium" },
  { name: "Lucas", category: "premium", description: "Kolekcja Prooptica", tier: "Premium" },
  { name: "Lucas XS", category: "premium", description: "Kolekcja dziecięca Prooptica", tier: "Premium" },
  { name: "Verdo", category: "premium", description: "Kolekcja Prooptica", tier: "Premium" },
  { name: "Lucky Ducky", category: "premium", description: "Kolekcja dziecięca Prooptica", tier: "Premium" },
  // Lenses
  { name: "ZEISS", category: "lenses", description: "Światowy lider technologii optycznej", tier: "Technologia" },
  { name: "HOYA", category: "lenses", description: "Japońska precyzja w soczewkach", tier: "Technologia" },
  { name: "Essilor", category: "lenses", description: "Innowacyjne rozwiązania dla wzroku", tier: "Technologia" }
]

import { NOISE_TEXTURE } from "@/lib/constants/ui"

export const TECH_PARTNERS: TechPartner[] = [
  { name: "ZEISS", description: "Lider w precyzyjnej optyce i rozwiązaniach wizyjnych. Niemiecka jakość od 1846 roku." },
  { name: "HOYA", description: "Japońska innowacja w produkcji soczewek okularowych i rozwiązań medycznych." },
  { name: "Essilor", description: "Francuski gigant optyczny. Twórcy soczewek Varilux i Transitions." }
]

export const NOISE_TEXTURE_BG = NOISE_TEXTURE

