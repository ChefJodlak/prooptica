"use client"

import { useEffect, useRef } from "react"
import type { Location } from "@/lib/constants/locations"

interface SalonMapProps {
  location: Location
}

function GoogleMap({ location }: { location: Location }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

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
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
      }

      // Create or update map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })
      } else {
        mapInstanceRef.current.setCenter(position)
      }

      // Create custom marker content (Red Pin)
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
          title: location.city
        })
      } else {
        // Fallback to regular marker
        new google.maps.Marker({
          position: position,
          map: mapInstanceRef.current,
          title: location.city
        })
      }
    }

    loadGoogleMaps()
  }, [location])

  return (
    <div className="relative w-full h-full group">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}

function IframeMap({ location }: { location: Location }) {
  return (
    <div className="relative w-full h-full group">
      <iframe 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        style={{ border: 0 }} 
        src={`https://maps.google.com/maps?q=${encodeURIComponent('Prooptica ' + location.city + ' ' + location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        allowFullScreen
        loading="lazy"
        title={`Mapa ${location.city}`}
        className="w-full h-full"
      />
    </div>
  )
}

export function SalonMap({ location }: SalonMapProps) {
  const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  return (
    <div className="w-full h-full bg-[#f5f5f5] overflow-hidden border border-[#e0ded8]">
      {hasApiKey ? (
        <GoogleMap location={location} />
      ) : (
        <IframeMap location={location} />
      )}
    </div>
  )
}
