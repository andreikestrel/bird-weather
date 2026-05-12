import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth().catch(() => null)
  if (!session?.user?.id) redirect('/login')

  const alerts = await prisma.alert.findMany({
    where: { userId: session.user.id, active: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-1">
            {session.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt="" className="w-10 h-10 rounded-full" />
            )}
            <div>
              <p className="font-heading font-bold text-white text-lg">{session.user.name}</p>
              <p className="text-white/50 text-sm">{session.user.email}</p>
            </div>
          </div>
        </div>

        <DashboardClient initialAlerts={alerts.map((a) => ({
          id: a.id,
          city: a.city,
          lat: a.lat,
          lon: a.lon,
          condition: a.condition as 'temp_above' | 'temp_below' | 'rain' | 'wind',
          threshold: a.threshold,
          active: a.active,
          createdAt: a.createdAt.toISOString(),
        }))} />
      </div>
    </main>
  )
}
