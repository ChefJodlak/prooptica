import { Scan, Eye, Activity, Shield } from "lucide-react"

export const EXAM_FEATURES = [
  {
    icon: Scan,
    title: "Precyzyjny pomiar wady wzroku",
    description: "Wykorzystujemy najnowocześniejsze autorefraktometry do dokładnego pomiaru wady refrakcji."
  },
  {
    icon: Eye,
    title: "Badanie dna oka",
    description: "Nieinwazyjna diagnostyka siatkówki i nerwu wzrokowego przy pomocy kamery fundus."
  },
  {
    icon: Activity,
    title: "Pomiar ciśnienia wewnątrzgałkowego",
    description: "Wczesne wykrywanie jaskry dzięki bezdotykowej tonometrii."
  },
  {
    icon: Shield,
    title: "Dobór soczewek kontaktowych",
    description: "Profesjonalne dopasowanie soczewek z uwzględnieniem krzywizny rogówki."
  }
]

export const PROCESS_STEPS = [
  { number: "01", title: "Wywiad", description: "Rozmowa o historii wzroku i potrzebach" },
  { number: "02", title: "Badanie", description: "Kompleksowa diagnostyka przy użyciu nowoczesnego sprzętu" },
  { number: "03", title: "Analiza", description: "Omówienie wyników i rekomendacji" },
  { number: "04", title: "Dobór", description: "Profesjonalne doradztwo w wyborze okularów" }
]

export const PRICING_PLANS = [
  {
    name: "Przy zakupie okularów",
    price: "GRATIS*",
    note: "*przy zakupie okularów",
    features: ["Pełna diagnostyka", "Badanie dna oka", "Pomiar ciśnienia", "Tonometria", "Konsultacja specjalisty"],
    popular: true
  },
  {
    name: "Badanie standardowe",
    price: "149 zł",
    note: "",
    features: ["Pełna diagnostyka", "Badanie dna oka", "Pomiar ciśnienia", "Tonometria", "Konsultacja specjalisty"],
    popular: false
  }
]

export const HERO_STATS = [
  { icon: "Clock", text: "30-45 min" },
  { icon: "Award", text: "Certyfikowani specjaliści" },
  { icon: "Shield", text: "Pełna diagnostyka" }
] as const

