'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { formatPokemonName, bothNames } from '@/lib/pokemon-names'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import PokemonArt from '@/components/learn/PokemonArt'
import PokemonPicker from '@/components/PokemonPicker'
import { X, Shuffle } from '@phosphor-icons/react'

const MAX_PICKED = 3
const STAGE_HEIGHT = 260
const MIN_FIGURE = 10
const DEFAULT_IDS = [25, 6]
const PERSON_KEY = 'size-compare-height-cm'
const PERSON_WEIGHT_KG = 65
// Person silhouette is about this wide relative to its height
const PERSON_ASPECT = 0.32
const GAP = 12

function PersonSilhouette({ height }: { height: number }) {
  return (
    <svg viewBox="0 0 32 100" style={{ height, width: height * PERSON_ASPECT }} aria-label="You">
      <circle cx="16" cy="9" r="8" fill="var(--color-accent-500)" />
      <path
        d="M6 22 Q16 18 26 22 L28 56 L23 56 L22 99 L17 99 L16 62 L15 99 L10 99 L9 56 L4 56 Z"
        fill="var(--color-accent-500)"
      />
    </svg>
  )
}

export default function SizeComparePage() {
  const router = useRouter()
  const all = useMemo(() => pokemonMetadataService.getAllMetadata(), [])
  const [picked, setPicked] = useState<PokemonMetadata[]>([])
  const [personCm, setPersonCm] = useState(170)
  const [stageWidth, setStageWidth] = useState(320)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPicked(DEFAULT_IDS.map(id => all.find(p => p.id === id)).filter((p): p is PokemonMetadata => !!p))
    try {
      const saved = Number(localStorage.getItem(PERSON_KEY))
      if (saved >= 50 && saved <= 250) setPersonCm(saved)
    } catch {
      // keep default height
    }
  }, [all])

  // Track the stage width so wide Pokemon scale down to fit instead of overflowing
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStageWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const add = (pokemon: PokemonMetadata) => {
    if (picked.some(p => p.id === pokemon.id)) return
    setPicked(picked.concat(pokemon).slice(-MAX_PICKED))
  }
  const remove = (id: number) => setPicked(picked.filter(p => p.id !== id))
  const addExtreme = (tallest: boolean) => {
    const sorted = all.slice().sort((a, b) => (tallest ? b.height - a.height : a.height - b.height))
    const next = sorted.find(p => !picked.some(x => x.id === p.id))
    if (next) add(next)
  }
  const addRandom = () => add(all[Math.floor(Math.random() * all.length)])

  const updatePerson = (cm: number) => {
    setPersonCm(cm)
    try {
      localStorage.setItem(PERSON_KEY, String(cm))
    } catch {
      // height stays for this visit only
    }
  }

  const personM = personCm / 100
  const heightsM = picked.map(p => p.height / 10)
  // Artwork is square, so each Pokemon is as wide as it is tall
  const tallest = Math.max(personM, ...heightsM)
  const widthInMeters = personM * PERSON_ASPECT + heightsM.reduce((sum, h) => sum + h, 0)
  const gaps = GAP * picked.length
  const scale = Math.min(STAGE_HEIGHT / tallest, (stageWidth - gaps) / widthInMeters)
  const px = (m: number) => Math.max(MIN_FIGURE, m * scale)

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push('/?section=learn')}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Size Compare</span>
      </div>

      <div className="card" style={{ gap: 'var(--space-4)' }}>
        <div>
          <div className="card-kicker">Size Compare</div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            See Pokemon next to you at real scale. Add up to {MAX_PICKED}. Sizes follow official heights, so poses (wings, tails) can make some look smaller.
          </p>
        </div>

        <PokemonPicker pool={all} onPick={add} excludeIds={picked.map(p => p.id)} placeholder="Add a Pokemon (English or Japanese)" />

        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" onClick={addRandom}><Shuffle size={16} /> Random</Button>
          <Button variant="secondary" onClick={() => addExtreme(true)}>Tallest</Button>
          <Button variant="secondary" onClick={() => addExtreme(false)}>Smallest</Button>
        </div>

        {/* Stage: everything stands on one ground line at the same scale */}
        <div
          ref={stageRef}
          className="flex items-end justify-center w-full overflow-hidden rounded-md pt-4"
          style={{ height: STAGE_HEIGHT + 24, gap: GAP, background: 'var(--color-bg)', borderBottom: '3px solid var(--color-neutral-600)' }}
        >
          <PersonSilhouette height={px(personM)} />
          {picked.map(p => (
            <div key={p.id} style={{ width: px(p.height / 10), height: px(p.height / 10) }} className="flex-shrink-0 lighten">
              <PokemonArt id={p.id} alt={formatPokemonName(p.species_name)} className="w-full h-full object-bottom" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <label htmlFor="person-height">Your height</label>
          <input
            id="person-height"
            type="range"
            min={100}
            max={210}
            value={personCm}
            onChange={e => updatePerson(Number(e.target.value))}
            className="flex-1"
          />
          <span className="tabular-nums w-14 text-right" style={{ color: 'var(--color-text)' }}>{personCm} cm</span>
        </div>
      </div>

      {picked.map(p => {
        const h = p.height / 10
        const w = p.weight / 10
        const tallRatio = h / personM
        return (
          <div key={p.id} className="card items-center" style={{ flexDirection: 'row', gap: 'var(--space-4)', padding: 'var(--space-4)' }}>
            <div className="w-14 h-14 flex-shrink-0">
              <PokemonArt id={p.id} alt={formatPokemonName(p.species_name)} className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{bothNames(p)}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {h.toFixed(1)} m · {w.toFixed(1)} kg
              </div>
              <div className="text-xs" style={{ color: 'var(--color-accent-400)' }}>
                {tallRatio >= 1
                  ? `${tallRatio.toFixed(1)}× your height`
                  : `${Math.round(tallRatio * 100)}% of your height`}
                {' · '}
                {w >= PERSON_WEIGHT_KG
                  ? `weighs as much as ${(w / PERSON_WEIGHT_KG).toFixed(1)} people`
                  : `${Math.round((w / PERSON_WEIGHT_KG) * 100)}% of a person's weight`}
              </div>
            </div>
            <button type="button" className="btn btn-ghost" onClick={() => remove(p.id)} aria-label={`Remove ${formatPokemonName(p.species_name)}`}>
              <X size={18} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
