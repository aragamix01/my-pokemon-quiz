'use client'

import { HTMLAttributes, useRef, useEffect, PointerEvent } from 'react'
import { cn } from '@/lib/cn'

interface HoloCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * true skips the slow idle drift, for grids with many cards; the foil then
   * only moves while the pointer is over the card
   */
  still?: boolean
  /**
   * Milliseconds of rest between automatic shines (counted after each sweep ends): while
   * nobody touches or hovers the card, a light sweeps across it (tilt, foil, sparkles and glare). Off when unset
   */
  autoShine?: number
}

const VARS = ['--mx', '--my', '--rx', '--ry', '--pos', '--sx', '--sy']
const SWEEP_MS = 1400

/**
 * Holographic foil like a shiny trading card: a rainbow sheen, star sparkles and a light glare
 * that follow the pointer (or finger) while the card tilts toward it. Styles: .nx-holo in globals.css
 */
export function HoloCard({ still = false, autoShine, className, children, onPointerMove, onPointerLeave, ...rest }: HoloCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const touched = useRef(false)

  /** Light the card as if the pointer were at (x, y), both 0..1 */
  const shineAt = (x: number, y: number) => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - y) * 14}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 18}deg`)
    el.style.setProperty('--pos', `${x * 100}% ${y * 100}%`)
    // Sparkle layers shift against the tilt, so the stars glitter as the card moves
    el.style.setProperty('--sx', `${(x - 0.5) * 40}px`)
    el.style.setProperty('--sy', `${(y - 0.5) * 40}px`)
    el.classList.add('active')
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('active')
    VARS.forEach(v => el.style.removeProperty(v))
  }

  const move = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e)
    touched.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    shineAt(
      Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1),
      Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1),
    )
  }

  const leave = (e?: PointerEvent<HTMLDivElement>) => {
    if (e) onPointerLeave?.(e)
    touched.current = false
    reset()
  }

  // Automatic shine: a light sweeps from top left to bottom right, then the card settles
  useEffect(() => {
    if (!autoShine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let timer = 0
    // The pause starts after each sweep ends, so a sweep never eats into it
    const wait = () => { timer = window.setTimeout(sweep, autoShine) }
    const sweep = () => {
      if (touched.current || document.hidden) return wait()
      const start = performance.now()
      const step = (now: number) => {
        if (touched.current) return wait()
        const t = (now - start) / SWEEP_MS
        if (t >= 1) {
          reset()
          return wait()
        }
        const ease = 0.5 - Math.cos(t * Math.PI) / 2
        shineAt(0.1 + ease * 0.8, 0.2 + ease * 0.6)
        frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    wait()
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [autoShine]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="nx-holo-sparkle" aria-hidden />
      <div className="nx-holo-glare" aria-hidden />
    </div>
  )
}
