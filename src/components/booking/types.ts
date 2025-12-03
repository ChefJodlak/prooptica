// ═══════════════════════════════════════════════════════════════════════════
// BOOKING TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface Salon {
  id: string
  city: string
  address: string
  postal: string
}

export interface Specialist {
  id: string
  name: string
  title: string
  salonId: string
}

export interface Service {
  id: string
  name: string
  description: string
  availableInSalons: string[] // salon IDs where this service is available
  requiresPhoneBooking: boolean // if true, show phone contact instead of calendar
  specialistIds?: string[] // specific specialists for this service (optional)
}

export interface TimeSlot {
  time: string
  available: boolean
  bookingUrl?: string
}

export interface DaySchedule {
  dayName: string
  date: string
  slots: TimeSlot[]
}

export interface CalendarData {
  specialistName: string
  location: string
  address: string
  phone: string
  days: DaySchedule[]
  prevWeekStart?: string
  nextWeekStart?: string
  isCurrentWeek?: boolean
  currentWeekStart?: string
  sessionId?: string
}

export interface BookingFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  notes: string
  acceptTerms: boolean
  acceptSms: boolean
}

