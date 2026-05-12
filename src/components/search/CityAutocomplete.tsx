'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, Loader2, MapPin } from 'lucide-react'
import { useCityAutocomplete } from '@/hooks/useCityAutocomplete'
import { useCityHistory } from '@/hooks/useCityHistory'
import { useWeatherStore } from '@/store/weather.store'
import type { GeocodingResult } from '@/models/weather.types'

export default function CityAutocomplete() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { suggestions, loading } = useCityAutocomplete(query)
  const setCity = useWeatherStore((s) => s.setCity)
  const { addCity } = useCityHistory()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(suggestions.length > 0)
  }, [suggestions])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(city: GeocodingResult) {
    const label = city.state ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`
    const cityKey = `${city.name},${city.country}`
    setQuery(`${city.name}, ${city.country}`)
    setOpen(false)
    setCity(cityKey)
    addCity(cityKey, label)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque uma cidade..."
          className="w-full h-14 pl-11 pr-12 rounded-2xl text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/50 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/20 backdrop-blur-xl shadow-sm dark:shadow-none transition-all"
          onFocus={() => suggestions.length > 0 && setOpen(true)}
        />
        {loading && (
          <Loader2
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50 animate-spin"
          />
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-2xl overflow-hidden border border-white/20 shadow-xl z-50 animate-slide-up">
          {suggestions.map((city, idx) => (
            <button
              key={`${city.lat}-${city.lon}-${idx}`}
              onClick={() => handleSelect(city)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <MapPin size={15} className="text-slate-400 dark:text-white/50 shrink-0" />
              <span className="text-slate-700 dark:text-white text-sm">
                {city.name}
                {city.state ? `, ${city.state}` : ''}, {city.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
