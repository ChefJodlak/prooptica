import { Award, Users, Heart, Target, LucideIcon } from "lucide-react"

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface ValueItem {
  icon: LucideIcon
  number: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

export const TIMELINE: TimelineItem[] = [
  { year: "2004", title: "Początek", description: "Otwarcie pierwszego salonu w Warszawie. Realizacja marzenia o własnej firmie optycznej." },
  { year: "2010", title: "Rozwój", description: "Ekspansja do Piaseczna. Wprowadzenie najnowocześniejszego sprzętu diagnostycznego." },
  { year: "2015", title: "Innowacje", description: "Partnerstwo z ZEISS i HOYA. Wprowadzenie soczewek premium." },
  { year: "2020", title: "Dziś", description: "4 salony, 50+ tysięcy zadowolonych klientów, ciągły rozwój i innowacje." }
]

export const VALUES: ValueItem[] = [
  {
    icon: Heart,
    number: "01",
    title: "Pasja",
    description: "Optyka to nasza pasja, którą dzielimy z klientami każdego dnia."
  },
  {
    icon: Award,
    number: "02",
    title: "Jakość",
    description: "Oferujemy tylko najwyższej jakości produkty i usługi."
  },
  {
    icon: Users,
    number: "03",
    title: "Rodzina",
    description: "Jesteśmy firmą rodzinną i tak traktujemy naszych klientów."
  },
  {
    icon: Target,
    number: "04",
    title: "Precyzja",
    description: "Precyzja w diagnozowaniu i doborze okularów to nasz priorytet."
  }
]

export const TEAM: TeamMember[] = [
  { name: "Dr Anna Nowak", role: "Optometrysta", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400" },
  { name: "Mgr Piotr Kowalski", role: "Optyk", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400" },
  { name: "Maria Wiśniewska", role: "Doradca Klienta", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400" },
  { name: "Tomasz Lewandowski", role: "Specjalista Soczewek", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" }
]

export const STATS = [
  { value: "20", suffix: "+", label: "Lat doświadczenia" },
  { value: "50", suffix: "k+", label: "Zadowolonych klientów" },
  { value: "4", suffix: "", label: "Salony premium" },
]

