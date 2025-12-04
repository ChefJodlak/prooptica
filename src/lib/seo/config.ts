// SEO Configuration - Centralized site-wide SEO settings
// Optimized for Google, Bing, and AI search systems (ChatGPT, Perplexity, Google AI Overviews)

export const SITE_CONFIG = {
  // Basic site information
  name: "Prooptica",
  legalName: "Prooptica Sp. z o.o.",
  tagline: "Twoje Oczy. Nasza Pasja.",
  description: "Rodzinna firma optyczna z 20-letnią tradycją. Profesjonalne badanie wzroku, markowe oprawy i soczewki kontaktowe. Salony w Warszawie, Piasecznie i Grójcu. Umów wizytę online.",
  shortDescription: "Profesjonalne usługi optyczne od 2004 roku.",
  
  // Extended description for AI systems
  extendedDescription: `Prooptica to sieć rodzinnych salonów optycznych działających od 2004 roku w województwie mazowieckim. 
  Specjalizujemy się w profesjonalnym badaniu wzroku z wykorzystaniem nowoczesnego sprzętu diagnostycznego, 
  doborze okularów korekcyjnych i przeciwsłonecznych od renomowanych marek oraz profesjonalnej obsłudze soczewek kontaktowych.
  Nasze salony znajdują się w Warszawie przy ul. Senatorskiej, w Piasecznie przy ul. Wojska Polskiego i ul. Puławskiej oraz w Grójcu przy ul. Piłsudskiego.
  Oferujemy kompleksową opiekę okulistyczną dla całej rodziny - od dzieci po seniorów.`,
  
  // URLs
  url: "https://prooptica.pl",
  
  // Contact information
  email: "kontakt@prooptica.pl",
  phone: "+48 22 720 08 00",
  phoneFormatted: "22 720 08 00",
  
  // Social media
  social: {
    instagram: "https://instagram.com/prooptica",
    facebook: "https://facebook.com/prooptica",
  },
  
  // Business details
  foundingDate: "2004",
  priceRange: "$$",
  currenciesAccepted: "PLN",
  paymentAccepted: ["Gotówka", "Karta płatnicza", "BLIK", "Przelew", "Raty"],
  
  // Geographic coverage - Enhanced for local SEO
  areaServed: [
    "Warszawa", 
    "Piaseczno", 
    "Grójec", 
    "Mazowieckie",
    "Centrum Warszawy",
    "Mokotów",
    "Ursynów",
    "Wilanów",
    "Konstancin-Jeziorna",
    "Lesznowola",
    "Góra Kalwaria",
    "Tarczyn",
  ],
  
  // Default images for Open Graph
  defaultOgImage: "/og-image.jpg",
  logoUrl: "/logo-prooptica.svg",
  
  // Locale settings
  locale: "pl_PL",
  language: "pl",
  country: "PL",
  
  // Business identifiers (add real values when available)
  // vatID: "PL1234567890",
  // nip: "123-456-78-90",
  // regon: "123456789",
  // krs: "0000123456",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE KEYWORD STRATEGY
// Optimized for Polish market, local SEO, and AI search systems
// ═══════════════════════════════════════════════════════════════════════════

export const SEO_KEYWORDS = {
  // Primary keywords - high volume, high competition
  primary: [
    "optyk Warszawa",
    "salon optyczny Piaseczno",
    "badanie wzroku Warszawa",
    "okulary korekcyjne Warszawa",
    "soczewki kontaktowe Warszawa",
  ],
  
  // Brand keywords
  brand: [
    "Prooptica",
    "Prooptica Warszawa",
    "Prooptica Piaseczno", 
    "Prooptica Grójec",
    "salon optyczny Prooptica",
  ],
  
  // Location-based keywords - critical for local SEO
  locations: {
    warszawa: [
      "optyk Warszawa centrum",
      "optyk Warszawa Senatorska",
      "badanie wzroku Warszawa Śródmieście",
      "okulary Warszawa centrum",
      "salon optyczny Warszawa centrum",
      "dobry optyk Warszawa",
      "najlepszy optyk Warszawa",
      "optyk blisko mnie Warszawa",
      "okulary korekcyjne Warszawa centrum",
      "soczewki kontaktowe Warszawa",
    ],
    piaseczno: [
      "optyk Piaseczno",
      "badanie wzroku Piaseczno",
      "okulary Piaseczno",
      "salon optyczny Piaseczno",
      "soczewki kontaktowe Piaseczno",
      "optyk Piaseczno Wojska Polskiego",
      "optyk Piaseczno Puławska",
      "dobry optyk Piaseczno",
      "okulary korekcyjne Piaseczno",
    ],
    grojec: [
      "optyk Grójec",
      "badanie wzroku Grójec",
      "okulary Grójec",
      "salon optyczny Grójec",
      "optyk Grójec Piłsudskiego",
      "okulary korekcyjne Grójec",
      "soczewki kontaktowe Grójec",
    ],
    nearby: [
      "optyk Konstancin-Jeziorna",
      "optyk Ursynów",
      "optyk Mokotów",
      "optyk Wilanów",
      "optyk Lesznowola",
      "optyk Góra Kalwaria",
      "optyk Tarczyn",
      "optyk powiat piaseczyński",
      "optyk powiat grójecki",
    ],
  },
  
  // Eye exam keywords - comprehensive
  eyeExam: [
    // Primary
    "badanie wzroku",
    "badanie wzroku cena",
    "badanie wzroku Warszawa cena",
    "badanie wzroku dla dorosłych",
    "badanie wzroku dla dzieci",
    "badanie wzroku dla seniorów",
    
    // Types of exams
    "komputerowe badanie wzroku",
    "badanie autorefraktometrem",
    "badanie dna oka",
    "badanie ciśnienia oka",
    "badanie pola widzenia",
    "badanie widzenia barwnego",
    "badanie ostrości wzroku",
    
    // Intent-based
    "gdzie zbadać wzrok",
    "gdzie zbadać wzrok w Warszawie",
    "ile kosztuje badanie wzroku",
    "czy badanie wzroku jest bezpłatne",
    "badanie wzroku bez skierowania",
    "badanie wzroku na prawo jazdy",
    "badanie wzroku do pracy",
    "szybkie badanie wzroku",
    "profesjonalne badanie wzroku",
    
    // Professionals
    "optometrysta Warszawa",
    "optometrysta Piaseczno",
    "okulista bez kolejki",
    "dobór korekcji wzroku",
    "recepta na okulary",
    "recepta na soczewki",
  ],
  
  // Glasses keywords - comprehensive
  glasses: [
    // Primary
    "okulary korekcyjne",
    "okulary korekcyjne damskie",
    "okulary korekcyjne męskie",
    "okulary korekcyjne dziecięce",
    "okulary korekcyjne cena",
    
    // Types
    "okulary progresywne",
    "okulary do czytania",
    "okulary do komputera",
    "okulary do pracy",
    "okulary antyrefleksyjne",
    "okulary fotochromowe",
    "okulary przeciwsłoneczne korekcyjne",
    "okulary sportowe korekcyjne",
    
    // Frame types
    "oprawy okularowe",
    "oprawy metalowe",
    "oprawy plastikowe",
    "oprawy tytanowe",
    "oprawy bezramkowe",
    "oprawy lekkie",
    "oprawy elastyczne",
    "modne oprawy okularowe",
    "oprawy okularowe 2024",
    "oprawy okularowe 2025",
    
    // Intent-based
    "gdzie kupić okulary",
    "ile kosztują okulary korekcyjne",
    "dobór okularów",
    "okulary na receptę",
    "okulary na zamówienie",
    "naprawa okularów",
    "regulacja okularów",
    "wymiana szkieł",
  ],
  
  // Contact lenses keywords
  lenses: [
    // Primary
    "soczewki kontaktowe",
    "soczewki kontaktowe cena",
    "soczewki kontaktowe Warszawa",
    
    // Types by duration
    "soczewki jednodniowe",
    "soczewki dwutygodniowe", 
    "soczewki miesięczne",
    "soczewki kwartalne",
    "soczewki roczne",
    
    // Types by function
    "soczewki toryczne",
    "soczewki astigmatyzm",
    "soczewki progresywne",
    "soczewki wieloogniskowe",
    "soczewki kolorowe",
    "soczewki nocne",
    "soczewki ortokorekcyjne",
    
    // Brands
    "soczewki Acuvue",
    "soczewki Acuvue Oasys",
    "soczewki Acuvue TruEye",
    "soczewki Alcon",
    "soczewki Air Optix",
    "soczewki Dailies",
    "soczewki CooperVision",
    "soczewki Biofinity",
    
    // Intent-based
    "dobór soczewek kontaktowych",
    "nauka zakładania soczewek",
    "pierwsze soczewki kontaktowe",
    "płyn do soczewek",
    "pielęgnacja soczewek",
    "czy mogę nosić soczewki",
    "soczewki dla początkujących",
  ],
  
  // Brand keywords (frames)
  brands: [
    // Premium
    "Ray-Ban okulary",
    "Ray-Ban Warszawa",
    "Oakley okulary",
    "Oakley Warszawa",
    "Prada okulary",
    "Dolce Gabbana okulary",
    "Gucci okulary",
    "Versace okulary",
    "Tom Ford okulary",
    "Dior okulary",
    
    // Mid-range
    "Tommy Hilfiger okulary",
    "Calvin Klein okulary",
    "Boss okulary",
    "Carrera okulary",
    "Lacoste okulary",
    "Michael Kors okulary",
    "Emporio Armani okulary",
    
    // Affordable/Trendy
    "Polaroid okulary",
    "Vogue okulary",
    
    // Lens brands
    "soczewki Essilor",
    "soczewki Zeiss",
    "soczewki Hoya",
    "soczewki Rodenstock",
  ],
  
  // Problem-based keywords (what users search when they have issues)
  problems: [
    "boli mnie głowa od okularów",
    "źle widzę w okularach",
    "okulary mi nie pasują",
    "kiedy iść do okulisty",
    "pogorszenie wzroku objawy",
    "nieostre widzenie",
    "zmęczone oczy",
    "suche oczy",
    "pieczenie oczu",
    "łzawienie oczu",
    "oczy bolą od komputera",
    "syndrom widzenia komputerowego",
  ],
  
  // Question-based keywords (for FAQ and AI search)
  questions: [
    "jak często badać wzrok",
    "kiedy dziecko powinno zbadać wzrok",
    "czy noszenie okularów pogarsza wzrok",
    "jak wybrać oprawy okularowe",
    "czym się różnią soczewki od okularów",
    "czy mogę nosić soczewki codziennie",
    "ile kosztują dobre okulary",
    "czy badanie wzroku boli",
    "jak przygotować się do badania wzroku",
    "co oznacza recepta na okulary",
    "jak czytać receptę na okulary",
    "co to jest astygmatyzm",
    "co to jest krótkowzroczność",
    "co to jest dalekowzroczność",
    "co to jest prezbiopia",
  ],
  
  // Semantic/LSI keywords
  semantic: [
    "zdrowie oczu",
    "pielęgnacja wzroku",
    "profilaktyka okulistyczna",
    "wady wzroku",
    "korekcja wzroku",
    "ostrość widzenia",
    "jakość widzenia",
    "komfort widzenia",
    "ochrona wzroku",
    "ergonomia wzroku",
  ],
  
  // Combined for global use
  global: [
    "optyk",
    "okulista", 
    "badanie wzroku",
    "okulary",
    "soczewki kontaktowe",
    "Prooptica",
    "optyk Warszawa",
    "optyk Piaseczno",
    "optyk Grójec",
    "salon optyczny",
    "oprawy okularowe",
    "okulary korekcyjne",
    "profesjonalne badanie wzroku",
    "markowe okulary",
    "dobór okularów",
    "dobór soczewek",
  ],
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SERVICES DEFINITIONS
// Structured for schema.org and AI understanding
// ═══════════════════════════════════════════════════════════════════════════

export const SERVICES = [
  {
    id: "badanie-wzroku",
    name: "Profesjonalne badanie wzroku",
    alternateName: "Kompleksowe badanie okulistyczne",
    description: "Kompleksowe badanie wzroku z wykorzystaniem nowoczesnego sprzętu diagnostycznego. Obejmuje badanie autorefraktometrem, badanie ostrości wzroku, dobór korekcji oraz szczegółową konsultację.",
    detailedDescription: `Nasze profesjonalne badanie wzroku trwa około 30-45 minut i obejmuje:
    - Wywiad dotyczący historii zdrowia oczu i obecnych dolegliwości
    - Badanie autorefraktometrem (komputerowe badanie wzroku)
    - Badanie ostrości wzroku do dali i bliży
    - Badanie widzenia obuocznego
    - Dobór optymalnej korekcji
    - Szczegółowe omówienie wyników i zaleceń
    - Wystawienie recepty na okulary lub soczewki kontaktowe`,
    price: "od 50 PLN",
    priceValue: 50,
    priceCurrency: "PLN",
    duration: "PT45M",
    durationMinutes: 45,
    category: "Badania wzroku",
    forWhom: ["dorośli", "dzieci", "seniorzy"],
    benefits: [
      "Nowoczesny sprzęt diagnostyczny",
      "Doświadczeni optometryści",
      "Szczegółowa konsultacja",
      "Recepta ważna 2 lata",
    ],
  },
  {
    id: "dobor-soczewek",
    name: "Dobór soczewek kontaktowych",
    alternateName: "Konsultacja soczewkowa",
    description: "Profesjonalny dobór i nauka zakładania soczewek kontaktowych. Pomożemy wybrać idealne soczewki dopasowane do Twojego stylu życia i potrzeb wzrokowych.",
    detailedDescription: `Wizyta obejmuje:
    - Badanie wzroku pod kątem noszenia soczewek
    - Ocenę zdrowia rogówki
    - Dobór odpowiedniego typu soczewek
    - Naukę prawidłowego zakładania i zdejmowania
    - Instruktaż pielęgnacji i higieny
    - Soczewki próbne do testów
    - Wizytę kontrolną po okresie adaptacji`,
    price: "od 100 PLN",
    priceValue: 100,
    priceCurrency: "PLN",
    duration: "PT60M",
    durationMinutes: 60,
    category: "Soczewki kontaktowe",
    forWhom: ["dorośli", "młodzież"],
    benefits: [
      "Szeroki wybór marek",
      "Soczewki próbne w cenie",
      "Bezpłatna wizyta kontrolna",
      "Pomoc w wyborze płynu",
    ],
  },
  {
    id: "dobor-opraw",
    name: "Dobór opraw okularowych",
    alternateName: "Konsultacja stylistyczna okularów",
    description: "Indywidualny dobór opraw z pomocą doświadczonych konsultantów. Pomożemy wybrać okulary idealnie dopasowane do kształtu twarzy i stylu życia.",
    detailedDescription: `Oferujemy:
    - Analizę kształtu twarzy i kolorystyki
    - Dobór opraw do stylu życia i potrzeb
    - Prezentację najnowszych kolekcji
    - Pomoc w wyborze rodzaju soczewek okularowych
    - Dokładny pomiar parametrów
    - Doradztwo cenowe i finansowe`,
    price: "Bezpłatnie",
    priceValue: 0,
    priceCurrency: "PLN",
    duration: "PT30M",
    durationMinutes: 30,
    category: "Oprawy okularowe",
    forWhom: ["dorośli", "dzieci", "seniorzy"],
    benefits: [
      "Bezpłatna konsultacja",
      "Szeroki wybór marek",
      "Możliwość rat 0%",
      "Gwarancja dopasowania",
    ],
  },
  {
    id: "naprawa-okularow",
    name: "Naprawa i regulacja okularów",
    alternateName: "Serwis okularowy",
    description: "Szybka naprawa i regulacja opraw okularowych. Wymiana nosków, zauszników, dokręcenie śrubek, prostowanie opraw.",
    detailedDescription: `Nasze usługi serwisowe:
    - Regulacja i dopasowanie opraw
    - Wymiana nosków silikonowych
    - Wymiana zauszników
    - Dokręcanie śrubek
    - Prostowanie opraw
    - Czyszczenie ultradźwiękowe
    - Drobne naprawy`,
    price: "od 20 PLN",
    priceValue: 20,
    priceCurrency: "PLN",
    duration: "PT15M",
    durationMinutes: 15,
    category: "Serwis",
    forWhom: ["wszyscy"],
    benefits: [
      "Szybka realizacja",
      "Drobne naprawy od ręki",
      "Oryginalne części",
      "Regulacja bezpłatna",
    ],
  },
  {
    id: "wymiana-szkiel",
    name: "Wymiana szkieł okularowych",
    alternateName: "Montaż nowych soczewek",
    description: "Wymiana soczewek okularowych w posiadanych oprawach. Szkła korekcyjne, progresywne, fotochromowe i polaryzacyjne.",
    detailedDescription: `Oferujemy wymianę szkieł:
    - Jednoogniskowych (do dali lub bliży)
    - Progresywnych (wieloogniskowych)
    - Fotochromowych (samościemniających)
    - Polaryzacyjnych
    - Z powłokami antyrefleksyjnymi
    - Z filtrem światła niebieskiego`,
    price: "od 200 PLN",
    priceValue: 200,
    priceCurrency: "PLN",
    duration: "PT7D",
    durationMinutes: 10080,
    category: "Szkła okularowe",
    forWhom: ["wszyscy"],
    benefits: [
      "Szkła renomowanych producentów",
      "Gwarancja jakości",
      "Realizacja 5-7 dni",
      "Powłoki premium w cenie",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FAQ ITEMS
// Comprehensive Q&A for rich snippets and AI search
// ═══════════════════════════════════════════════════════════════════════════

export const FAQ_ITEMS = [
  // Badanie wzroku
  {
    question: "Jak często należy badać wzrok?",
    answer: "Zalecamy badanie wzroku co 2 lata dla osób dorosłych bez problemów wzrokowych. Dzieci powinny badać wzrok raz w roku, podobnie jak osoby powyżej 60 roku życia i noszące okulary lub soczewki. Osoby z cukrzycą, nadciśnieniem lub rodzinną historią chorób oczu powinny badać wzrok częściej - co 6-12 miesięcy.",
  },
  {
    question: "Czy potrzebuję skierowania do badania wzroku?",
    answer: "Nie, do badania wzroku u optometrysty w naszych salonach nie jest wymagane skierowanie. Możesz umówić się bezpośrednio przez naszą stronę internetową lub telefonicznie. Badanie możesz wykonać bez wcześniejszej rezerwacji, ale zalecamy umówienie wizyty, aby uniknąć oczekiwania.",
  },
  {
    question: "Ile trwa badanie wzroku?",
    answer: "Profesjonalne badanie wzroku w naszych salonach trwa około 30-45 minut. Obejmuje szczegółowy wywiad, badanie komputerowe (autorefraktometrię), badanie ostrości wzroku, dobór korekcji oraz omówienie wyników. Nie zalecamy pośpiechu - dokładne badanie jest podstawą prawidłowego doboru okularów.",
  },
  {
    question: "Ile kosztuje badanie wzroku?",
    answer: "Cena badania wzroku zaczyna się od 50 PLN. Przy zakupie okularów w naszym salonie badanie jest często wliczone w cenę lub oferowane ze znaczną zniżką. Dokładny cennik znajdziesz na naszej stronie lub uzyskasz telefonicznie. Oferujemy też pakiety dla całej rodziny.",
  },
  {
    question: "Czy badanie wzroku boli?",
    answer: "Nie, badanie wzroku jest całkowicie bezbolesne i nieinwazyjne. Nie używamy żadnych kropelek rozszerzających źrenice (chyba że jest to konieczne i zostaniesz o tym poinformowany wcześniej). Badanie polega głównie na patrzeniu na tablice z literami i obrazkami oraz przez specjalne urządzenia optyczne.",
  },
  
  // Okulary
  {
    question: "Czy wykonujecie okulary na receptę z innej placówki?",
    answer: "Tak, wykonujemy okulary na podstawie recepty wystawionej przez dowolnego okulistę lub optometrystę. Recepta na okulary jest ważna przez 2 lata od daty wystawienia. Przed realizacją możemy również zweryfikować aktualność recepty poprzez szybkie badanie kontrolne.",
  },
  {
    question: "Ile kosztują okulary korekcyjne?",
    answer: "Cena okularów korekcyjnych zależy od wybranej oprawy i rodzaju soczewek. Oprawy zaczynają się od około 200 PLN, a soczewki od 200 PLN za parę. Kompletne okulary z podstawowymi soczewkami to wydatek od około 400 PLN. Oferujemy szeroki wybór w różnych przedziałach cenowych oraz możliwość płatności ratalnej 0%.",
  },
  {
    question: "Jak długo czeka się na okulary?",
    answer: "Standardowy czas realizacji okularów korekcyjnych to 5-7 dni roboczych. Okulary ze standardowymi soczewkami mogą być gotowe nawet w 3-4 dni. Soczewki progresywne i specjalistyczne mogą wymagać do 10-14 dni. Oferujemy też usługę ekspresową dla pilnych zamówień.",
  },
  {
    question: "Czy noszenie okularów pogarsza wzrok?",
    answer: "To popularny mit. Noszenie prawidłowo dobranych okularów nie pogarsza wzroku. Wręcz przeciwnie - brak korekcji może prowadzić do przemęczenia oczu, bólów głowy i dalszego pogorszenia widzenia. U dzieci brak korekcji może prowadzić do rozwoju niedowidzenia (amblyopii).",
  },
  {
    question: "Jakie marki opraw macie w ofercie?",
    answer: "Oferujemy szeroki wybór opraw od renomowanych marek: Ray-Ban, Oakley, Prada, Dolce & Gabbana, Gucci, Tommy Hilfiger, Boss, Carrera i wiele innych. Wszystkie produkty są oryginalne i objęte gwarancją producenta. Regularnie aktualizujemy kolekcje o najnowsze modele.",
  },
  
  // Soczewki kontaktowe
  {
    question: "Czy można zamówić soczewki kontaktowe online?",
    answer: "Tak, po pierwszym doborze soczewek w naszym salonie możesz zamawiać je ponownie telefonicznie lub mailowo z dostawą pod wskazany adres. Pierwszy dobór soczewek musi odbyć się osobiście w salonie, aby zapewnić prawidłowe dopasowanie i nauczyć prawidłowej pielęgnacji.",
  },
  {
    question: "Czy mogę nosić soczewki kontaktowe codziennie?",
    answer: "Tak, większość osób może nosić soczewki kontaktowe codziennie, pod warunkiem prawidłowego doboru i przestrzegania zasad higieny. Zalecamy soczewki jednodniowe dla maksymalnego komfortu i bezpieczeństwa. Czas noszenia soczewek powinien być dostosowany indywidualnie - zazwyczaj do 8-12 godzin dziennie.",
  },
  {
    question: "Czy soczewki kontaktowe są bezpieczne?",
    answer: "Tak, soczewki kontaktowe są bezpieczne przy prawidłowym użytkowaniu. Kluczowe jest: mycie rąk przed zakładaniem, przestrzeganie terminów wymiany, właściwa pielęgnacja i regularne kontrole u specjalisty. Nowoczesne soczewki silikonowo-hydrożelowe zapewniają doskonałe przepuszczanie tlenu.",
  },
  {
    question: "Od jakiego wieku można nosić soczewki kontaktowe?",
    answer: "Soczewki kontaktowe mogą nosić już dzieci od 8-10 roku życia, pod warunkiem odpowiedniej dojrzałości i przestrzegania zasad higieny. Decyzję podejmuje specjalista po konsultacji z rodzicem. Dla dzieci szczególnie polecamy soczewki jednodniowe ze względu na łatwość użytkowania i bezpieczeństwo.",
  },
  
  // Dzieci
  {
    question: "Czy macie okulary dla dzieci?",
    answer: "Tak, posiadamy szeroki wybór opraw dla dzieci w różnych rozmiarach i kolorach. Oferujemy modele elastyczne i wytrzymałe, idealne dla aktywnych maluchów, w tym oprawy z gumką, zauszniki sprężynowe i ramki z elastycznego tworzywa. Pomagamy wybrać okulary, które dziecko będzie chciało nosić.",
  },
  {
    question: "Kiedy dziecko powinno po raz pierwszy zbadać wzrok?",
    answer: "Pierwsze badanie wzroku zalecamy przed ukończeniem 3 roku życia, a następnie przed rozpoczęciem nauki w szkole (6-7 lat). Później badania powinny odbywać się co roku. Wczesne wykrycie wad wzroku jest kluczowe dla prawidłowego rozwoju widzenia u dziecka.",
  },
  
  // Praktyczne
  {
    question: "Gdzie znajdują się salony Prooptica?",
    answer: "Posiadamy 4 salony optyczne: w Warszawie przy ul. Senatorskiej 22 (centrum), w Piasecznie przy ul. Wojska Polskiego 28, w Piasecznie przy ul. Puławskiej 20 oraz w Grójcu przy ul. Piłsudskiego 2. Wszystkie salony są łatwo dostępne i posiadają parking w pobliżu.",
  },
  {
    question: "Jakie są godziny otwarcia salonów Prooptica?",
    answer: "Nasze salony są otwarte od poniedziałku do piątku w godzinach 10:00-18:00 oraz w soboty 10:00-14:00. W niektóre soboty godziny mogą być wydłużone. Zalecamy wcześniejszą rezerwację wizyty, szczególnie na badanie wzroku, aby uniknąć oczekiwania.",
  },
  {
    question: "Czy można umówić wizytę online?",
    answer: "Tak, oferujemy wygodną rezerwację online przez naszą stronę internetową. Możesz wybrać salon, rodzaj usługi, specjalistę oraz dogodny termin. Rezerwacja jest bezpłatna i zajmuje tylko chwilę. Potwierdzenie otrzymasz SMS-em i mailem.",
  },
  {
    question: "Czy oferujecie płatność ratalną?",
    answer: "Tak, oferujemy raty 0% na zakup okularów. Możesz rozłożyć płatność na wygodne raty bez dodatkowych kosztów. Akceptujemy również płatności kartą, BLIK, gotówkę oraz tradycyjne przelewy. Szczegóły oferty ratalnej znajdziesz w salonie.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// PAGE-SPECIFIC SEO CONFIGURATIONS
// Optimized for each page with comprehensive metadata
// ═══════════════════════════════════════════════════════════════════════════

export const PAGE_SEO = {
  home: {
    title: "Prooptica - Salon Optyczny Warszawa, Piaseczno, Grójec | Badanie Wzroku",
    description: "Profesjonalne salony optyczne z 20-letnią tradycją. Badanie wzroku od 50 zł, markowe oprawy Ray-Ban, Oakley, Prada. Soczewki kontaktowe. 4 lokalizacje: Warszawa centrum, Piaseczno, Grójec. Umów wizytę online!",
    keywords: [
      ...SEO_KEYWORDS.primary,
      ...SEO_KEYWORDS.brand,
      ...SEO_KEYWORDS.global,
    ],
  },
  about: {
    title: "O Nas - Historia i Zespół Prooptica | Rodzinny Salon Optyczny od 2004",
    description: "Poznaj historię rodzinnej firmy optycznej Prooptica działającej od 2004 roku. Nasz zespół doświadczonych optometrystów i konsultantów zapewnia najwyższą jakość usług w Warszawie, Piasecznie i Grójcu.",
    keywords: [
      "o nas Prooptica",
      "historia Prooptica", 
      "zespół optyczny",
      "rodzinna firma optyczna",
      "optometryści Warszawa",
      "doświadczeni specjaliści",
      ...SEO_KEYWORDS.brand,
    ],
  },
  eyeExam: {
    title: "Badanie Wzroku Warszawa, Piaseczno, Grójec | Od 50 zł | Prooptica",
    description: "Profesjonalne badanie wzroku od 50 zł. Komputerowe badanie autorefraktometrem, dobór korekcji, recepta na okulary. Badanie dla dorosłych i dzieci. Bez skierowania. Umów wizytę online w Warszawie, Piasecznie lub Grójcu.",
    keywords: [
      ...SEO_KEYWORDS.eyeExam,
      ...SEO_KEYWORDS.locations.warszawa.slice(0, 3),
      ...SEO_KEYWORDS.locations.piaseczno.slice(0, 3),
    ],
  },
  locations: {
    title: "Salony Optyczne Prooptica - Warszawa, Piaseczno, Grójec | Godziny Otwarcia",
    description: "4 salony optyczne Prooptica: Warszawa ul. Senatorska (centrum), Piaseczno ul. Wojska Polskiego i Puławska, Grójec ul. Piłsudskiego. Sprawdź godziny otwarcia i umów wizytę w najbliższym salonie.",
    keywords: [
      ...Object.values(SEO_KEYWORDS.locations).flat().slice(0, 15),
      ...SEO_KEYWORDS.brand,
    ],
  },
  brands: {
    title: "Markowe Okulary - Ray-Ban, Oakley, Prada, Gucci | Prooptica Warszawa",
    description: "Oryginalne oprawy okularowe od najlepszych marek: Ray-Ban, Oakley, Prada, Dolce & Gabbana, Gucci, Tommy Hilfiger. Autoryzowany sprzedawca. Szeroki wybór modeli 2024/2025. Salony w Warszawie i okolicach.",
    keywords: [
      ...SEO_KEYWORDS.brands,
      ...SEO_KEYWORDS.glasses.slice(0, 10),
    ],
  },
  contact: {
    title: "Kontakt - Umów Wizytę | Telefon, Email, Adresy Salonów | Prooptica",
    description: "Skontaktuj się z Prooptica! Tel: +48 22 720 08 00, Email: kontakt@prooptica.pl. Umów badanie wzroku online. Salony: Warszawa Senatorska, Piaseczno Wojska Polskiego i Puławska, Grójec Piłsudskiego.",
    keywords: [
      "kontakt Prooptica",
      "umów wizytę optyk",
      "telefon optyk Warszawa",
      "telefon optyk Piaseczno",
      "rezerwacja badanie wzroku",
      ...SEO_KEYWORDS.brand,
    ],
  },
  articles: {
    title: "Blog o Zdrowiu Oczu - Porady Okulistyczne, Trendy Okularowe | Prooptica",
    description: "Artykuły ekspertów o zdrowiu oczu, pielęgnacji wzroku, nowościach w optyce. Dowiedz się jak dbać o wzrok, jak wybrać okulary, jak nosić soczewki. Porady dla dzieci i dorosłych.",
    keywords: [
      "blog optyczny",
      "porady okulistyczne",
      "zdrowie oczu",
      "pielęgnacja wzroku",
      "trendy okularowe",
      ...SEO_KEYWORDS.questions.slice(0, 5),
    ],
  },
  booking: {
    title: "Umów Wizytę Online - Badanie Wzroku, Dobór Okularów | Prooptica",
    description: "Zarezerwuj termin badania wzroku online w 2 minuty. Wybierz salon (Warszawa, Piaseczno, Grójec), specjalistę i godzinę. Potwierdzenie SMS. Bezpłatna rezerwacja, możliwość odwołania.",
    keywords: [
      "umów wizytę optyk",
      "rezerwacja online optyk",
      "badanie wzroku rezerwacja",
      "umów badanie wzroku",
      "rezerwacja Warszawa optyk",
      "rezerwacja Piaseczno optyk",
    ],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// AI SEARCH OPTIMIZATION
// Content signals for ChatGPT, Perplexity, Google AI Overviews
// ═══════════════════════════════════════════════════════════════════════════

export const AI_SEARCH_CONFIG = {
  // Entity definitions for knowledge graphs
  entities: {
    organization: {
      type: "OpticalStore",
      name: "Prooptica",
      foundedYear: 2004,
      industry: "Optometry and Eyewear Retail",
      serviceArea: "Mazowieckie, Poland",
      specialty: ["Eye examinations", "Prescription glasses", "Contact lenses", "Designer frames"],
    },
    locations: [
      { name: "Prooptica Warszawa", city: "Warsaw", neighborhood: "Śródmieście" },
      { name: "Prooptica Piaseczno Wojska Polskiego", city: "Piaseczno" },
      { name: "Prooptica Piaseczno Puławska", city: "Piaseczno" },
      { name: "Prooptica Grójec", city: "Grójec" },
    ],
  },
  
  // Key facts for AI extraction
  keyFacts: [
    "Prooptica to polska sieć salonów optycznych działająca od 2004 roku",
    "Posiada 4 salony w województwie mazowieckim: Warszawa, 2x Piaseczno, Grójec",
    "Oferuje profesjonalne badanie wzroku od 50 PLN",
    "Sprzedaje oryginalne oprawy marek premium: Ray-Ban, Oakley, Prada",
    "Umożliwia rezerwację wizyt online przez stronę internetową",
    "Oferuje płatność ratalną 0% na okulary",
    "Zatrudnia doświadczonych optometrystów z wieloletnim doświadczeniem",
    "Specjalizuje się w dobieraniu soczewek kontaktowych i progresywnych",
  ],
  
  // Comparison signals (helps AI compare with competitors)
  differentiators: [
    "20+ lat doświadczenia jako rodzinna firma",
    "4 lokalizacje w Warszawie i okolicach",
    "Ceny badania wzroku od 50 PLN",
    "Szeroki wybór marek premium i budżetowych",
    "Rezerwacja online 24/7",
    "Raty 0% na okulary",
  ],
} as const;

// Type exports
export type ServiceType = typeof SERVICES[number];
export type FAQItem = typeof FAQ_ITEMS[number];
export type PageSEOKey = keyof typeof PAGE_SEO;
