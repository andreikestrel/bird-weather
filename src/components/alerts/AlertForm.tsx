'use client'
import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GeocodingResult } from '@/models/weather.types'
import { useCityAutocomplete } from '@/hooks/useCityAutocomplete'

interface AlertFormProps {
  onCreated: () => void
}

const conditions = [
  { value: 'temp_above', label: 'Temperatura acima de', hasThreshold: true, unit: '°C' },
  { value: 'temp_below', label: 'Temperatura abaixo de', hasThreshold: true, unit: '°C' },
  { value: 'rain', label: 'Chuva detectada', hasThreshold: false },
  { value: 'wind', label: 'Vento acima de', hasThreshold: true, unit: 'km/h' },
]

export default function AlertForm({ onCreated }: AlertFormProps) {
  const [cityQuery, setCityQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null)
  const [condition, setCondition] = useState('temp_above')
  const [threshold, setThreshold] = useState('30')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)

  const { suggestions } = useCityAutocomplete(cityQuery)
  const activeCondition = conditions.find((c) => c.value === condition)

  function selectCity(city: GeocodingResult) {
    setSelectedCity(city)
    setCityQuery(`${city.name}, ${city.country}`)
    setShowSuggestions(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedCity) return

    setLoading(true)
    try {
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: `${selectedCity.name}, ${selectedCity.country}`,
          lat: selectedCity.lat,
          lon: selectedCity.lon,
          condition,
          threshold: activeCondition?.hasThreshold ? Number(threshold) : undefined,
        }),
      })
      setCityQuery('')
      setSelectedCity(null)
      onCreated()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <h3 className="font-heading font-semibold text-white text-lg">Novo alerta</h3>

      {/* City search */}
      <div className="relative">
        <Input
          placeholder="Cidade..."
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value)
            setSelectedCity(null)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 glass-dark rounded-xl overflow-hidden z-10 border border-white/20">
            {suggestions.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectCity(c)}
                className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                {c.name}{c.state ? `, ${c.state}` : ''}, {c.country}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Condition */}
      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {conditions.map((c) => (
          <option key={c.value} value={c.value} className="bg-slate-900">
            {c.label}
          </option>
        ))}
      </select>

      {/* Threshold */}
      {activeCondition?.hasThreshold && (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-32"
          />
          <span className="text-white/60 text-sm">{activeCondition.unit}</span>
        </div>
      )}

      <Button type="submit" disabled={!selectedCity || loading} className="w-full gap-2">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        Criar alerta
      </Button>
    </form>
  )
}
