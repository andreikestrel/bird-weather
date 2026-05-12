'use client'
import { useEffect } from 'react'
import { useWeatherStore } from '@/store/weather.store'

export function useWeather() {
  const selectedCity = useWeatherStore((s) => s.selectedCity)
  const setWeatherData = useWeatherStore((s) => s.setWeatherData)
  const setForecast = useWeatherStore((s) => s.setForecast)
  const setLoading = useWeatherStore((s) => s.setLoading)
  const setError = useWeatherStore((s) => s.setError)

  useEffect(() => {
    if (!selectedCity) return

    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch(`/api/weather/current?city=${encodeURIComponent(selectedCity)}`),
          fetch(`/api/weather/forecast?city=${encodeURIComponent(selectedCity)}`),
        ])

        if (cancelled) return
        if (!currentRes.ok) throw new Error('Cidade não encontrada')

        const [current, forecast] = await Promise.all([currentRes.json(), forecastRes.json()])

        if (!cancelled) {
          setWeatherData(current)
          setForecast(forecast)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao buscar dados')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])
}
