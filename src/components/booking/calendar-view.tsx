"use client"

import { useState, useEffect, useRef } from "react"
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
  
  const daysContainerRef = useRef<HTMLDivElement>(null)

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

  // Scroll handling effect
  useEffect(() => {
    if (!loading && calendarData && daysContainerRef.current) {
      if (calendarData.isCurrentWeek) {
        // If current week, try to scroll to selected day (which is usually today or first available)
        // Or if today exists in the list
        const todayStr = new Date().toISOString().split('T')[0];
        const dayIndex = calendarData.days.findIndex(d => d.date === todayStr);
        
        // If today is found, scroll to it. If not found (e.g. today is Sunday and not in list, or just fall back to selectedDate)
        // Let's prioritize selectedDate since that's what's active
        const targetDate = selectedDate || todayStr;
        const targetIndex = calendarData.days.findIndex(d => d.date === targetDate);
        
        if (targetIndex !== -1) {
          // Calculate scroll position to center the element if possible, or just ensure it's visible
          // For mobile where items are ~80px wide (min-w-[80px])
          // We can just scroll to the element's offsetLeft minus some padding
          const container = daysContainerRef.current;
          const children = container.children;
          if (children[targetIndex]) {
            const element = children[targetIndex] as HTMLElement;
            // Scroll to center: element.offsetLeft - (container.width / 2) + (element.width / 2)
            const scrollLeft = element.offsetLeft - (container.clientWidth / 2) + (element.clientWidth / 2);
            container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
          }
        }
      } else {
        // Not current week - reset scroll to start
        daysContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }
  }, [calendarData, loading, selectedDate]) // Re-run when data loads or selected date changes significantly (though initially selectedDate is set right after data)

  const handleNextWeek = async () => {
    if (!calendarData?.nextWeekStart || weekNavigating) return
    setWeekNavigating(true)
    await fetchCalendar(calendarData.nextWeekStart, 'next')
    // Scroll reset is handled by useEffect now
  }

  const handlePrevWeek = async () => {
    if (!calendarData?.prevWeekStart || isCurrentWeek || weekNavigating) return
    setWeekNavigating(true)
    await fetchCalendar(calendarData.prevWeekStart, 'prev')
    // Scroll reset is handled by useEffect now
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
    <div className="space-y-6 lg:space-y-8">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        {/* Previous week button - only show if NOT current week */}
        <button
          onClick={handlePrevWeek}
          disabled={isCurrentWeek || weekNavigating}
          className={cn(
            "flex items-center gap-2 text-sm transition-all duration-300 px-2 py-1",
            isCurrentWeek || weekNavigating
              ? "text-[#e0ded8] cursor-not-allowed opacity-50"
              : "text-[#1a1a1a] hover:text-[#E31F25]"
          )}
        >
          {weekNavigating && !calendarData.nextWeekStart ? ( // odd logic just to show spinner somewhere
             <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span className="hidden sm:inline font-light">Poprzedni</span>
        </button>
        
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#E31F25]">
          Wybierz datę
        </span>
        
        <button
          onClick={handleNextWeek}
          disabled={!calendarData.nextWeekStart || weekNavigating}
          className={cn(
            "flex items-center gap-2 text-sm transition-all duration-300 px-2 py-1",
            calendarData.nextWeekStart && !weekNavigating
              ? "text-[#1a1a1a] hover:text-[#E31F25]" 
              : "text-[#a3a3a3] cursor-not-allowed"
          )}
        >
          <span className="hidden sm:inline font-light">Następny</span>
          {weekNavigating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Day Selector - Horizontal Scroll on Mobile */}
      <div 
        ref={daysContainerRef}
        className="flex lg:grid lg:grid-cols-7 gap-2 overflow-x-auto pb-4 lg:pb-0 snap-x hide-scrollbar"
      >
        {calendarData.days.map((day) => {
          const hasAvailableSlots = day.slots.some(slot => slot.available)
          const isSelected = selectedDate === day.date
          const dateObj = new Date(day.date)
          const dayNum = dateObj.getDate()
          const shortDayName = day.dayName.slice(0, 3)

          return (
            <button
              key={day.date}
              onClick={() => hasAvailableSlots && setSelectedDate(day.date)}
              disabled={!hasAvailableSlots}
              id={`day-${day.date}`}
              className={cn(
                "relative py-4 px-2 text-center transition-all duration-300 min-w-[80px] lg:min-w-0 flex-shrink-0 lg:flex-shrink snap-center rounded-lg lg:rounded-none",
                "ring-1 ring-inset",
                isSelected
                  ? "bg-[#e8e6e2] ring-[#E31F25] shadow-lg"
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
                isSelected ? "text-[#1a1a1a]" : hasAvailableSlots ? "text-[#1a1a1a]" : "text-[#a3a3a3]"
              )}>
                {dayNum}
              </span>
              {hasAvailableSlots && (
                <span className={cn(
                  "block text-[10px] mt-1",
                  isSelected ? "text-[#737373]" : "text-[#E31F25]"
                )}>
                  {day.slots.filter(s => s.available).length} term.
                </span>
              )}
            </button>
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
            className="bg-white ring-1 ring-[#e0ded8] p-4 lg:p-6 rounded-lg lg:rounded-none"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#e0ded8]">
              <div className="p-3 bg-[#e8e6e2] rounded-lg lg:rounded-none">
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

            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {selectedDay.slots.map((slot, idx) => (
                <motion.button
                  key={`${slot.time}-${idx}`}
                  onClick={() => slot.available && slot.bookingUrl && onSelectSlot(slot, selectedDay.date)}
                  disabled={!slot.available}
                  whileHover={slot.available ? { scale: 1.08, y: -2 } : {}}
                  whileTap={slot.available ? { scale: 0.95 } : {}}
                  className={cn(
                    "py-3 px-2 text-sm font-medium transition-all duration-300 rounded-md lg:rounded-none",
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