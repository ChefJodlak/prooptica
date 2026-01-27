"use client"

import { useState, useRef, useEffect, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  MapPin, 
  User, 
  Calendar, 
  ChevronLeft,
  Check, 
  Clock,
  Building2,
  FileText,
  Phone,
  Stethoscope,
  PhoneCall,
  X,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NOISE_TEXTURE } from "@/lib/constants/ui"

// Import booking components directly
import { StepIndicator } from "@/components/booking/step-indicator"
import { SalonCard } from "@/components/booking/salon-card"
import { SpecialistCard } from "@/components/booking/specialist-card"
import { CalendarView } from "@/components/booking/calendar-view"
import { BookingForm } from "@/components/booking/booking-form"
import { SALONS, SPECIALISTS, SERVICES, containerVariants } from "@/components/booking/constants"
import type { Salon, Specialist, Service, TimeSlot } from "@/components/booking/types"

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH PARAMS HANDLER
// ═══════════════════════════════════════════════════════════════════════════

function SearchParamsHandler({
  onSalonSelect,
  formSectionRef,
  onOpenMobileBooking
}: {
  onSalonSelect: (salon: Salon) => void
  formSectionRef: React.RefObject<HTMLElement | null>
  onOpenMobileBooking: () => void
}) {
  const searchParams = useSearchParams()
  const hasProcessedRef = useRef(false)

  useEffect(() => {
    // Only process URL params once on initial load
    if (hasProcessedRef.current) return

    const salonId = searchParams.get('salon')
    if (salonId) {
      const salon = SALONS.find(s => s.id === salonId)
      if (salon) {
        hasProcessedRef.current = true
        onSalonSelect(salon)
        // Desktop: scroll to form section
        // Mobile: auto-open the booking modal
        if (window.innerWidth >= 1024) {
           setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        } else {
          onOpenMobileBooking()
        }
      }
    }
  }, [searchParams, onSalonSelect, formSectionRef, onOpenMobileBooking])

  return null
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function BookingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  // State
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ slot: TimeSlot; date: string } | null>(null)
  
  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (isMobileBookingOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileBookingOpen])

  // Handle salon pre-selection from URL parameter
  const handleSalonFromUrl = useCallback((salon: Salon) => {
    setSelectedSalon(salon)
    setStep(2)
  }, [])

  // Filter services by selected salon
  const availableServices = selectedSalon
    ? SERVICES.filter(s => s.availableInSalons.includes(selectedSalon.id))
    : SERVICES

  // Filter specialists by selected salon and service
  const availableSpecialists = (() => {
    if (!selectedSalon) return SPECIALISTS
    
    // If service has specific specialists, only show those
    if (selectedService?.specialistIds && selectedService.specialistIds.length > 0) {
      return SPECIALISTS.filter(s => 
        selectedService.specialistIds!.includes(s.id) && s.salonId === selectedSalon.id
      )
    }
    
    // Otherwise show all specialists for the salon (excluding doctor for regular services)
    return SPECIALISTS.filter(s => 
      s.salonId === selectedSalon.id && s.id !== 'gan-pirwitz'
    )
  })()

  // Handlers
  const handleSalonSelect = (salon: Salon) => {
    setSelectedSalon(salon)
    setSelectedService(null)
    setSelectedSpecialist(null)
    setSelectedSlot(null)
    setStep(2)
    scrollToTopMobile()
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setSelectedSpecialist(null)
    setSelectedSlot(null)
    setStep(3)
    scrollToTopMobile()
  }

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist)
    setSelectedSlot(null)
    setStep(4)
    scrollToTopMobile()
  }

  const handleSlotSelect = (slot: TimeSlot, date: string) => {
    setSelectedSlot({ slot, date })
    setStep(5)
    scrollToTopMobile()
  }

  const goToStep = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep)
      if (targetStep < 5) setSelectedSlot(null)
      if (targetStep < 4) setSelectedSpecialist(null)
      if (targetStep < 3) setSelectedService(null)
      if (targetStep < 2) {
        setSelectedSalon(null)
      }
    }
  }

  const handleMobileBack = () => {
    if (step > 1) {
      goToStep(step - 1)
      scrollToTopMobile()
    }
  }

  const scrollToTopMobile = () => {
    const modalContent = document.getElementById('mobile-modal-content')
    if (modalContent) {
      modalContent.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Common Header Component for Steps
  const StepHeader = ({ 
    stepNumber, 
    titleRegular, 
    titleAccent, 
    description 
  }: { 
    stepNumber: number, 
    titleRegular: string, 
    titleAccent: string, 
    description: string 
  }) => (
    <div className="mb-6 lg:mb-10">
      <div className="flex items-center gap-4 mb-3 lg:mb-6">
        <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
          Krok {stepNumber}
        </span>
        <div className="h-px flex-1 max-w-[60px] lg:max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
      </div>
      
      {/* Updated: Single line on mobile if possible, flex-wrap handled gracefully */}
      <h2 className="font-display text-[2rem] lg:text-[3.5rem] leading-[1.1] text-[#1a1a1a] tracking-[-0.03em] mb-3 lg:mb-6">
        <span className="font-extralight">{titleRegular} </span>
        <span className="relative inline-block font-medium">
          <span className="italic text-[#E31F25]">{titleAccent}</span>
          <span className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
        </span>
      </h2>
      
      <p className="text-[#5a5a5a] text-sm lg:text-base leading-[1.8] max-w-md font-light">
        {description}
      </p>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER CONTENT FUNCTION (Shared between Mobile Modal and Desktop)
  // ═══════════════════════════════════════════════════════════════════════════
  const renderBookingContent = (isMobile: boolean) => (
    <AnimatePresence mode="wait">
      {/* Step 1: Salon Selection */}
      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(isMobile && "px-1 pb-20")}
        >
          <StepHeader
            stepNumber={1}
            titleRegular="Wybierz"
            titleAccent="salon"
            description="Zapraszamy do jednego z naszych czterech salonów optycznych."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {SALONS.map((salon, i) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
              >
                <SalonCard
                  salon={salon}
                  isSelected={selectedSalon?.id === salon.id}
                  onClick={() => handleSalonSelect(salon)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Service Selection */}
      {step === 2 && selectedSalon && (
        <motion.div
          key="step2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(isMobile && "px-1 pb-20")}
        >
          {isMobile && (
            <button
              onClick={handleMobileBack}
              className="flex items-center gap-2 text-[#737373] mb-6 text-sm hover:text-[#E31F25] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Wróć do wyboru salonu
            </button>
          )}

          <StepHeader
            stepNumber={2}
            titleRegular="Wybierz"
            titleAccent="usługę"
            description="Wybierz rodzaj usługi, którą chcesz zarezerwować."
          />

          <div className="grid grid-cols-1 gap-2 lg:gap-3">
            {availableServices.map((service, i) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleServiceSelect(service)}
                className={cn(
                  "group relative w-full p-4 lg:p-5 text-left transition-all duration-300 cursor-pointer",
                  "ring-1 ring-inset rounded-lg lg:rounded-none",
                  selectedService?.id === service.id
                    ? "bg-[#1a1a1a] ring-[#E31F25] shadow-lg"
                    : "bg-white ring-[#e0ded8] hover:ring-[#E31F25] hover:shadow-md hover:bg-[#FAFAF8]"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2.5 transition-all duration-300 rounded-md lg:rounded-none",
                      selectedService?.id === service.id
                        ? "bg-[#E31F25]"
                        : "bg-[#F5F5F5] group-hover:bg-[#E31F25]/20 group-hover:scale-110"
                    )}>
                      <Stethoscope className={cn(
                        "w-5 h-5 transition-colors duration-300",
                        selectedService?.id === service.id
                          ? "text-[#1a1a1a]"
                          : "text-[#E31F25]"
                      )} />
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-medium text-base transition-colors duration-300",
                        selectedService?.id === service.id 
                          ? "text-white" 
                          : "text-[#1a1a1a] group-hover:text-[#E31F25]"
                      )}>
                        {service.name}
                      </h3>
                      <p className={cn(
                        "text-xs lg:text-sm font-light transition-colors duration-300 mt-1",
                        selectedService?.id === service.id ? "text-white/60" : "text-[#737373]"
                      )}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {service.requiresPhoneBooking && (
                    <div className={cn(
                      "hidden sm:flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300",
                      selectedService?.id === service.id
                        ? "bg-[#E31F25]/20 text-[#E31F25]"
                        : "bg-[#F5F5F5] text-[#737373] group-hover:bg-[#E31F25]/10 group-hover:text-[#E31F25]"
                    )}>
                      <PhoneCall className="w-3 h-3" />
                      <span>Telefonicznie</span>
                    </div>
                  )}
                  
                  {selectedService?.id === service.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="w-6 h-6 bg-[#E31F25] flex items-center justify-center ml-4 rounded-full lg:rounded-none"
                    >
                      <Check className="w-4 h-4 text-[#1a1a1a]" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: Specialist Selection */}
      {step === 3 && selectedService && (
        <motion.div
          key="step3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(isMobile && "px-1 pb-20")}
        >
          {isMobile && (
            <button
              onClick={handleMobileBack}
              className="flex items-center gap-2 text-[#737373] mb-6 text-sm hover:text-[#E31F25] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Wróć do wyboru usługi
            </button>
          )}

          <StepHeader
            stepNumber={3}
            titleRegular="Wybierz"
            titleAccent="specjalistę"
            description="Nasi doświadczeni specjaliści zadbają o Twoje oczy."
          />

          {availableSpecialists.length === 0 ? (
            <div className="text-center py-12 bg-white ring-1 ring-[#e0ded8] rounded-lg lg:rounded-none">
              <User className="w-12 h-12 text-[#a3a3a3] mx-auto mb-4" />
              <p className="text-[#737373] font-light">
                Brak dostępnych specjalistów dla wybranej usługi.
              </p>
              <button
                onClick={() => {
                  setSelectedService(null)
                  setStep(2)
                }}
                className="mt-4 text-[#E31F25] text-sm font-medium hover:underline"
              >
                Wybierz inną usługę
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:gap-4">
              {availableSpecialists.map((specialist, i) => {
                const salon = SALONS.find(s => s.id === specialist.salonId)!
                return (
                  <motion.div
                    key={specialist.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: i * 0.03 }}
                  >
                    <SpecialistCard
                      specialist={specialist}
                      salon={salon}
                      isSelected={selectedSpecialist?.id === specialist.id}
                      onClick={() => handleSpecialistSelect(specialist)}
                    />
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* Step 4: Calendar or Phone Booking */}
      {step === 4 && selectedSpecialist && selectedService && (
        <motion.div
          key="step4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(isMobile && "px-1 pb-20")}
        >
          {isMobile && (
            <button
              onClick={handleMobileBack}
              className="flex items-center gap-2 text-[#737373] mb-6 text-sm hover:text-[#E31F25] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Wróć do wyboru specjalisty
            </button>
          )}

          {selectedService.requiresPhoneBooking ? (
            <>
               <StepHeader 
                stepNumber={4}
                titleRegular="Rezerwacja"
                titleAccent="telefoniczna"
                description="Ta usługa wymaga rezerwacji telefonicznej. Skontaktuj się z nami."
              />

              <div className="bg-[#1a1a1a] p-8 lg:p-12 rounded-lg lg:rounded-none">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-[#E31F25]/20 mb-6 rounded-full lg:rounded-none">
                    <PhoneCall className="w-10 h-10 text-[#E31F25]" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-white mb-2">
                    Zadzwoń do nas
                  </h3>
                  
                  <p className="text-white/60 mb-8 max-w-sm font-light">
                    Nasi konsultanci pomogą Ci umówić wizytę na <span className="text-[#E31F25]">{selectedService.name}</span> u specjalisty <span className="text-white">{selectedSpecialist.name}</span>.
                  </p>

                  <a 
                    href="tel:+48227200800"
                    className="flex items-center gap-3 px-8 py-4 bg-[#E31F25] text-[#1a1a1a] font-semibold text-lg tracking-wider hover:bg-white transition-all duration-500 rounded-lg lg:rounded-none w-full lg:w-auto justify-center"
                  >
                    <Phone className="w-5 h-5" />
                    +48 22 720 08 00
                  </a>

                  <p className="mt-6 text-white/40 text-sm">
                    {selectedSalon?.city}, {selectedSalon?.address}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
               <StepHeader 
                stepNumber={4}
                titleRegular="Wybierz"
                titleAccent="termin"
                description="Wybierz dogodny dzień i godzinę wizyty."
              />

              <CalendarView 
                specialistId={selectedSpecialist.id}
                onSelectSlot={handleSlotSelect}
              />
            </>
          )}
        </motion.div>
      )}

      {/* Step 5: Booking Form */}
      {step === 5 && selectedSpecialist && selectedSlot && selectedSalon && selectedService && (
        <motion.div
          key="step5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(isMobile && "px-1 pb-20")}
        >
          {isMobile && (
            <button
              onClick={handleMobileBack}
              className="flex items-center gap-2 text-[#737373] mb-6 text-sm hover:text-[#E31F25] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Wróć do wyboru terminu
            </button>
          )}

          <StepHeader 
            stepNumber={5}
            titleRegular="Twoje"
            titleAccent="dane"
            description="Uzupełnij dane kontaktowe, aby dokończyć rezerwację."
          />

          <BookingForm 
            slot={selectedSlot.slot}
            date={selectedSlot.date}
            specialist={selectedSpecialist}
            salon={selectedSalon}
            onBack={() => setStep(4)}
            isMobileView={isMobile}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      {/* Handle URL search params in Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsHandler
          onSalonSelect={handleSalonFromUrl}
          formSectionRef={formSectionRef}
          onOpenMobileBooking={() => setIsMobileBookingOpen(true)}
        />
      </Suspense>
      
      


      {/* ════════════════════════════════════════════════════════════════════════
         MOBILE LANDING & OVERLAY (Only visible on lg:hidden)
         ════════════════════════════════════════════════════════════════════════ */}
      
      {/* Mobile Landing Hero */}
      <section className="lg:hidden min-h-screen flex flex-col relative bg-[#050505] overflow-hidden">

        <motion.div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#E31F25]/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-8 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              Rezerwacja online
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
          </motion.div>

          <h1 className="font-display text-[3.5rem] leading-[1] text-white tracking-[-0.03em] mb-6">
            Umów <br />
            <span className="italic text-[#E31F25]">wizytę</span>
          </h1>

          <p className="text-white/60 text-lg leading-[1.6] max-w-xs font-light mb-10">
            Szybka i wygodna rezerwacja wizyt w naszych salonach.
          </p>

          <button
            onClick={() => setIsMobileBookingOpen(true)}
            className="w-full bg-[#E31F25] text-white py-5 px-6 flex items-center justify-between group active:scale-[0.98] transition-all duration-300"
          >
            <span className="text-sm font-semibold tracking-[0.2em] uppercase">Rozpocznij</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer info */}
        <div className="p-8 border-t border-white/5 relative z-10">
          <p className="text-white/30 text-xs text-center">
            Prooptica Salony Optyczne
          </p>
        </div>
      </section>

      {/* Mobile Full Screen Overlay */}
      <AnimatePresence>
        {isMobileBookingOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[10000] bg-[#F8F7F4] flex flex-col lg:hidden"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between p-5 bg-white border-b border-[#e0ded8] shadow-sm relative z-50">
              <div className="flex flex-col">
                <span className="text-[#E31F25] text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">
                  Krok {step} / 5
                </span>
                <span className="font-display text-xl text-[#1a1a1a]">
                  {step === 1 ? 'Wybierz salon' :
                   step === 2 ? 'Wybierz usługę' :
                   step === 3 ? 'Wybierz specjalistę' :
                   step === 4 ? 'Wybierz termin' : 'Twoje dane'}
                </span>
              </div>
              <button 
                onClick={() => setIsMobileBookingOpen(false)}
                className="p-2 -mr-2 text-[#1a1a1a] hover:text-[#E31F25] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Progress Line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f0f0f0]">
                <motion.div 
                  className="h-full bg-[#E31F25]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Overlay Content */}
            <div 
              id="mobile-modal-content"
              className="flex-1 overflow-y-auto overflow-x-hidden p-5 scroll-smooth"
            >
              {renderBookingContent(true)}
            </div>
            
            {/* Footer Portal Target */}
            <div id="mobile-footer-portal" className="lg:hidden" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
         DESKTOP LAYOUT (Hidden on mobile)
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#1a1a1a] overflow-hidden">

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
            backgroundImage: NOISE_TEXTURE
          }} />

          {/* Gradient orb */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-60"
            style={{
              background: "radial-gradient(circle, rgba(227,31,37,0.3) 0%, rgba(227,31,37,0) 70%)",
              willChange: "transform"
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-5 mb-6"
              >
                <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                  Rezerwacja online
                </span>
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="pb-4 mb-6"
              >
                <h1 className="font-display text-[clamp(2.5rem,9vw,6.5rem)] text-white leading-none tracking-[-0.03em]">
                  <span className="font-extralight">Umów </span>
                  <span className="relative inline-block font-medium">
                    <span className="italic text-[#E31F25]">wizytę</span>
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-white/60 text-lg lg:text-xl leading-[1.8] mb-8 max-w-xl font-light"
              >
                Wybierz salon, specjalistę i dogodny termin wizyty. Rezerwacja online zajmuje tylko chwilę.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Booking Steps Section */}
        <section ref={formSectionRef} className="relative py-24">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Steps Sidebar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
                className="lg:col-span-3"
              >
                <div className="sticky top-32 space-y-4">
                  <button 
                    onClick={() => goToStep(1)}
                    className="w-full text-left"
                  >
                    <StepIndicator 
                      step={1} 
                      currentStep={step} 
                      title="Wybierz salon" 
                      icon={MapPin}
                    />
                  </button>
                  
                  <div className="w-px h-4 bg-[#e0ded8] ml-6" />
                  
                  <button 
                    onClick={() => step > 1 && goToStep(2)}
                    className={cn("w-full text-left", step < 2 && "cursor-not-allowed")}
                  >
                    <StepIndicator 
                      step={2} 
                      currentStep={step} 
                      title="Wybierz usługę" 
                      icon={Stethoscope}
                    />
                  </button>
                  
                  <div className="w-px h-4 bg-[#e0ded8] ml-6" />
                  
                  <button 
                    onClick={() => step > 2 && goToStep(3)}
                    className={cn("w-full text-left", step < 3 && "cursor-not-allowed")}
                  >
                    <StepIndicator 
                      step={3} 
                      currentStep={step} 
                      title="Wybierz specjalistę" 
                      icon={User}
                    />
                  </button>
                  
                  <div className="w-px h-4 bg-[#e0ded8] ml-6" />
                  
                  <button 
                    onClick={() => step > 3 && goToStep(4)}
                    className={cn("w-full text-left", step < 4 && "cursor-not-allowed")}
                  >
                    <StepIndicator 
                      step={4} 
                      currentStep={step} 
                      title="Wybierz termin" 
                      icon={Calendar}
                    />
                  </button>
                  
                  <div className="w-px h-4 bg-[#e0ded8] ml-6" />
                  
                  <button 
                    onClick={() => step > 4 && goToStep(5)}
                    className={cn("w-full text-left", step < 5 && "cursor-not-allowed")}
                  >
                    <StepIndicator 
                      step={5} 
                      currentStep={step} 
                      title="Twoje dane" 
                      icon={FileText}
                    />
                  </button>

                  {/* Selected Summary */}
                  {selectedSalon && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="mt-8 p-5 bg-white ring-1 ring-[#e0ded8]"
                    >
                      <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#E31F25] mb-4">
                        Twój wybór
                      </h4>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <Building2 className="w-4 h-4 text-[#E31F25] mt-0.5" />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">{selectedSalon.city}</p>
                            <p className="text-[#737373] font-light">{selectedSalon.address}</p>
                          </div>
                        </div>
                        
                        {selectedService && (
                          <div className="flex items-start gap-3 pt-3 border-t border-[#e0ded8]">
                            <Stethoscope className="w-4 h-4 text-[#E31F25] mt-0.5" />
                            <div>
                              <p className="font-medium text-[#1a1a1a]">{selectedService.name}</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedSpecialist && (
                          <div className="flex items-start gap-3 pt-3 border-t border-[#e0ded8]">
                            <User className="w-4 h-4 text-[#E31F25] mt-0.5" />
                            <div>
                              <p className="font-medium text-[#1a1a1a]">{selectedSpecialist.name}</p>
                              <p className="text-[#737373] font-light">{selectedSpecialist.title}</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedSlot && (
                          <div className="flex items-start gap-3 pt-3 border-t border-[#e0ded8]">
                            <Clock className="w-4 h-4 text-[#E31F25] mt-0.5" />
                            <div>
                              <p className="font-medium text-[#1a1a1a]">
                                {new Date(selectedSlot.date).toLocaleDateString('pl-PL', { 
                                  weekday: 'long',
                                  day: 'numeric', 
                                  month: 'long'
                                })}
                              </p>
                              <p className="text-[#737373] font-light">godz. {selectedSlot.slot.time}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Main Content Area */}
              <motion.div
                className="col-span-9"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {renderBookingContent(false)}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
          {/* Gradient orb */}
          <motion.div
            className="absolute -top-20 left-1/4 w-64 h-64 bg-[#E31F25]/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="max-w-[1600px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="text-center lg:text-left">
                {/* Eyebrow */}
                <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
                  <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                    Wolisz telefonicznie?
                  </span>
                  <div className="h-px w-12 bg-gradient-to-r from-[#E31F25] to-transparent" />
                </div>

                <h3 className="font-display text-[2rem] lg:text-[3rem] font-extralight text-white leading-[1.1] tracking-[-0.02em] mb-4">
                  Zadzwoń do{" "}
                  <span className="relative inline-block">
                    <span className="italic text-[#E31F25] font-medium">nas</span>
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
                  </span>
                </h3>
                <p className="text-white/50 max-w-md font-light leading-relaxed">
                  Nasi konsultanci pomogą Ci umówić wizytę telefonicznie.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <a
                  href="tel:+48227200800"
                  className="flex items-center gap-3 px-6 py-4 border border-white/20 text-white hover:border-[#E31F25] hover:text-[#E31F25] transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium tracking-wide">+48 22 720 08 00</span>
                </a>
                <a href="/kontakt">
                  <button className="bg-[#E31F25] text-white px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all duration-500 flex items-center gap-3">
                    Kontakt
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}