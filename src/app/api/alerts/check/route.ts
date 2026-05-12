import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentWeather } from '@/services/weather.service'
import { sendPushNotification } from '@/services/notification.service'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.NEXTAUTH_SECRET}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const alerts = await prisma.alert.findMany({
    where: { active: true },
    include: {
      user: {
        include: { pushSubscriptions: true },
      },
    },
  })

  const results = await Promise.allSettled(
    alerts.map(async (alert) => {
      const weather = await getCurrentWeather(alert.city)
      let triggered = false
      let message = ''

      switch (alert.condition) {
        case 'temp_above':
          if (alert.threshold !== null && weather.temperature > alert.threshold) {
            triggered = true
            message = `Temperatura em ${alert.city} está ${Math.round(weather.temperature)}°C (acima de ${alert.threshold}°C)`
          }
          break
        case 'temp_below':
          if (alert.threshold !== null && weather.temperature < alert.threshold) {
            triggered = true
            message = `Temperatura em ${alert.city} está ${Math.round(weather.temperature)}°C (abaixo de ${alert.threshold}°C)`
          }
          break
        case 'rain':
          if (weather.description.includes('chuva') || weather.description.includes('chuvisco')) {
            triggered = true
            message = `Chuva detectada em ${alert.city}: ${weather.description}`
          }
          break
        case 'wind':
          if (alert.threshold !== null && weather.windSpeed * 3.6 > alert.threshold) {
            triggered = true
            message = `Vento forte em ${alert.city}: ${Math.round(weather.windSpeed * 3.6)} km/h`
          }
          break
      }

      if (triggered) {
        await Promise.allSettled(
          alert.user.pushSubscriptions.map((sub) =>
            sendPushNotification({ endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth }, weather, message)
          )
        )
      }

      return { alertId: alert.id, triggered }
    })
  )

  const summary = results.map((r) => (r.status === 'fulfilled' ? r.value : { error: r.reason }))
  return NextResponse.json({ processed: alerts.length, results: summary })
}
