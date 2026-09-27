import { getTypeIcon, getTypeColor, PokemonTypeName } from '@/lib/type-effectiveness'

interface TypeIconProps {
  type: PokemonTypeName
  size?: number
  /** White outline, so the icon stays visible on a colored background of the same type */
  ring?: boolean
}

// The type sprites are 200x40 banners with the symbol centered at x=29.5, y=20;
// a 40x40 window around it gives a compact round icon
const BANNER_WIDTH = 200
const BANNER_HEIGHT = 40
const SYMBOL_CENTER_X = 29.5
const BANNER_ASPECT = BANNER_WIDTH / BANNER_HEIGHT
// Shift left so the symbol center lands in the middle of the circle
const OFFSET_RATIO = (SYMBOL_CENTER_X - BANNER_HEIGHT / 2) / BANNER_HEIGHT

/** Round type symbol cropped from the type banner, with the type color behind it while loading */
export function TypeIcon({ type, size = 18, ring = false }: TypeIconProps) {
  return (
    <span
      className="inline-block rounded-full overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: getTypeColor(type),
        boxShadow: ring ? '0 0 0 1.5px rgba(255,255,255,0.85)' : undefined,
      }}
      title={type}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getTypeIcon(type)}
        alt={type}
        draggable={false}
        style={{ height: size, width: size * BANNER_ASPECT, maxWidth: 'none', marginLeft: -size * OFFSET_RATIO }}
      />
    </span>
  )
}
