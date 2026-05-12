import { create } from 'zustand'
import type { WeatherData, ForecastDay } from '@/models/weather.types'

interface WeatherStore {
  selectedCity: string | null
  weatherData: WeatherData | null
  forecast: ForecastDay[]
  isLoading: boolean
  error: string | null
  backgroundUrl: string | null

  setCity: (city: string) => void
  setWeatherData: (data: WeatherData) => void
  setForecast: (forecast: ForecastDay[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setBackground: (url: string | null) => void
  reset: () => void
}

export const useWeatherStore = create<WeatherStore>()((set) => ({
  selectedCity: null,
  weatherData: null,
  forecast: [],
  isLoading: false,
  error: null,
  backgroundUrl: null,

  setCity: (city) => set({ selectedCity: city, weatherData: null, error: null }),
  setWeatherData: (data) => set({ weatherData: data }),
  setForecast: (forecast) => set({ forecast }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setBackground: (backgroundUrl) => set({ backgroundUrl }),
  reset: () =>
    set({ selectedCity: null, weatherData: null, forecast: [], error: null, backgroundUrl: null }),
}))
