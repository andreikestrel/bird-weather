'use client'
import { useWeatherStore } from '@/store/weather.store'
import WeatherIcon from './WeatherIcon'
import { formatWeekday, formatTemp } from '@/lib/utils'

export default function ForecastStrip() {
  const forecast = useWeatherStore((s) => s.forecast)

  if (forecast.length === 0) return null

  return (
    <div className="glass-card p-4 w-full max-w-lg mx-auto">
      <p className="text-xs text-slate-400 dark:text-white/50 uppercase tracking-wider mb-3 font-semibold">Previsão 5 dias</p>
      <div className="flex justify-between gap-2">
        {forecast.map((day) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
            <p className="text-xs text-slate-500 dark:text-white/60 capitalize">{formatWeekday(day.date)}</p>
            <WeatherIcon code={day.icon} size={20} className="text-slate-500 dark:text-white/80" />
            <p className="text-xs font-semibold text-slate-700 dark:text-white">{formatTemp(day.high)}</p>
            <p className="text-xs text-slate-400 dark:text-white/50">{formatTemp(day.low)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
