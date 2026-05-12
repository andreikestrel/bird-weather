'use client'
import { useState, useEffect } from 'react'
import type { GeocodingResult } from '@/models/weather.types'

export function useCityAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/weather/geocode?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data: GeocodingResult[] = await res.json()
          setSuggestions(data)
        }
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return { suggestions, loading }
}
