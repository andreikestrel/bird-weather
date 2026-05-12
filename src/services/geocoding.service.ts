import type { GeocodingResult } from '@/models/weather.types'

interface OWMGeoResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
  local_names?: Record<string, string>
}

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  const key = process.env.OPENWEATHER_API_KEY
  if (!key) throw new Error('OPENWEATHER_API_KEY não configurada')

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${key}`
  const res = await fetch(url, { next: { revalidate: 60 } })

  if (!res.ok) throw new Error('Erro ao buscar cidades')

  const data: OWMGeoResult[] = await res.json()

  return data.map((item) => ({
    name: item.local_names?.pt ?? item.name,
    country: item.country,
    state: item.state,
    lat: item.lat,
    lon: item.lon,
  }))
}
