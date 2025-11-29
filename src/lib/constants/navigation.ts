export interface NavItem {
  title: string;
  href: string;
  description?: string;
  items?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Strona Główna",
    href: "/",
    description: "Powrót do strony głównej.",
  },
  {
    title: "O Nas",
    href: "/o-nas",
    description: "Poznaj historię naszej rodzinnej firmy i wartości, którymi się kierujemy.",
  },
  {
    title: "Oferta",
    href: "/oferta", // This might redirect or be a parent
    description: "Nasze usługi i produkty.",
    items: [
      {
        title: "Badanie Wzroku",
        href: "/oferta/badanie-wzroku",
        description: "Profesjonalne badanie wzroku przy użyciu najnowocześniejszego sprzętu.",
      },
      {
        title: "Marki",
        href: "/marki",
        description: "Ekskluzywne oprawy i soczewki najlepszych producentów.",
      },
    ],
  },
  {
    title: "Salony",
    href: "/salony",
    description: "Adresy i godziny otwarcia naszych 4 salonów.",
  },
  {
    title: "Artykuły",
    href: "/artykuly",
    description: "Baza wiedzy o zdrowiu oczu i najnowszych trendach.",
  },
  {
    title: "Kontakt",
    href: "/kontakt",
    description: "Umów wizytę lub zapytaj o dostępność.",
  },
];


