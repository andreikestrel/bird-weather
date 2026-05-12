export interface AlertCondition {
  type: 'temp_above' | 'temp_below' | 'rain' | 'wind'
  threshold?: number
}

export interface Alert {
  id: string
  city: string
  lat: number
  lon: number
  condition: AlertCondition['type']
  threshold?: number | null
  active: boolean
  createdAt: string
}
