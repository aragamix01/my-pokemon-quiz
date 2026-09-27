interface PokeballMarkProps {
  className?: string
  style?: React.CSSProperties
}

/** Outline Pokeball used as a faint watermark on Pokedex cards; takes its color from `currentColor` */
export function PokeballMark({ className, style }: PokeballMarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {/* Outer ring with the middle band cut out, so the ball reads as two halves */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M50 0a50 50 0 1 1 0 100A50 50 0 0 1 50 0Zm0 14a36 36 0 0 0-35.6 30.5h21.2a15 15 0 0 1 28.8 0h21.2A36 36 0 0 0 50 14Zm0 72a36 36 0 0 0 35.6-30.5H64.4a15 15 0 0 1-28.8 0H14.4A36 36 0 0 0 50 86Zm0-44a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
      />
    </svg>
  )
}
