import { Droplets, Wind, Gauge, Eye } from 'lucide-react'
import { formatSpeed } from '@/lib/utils'
import type { WeatherData } from '@/models/weather.types'

interface WeatherDetailsProps {
  data: WeatherData
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const items = [
    { icon: Droplets, label: 'Umidade', value: `${data.humidity}%` },
    { icon: Wind, label: 'Vento', value: formatSpeed(data.windSpeed) },
    { icon: Gauge, label: 'Pressão', value: `${data.pressure} hPa` },
    { icon: Eye, label: 'Visibilidade', value: `${(data.visibility / 1000).toFixed(1)} km` },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-slate-100/80 dark:bg-white/5 rounded-xl p-3 text-center border border-slate-200/60 dark:border-white/10">
          <Icon size={18} className="mx-auto mb-1 text-slate-400 dark:text-white/60" />
          <p className="text-xs text-slate-400 dark:text-white/50 mb-0.5">{label}</p>
          <p className="text-sm font-semibold text-slate-700 dark:text-white">{value}</p>
        </div>
      ))}
    </div>
  )
}
