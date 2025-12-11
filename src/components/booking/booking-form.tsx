"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronLeft, 
  Check, 
  Loader2, 
  ExternalLink,
  AlertCircle,
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimeSlot, Specialist, Salon, BookingFormData } from "./types"

interface BookingFormProps {
  slot: TimeSlot
  date: string
  specialist: Specialist
  salon: Salon
  onBack: () => void
}

export function BookingForm({ 
  slot, 
  date,
  specialist,
  salon,
  onBack
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
    acceptTerms: false,
    acceptSms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany'
    } else if (!/^[0-9+\s-]{9,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Nieprawidłowy numer telefonu'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy adres email'
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Akceptacja regulaminu jest wymagana'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Open the external booking URL with form data
    if (slot.bookingUrl) {
      window.open(slot.bookingUrl, '_blank')
    }
    
    setIsSubmitting(false)
  }

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('pl-PL', { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="space-y-5">
      {/* Compact Appointment Summary */}
      <div className="bg-[#1a1a1a] p-4 lg:p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E31F25]" />
            <span className="text-white capitalize">{formattedDate}</span>
            <span className="text-white/60">godz. {slot.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#E31F25]" />
            <span className="text-white">{specialist.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E31F25]" />
            <span className="text-white/60">{salon.city}, {salon.address}</span>
          </div>
        </div>
      </div>

      {/* Compact Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
              Imię <span className="text-[#E31F25]">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={cn(
                "w-full px-4 py-2.5 bg-white ring-1 ring-inset transition-all duration-300",
                "focus:outline-none focus:ring-[#E31F25]",
                errors.firstName ? "ring-red-400" : "ring-[#e0ded8]"
              )}
              placeholder="Jan"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
              Nazwisko <span className="text-[#E31F25]">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={cn(
                "w-full px-4 py-2.5 bg-white ring-1 ring-inset transition-all duration-300",
                "focus:outline-none focus:ring-[#E31F25]",
                errors.lastName ? "ring-red-400" : "ring-[#e0ded8]"
              )}
              placeholder="Kowalski"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a] mb-1.5">
              Telefon Komórkowy <span className="text-[#E31F25]">*</span>
              <div className="relative group">
                <HelpCircle className="w-3.5 h-3.5 text-[#737373] cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#1a1a1a] text-white text-xs font-light leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                  Na ten numer zostanie wysłany SMS z przypomnieniem o rezerwacji, jeśli numer należy do polskiej sieci telefonii komórkowej.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
                </div>
              </div>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={cn(
                  "w-full pl-11 pr-4 py-2.5 bg-white ring-1 ring-inset transition-all duration-300",
                  "focus:outline-none focus:ring-[#E31F25]",
                  errors.phone ? "ring-red-400" : "ring-[#e0ded8]"
                )}
                placeholder="+48 123 456 789"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
              Email <span className="text-[#E31F25]">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(
                  "w-full pl-11 pr-4 py-2.5 bg-white ring-1 ring-inset transition-all duration-300",
                  "focus:outline-none focus:ring-[#E31F25]",
                  errors.email ? "ring-red-400" : "ring-[#e0ded8]"
                )}
                placeholder="jan.kowalski@email.pl"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
            Uwagi <span className="text-[#737373] font-light">(Opcjonalne)</span>
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 bg-white ring-1 ring-inset ring-[#e0ded8] transition-all duration-300 focus:outline-none focus:ring-[#E31F25] resize-none"
            placeholder="Dodatkowe informacje lub pytania..."
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-3 border-t border-[#e0ded8]">
          {/* Terms Checkbox */}
          <label className={cn(
            "flex items-start gap-2.5 cursor-pointer group",
            errors.acceptTerms && "text-red-500"
          )}>
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-4 h-4 ring-1 ring-inset transition-all duration-300",
                "peer-checked:bg-[#E31F25] peer-checked:ring-[#E31F25]",
                errors.acceptTerms ? "ring-red-400" : "ring-[#e0ded8]",
                "group-hover:ring-[#E31F25]/50"
              )}>
                {formData.acceptTerms && (
                  <Check className="w-3 h-3 text-[#1a1a1a] absolute top-0.5 left-0.5" />
                )}
              </div>
            </div>
            <span className="text-xs text-[#5a5a5a] font-light leading-relaxed">
              <span className="text-[#E31F25]">*</span> Zapoznałem się z{' '}
              <Link href="/regulamin" className="text-[#E31F25] hover:underline">
                regulaminem
              </Link>{' '}
              oraz{' '}
              <Link href="/polityka-prywatnosci" className="text-[#E31F25] hover:underline">
                polityką prywatności
              </Link>
              , i akceptuję postanowienia tych dokumentów.
            </span>
          </label>

          {/* SMS Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.acceptSms}
                onChange={(e) => handleInputChange('acceptSms', e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-4 h-4 ring-1 ring-inset ring-[#e0ded8] transition-all duration-300",
                "peer-checked:bg-[#E31F25] peer-checked:ring-[#E31F25]",
                "group-hover:ring-[#E31F25]/50"
              )}>
                {formData.acceptSms && (
                  <Check className="w-3 h-3 text-[#1a1a1a] absolute top-0.5 left-0.5" />
                )}
              </div>
            </div>
            <span className="text-xs text-[#5a5a5a] font-light leading-relaxed">
              Wyrażam zgodę na otrzymywanie wiadomości SMS w celu przypomnienia o rezerwacji.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1a1a1a] ring-1 ring-inset ring-[#e0ded8] hover:ring-[#E31F25] transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Wróć
            </span>
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "flex-1 px-6 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-500",
              "bg-[#E31F25] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white",
              isSubmitting && "opacity-50 cursor-wait"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Rezerwuję...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Zarezerwuj wizytę
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* External Link Info - inline */}
        <p className="text-[10px] text-[#737373] font-light flex items-center gap-2">
          <ExternalLink className="w-3 h-3 text-[#E31F25] flex-shrink-0" />
          Po kliknięciu zostaniesz przekierowany do zewnętrznego systemu rezerwacji.
        </p>
      </form>
    </div>
  )
}

