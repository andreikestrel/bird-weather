'use client'
import { useWeather } from '@/hooks/useWeather'
import { useCityBackground } from '@/hooks/useCityBackground'
import { useWeatherStore } from '@/store/weather.store'
import WeatherCard from './WeatherCard'
import WeatherSkeleton from './WeatherSkeleton'
import ForecastStrip from './ForecastStrip'

export default function WeatherDisplay() {
  useWeather()
  useCityBackground()

  const { selectedCity, isLoading, error } = useWeatherStore((s) => ({
    selectedCity: s.selectedCity,
    isLoading: s.isLoading,
    error: s.error,
  }))

  if (!selectedCity) return null

  if (isLoading) return <WeatherSkeleton />

  if (error) {
    return (
      <div className="glass-card p-6 w-full max-w-lg mx-auto text-center">
        <p className="text-white/80 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <WeatherCard />
      <ForecastStrip />
    </div>
  )
}
