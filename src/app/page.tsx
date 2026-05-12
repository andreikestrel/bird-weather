import CityAutocomplete from '@/components/search/CityAutocomplete'
import CityHistory from '@/components/search/CityHistory'
import WeatherDisplay from '@/components/weather/WeatherDisplay'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 relative z-10">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-slate-800 dark:text-white mb-3 text-shadow">
            Clima em tempo real
          </h1>
          <p className="text-slate-500 dark:text-white/60 text-lg">
            Busque qualquer cidade do mundo e veja o clima agora
          </p>
        </div>
        <CityAutocomplete />
        <CityHistory />
        <WeatherDisplay />
      </div>
    </main>
  )
}
