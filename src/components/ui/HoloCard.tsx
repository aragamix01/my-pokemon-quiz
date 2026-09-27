'use client'

import { HTMLAttributes, useRef, PointerEvent } from 'react'
import { cn } from '@/lib/cn'

interface HoloCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * true skips the slow idle drift, for grids with many cards; the foil then
   * only moves while the pointer is over the card
   */
  still?: boolean
}

/**
 * Holographic foil like a shiny trading card: a rainbow sheen and a light glare
 * that follow the pointer (or finger) while the card tilts toward it. Styles: .nx-holo in globals.css
 */
export function HoloCard({ still = false, className, children, onPointerMove, onPointerLeave, ...rest }: HoloCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e)
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - y) * 14}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 18}deg`)
    el.style.setProperty('--pos', `${x * 100}% ${y * 100}%`)
    el.classList.add('active')
  }

  const leave = (e?: PointerEvent<HTMLDivElement>) => {
    if (e) onPointerLeave?.(e)
    const el = ref.current
    if (!el) return
    el.classList.remove('active')
    ;['--mx', '--my', '--rx', '--ry', '--pos'].forEach(v => el.style.removeProperty(v))
  }

  return (
    <div
      ref={ref}
      className={cn('nx-holo relative overflow-hidden', still && 'still', className)}
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={() => leave()}
      {...rest}
    >
      {children}
      <div className="nx-holo-foil" aria-hidden />
      <div className="nx-holo-glare" aria-hidden />
    </div>
  )
}
