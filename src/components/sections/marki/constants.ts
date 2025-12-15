import type { BrandCategory, Brand, TechPartner } from "./types"

export const BRAND_CATEGORIES: BrandCategory[] = [
  { id: "all", name: "Wszystkie" },
  { id: "luxury", name: "Luksusowe" },
  { id: "premium", name: "Premium" },
  { id: "sport", name: "Sportowe" },
  { id: "lenses", name: "Soczewki" }
]

export const BRANDS: Brand[] = [
  { name: "Ray-Ban", category: "premium", description: "Kultowa marka okularów znana na całym świecie", tier: "Premium" },
  { name: "Oakley", category: "sport", description: "Innowacyjne okulary sportowe najwyższej jakości", tier: "Sport" },
  { name: "Prada", category: "luxury", description: "Włoski dom mody z elegancką linią okularów", tier: "Luksusowa" },
  { name: "Tom Ford", category: "luxury", description: "Ekskluzywne oprawy dla wymagających klientów", tier: "Luksusowa" },
  { name: "Gucci", category: "luxury", description: "Ikoniczna marka z bogatą historią", tier: "Luksusowa" },
  { name: "Versace", category: "luxury", description: "Odważny włoski design premium", tier: "Luksusowa" },
  { name: "Persol", category: "premium", description: "Ręcznie wykonywane okulary z Włoch", tier: "Premium" },
  { name: "Dolce & Gabbana", category: "luxury", description: "Elegancja i włoski temperament", tier: "Luksusowa" },
  { name: "Burberry", category: "luxury", description: "Brytyjska elegancja i tradycja", tier: "Luksusowa" },
  { name: "Armani", category: "luxury", description: "Minimalistyczny luksus z Mediolanu", tier: "Luksusowa" },
  { name: "ZEISS", category: "lenses", description: "Światowy lider technologii optycznej", tier: "Technologia" },
  { name: "HOYA", category: "lenses", description: "Japońska precyzja w soczewkach", tier: "Technologia" },
  { name: "Essilor", category: "lenses", description: "Innowacyjne rozwiązania dla wzroku", tier: "Technologia" },
  { name: "Carrera", category: "sport", description: "Sportowy styl i funkcjonalność", tier: "Sport" },
  { name: "Boss", category: "premium", description: "Biznesowa elegancja w każdym detalu", tier: "Premium" },
  { name: "Michael Kors", category: "premium", description: "Amerykański glamour i luksus", tier: "Premium" }
]

import { NOISE_TEXTURE } from "@/lib/constants/ui"

export const TECH_PARTNERS: TechPartner[] = [
  { name: "ZEISS", description: "Lider w precyzyjnej optyce i rozwiązaniach wizyjnych. Niemiecka jakość od 1846 roku." },
  { name: "HOYA", description: "Japońska innowacja w produkcji soczewek okularowych i rozwiązań medycznych." },
  { name: "Essilor", description: "Francuski gigant optyczny. Twórcy soczewek Varilux i Transitions." }
]

export const NOISE_TEXTURE_BG = NOISE_TEXTURE

