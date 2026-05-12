export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  tempMin: number
  tempMax: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  sunrise: number
  sunset: number
  timezone: number
  lat: number
  lon: number
}

export interface ForecastDay {
  date: string
  icon: string
  description: string
  high: number
  low: number
}

export interface GeocodingResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export interface WeatherError {
  message: string
  code?: number
}
