import { Eye, Monitor, Sun } from "lucide-react"
import { Article, Category } from "./types"

export const CATEGORIES: Category[] = [
  { id: "all", name: "Wszystkie", icon: null },
  { id: "zdrowie", name: "Zdrowie oczu", icon: Eye },
  { id: "technologia", name: "Technologia", icon: Monitor },
  { id: "styl", name: "Styl życia", icon: Sun }
]

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "jak-dbac-o-wzrok-pracujac-przy-komputerze",
    title: "Jak dbać o wzrok pracując przy komputerze?",
    excerpt: "Praktyczne porady dla osób spędzających dużo czasu przed ekranem. Dowiedz się, jak chronić swoje oczy.",
    category: "zdrowie",
    readTime: "5 min",
    date: "15 Lis 2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800"
  },
  {
    id: "2",
    slug: "trendy-w-oprawach-okularowych-na-2025-rok",
    title: "Trendy w oprawach okularowych na 2025 rok",
    excerpt: "Poznaj najmodniejsze style i kształty opraw, które będą dominować w nadchodzącym sezonie.",
    category: "styl",
    readTime: "4 min",
    date: "12 Lis 2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800"
  },
  {
    id: "3",
    slug: "soczewki-progresywne-wszystko-co-musisz-wiedziec",
    title: "Soczewki progresywne - wszystko co musisz wiedzieć",
    excerpt: "Kompletny przewodnik po soczewkach wieloogniskowych. Dla kogo są odpowiednie i jak się do nich przyzwyczaić.",
    category: "technologia",
    readTime: "8 min",
    date: "10 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800"
  },
  {
    id: "4",
    slug: "ochrona-przed-niebieskim-swiatlem-fakty-i-mity",
    title: "Ochrona przed niebieskim światłem - fakty i mity",
    excerpt: "Czy filtry blue light naprawdę działają? Rozwiewamy wątpliwości i przedstawiamy naukowe dowody.",
    category: "zdrowie",
    readTime: "6 min",
    date: "8 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800"
  },
  {
    id: "5",
    slug: "jak-wybrac-idealne-okulary-przeciwsloneczne",
    title: "Jak wybrać idealne okulary przeciwsłoneczne?",
    excerpt: "Nie tylko styl, ale przede wszystkim ochrona. Na co zwrócić uwagę przy wyborze okularów na lato.",
    category: "styl",
    readTime: "5 min",
    date: "5 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800"
  },
  {
    id: "6",
    slug: "innowacje-zeiss-w-technologii-soczewek",
    title: "Innowacje ZEISS w technologii soczewek",
    excerpt: "Przegląd najnowszych osiągnięć technologicznych niemieckiego lidera w optyce precyzyjnej.",
    category: "technologia",
    readTime: "7 min",
    date: "1 Lis 2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"
  }
]

