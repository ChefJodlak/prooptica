"use client"

import { useState, useRef, useEffect, Suspense } from "react"
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
  PhoneCall
} from "lucide-react"
import { cn } from "@/lib/utils"

// Import booking components directly (avoiding barrel exports for Next.js compatibility)
import { StepIndicator } from "@/components/booking/step-indicator"
import { SalonCard } from "@/components/booking/salon-card"
import { SpecialistCard } from "@/components/booking/specialist-card"
import { CalendarView } from "@/components/booking/calendar-view"
import { BookingForm } from "@/components/booking/booking-form"
import { SALONS, SPECIALISTS, SERVICES, containerVariants } from "@/components/booking/constants"
import type { Salon, Specialist, Service, TimeSlot } from "@/components/booking/types"

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH PARAMS HANDLER (needs to be wrapped in Suspense)
// ═══════════════════════════════════════════════════════════════════════════

function SearchParamsHandler({ 
  onSalonSelect,
  formSectionRef 
}: { 
  onSalonSelect: (salon: Salon) => void
  formSectionRef: React.RefObject<HTMLElement | null>
}) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const salonId = searchParams.get('salon')
    if (salonId) {
      const salon = SALONS.find(s => s.id === salonId)
      if (salon) {
        onSalonSelect(salon)
        
        // Scroll to form section after a short delay
        setTimeout(() => {
          formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [searchParams, onSalonSelect, formSectionRef])
  
  return null
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function BookingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  
  const [step, setStep] = useState(1)
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ slot: TimeSlot; date: string } | null>(null)
  
  // Handle salon pre-selection from URL parameter
  const handleSalonFromUrl = (salon: Salon) => {
    setSelectedSalon(salon)
    setStep(2) // Go to service selection
  }

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

  const handleSalonSelect = (salon: Salon) => {
    setSelectedSalon(salon)
    setSelectedService(null)
    setSelectedSpecialist(null)
    setSelectedSlot(null)
    setStep(2) // Go to service selection
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setSelectedSpecialist(null)
    setSelectedSlot(null)
    setStep(3) // Go to specialist selection
  }

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist)
    setSelectedSlot(null)
    setStep(4) // Go to calendar
  }

  const handleSlotSelect = (slot: TimeSlot, date: string) => {
    setSelectedSlot({ slot, date })
    setStep(5) // Go to booking form
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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F4]">
      {/* Handle URL search params in Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsHandler 
          onSalonSelect={handleSalonFromUrl} 
          formSectionRef={formSectionRef}
        />
      </Suspense>
      
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 bg-[#1a1a1a] overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        {/* Decorative background elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E31F25]/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-5 mb-8"
          >
            <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
              Rezerwacja online
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
          </motion.div>
          
          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-extralight text-white leading-[1] tracking-[-0.03em]"
            >
              Umów
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-medium text-white leading-[1] tracking-[-0.03em]"
            >
              <span className="relative inline-block">
                <span className="italic text-[#E31F25]">wizytę</span>
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/40 via-[#E31F25]/20 to-transparent rounded-full" />
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl leading-[1.8] max-w-lg font-light"
          >
            Wybierz salon, specjalistę i dogodny termin wizyty. Rezerwacja online zajmuje tylko chwilę.
          </motion.p>
        </div>
        
        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31F25]/30 to-transparent origin-center"
        />
      </section>

      {/* Booking Steps */}
      <section ref={formSectionRef} className="relative py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Steps Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="lg:sticky lg:top-32 space-y-4">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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

            {/* Main Content */}
            <motion.div
              className="lg:col-span-9"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Salon Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section Label */}
                    <div className="flex items-center gap-5 mb-8">
                      <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                        Krok 1
                      </span>
                      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    </div>
                    
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
                      Wybierz
                    </h2>
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
                      <span className="relative inline-block">
                        <span className="italic text-[#E31F25]">salon</span>
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                      </span>
                    </h2>
                    
                    <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
                      Zapraszamy do jednego z naszych czterech salonów optycznych.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SALONS.map((salon, i) => (
                        <motion.div
                          key={salon.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section Label */}
                    <div className="flex items-center gap-5 mb-8">
                      <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                        Krok 2
                      </span>
                      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    </div>
                    
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
                      Wybierz
                    </h2>
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
                      <span className="relative inline-block">
                        <span className="italic text-[#E31F25]">usługę</span>
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                      </span>
                    </h2>
                    
                    <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
                      Wybierz rodzaj usługi, którą chcesz zarezerwować.
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      {availableServices.map((service, i) => (
                        <motion.button
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ scale: 1.01, y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleServiceSelect(service)}
                          className={cn(
                            "group relative w-full p-5 text-left transition-all duration-300 cursor-pointer",
                            "ring-1 ring-inset",
                            selectedService?.id === service.id
                              ? "bg-[#1a1a1a] ring-[#E31F25] shadow-lg"
                              : "bg-white ring-[#e0ded8] hover:ring-[#E31F25] hover:shadow-md hover:bg-[#FAFAF8]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2.5 transition-all duration-300",
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
                                  "text-sm font-light transition-colors duration-300",
                                  selectedService?.id === service.id ? "text-white/60" : "text-[#737373]"
                                )}>
                                  {service.description}
                                </p>
                              </div>
                            </div>
                            
                            {service.requiresPhoneBooking && (
                              <div className={cn(
                                "flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300",
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
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-[#E31F25] flex items-center justify-center ml-4"
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section Label */}
                    <div className="flex items-center gap-5 mb-8">
                      <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                        Krok 3
                      </span>
                      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    </div>
                    
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
                      Wybierz
                    </h2>
                    <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
                      <span className="relative inline-block">
                        <span className="italic text-[#E31F25]">specjalistę</span>
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                      </span>
                    </h2>
                    
                    <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
                      Nasi doświadczeni specjaliści zadbają o Twoje oczy.
                    </p>

                    {availableSpecialists.length === 0 ? (
                      <div className="text-center py-12 bg-white ring-1 ring-[#e0ded8]">
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
                      <div className="grid grid-cols-1 gap-4">
                        {availableSpecialists.map((specialist, i) => {
                          const salon = SALONS.find(s => s.id === specialist.salonId)!
                          return (
                            <motion.div
                              key={specialist.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section Label */}
                    <div className="flex items-center gap-5 mb-8">
                      <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                        Krok 4
                      </span>
                      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    </div>
                    
                    {selectedService.requiresPhoneBooking ? (
                      // Phone Booking Required
                      <>
                        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
                          Rezerwacja
                        </h2>
                        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
                          <span className="relative inline-block">
                            <span className="italic text-[#E31F25]">telefoniczna</span>
                            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                          </span>
                        </h2>
                        
                        <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
                          Ta usługa wymaga rezerwacji telefonicznej. Skontaktuj się z nami, aby umówić wizytę.
                        </p>

                        <div className="bg-[#1a1a1a] p-8 lg:p-12">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-[#E31F25]/20 mb-6">
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
                              className="flex items-center gap-3 px-8 py-4 bg-[#E31F25] text-[#1a1a1a] font-semibold text-lg tracking-wider hover:bg-white transition-all duration-500"
                            >
                              <Phone className="w-5 h-5" />
                              +48 22 720 08 00
                            </a>

                            <p className="mt-6 text-white/40 text-sm">
                              {selectedSalon?.city}, {selectedSalon?.address}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setStep(3)}
                          className="mt-6 flex items-center gap-2 text-[#737373] hover:text-[#E31F25] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="text-sm font-light">Wybierz innego specjalistę</span>
                        </button>
                      </>
                    ) : (
                      // Online Calendar Booking
                      <>
                        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-2">
                          Wybierz
                        </h2>
                        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-6">
                          <span className="relative inline-block">
                            <span className="italic text-[#E31F25]">termin</span>
                            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#E31F25]/30 via-[#E31F25]/15 to-transparent rounded-full" />
                          </span>
                        </h2>
                        
                        <p className="text-[#5a5a5a] text-base leading-[1.8] mb-10 max-w-md font-light">
                          Wybierz dogodny dzień i godzinę wizyty.
                        </p>

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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section Label */}
                    <div className="flex items-center gap-5 mb-4">
                      <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                        Krok 5
                      </span>
                      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                    </div>
                    
                    <h2 className="font-display text-[2rem] lg:text-[2.5rem] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em] mb-1">
                      Twoje{' '}
                      <span className="relative inline-block">
                        <span className="italic text-[#E31F25] font-medium">dane</span>
                      </span>
                    </h2>
                    
                    <p className="text-[#5a5a5a] text-sm leading-[1.6] mb-5 max-w-md font-light">
                      Uzupełnij dane kontaktowe, aby dokończyć rezerwację.
                    </p>

                    <BookingForm 
                      slot={selectedSlot.slot}
                      date={selectedSlot.date}
                      specialist={selectedSpecialist}
                      salon={selectedSalon}
                      onBack={() => setStep(4)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative bg-[#1a1a1a] p-10 lg:p-16 overflow-hidden"
          >
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
            
            {/* Decorative glow */}
            <motion.div
              className="absolute -top-20 -left-20 w-64 h-64 bg-[#E31F25]/15 rounded-full blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Top red line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E31F25] to-transparent" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
                  <span className="text-[#E31F25] text-[10px] font-medium tracking-[0.5em] uppercase">
                    Wolisz telefonicznie?
                  </span>
                  <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#E31F25] to-transparent" />
                </div>
                <h3 className="font-display text-3xl lg:text-5xl font-extralight text-white mb-3 tracking-[-0.02em]">
                  Zadzwoń do{" "}
                  <span className="italic text-[#E31F25] font-medium">nas</span>
                </h3>
                <p className="text-white/50 max-w-md font-light">
                  Nasi konsultanci pomogą Ci umówić wizytę telefonicznie.
                </p>
              </div>
              
              <a 
                href="tel:+48227200800"
                className="flex items-center gap-3 px-8 py-5 bg-[#E31F25] text-[#1a1a1a] font-semibold text-sm tracking-wider hover:bg-white transition-all duration-500"
              >
                +48 22 720 08 00
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
