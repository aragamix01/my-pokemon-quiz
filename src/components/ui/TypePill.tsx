import { getTypeColor, PokemonTypeName } from '@/lib/type-effectiveness'
import { cn } from '@/lib/cn'

interface TypePillProps {
  type: PokemonTypeName
  className?: string
  onClick?: () => void
  selected?: boolean
  /** Same width for every type (fits the longest name) so pills line up everywhere; pass false to size by text */
  fixed?: boolean
}

const FIXED_WIDTH = 92

export function TypePill({ type, className, onClick, selected, fixed = true }: TypePillProps) {
  const color = getTypeColor(type)
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wide',
        onClick && 'cursor-pointer',
        fixed && 'justify-center',
        className
      )}
      style={{
        border: `1px solid ${color}`,
        background: selected ? color : 'var(--color-neutral-900)',
        color: selected ? 'var(--color-bg)' : 'var(--color-neutral-100)',
        width: fixed ? FIXED_WIDTH : undefined,
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
