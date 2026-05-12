'use client'
import { useEffect } from 'react'
import { useWeatherStore } from '@/store/weather.store'

export function useCityBackground() {
  const selectedCity = useWeatherStore((s) => s.selectedCity)
  const setBackground = useWeatherStore((s) => s.setBackground)

  useEffect(() => {
    if (!selectedCity) return

    let cancelled = false

    const fetchImage = async () => {
      try {
        const cityName = selectedCity.split(',')[0].trim()
        const res = await fetch(`/api/city-image?city=${encodeURIComponent(cityName)}`)
        if (res.ok && !cancelled) {
          const data: { url: string | null } = await res.json()
          setBackground(data.url)
        }
      } catch {
        // silently fail, gradient fallback is shown
      }
    }

    fetchImage()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])
}
