export interface Location {
  id: string;
  city: string;
  address: string;
  postal: string;
  phone: string;
  email?: string;
  openingHours?: string;
  map_link?: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const LOCATIONS: Location[] = [
  {
    id: "warszawa",
    city: "Warszawa",
    address: "ul. Senatorska 22",
    postal: "00-095",
    phone: "+48 22 XXX XX XX",
    map_link: "https://maps.google.com/?q=Prooptica+Warszawa+Senatorska+22",
    openingHours: "Pn-Pt 10-18\nSob 10-14",
    image: "/salons/warszawa-1.webp",
    coordinates: {
      lat: 52.2432,
      lng: 21.0087,
    },
  },
  {
    id: "piaseczno-1",
    city: "Piaseczno",
    address: "ul. Wojska Polskiego 28",
    postal: "05-500",
    phone: "+48 22 XXX XX XX",
    map_link: "https://maps.google.com/?q=Prooptica+Piaseczno+Wojska+Polskiego+28",
    openingHours: "Pn-Pt 10-18\nSob 10-14",
    image: "/salons/piaseczno-1.jpg",
    coordinates: {
      lat: 52.0814,
      lng: 21.0236,
    },
  },
  {
    id: "piaseczno-2",
    city: "Piaseczno",
    address: "ul. Puławska 20",
    postal: "05-500",
    phone: "+48 22 XXX XX XX",
    map_link: "https://maps.google.com/?q=Prooptica+Piaseczno+Pulawska+20",
    openingHours: "Pn-Pt 10-18\nSob 10-14",
    image: "/salons/piaseczno-2.jpg",
    coordinates: {
      lat: 52.0754,
      lng: 21.0306,
    },
  },
  {
    id: "grojec",
    city: "Grójec",
    address: "ul. Piłsudskiego 2",
    postal: "05-600",
    phone: "+48 48 XXX XX XX",
    map_link: "https://maps.google.com/?q=Prooptica+Grojec+Pilsudskiego+2",
    openingHours: "Pn-Pt 10-18\nSob 10-14",
    image: "/salons/grojec-1.jpg",
    coordinates: {
      lat: 51.8647,
      lng: 20.8671,
    },
  },
];
