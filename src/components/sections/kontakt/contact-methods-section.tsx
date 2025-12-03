"use client"

import { Phone, Mail, MessageCircle } from "lucide-react"
import { ContactMethodCard } from "./contact-method-card"

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Zadzwoń do nas",
    description: "Infolinia czynna Pn-Pt 10-18",
    value: "+48 22 XXX XX XX",
    href: "tel:+4822XXXXXXX"
  },
  {
    icon: Mail,
    title: "Napisz do nas",
    description: "Odpowiadamy w ciągu 24h",
    value: "kontakt@prooptica.pl",
    href: "mailto:kontakt@prooptica.pl"
  },
  {
    icon: MessageCircle,
    title: "Czat na żywo",
    description: "Dostępny w godzinach pracy",
    value: "Rozpocznij czat",
    href: "#"
  }
]

interface ContactMethodsSectionProps {
  isInView: boolean
}

export function ContactMethodsSection({ isInView }: ContactMethodsSectionProps) {
  return (
    <section className="relative py-16 lg:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20">
          {CONTACT_METHODS.map((method, i) => (
            <ContactMethodCard
              key={method.title}
              icon={method.icon}
              title={method.title}
              description={method.description}
              value={method.value}
              href={method.href}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

