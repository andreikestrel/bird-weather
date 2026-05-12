'use client'
import { useWeatherStore } from '@/store/weather.store'

export default function CityBackground() {
  const backgroundUrl = useWeatherStore((s) => s.backgroundUrl)

  return (
    <div className="fixed inset-0 -z-10 transition-all duration-1000">
      {backgroundUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={backgroundUrl} alt="" className="w-full h-full object-cover" />
      ) : (
        <>
          <div className="dark:hidden w-full h-full bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200" />
          <div className="hidden dark:block w-full h-full bg-gradient-to-br from-slate-900 via-primary-dark to-indigo-900" />
        </>
      )}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/50 opacity-0 dark:opacity-100" />
    </div>
  )
}
