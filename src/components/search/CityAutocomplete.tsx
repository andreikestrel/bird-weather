'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, Loader2, MapPin, Clock, X } from 'lucide-react'
import { useCityAutocomplete } from '@/hooks/useCityAutocomplete'
import { useCityHistory } from '@/hooks/useCityHistory'
import { useWeatherStore } from '@/store/weather.store'
import type { GeocodingResult } from '@/models/weather.types'

export default function CityAutocomplete() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const { suggestions, loading } = useCityAutocomplete(query)
  const { history, addCity, removeCity } = useCityHistory()
  const setCity = useWeatherStore((s) => s.setCity)
  const containerRef = useRef<HTMLDivElement>(null)

  const showSuggestions = focused && suggestions.length > 0
  const showHistory = focused && query.trim() === '' && history.length > 0
  const isOpen = showSuggestions || showHistory

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(cityKey: string, label: string, displayQuery: string) {
    setQuery(displayQuery)
    setFocused(false)
    setCity(cityKey)
    addCity(cityKey, label)
  }

  function handleSelectSuggestion(city: GeocodingResult) {
    const label = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`
    handleSelect(`${city.name},${city.country}`, label, `${city.name}, ${city.country}`)
  }

  function handleSelectHistory(cityKey: string, label: string) {
    const displayQuery = label.split(',')[0].trim() + ', ' + cityKey.split(',')[1]
    setQuery(displayQuery)
    setFocused(false)
    setCity(cityKey)
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
          onFocus={() => setFocused(true)}
          placeholder="Busque uma cidade..."
          className="w-full h-14 pl-11 pr-12 rounded-2xl text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/50 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/20 backdrop-blur-xl shadow-sm dark:shadow-none transition-all"
        />
        {loading && (
          <Loader2
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50 animate-spin"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/20 shadow-xl z-50 animate-slide-up bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl">

          {showHistory && (
            <>
              <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                <Clock size={12} className="text-slate-400 dark:text-white/30" />
                <span className="text-xs text-slate-400 dark:text-white/30 uppercase tracking-wider font-medium">Recentes</span>
              </div>
              {history.map((entry) => (
                <div
                  key={entry.city}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0 group"
                >
                  <Clock size={14} className="text-slate-300 dark:text-white/30 shrink-0" />
                  <button
                    onClick={() => handleSelectHistory(entry.city, entry.label)}
                    className="flex-1 text-left text-slate-700 dark:text-white/80 text-sm"
                  >
                    {entry.label}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeCity(entry.city) }}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-white/30 hover:text-slate-500 dark:hover:text-white/60 transition-all"
                    aria-label="Remover"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </>
          )}

          {showSuggestions && suggestions.map((city, idx) => (
            <button
              key={`${city.lat}-${city.lon}-${idx}`}
              onClick={() => handleSelectSuggestion(city)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <MapPin size={14} className="text-slate-400 dark:text-white/50 shrink-0" />
              <span className="text-slate-700 dark:text-white text-sm">
                {city.name}{city.state ? `, ${city.state}` : ''}, {city.country}
              </span>
            </button>
          ))}

        </div>
      )}
    </div>
  )
}
