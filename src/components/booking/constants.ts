import type { Salon, Specialist, Service } from './types'

// ═══════════════════════════════════════════════════════════════════════════
// SALONS DATA
// ═══════════════════════════════════════════════════════════════════════════

export const SALONS: Salon[] = [
  {
    id: "warszawa",
    city: "Warszawa",
    address: "ul. Senatorska 22",
    postal: "00-095",
  },
  {
    id: "piaseczno-pulawska",
    city: "Piaseczno",
    address: "ul. Puławska 20",
    postal: "05-500",
  },
  {
    id: "piaseczno-wojska",
    city: "Piaseczno",
    address: "ul. Wojska Polskiego 28",
    postal: "05-500",
  },
  {
    id: "grojec",
    city: "Grójec",
    address: "ul. Piłsudskiego 2",
    postal: "05-600",
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// SERVICES DATA
// ═══════════════════════════════════════════════════════════════════════════

export const SERVICES: Service[] = [
  {
    id: "konsultacja-optometryczna",
    name: "Konsultacja Optometryczna",
    description: "Kompleksowe badanie wzroku z doborem korekcji",
    availableInSalons: ["warszawa", "piaseczno-pulawska", "piaseczno-wojska", "grojec"],
    requiresPhoneBooking: false,
  },
  {
    id: "dobor-soczewek",
    name: "Dobór soczewek kontaktowych",
    description: "Profesjonalny dobór i dopasowanie soczewek kontaktowych",
    availableInSalons: ["warszawa", "piaseczno-pulawska", "piaseczno-wojska", "grojec"],
    requiresPhoneBooking: true,
  },
  {
    id: "terapia-wzroku",
    name: "Terapia wzroku",
    description: "Ćwiczenia i rehabilitacja układu wzrokowego",
    availableInSalons: ["warszawa", "piaseczno-pulawska", "piaseczno-wojska", "grojec"],
    requiresPhoneBooking: true,
  },
  {
    id: "badanie-dziecka",
    name: "Badanie wzroku dziecka",
    description: "Specjalistyczne badanie wzroku dla dzieci",
    availableInSalons: ["piaseczno-pulawska"],
    requiresPhoneBooking: true,
    specialistIds: ["gan-pirwitz"],
  },
  {
    id: "wizyta-okulistyczna",
    name: "Wizyta Okulistyczna",
    description: "Konsultacja z lekarzem okulistą",
    availableInSalons: ["piaseczno-pulawska"],
    requiresPhoneBooking: true,
    specialistIds: ["gan-pirwitz"],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// SPECIALISTS DATA
// ═══════════════════════════════════════════════════════════════════════════

export const SPECIALISTS: Specialist[] = [
  {
    id: "kapela",
    name: "mgr inż. Daria Kapela",
    title: "Optometrysta",
    salonId: "warszawa",
  },
  {
    id: "grochal",
    name: "Katarzyna Grochal",
    title: "Optometrysta / Ortoptysta",
    salonId: "piaseczno-pulawska",
  },
  {
    id: "ponichtera",
    name: "Jarosław Ponichtera",
    title: "Optometrysta",
    salonId: "piaseczno-wojska",
  },
  {
    id: "gan-pirwitz",
    name: "lek. med. Bożenna Gan Pirwitz",
    title: "Okulista",
    salonId: "piaseczno-pulawska",
  },
  {
    id: "szynkiewicz",
    name: "mgr Laura Szynkiewicz",
    title: "Optometrysta",
    salonId: "grojec",
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

