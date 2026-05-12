import type { WeatherData, ForecastDay } from '@/models/weather.types'

const BASE_URL = 'https://api.openweathermap.org'

function getApiKey(): string {
  const key = process.env.OPENWEATHER_API_KEY
  if (!key) throw new Error('OPENWEATHER_API_KEY não configurada')
  return key
}

interface OWMWeatherResponse {
  name: string
  sys: { country: string; sunrise: number; sunset: number }
  coord: { lat: number; lon: number }
  weather: Array<{ description: string; icon: string }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: { speed: number }
  visibility: number
  timezone: number
  cod: number
  message?: string
}

interface OWMForecastItem {
  dt_txt: string
  weather: Array<{ description: string; icon: string }>
  main: { temp: number; temp_min: number; temp_max: number }
}

interface OWMForecastResponse {
  list: OWMForecastItem[]
  cod: string
  message?: string
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const key = getApiKey()
  const url = `${BASE_URL}/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric&lang=pt_br`

  const res = await fetch(url, { next: { revalidate: 300 } })
  const data: OWMWeatherResponse = await res.json()

  if (data.cod === 404 || !res.ok) {
    throw new Error('Cidade não encontrada')
  }

  return {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
  }
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  const key = getApiKey()
  const url = `${BASE_URL}/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=metric&lang=pt_br`

  const res = await fetch(url, { next: { revalidate: 300 } })
  const data: OWMForecastResponse = await res.json()

  if (data.cod !== '200' || !res.ok) {
    throw new Error('Erro ao buscar previsão')
  }

  const grouped = new Map<string, OWMForecastItem[]>()
  for (const item of data.list) {
    const date = item.dt_txt.split(' ')[0]
    if (!grouped.has(date)) grouped.set(date, [])
    grouped.get(date)!.push(item)
  }

  return Array.from(grouped.entries())
    .slice(1, 6)
    .map(([date, items]) => {
      const noonItem = items[Math.floor(items.length / 2)]
      return {
        date,
        icon: noonItem.weather[0].icon,
        description: noonItem.weather[0].description,
        high: Math.max(...items.map((i) => i.main.temp_max)),
        low: Math.min(...items.map((i) => i.main.temp_min)),
      }
    })
}
