'use client'
import { useState } from 'react'
import { Bell, BellOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PushSubscribeButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'subscribed' | 'error'>('idle')

  async function subscribe() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!publicKey) throw new Error('VAPID key não configurada')

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      const key = subscription.getKey('p256dh')
      const auth = subscription.getKey('auth')

      await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          p256dh: key ? Buffer.from(key).toString('base64') : '',
          auth: auth ? Buffer.from(auth).toString('base64') : '',
        }),
      })

      setStatus('subscribed')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={subscribe}
        disabled={status === 'loading' || status === 'subscribed'}
        variant="glass"
        className="gap-2"
      >
        {status === 'loading' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : status === 'subscribed' ? (
          <BellOff size={16} />
        ) : (
          <Bell size={16} />
        )}
        {status === 'subscribed' ? 'Notificações ativas' : 'Ativar notificações push'}
      </Button>
      {status === 'error' && (
        <p className="text-red-400 text-xs">Não foi possível ativar as notificações.</p>
      )}
    </div>
  )
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from(Array.from(rawData).map((c) => c.charCodeAt(0)))
}
