import { ReactNode, CSSProperties } from 'react'
import { getTypeCardColor } from '@/lib/type-card-colors'
import { PokeballMark } from './PokeballMark'
import { cn } from '@/lib/cn'

interface TypePanelProps {
  /** First type of the Pokemon; decides the color */
  type?: string
  /**
   * false keeps the neutral dark background, for games where the color would
   * give away the answer (it turns colored once the answer is shown)
   */
  revealed?: boolean
  watermark?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Background panel in a Pokemon's type color with a faint Pokeball, matching the Pokedex cards */
export function TypePanel({ type, revealed = true, watermark = true, className, style, children }: TypePanelProps) {
  const color = type && revealed ? getTypeCardColor(type) : null
  return (
    <div
      className={cn('relative overflow-hidden rounded-xl', className)}
      style={{
        background: color ?? 'var(--color-bg)',
        boxShadow: color ? `0 8px 20px -10px ${color}` : undefined,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
    >
      {watermark && (
        <PokeballMark
          className="absolute -right-[12%] -bottom-[16%] w-[80%] h-[80%] pointer-events-none"
          style={{ color: color ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.04)' }}
        />
      )}
      <div className="relative w-full h-full">{children}</div>
    </div>
  )
}
