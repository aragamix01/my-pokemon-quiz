'use client'

import { CSSProperties, HTMLAttributes, useRef, useEffect, PointerEvent } from 'react'
import { cn } from '@/lib/cn'

/** Foil finishes (styles .fx-* in globals.css). "cosmos" is the original rainbow sheen with stars */
export const FOIL_FINISHES = ['cosmos', 'glitter', 'sunburst', 'shatter', 'etched', 'bubbles', 'ripple', 'frame'] as const
export type FoilFinish = typeof FOIL_FINISHES[number]

/**
 * A finish with its angle, hue shift and grain, picked "at random" from a seed (a Pokemon id), so each
 * Pokemon gets its own look that stays the same between visits and between the Pokedex and its page
 */
export function foilFor(seed: number) {
  // mulberry32: well-spread values even from consecutive ids
  let t = seed | 0
  const next = () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
  return {
    finish: FOIL_FINISHES[Math.floor(next() * FOIL_FINISHES.length)],
    angle: Math.round(next() * 180),
    hue: Math.round(next() * 80 - 40),
    grain: 5 + Math.floor(next() * 5),
  }
}

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
  /** Foil pattern; "random" picks one from `seed`. Default: the original cosmos foil */
  finish?: FoilFinish | 'random'
  /** Seed for finish="random" (use the Pokemon id) */
  seed?: number
  /** Soft halo in `glowColor` while the card is lit; "idle" also pulses faintly at rest */
  glow?: boolean | 'idle'
  glowColor?: string
}

const VARS = ['--mx', '--my', '--rx', '--ry', '--pos', '--sx', '--sy', '--gx', '--gy']
const SWEEP_MS = 1400

/**
 * Holographic foil like a shiny trading card: a foil finish, star sparkles and a light glare
 * that follow the pointer (or finger) while the card tilts toward it. Styles: .nx-holo in globals.css
 */
export function HoloCard({
  still = false, autoShine, finish = 'cosmos', seed = 0, glow = false, glowColor,
  className, style, children, onPointerMove, onPointerLeave, ...rest
}: HoloCardProps) {
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
    // The glow leans away from the light
    el.style.setProperty('--gx', `${(0.5 - x) * 16}px`)
    el.style.setProperty('--gy', `${(0.5 - y) * 16}px`)
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

  const foil = finish === 'random' ? foilFor(seed) : { finish, angle: 115, hue: 0, grain: 7 }
  const foilVars = {
    '--a': `${foil.angle}deg`,
    '--h': `${foil.hue}deg`,
    '--t': foil.grain,
    ...(glowColor ? { '--glow': glowColor } : {}),
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={cn(
        'nx-holo relative overflow-hidden',
        still && 'still',
        glow && 'glow',
        glow === 'idle' && 'glow-idle',
        className,
      )}
      style={{ ...foilVars, ...style }}
      data-finish={foil.finish}
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={() => leave()}
      {...rest}
    >
      {children}
      {foil.finish === 'cosmos'
        ? <div className="nx-holo-foil" aria-hidden />
        : <div className={`nx-holo-fx fx-${foil.finish}`} aria-hidden />}
      <div className="nx-holo-sparkle" aria-hidden />
      <div className="nx-holo-glare" aria-hidden />
    </div>
  )
}
