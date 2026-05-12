export default function WeatherSkeleton() {
  return (
    <div className="glass-card p-8 w-full max-w-lg mx-auto animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <div className="h-7 w-36 bg-white/20 rounded-lg" />
          <div className="h-4 w-24 bg-white/10 rounded-lg" />
        </div>
        <div className="h-14 w-14 bg-white/20 rounded-full" />
      </div>
      <div className="h-20 w-40 bg-white/20 rounded-xl mb-6" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-white/10 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
