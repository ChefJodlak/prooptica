"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any
        Marker: new (options: any) => any
        Size: new (width: number, height: number) => any
        Point: new (x: number, y: number) => any
        ControlPosition: { LEFT_BOTTOM: number }
        marker?: {
          AdvancedMarkerElement: new (options: any) => any
        }
      }
    }
  }
}

import { LOCATIONS, Location } from "@/lib/constants/locations"

// Mapping between location IDs (from LOCATIONS) and salon IDs (from booking SALONS)
const LOCATION_TO_SALON_ID: Record<string, string> = {
  "warszawa": "warszawa",
  "piaseczno-1": "piaseczno-wojska",  // Wojska Polskiego 28
  "piaseczno-2": "piaseczno-pulawska", // Puławska 20
  "grojec": "grojec",
}
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, Phone, Clock, ExternalLink, Calendar } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useSectionVisibility, getSectionVisibilityClass } from "@/lib/hooks"

function LocationCard({ 
  location, 
  isSelected, 
  onClick
}: { 
  location: Location
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        boxShadow: isSelected ? '0 20px 40px -12px rgba(196, 167, 125, 0.35), 0 8px 16px -8px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      className={cn(
        "transform-gpu relative w-full text-left overflow-hidden transition-all duration-300 group",
        isSelected 
          ? "bg-white scale-[1.02] z-10" 
          : "bg-white/60 hover:bg-white"
      )}
    >
      {/* Elegant border */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500",
        isSelected 
          ? "ring-2 ring-[#C4A77D]" 
          : "ring-1 ring-[#e0ded8] group-hover:ring-[#C4A77D]/50"
      )} />
      
      {/* Selection indicator - golden corner accent */}
      <div className={cn(
        "absolute top-0 left-0 w-12 h-12 transition-all duration-500 overflow-hidden z-20",
        isSelected ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#C4A77D] rotate-45" />
      </div>
      
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={location.image}
          alt={`Salon ${location.city}`}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isSelected 
              ? "scale-105 grayscale-0" 
              : "grayscale-[80%] group-hover:grayscale-[30%] group-hover:scale-105"
          )}
        />
        
        {/* Elegant overlay */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          isSelected 
            ? "bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" 
            : "bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-[#1a1a1a]/20 group-hover:from-[#1a1a1a]/60 group-hover:via-transparent group-hover:to-transparent"
        )} />
        
        {/* City name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <span className={cn(
                "block text-[9px] tracking-[0.3em] uppercase mb-1 transition-colors duration-300",
                isSelected ? "text-[#C4A77D]" : "text-white/60 group-hover:text-[#C4A77D]"
              )}>
                Salon optyczny
              </span>
              <h3 className={cn(
                "font-display text-xl font-medium tracking-tight transition-colors duration-300",
                isSelected ? "text-white" : "text-white/80 group-hover:text-white"
              )}>
                {location.city}
              </h3>
            </div>
            <ArrowRight className={cn(
              "w-5 h-5 transition-all duration-500",
              isSelected 
                ? "text-[#C4A77D] translate-x-0 opacity-100" 
                : "text-white/40 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-white/70"
            )} />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className={cn(
        "p-4 sm:p-5 transition-colors duration-500",
        isSelected ? "bg-white" : "bg-[#f5f5f5] group-hover:bg-white"
      )}>
        <p className={cn(
          "text-xs sm:text-sm mb-1.5 sm:mb-2 font-light truncate transition-colors duration-300",
          isSelected ? "text-[#1a1a1a]" : "text-[#888] group-hover:text-[#5a5a5a]"
        )}>{location.address}</p>
        <span className={cn(
          "text-[10px] sm:text-[11px] tracking-wide transition-colors duration-300 block truncate",
          isSelected ? "text-[#C4A77D]" : "text-[#aaa] group-hover:text-[#999]"
        )}>{location.postal} {location.city}</span>
      </div>
    </button>
  )
}

function GoogleMap({ selectedLocation }: { selectedLocation: Location }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

  // Grayscale map styles with subtle contrast
  const mapStyles: google.maps.MapTypeStyle[] = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 },
        { lightness: 10 }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { lightness: 20 }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 30 }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ]

  useEffect(() => {
    // Load Google Maps script dynamically
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        initMap()
        return
      }

      const existingScript = document.getElementById('google-maps-script')
      if (existingScript) {
        existingScript.addEventListener('load', initMap)
        return
      }

      const script = document.createElement('script')
      script.id = 'google-maps-script'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return

      const position = {
        lat: selectedLocation.coordinates.lat,
        lng: selectedLocation.coordinates.lng
      }

      // Create or update map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 16,
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })
      } else {
        mapInstanceRef.current.setCenter(position)
      }

      // Create custom red marker element
      const markerContent = document.createElement('div')
      markerContent.innerHTML = `
        <div style="position: relative; cursor: pointer;">
          <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#E31F25"/>
            <circle cx="20" cy="18" r="7" fill="white"/>
          </svg>
        </div>
      `

      // Remove existing marker
      if (markerRef.current) {
        markerRef.current.map = null
      }

      // Create new Advanced Marker
      if (google.maps.marker?.AdvancedMarkerElement) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position: position,
          content: markerContent,
          title: selectedLocation.city
        })
      } else {
        // Fallback to regular marker with custom icon
        new google.maps.Marker({
          position: position,
          map: mapInstanceRef.current,
          icon: {
            url: 'data:image/svg+xml,' + encodeURIComponent(`
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#E31F25"/>
                <circle cx="20" cy="18" r="7" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 48),
            anchor: new google.maps.Point(20, 48)
          },
          title: selectedLocation.city
        })
      }
    }

    loadGoogleMaps()
  }, [selectedLocation])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Elegant corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      
      {/* Open in Maps button */}
      <a
        href={selectedLocation.map_link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 flex items-center gap-2 px-5 py-3 bg-white text-[#1a1a1a] text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#C4A77D] hover:text-white transition-all duration-300 shadow-lg z-20"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Google Maps
      </a>
    </div>
  )
}

// Map component - uses Google Maps JavaScript API if key available, otherwise iframe
function EmbeddedMap({ selectedLocation }: { selectedLocation: Location }) {
  const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (hasApiKey) {
    return <GoogleMap selectedLocation={selectedLocation} />
  }

  // Iframe embed - shows native Google Maps with red pin (using address for proper label)
  const addressQuery = encodeURIComponent(`Prooptica ${selectedLocation.address}, ${selectedLocation.postal} ${selectedLocation.city}, Polska`)
  const mapUrl = `https://maps.google.com/maps?q=${addressQuery}&z=16&t=m&hl=pl&ie=UTF8&iwloc=B&output=embed`

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Map iframe - no grayscale filter so the native red Google pin shows */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa - ${selectedLocation.city}`}
        className="w-full h-full"
      />
      
      {/* Elegant corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#C4A77D]/40 pointer-events-none z-10" />
      
      {/* Open in Maps button */}
      <a
        href={selectedLocation.map_link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 flex items-center gap-2 px-5 py-3 bg-white text-[#1a1a1a] text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#C4A77D] hover:text-white transition-all duration-300 shadow-lg z-20"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Google Maps
      </a>
    </div>
  )
}

export function LocationsPreview() {
  const [containerRef, isVisible] = useSectionVisibility<HTMLElement>()
  const [selectedId, setSelectedId] = useState<string>(LOCATIONS[0].id)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const selectedLocation = LOCATIONS.find(loc => loc.id === selectedId) || LOCATIONS[0]
  
  // Auto-cycling effect - pause when not visible
  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      autoPlayIntervalRef.current = setInterval(() => {
        setSelectedId(currentId => {
          const currentIndex = LOCATIONS.findIndex(loc => loc.id === currentId)
          const nextIndex = (currentIndex + 1) % LOCATIONS.length
          return LOCATIONS[nextIndex].id
        })
      }, 4000) // Change every 4 seconds
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isAutoPlaying, isVisible])
  
  // Handle user selection - stops auto-play
  const handleLocationSelect = (locationId: string) => {
    setIsAutoPlaying(false)
    setSelectedId(locationId)
    
    // Resume auto-play after 10 seconds of inactivity
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <section ref={containerRef} className={cn("relative min-h-[calc(100vh-88px)] bg-white overflow-hidden flex flex-col justify-center py-10 sm:py-12 content-auto-heavy", getSectionVisibilityClass(isVisible))}>
      
      {/* Subtle texture overlay like Intro section */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      
      {/* Decorative large text - background (static for Safari performance) */}
      <div
        className="absolute top-20 right-8 font-display text-[8vw] font-bold text-[#1a1a1a] leading-none pointer-events-none select-none hidden xl:block tracking-[-0.02em] opacity-[0.02]"
      >
        LOKALIZACJE
      </div>
      
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0ded8] to-transparent"
      />
      
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
          
          {/* Left - Title */}
          <div className="lg:col-span-6">
            {/* Label */}
            <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-8">
              <span className="text-[#C4A77D] text-[10px] font-medium tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Nasze Salony
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-gradient-to-r from-[#C4A77D] to-transparent" />
            </div>
            
            {/* Headline */}
            <div className="mb-1 sm:mb-2">
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extralight text-[#1a1a1a] leading-[1] tracking-[-0.03em]">
                Znajdź nas
              </h2>
            </div>
            <div>
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium text-[#1a1a1a] leading-[1] tracking-[-0.03em]">
                blisko{" "}
                <span className="relative inline-block">
                  <span className="italic text-[#C4A77D]">siebie</span>
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#C4A77D]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </h2>
            </div>
          </div>
          
          {/* Right - Description & Stats */}
          <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-end">
            <p className="text-[#5a5a5a] text-sm sm:text-lg leading-[1.7] sm:leading-[1.8] mb-5 sm:mb-8 max-w-md font-light">
              Cztery eleganckie salony w kluczowych lokalizacjach. 
              Wszędzie ta sama jakość obsługi i pasja do doskonałości.
            </p>
            
            {/* Quick stats */}
            <div className="flex items-center gap-5 sm:gap-8">
              {[
                { value: "4", label: "Lokalizacje" },
                { value: "3", label: "Miasta" },
                { value: "20+", label: "Lat tradycji" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center relative">
                  {i > 0 && <div className="absolute -left-2.5 sm:-left-4 top-1/2 -translate-y-1/2 w-px h-5 sm:h-6 bg-[#e0ded8]" />}
                  <span className="font-display text-xl sm:text-2xl font-light text-[#1a1a1a] tracking-tight">{stat.value}</span>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.15em] text-[#999] uppercase mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Map & Cards */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Map - Left (larger) */}
          <div className="lg:col-span-7 order-2 lg:order-1 transform-gpu">
            <div className="relative bg-white h-full">
              
              {/* Artistic frame like Intro - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -inset-2 lg:-inset-3 border border-[#C4A77D]/20 pointer-events-none" />
              <div className="hidden sm:block absolute -inset-4 lg:-inset-6 border border-[#C4A77D]/10 pointer-events-none" />
              
              {/* Map Container */}
              <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                <div className="absolute inset-0 transform-gpu">
                  <EmbeddedMap selectedLocation={selectedLocation} />
                </div>
              </div>
              
              {/* Location Details Bar - Compact Luxurious Design */}
              <div className="relative bg-[#1a1a1a] overflow-hidden">
                {/* Subtle gold accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4A77D] to-transparent" />
                
                {/* Content */}
                <div className="relative px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    {/* Location Info */}
                    <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                      {/* Gold accent marker */}
                      <div className="w-1 h-10 bg-[#C4A77D] flex-shrink-0" />
                      
                      {/* Text info */}
                      <div className="min-w-0 overflow-hidden transform-gpu">
                        <h3 className="font-display text-lg text-white font-medium tracking-tight truncate">
                          {selectedLocation.city}
                        </h3>
                        <p className="text-white/50 text-xs truncate max-w-[280px]">
                          {selectedLocation.address}
                        </p>
                      </div>
                    </div>
                    
                    {/* Contact info - visible on mobile */}
                    <div className="flex sm:hidden items-center gap-4 pl-4 border-l border-white/10">
                      <a 
                        href={`tel:${selectedLocation.phone}`}
                        className="flex items-center gap-2 text-white/60 hover:text-[#C4A77D] transition-colors text-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C4A77D]" />
                        <span>{selectedLocation.phone}</span>
                      </a>
                      <div className="flex items-center gap-2 text-white/60 text-xs">
                        <Clock className="w-3.5 h-3.5 text-[#C4A77D]" />
                        <span>Pn-Pt 10-18</span>
                      </div>
                    </div>
                    
                    {/* Contact & CTA - Desktop */}
                    <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
                      {/* Contact icons - hidden on mobile (shown above) */}
                      <div className="hidden sm:flex items-center gap-4">
                        <a 
                          href={`tel:${selectedLocation.phone}`}
                          className="flex items-center gap-2 text-white/60 hover:text-[#C4A77D] transition-colors text-xs whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C4A77D]" />
                          <span className="hidden lg:inline">{selectedLocation.phone}</span>
                        </a>
                        <div className="hidden md:flex items-center gap-2 text-white/60 text-xs whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5 text-[#C4A77D]" />
                          <span>Pn-Pt 10-18</span>
                        </div>
                      </div>
                      
                      {/* Divider */}
                      <div className="hidden lg:block w-px h-8 bg-white/10" />
                      
                      {/* CTA Button */}
                      <Link href={`/umow-wizyte?salon=${LOCATION_TO_SALON_ID[selectedLocation.id]}`} className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto bg-[#C4A77D] text-[#1a1a1a] rounded-none font-semibold tracking-[0.1em] uppercase text-[9px] hover:bg-white transition-all duration-300 px-4 lg:px-6 h-9">
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          Umów wizytę
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Cards - Right */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {LOCATIONS.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isSelected={selectedId === location.id}
                  onClick={() => handleLocationSelect(location.id)}
                />
              ))}
            </div>
            
            {/* Auto-play indicator dots */}
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
              {LOCATIONS.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location.id)}
                  className="relative p-1 group"
                  aria-label={`Wybierz ${location.city}`}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    selectedId === location.id 
                      ? "bg-[#C4A77D] scale-125" 
                      : "bg-[#d0d0d0] group-hover:bg-[#C4A77D]/50"
                  )} />
                  {/* Progress ring for auto-play */}
                  {isAutoPlaying && selectedId === location.id && (
                    <svg className="absolute inset-0 w-4 h-4 -rotate-90" viewBox="0 0 16 16">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="none"
                        stroke="#C4A77D"
                        strokeWidth="1.5"
                        strokeDasharray="37.7"
                        className="animate-[progress_4s_linear_infinite]"
                        style={{
                          strokeDashoffset: 37.7,
                          animation: 'progress 4s linear infinite'
                        }}
                      />
                    </svg>
                  )}
                </button>
              ))}
              {/* Auto-play status indicator */}
              <div className={cn(
                "ml-2 text-[9px] tracking-[0.1em] uppercase transition-opacity duration-200",
                isAutoPlaying ? "text-[#C4A77D] opacity-100" : "text-[#999] opacity-50"
              )}>
                {isAutoPlaying ? "Auto" : "Pauza"}
              </div>
            </div>
            
            {/* CTA Link */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#e0ded8]">
              <Link href="/salony" className="group inline-flex items-center gap-4 sm:gap-6">
                <span className="text-[#1a1a1a] text-[10px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase">
                  Wszystkie lokalizacje
                </span>
                <div className="relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-8 sm:w-12 h-px bg-[#1a1a1a]/30 group-hover:bg-[#C4A77D] group-hover:w-12 sm:group-hover:w-16 transition-all duration-200" />
                    <ArrowRight className="w-4 h-4 text-[#1a1a1a]/50 group-hover:text-[#C4A77D] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
