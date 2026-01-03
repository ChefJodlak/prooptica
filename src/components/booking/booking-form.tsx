"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
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
  isMobileView?: boolean
}

export function BookingForm({ 
  slot, 
  date,
  specialist,
  salon,
  onBack,
  isMobileView = false
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
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Only look for portal target if we are in mobile view
    if (isMobileView) {
      setPortalTarget(document.getElementById('mobile-footer-portal'))
    }
  }, [isMobileView])

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

  // Action Buttons Component (reused)
  const ActionButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "flex gap-3",
      isMobile ? "flex-row w-full max-w-[1600px] mx-auto" : "flex-col sm:flex-row pt-4"
    )}>
      <button
        type="button"
        onClick={onBack}
        className={cn(
          "font-semibold tracking-[0.2em] uppercase text-[#1a1a1a] ring-1 ring-inset ring-[#e0ded8] hover:ring-[#E31F25] transition-all duration-300",
          isMobile 
            ? "px-4 py-3 text-[10px] rounded-lg bg-white" 
            : "px-6 py-3 text-[10px] lg:rounded-none"
        )}
      >
        <span className="flex items-center justify-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          <span className={cn(isMobile ? "hidden sm:inline" : "inline")}>Wróć</span>
        </span>
      </button>
      
      <button
        type={isMobile ? "button" : "submit"}
        onClick={isMobile ? (e) => {
          const form = document.getElementById('booking-form') as HTMLFormElement;
          if (form) {
            if (form.requestSubmit) {
              form.requestSubmit();
            } else {
              form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          }
        } : undefined}
        disabled={isSubmitting}
        className={cn(
          "group/btn relative flex-1 font-semibold tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden",
          "bg-[#E31F25] text-white",
          isSubmitting && "opacity-50 cursor-wait",
          isMobile
            ? "px-6 py-3 text-[10px] rounded-lg"
            : "px-6 py-3 text-[10px] lg:rounded-none"
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
        {isSubmitting ? (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Rezerwuję...
          </span>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            Zarezerwuj wizytę
          </span>
        )}
      </button>
    </div>
  )

  return (
    <div className="space-y-6 lg:space-y-10 pb-8 lg:pb-0">
      {/* Appointment Summary */}
      <div className="bg-white ring-1 ring-[#e0ded8] p-4 lg:p-5 rounded-lg lg:rounded-none">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E31F25]" />
            <span className="text-[#1a1a1a] capitalize">{formattedDate}</span>
            <span className="text-[#737373]">godz. {slot.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#E31F25]" />
            <span className="text-[#1a1a1a]">{specialist.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E31F25]" />
            <span className="text-[#737373]">{salon.city}, {salon.address}</span>
          </div>
        </div>
      </div>

      {/* Compact Booking Form */}
      <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
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
                "w-full px-4 py-3 lg:py-2.5 bg-white ring-1 ring-inset transition-all duration-300 rounded-md lg:rounded-none",
                "focus:outline-none focus:ring-[#E31F25]",
                "text-base lg:text-sm", // Prevent zoom on mobile
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
                "w-full px-4 py-3 lg:py-2.5 bg-white ring-1 ring-inset transition-all duration-300 rounded-md lg:rounded-none",
                "focus:outline-none focus:ring-[#E31F25]",
                "text-base lg:text-sm",
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
                  "w-full pl-11 pr-4 py-3 lg:py-2.5 bg-white ring-1 ring-inset transition-all duration-300 rounded-md lg:rounded-none",
                  "focus:outline-none focus:ring-[#E31F25]",
                  "text-base lg:text-sm",
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
                  "w-full pl-11 pr-4 py-3 lg:py-2.5 bg-white ring-1 ring-inset transition-all duration-300 rounded-md lg:rounded-none",
                  "focus:outline-none focus:ring-[#E31F25]",
                  "text-base lg:text-sm",
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
            className={cn(
              "w-full px-4 py-3 lg:py-2.5 bg-white ring-1 ring-inset ring-[#e0ded8] transition-all duration-300 focus:outline-none focus:ring-[#E31F25] resize-none rounded-md lg:rounded-none",
              "text-base lg:text-sm"
            )}
            placeholder="Dodatkowe informacje lub pytania..."
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 pt-4 border-t border-[#e0ded8] pb-4 lg:pb-0">
          {/* Terms Checkbox */}
          <label className={cn(
            "flex items-start gap-3 cursor-pointer group",
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
                "w-5 h-5 lg:w-4 lg:h-4 ring-1 ring-inset transition-all duration-300 rounded lg:rounded-none",
                "peer-checked:bg-[#E31F25] peer-checked:ring-[#E31F25]",
                errors.acceptTerms ? "ring-red-400" : "ring-[#e0ded8]",
                "group-hover:ring-[#E31F25]/50"
              )}>
                {formData.acceptTerms && (
                  <Check className="w-4 h-4 lg:w-3 lg:h-3 text-[#1a1a1a] absolute top-0.5 left-0.5" />
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
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.acceptSms}
                onChange={(e) => handleInputChange('acceptSms', e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-5 h-5 lg:w-4 lg:h-4 ring-1 ring-inset ring-[#e0ded8] transition-all duration-300 rounded lg:rounded-none",
                "peer-checked:bg-[#E31F25] peer-checked:ring-[#E31F25]",
                "group-hover:ring-[#E31F25]/50"
              )}>
                {formData.acceptSms && (
                  <Check className="w-4 h-4 lg:w-3 lg:h-3 text-[#1a1a1a] absolute top-0.5 left-0.5" />
                )}
              </div>
            </div>
            <span className="text-xs text-[#5a5a5a] font-light leading-relaxed">
              Wyrażam zgodę na otrzymywanie wiadomości SMS w celu przypomnienia o rezerwacji.
            </span>
          </label>
        </div>

        {/* Actions - Rendered via Portal on Mobile, inline on Desktop */}
        {portalTarget ? (
          createPortal(
            <div className="p-4 bg-white border-t border-[#e0ded8] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full">
              <ActionButtons isMobile={true} />
            </div>,
            portalTarget
          )
        ) : (
          <ActionButtons />
        )}
      </form>
    </div>
  )
}