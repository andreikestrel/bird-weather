import webpush from 'web-push'
import type { WeatherData } from '@/models/weather.types'

function configurePush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY

  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys não configuradas')
  }

  webpush.setVapidDetails('mailto:alerts@bird-weather.app', publicKey, privateKey)
}

export interface PushSubscriptionData {
  endpoint: string
  p256dh: string
  auth: string
}

export async function sendPushNotification(
  subscription: PushSubscriptionData,
  weather: WeatherData,
  message: string
): Promise<void> {
  configurePush()

  const payload = JSON.stringify({
    title: `Alerta — ${weather.city}`,
    body: message,
    icon: `/favicon.ico`,
    badge: `/favicon.ico`,
    data: { city: weather.city, url: '/' },
  })

  await webpush.sendNotification(
    {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    },
    payload
  )
}
