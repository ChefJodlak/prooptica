import { LOCATIONS } from "@/lib/constants/locations"

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": LOCATIONS.map((loc) => ({
      "@type": "Optician",
      "name": `Prooptica ${loc.city}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": loc.address,
        "addressLocality": loc.city,
        "postalCode": loc.postal,
        "addressCountry": "PL"
      },
      "telephone": loc.phone,
      "url": "https://prooptica.pl/salony",
      "openingHours": loc.openingHours || "Mo-Fr 10:00-18:00",
      "priceRange": "$$",
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}


