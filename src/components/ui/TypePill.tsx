import { getTypeColor, PokemonTypeName } from '@/lib/type-effectiveness'
import { cn } from '@/lib/cn'

interface TypePillProps {
  type: PokemonTypeName
  className?: string
  onClick?: () => void
  selected?: boolean
}

export function TypePill({ type, className, onClick, selected }: TypePillProps) {
  const color = getTypeColor(type)
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wide',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        border: `1px solid ${color}`,
        background: selected ? color : 'var(--color-neutral-900)',
        color: selected ? 'var(--color-bg)' : 'var(--color-neutral-100)',
      }}
    >
      <span
        className="inline-block w-[7px] h-[7px] rounded-full mr-1.5 flex-shrink-0"
        style={{ background: selected ? 'var(--color-bg)' : color }}
      />
      {type}
    </span>
  )
}
