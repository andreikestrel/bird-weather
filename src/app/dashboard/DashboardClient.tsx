'use client'
import { useState } from 'react'
import { Bell } from 'lucide-react'
import AlertForm from '@/components/alerts/AlertForm'
import AlertCard from '@/components/alerts/AlertCard'
import PushSubscribeButton from '@/components/alerts/PushSubscribeButton'
import type { Alert } from '@/models/user.types'

interface DashboardClientProps {
  initialAlerts: Alert[]
}

export default function DashboardClient({ initialAlerts }: DashboardClientProps) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  async function refreshAlerts() {
    const res = await fetch('/api/alerts')
    if (res.ok) {
      const data: Alert[] = await res.json()
      setAlerts(data)
    }
  }

  async function deleteAlert(id: string) {
    await fetch(`/api/alerts/${id}`, { method: 'DELETE' })
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-primary-light" />
          <h2 className="font-heading font-bold text-white text-lg">Notificações Push</h2>
        </div>
        <PushSubscribeButton />
      </div>

      <AlertForm onCreated={refreshAlerts} />

      {alerts.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wider">
            Alertas ativos ({alerts.length})
          </h3>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onDelete={deleteAlert} />
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-sm text-center py-4">Nenhum alerta configurado ainda.</p>
      )}
    </div>
  )
}
