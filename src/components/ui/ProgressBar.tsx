import { cn } from '@/lib/cn'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  valueLabel?: string
  className?: string
}

export function ProgressBar({ value, max, label, valueLabel, className }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div className={cn(className)}>
      {(label || valueLabel) && (
        <div
          className="flex justify-between text-[12px] mb-1"
          style={{ color: 'var(--color-neutral-300)' }}
        >
          {label && <span className="uppercase tracking-wide">{label}</span>}
          {valueLabel && <span>{valueLabel}</span>}
        </div>
      )}
      <div
        className="h-[6px] rounded-full overflow-hidden"
        style={{ background: 'var(--color-neutral-800)' }}
      >
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: 'var(--color-accent)' }}
        />
      </div>
    </div>
  )
}
