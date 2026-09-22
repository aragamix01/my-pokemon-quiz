'use client'

import { useState, useEffect, useMemo, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, formatClock, loadBest, saveBest } from '@/lib/game-utils'
import { formatPokemonName, japaneseName, bothNames, normalizeName } from '@/lib/pokemon-names'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import PokemonArt from '@/components/learn/PokemonArt'
import { Timer } from '@phosphor-icons/react'

interface NameAllPageProps {
  params: Promise<{ generation: string }>
}

// Time limits offered, in minutes (0 = no limit), picked by how many Pokemon are in scope
function timeOptions(count: number): number[] {
  if (count > 400) return [30, 60, 90, 0]
  if (count > 120) return [10, 15, 20, 0]
  return [5, 10, 15, 0]
}

type Phase = 'setup' | 'playing' | 'done'

export default function NameAllPage({ params }: NameAllPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])
  const options = timeOptions(scope.pool.length)

  // Normalized English and Japanese names -> Pokemon IDs. Exact matches only,
  // because answers are accepted as you type
  const nameIndex = useMemo(() => {
    const index: Record<string, number[]> = {}
    const add = (key: string, id: number) => {
      if (!index[key]) index[key] = []
      index[key].push(id)
    }
    scope.pool.forEach(p => {
      add(normalizeName(formatPokemonName(p.species_name)), p.id)
      const ja = japaneseName(p)
      if (ja) add(normalizeName(ja), p.id)
      // Plain "nidoran" fills whichever Nidoran is still missing
      if (p.species_name.indexOf('nidoran-') === 0) add('nidoran', p.id)
    })
    return index
  }, [scope])

  const [phase, setPhase] = useState<Phase>('setup')
  const [minutes, setMinutes] = useState(options[1])
  const [found, setFound] = useState<Record<number, true>>({})
  const [lastFound, setLastFound] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [endsAt, setEndsAt] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [now, setNow] = useState(0)
  const [best, setBest] = useState<number | null>(null)
  const [newBest, setNewBest] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const bestKey = `name-all-${genParam}-${minutes}`
  const foundCount = Object.keys(found).length
  const total = scope.pool.length

  useEffect(() => {
    setBest(loadBest(bestKey))
  }, [bestKey])

  const finish = (finalFound: Record<number, true>) => {
    setNewBest(saveBest(bestKey, Object.keys(finalFound).length))
    setPhase('done')
  }

  // Clock tick; ends the game when time runs out
  useEffect(() => {
    if (phase !== 'playing') return
    const timer = setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (endsAt && t >= endsAt) finish(found)
    }, 250)
    return () => clearInterval(timer)
  })

  const start = () => {
    const t = Date.now()
    setFound({})
    setLastFound(null)
    setTyped('')
    setStartedAt(t)
    setNow(t)
    setEndsAt(minutes ? t + minutes * 60 * 1000 : 0)
    setNewBest(false)
    setPhase('playing')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const onType = (value: string) => {
    const ids = nameIndex[normalizeName(value)]
    const id = ids && ids.find(i => !found[i])
    if (id === undefined) {
      setTyped(value)
      return
    }
    const next = { ...found, [id]: true as const }
    setFound(next)
    setLastFound(id)
    setTyped('')
    if (Object.keys(next).length === total) finish(next)
  }

  const backToMenu = () => router.push('/?section=learn')

  if (phase === 'setup') {
    return (
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        <Button variant="ghost" onClick={backToMenu} className="self-start">← Menu</Button>
        <div className="card" style={{ gap: 'var(--space-6)' }}>
          <div>
            <div className="card-kicker">Name Them All</div>
            <h1 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{scope.label}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Type every Pokemon you can remember, in English or Japanese. Each correct name fills its spot
              in the Pokedex as soon as you finish typing it. No pictures, just your memory.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Time limit:
            {options.map(m => (
              <button key={m} className={`nx-tab ${minutes === m ? 'nx-tab-active' : ''}`} onClick={() => setMinutes(m)}>
                {m ? `${m} min` : 'No limit'}
              </button>
            ))}
          </div>
          {best !== null && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Best with this limit: {best} / {total}</p>
          )}
          <Button block onClick={start}>Start</Button>
        </div>
      </div>
    )
  }

  const playing = phase === 'playing'
  const clock = endsAt ? formatClock(endsAt - now) : formatClock(now - startedAt)
  const last = lastFound !== null ? scope.pool.find(p => p.id === lastFound) : undefined

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{scope.label} · Name Them All</span>
      </div>

      <div className="card sticky top-2 z-10" style={{ gap: 'var(--space-4)', boxShadow: 'var(--shadow-md)' }}>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold" style={{ color: 'var(--color-text)' }}>{foundCount} / {total}</span>
          <span className="flex items-center gap-1.5 text-xl tabular-nums" style={{ color: endsAt && endsAt - now < 60000 && playing ? 'var(--error-gradient)' : 'var(--color-accent)' }}>
            <Timer size={20} /> {clock}
          </span>
        </div>
        <ProgressBar value={foundCount} max={total} />
        {playing ? (
          <>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={typed}
                onChange={e => onType(e.target.value)}
                placeholder="Type a Pokemon name..."
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="input flex-1"
              />
              <Button variant="secondary" onClick={() => finish(found)}>Give up</Button>
            </div>
            <p className="text-xs h-4" style={{ color: 'var(--success-gradient)' }}>
              {last ? `✓ ${bothNames(last)}` : ''}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {foundCount === total ? 'You named them all!' : `Missed ${total - foundCount}. They are shown in red below.`}
              {newBest && ' New best!'}
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setPhase('setup')}>Play again</Button>
              <Button variant="secondary" onClick={backToMenu}>Menu</Button>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-1.5">
          {scope.pool.map(p => {
            const isFound = !!found[p.id]
            const revealed = isFound || !playing
            return (
              <div
                key={p.id}
                className="rounded-md flex flex-col items-center p-1 min-w-0"
                style={{
                  background: 'var(--color-bg)',
                  border: `1px solid ${!playing ? (isFound ? 'var(--success-gradient)' : 'var(--error-gradient)') : isFound ? 'var(--color-accent-700)' : 'transparent'}`,
                }}
              >
                <div className="w-full aspect-square">
                  {revealed ? (
                    <PokemonArt id={p.id} alt={formatPokemonName(p.species_name)} lazy className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ color: 'var(--color-neutral-600)' }}>
                      #{p.id}
                    </div>
                  )}
                </div>
                <div className="text-[9px] w-full text-center truncate" style={{ color: revealed ? 'var(--color-text)' : 'transparent' }}>
                  {revealed ? formatPokemonName(p.species_name) : '-'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
