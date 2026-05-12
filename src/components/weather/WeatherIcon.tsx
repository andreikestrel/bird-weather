import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  Wind,
  Eye,
  type LucideProps,
} from 'lucide-react'

const iconMap: Record<string, React.FC<LucideProps>> = {
  '01': Sun,
  '02': CloudSun,
  '03': Cloud,
  '04': Cloud,
  '09': CloudDrizzle,
  '10': CloudRain,
  '11': CloudLightning,
  '13': CloudSnow,
  '50': Wind,
}

interface WeatherIconProps extends LucideProps {
  code: string
}

export default function WeatherIcon({ code, ...props }: WeatherIconProps) {
  const base = code.slice(0, 2)
  const Icon = iconMap[base] ?? Eye
  return <Icon {...props} />
}
