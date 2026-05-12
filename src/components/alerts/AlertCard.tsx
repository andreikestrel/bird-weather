'use client'
import { Trash2, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Alert } from '@/models/user.types'

const conditionLabels: Record<string, string> = {
  temp_above: 'Temperatura acima de',
  temp_below: 'Temperatura abaixo de',
  rain: 'Chuva detectada',
  wind: 'Vento acima de',
}

interface AlertCardProps {
  alert: Alert
  onDelete: (id: string) => void
}

export default function AlertCard({ alert, onDelete }: AlertCardProps) {
  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between gap-3 border border-white/20">
      <div className="flex items-center gap-3 min-w-0">
        <MapPin size={16} className="text-white/50 shrink-0" />
        <div className="min-w-0">
          <p className="text-white font-medium text-sm truncate">{alert.city}</p>
          <p className="text-white/50 text-xs">
            {conditionLabels[alert.condition]}
            {alert.threshold !== null && alert.threshold !== undefined ? ` ${alert.threshold}°C` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant="accent">Ativo</Badge>
        <button
          onClick={() => onDelete(alert.id)}
          className="text-white/40 hover:text-red-400 transition-colors p-1"
          aria-label="Excluir alerta"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
