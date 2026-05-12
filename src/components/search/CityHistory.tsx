'use client'
import { Clock, X } from 'lucide-react'
import { useCityHistory } from '@/hooks/useCityHistory'
import { useWeatherStore } from '@/store/weather.store'

export default function CityHistory() {
  const { history, removeCity } = useCityHistory()
  const setCity = useWeatherStore((s) => s.setCity)

  if (history.length === 0) return null

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-2 px-1">
        <Clock size={13} className="text-slate-400 dark:text-white/40" />
        <span className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Recentes</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((entry) => (
          <div
            key={entry.city}
            className="flex items-center gap-1.5 bg-white/80 dark:bg-white/10 rounded-full px-3 py-1.5 border border-slate-200 dark:border-white/15 shadow-sm dark:shadow-none"
          >
            <button
              onClick={() => setCity(entry.city)}
              className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
            >
              {entry.label}
            </button>
            <button
              onClick={() => removeCity(entry.city)}
              className="text-slate-300 dark:text-white/30 hover:text-slate-500 dark:hover:text-white/70 transition-colors ml-0.5"
              aria-label="Remover do histórico"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
