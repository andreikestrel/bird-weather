import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'warning' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-primary/20 text-primary-light border border-primary/30': variant === 'default',
          'bg-accent/20 text-accent border border-accent/30': variant === 'accent',
          'bg-warning/20 text-warning border border-warning/30': variant === 'warning',
          'bg-transparent border border-white/30 text-white/80': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}
