'use client'
import { MapPin } from 'lucide-react'
import { useWeatherStore } from '@/store/weather.store'
import WeatherIcon from './WeatherIcon'
import WeatherDetails from './WeatherDetails'
import { formatTemp } from '@/lib/utils'

export default function WeatherCard() {
  const data = useWeatherStore((s) => s.weatherData)

  if (!data) return null

  return (
    <div className="glass-card p-6 sm:p-8 w-full max-w-lg mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={14} className="text-slate-400 dark:text-white/60" />
            <p className="text-sm text-slate-500 dark:text-white/60">
              {data.city}, {data.country}
            </p>
          </div>
          <p className="text-slate-600 dark:text-white/70 capitalize text-base">{data.description}</p>
        </div>
        <WeatherIcon code={data.icon} size={52} className="text-warning drop-shadow-lg" />
      </div>

      <div className="flex items-end gap-4 mb-2">
        <span className="font-heading font-bold text-8xl text-slate-800 dark:text-white leading-none text-shadow">
          {Math.round(data.temperature)}
        </span>
        <div className="pb-3">
          <span className="text-4xl text-slate-600 dark:text-white/80">°C</span>
          <p className="text-sm text-slate-400 dark:text-white/50 mt-1">sente {formatTemp(data.feelsLike)}</p>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-slate-400 dark:text-white/60 mb-4">
        <span>↑ {formatTemp(data.tempMax)}</span>
        <span>↓ {formatTemp(data.tempMin)}</span>
      </div>

      <WeatherDetails data={data} />
    </div>
  )
}
