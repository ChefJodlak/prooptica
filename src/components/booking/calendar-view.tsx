"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimeSlot, DaySchedule, CalendarData } from "./types"

interface CalendarViewProps {
  specialistId: string
  onSelectSlot: (slot: TimeSlot, date: string) => void
}

export function CalendarView({ 
  specialistId,
  onSelectSlot 
}: CalendarViewProps) {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isCurrentWeek, setIsCurrentWeek] = useState(true)
  const [weekNavigating, setWeekNavigating] = useState(false)

  const fetchCalendar = async (weekStart?: string, direction?: 'next' | 'prev') => {
    setLoading(true)
    setError(null)
    
    try {
      let url = `/api/calendar?specialist=${specialistId}`
      if (weekStart && direction) {
        url += `&weekStart=${weekStart}&direction=${direction}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch calendar')
      }
      
      const data = await response.json()
      setCalendarData(data)
      setIsCurrentWeek(data.isCurrentWeek ?? true)
      
      // Auto-select first day with available slots
      if (data.days && data.days.length > 0) {
        const firstAvailableDay = data.days.find((day: DaySchedule) => 
          day.slots.some(slot => slot.available)
        )
        if (firstAvailableDay) {
          setSelectedDate(firstAvailableDay.date)
        } else {
          setSelectedDate(null)
        }
      }
    } catch (err) {
      setError('Nie udało się pobrać kalendarza. Spróbuj ponownie.')
      console.error(err)
    } finally {
      setLoading(false)
      setWeekNavigating(false)
    }
  }

  useEffect(() => {
    fetchCalendar()
  }, [specialistId])

  const handleNextWeek = async () => {
    if (!calendarData?.nextWeekStart || weekNavigating) return
    setWeekNavigating(true)
    await fetchCalendar(calendarData.nextWeekStart, 'next')
  }

  const handlePrevWeek = async () => {
    if (!calendarData?.prevWeekStart || isCurrentWeek || weekNavigating) return
    setWeekNavigating(true)
    await fetchCalendar(calendarData.prevWeekStart, 'prev')
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[#E31F25] animate-spin mb-4" />
        <p className="text-[#737373] font-light">Ładowanie kalendarza...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-[#1a1a1a] font-medium mb-2">Wystąpił błąd</p>
        <p className="text-[#737373] font-light">{error}</p>
      </div>
    )
  }

  if (!calendarData || !calendarData.days || calendarData.days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-[#F5F5F5] flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-[#737373]" />
        </div>
        <p className="text-[#1a1a1a] font-medium mb-2">Brak dostępnych terminów</p>
        <p className="text-[#737373] font-light">Skontaktuj się z nami telefonicznie.</p>
      </div>
    )
  }

  const selectedDay = calendarData.days.find(day => day.date === selectedDate)

  return (
    <div className="space-y-8">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        {/* Previous week button - only show if NOT current week */}
        {!isCurrentWeek ? (
          <button
            onClick={handlePrevWeek}
            disabled={weekNavigating}
            className={cn(
              "flex items-center gap-2 text-sm transition-all duration-300",
              weekNavigating
                ? "text-[#a3a3a3] cursor-wait"
                : "text-[#1a1a1a] hover:text-[#E31F25]"
            )}
          >
            {weekNavigating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
            <span className="hidden sm:inline font-light">Poprzedni tydzień</span>
          </button>
        ) : (
          <div className="w-[140px]" /> // Placeholder to maintain layout
        )}
        
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#E31F25]">
          Wybierz datę
        </span>
        
        <button
          onClick={handleNextWeek}
          disabled={!calendarData.nextWeekStart || weekNavigating}
          className={cn(
            "flex items-center gap-2 text-sm transition-all duration-300",
            calendarData.nextWeekStart && !weekNavigating
              ? "text-[#1a1a1a] hover:text-[#E31F25]" 
              : "text-[#a3a3a3] cursor-not-allowed"
          )}
        >
          <span className="hidden sm:inline font-light">Następny tydzień</span>
          {weekNavigating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Day Selector */}
      <div className="grid grid-cols-7 gap-2">
        {calendarData.days.map((day) => {
          const hasAvailableSlots = day.slots.some(slot => slot.available)
          const isSelected = selectedDate === day.date
          const dateObj = new Date(day.date)
          const dayNum = dateObj.getDate()
          const shortDayName = day.dayName.slice(0, 3)

          return (
            <motion.button
              key={day.date}
              onClick={() => hasAvailableSlots && setSelectedDate(day.date)}
              whileHover={hasAvailableSlots ? { scale: 1.05, y: -2 } : {}}
              whileTap={hasAvailableSlots ? { scale: 0.95 } : {}}
              disabled={!hasAvailableSlots}
              className={cn(
                "relative py-4 px-2 text-center transition-all duration-300",
                "ring-1 ring-inset",
                isSelected
                  ? "bg-[#1a1a1a] ring-[#E31F25] shadow-lg"
                  : hasAvailableSlots
                    ? "bg-white ring-[#e0ded8] hover:ring-[#E31F25] hover:shadow-md hover:bg-[#FAFAF8] cursor-pointer"
                    : "bg-[#F5F5F5] ring-[#e0ded8] opacity-50 cursor-not-allowed"
              )}
            >
              <span className={cn(
                "block text-[10px] font-medium tracking-wider uppercase mb-1",
                isSelected ? "text-[#E31F25]" : "text-[#737373]"
              )}>
                {shortDayName}
              </span>
              <span className={cn(
                "block font-display text-xl",
                isSelected ? "text-white" : hasAvailableSlots ? "text-[#1a1a1a]" : "text-[#a3a3a3]"
              )}>
                {dayNum}
              </span>
              {hasAvailableSlots && (
                <span className={cn(
                  "block text-[10px] mt-1",
                  isSelected ? "text-white/60" : "text-[#E31F25]"
                )}>
                  {day.slots.filter(s => s.available).length} term.
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white ring-1 ring-[#e0ded8] p-6"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#e0ded8]">
              <div className="p-3 bg-[#1a1a1a]">
                <Clock className="w-5 h-5 text-[#E31F25]" />
              </div>
              <div>
                <h4 className="font-display text-lg text-[#1a1a1a]">
                  {selectedDay.dayName}, {new Date(selectedDay.date).toLocaleDateString('pl-PL', { 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h4>
                <p className="text-sm text-[#737373] font-light">
                  Wybierz godzinę wizyty
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {selectedDay.slots.map((slot, idx) => (
                <motion.button
                  key={`${slot.time}-${idx}`}
                  onClick={() => slot.available && slot.bookingUrl && onSelectSlot(slot, selectedDay.date)}
                  disabled={!slot.available}
                  whileHover={slot.available ? { scale: 1.08, y: -2 } : {}}
                  whileTap={slot.available ? { scale: 0.95 } : {}}
                  className={cn(
                    "py-3 px-4 text-sm font-medium transition-all duration-300",
                    "ring-1 ring-inset",
                    slot.available
                      ? "bg-white ring-[#E31F25]/30 text-[#1a1a1a] hover:bg-[#E31F25] hover:text-[#1a1a1a] hover:ring-[#E31F25] hover:shadow-md cursor-pointer"
                      : "bg-[#F5F5F5] ring-[#e0ded8] text-[#a3a3a3] line-through cursor-not-allowed"
                  )}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>

            {selectedDay.slots.filter(s => s.available).length === 0 && (
              <p className="text-center text-[#737373] font-light py-8">
                Brak dostępnych terminów w tym dniu
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

