'use client'

import { useState, useEffect, useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, shuffle, formatClock, loadBest, saveBest } from '@/lib/game-utils'
import { formatPokemonName, japaneseName, bothNames } from '@/lib/pokemon-names'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import PokemonArt from '@/components/learn/PokemonArt'

interface MemoryPageProps {
  params: Promise<{ generation: string }>
}

type Mode = 'picture' | 'japanese'
type Face = 'art' | 'en' | 'ja'

interface MemoryCard {
  key: string
  pokemon: PokemonMetadata
  face: Face
}

const MODES: Array<{ id: Mode; label: string; hint: string }> = [
  { id: 'picture', label: 'Picture ↔ Name', hint: 'Match each picture to its name.' },
  { id: 'japanese', label: 'English ↔ Japanese', hint: 'Match each English name to its Japanese name.' },
]
const PAIR_CHOICES = [6, 8]
const MISMATCH_DELAY = 900

function buildDeck(pool: PokemonMetadata[], mode: Mode, pairs: number): MemoryCard[] {
  // Japanese mode needs Pokemon whose Japanese name differs from the English one
  const candidates = mode === 'japanese' ? pool.filter(p => japaneseName(p)) : pool
  const chosen = shuffle(candidates).slice(0, pairs)
  const faces: [Face, Face] = mode === 'picture' ? ['art', 'en'] : ['en', 'ja']
  const cards: MemoryCard[] = []
  chosen.forEach(p => {
    faces.forEach(face => cards.push({ key: `${p.id}-${face}`, pokemon: p, face }))
  })
  return shuffle(cards)
}

function CardFace({ card }: { card: MemoryCard }) {
  if (card.face === 'art') {
    return <PokemonArt id={card.pokemon.id} alt={formatPokemonName(card.pokemon.species_name)} className="w-full h-full" />
  }
  const text = card.face === 'en' ? formatPokemonName(card.pokemon.species_name) : japaneseName(card.pokemon)
  return (
    <>
      <span className="text-[9px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {card.face === 'en' ? 'English' : 'Japanese'}
      </span>
      <span className="text-[13px] sm:text-sm font-semibold break-words leading-tight" style={{ color: 'var(--color-text)' }}>
        {text}
      </span>
    </>
  )
}

export default function MemoryPage({ params }: MemoryPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])

  const [mode, setMode] = useState<Mode>('picture')
  const [pairs, setPairs] = useState(PAIR_CHOICES[0])
  const [deck, setDeck] = useState<MemoryCard[]>([])
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<Record<number, true>>({})
  const [moves, setMoves] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [now, setNow] = useState(0)
  const [best, setBest] = useState<number | null>(null)
  const [newBest, setNewBest] = useState(false)

  const bestKey = `memory-${mode}-${pairs}-${genParam}`
  const matchedCount = Object.keys(matched).length
  const won = deck.length > 0 && matchedCount === deck.length / 2

  const newGame = () => {
    setDeck(buildDeck(scope.pool, mode, pairs))
    setOpen([])
    setMatched({})
    setMoves(0)
    setStartedAt(0)
    setNow(0)
    setNewBest(false)
    setBest(loadBest(bestKey))
  }

  // Shuffled deck is built on the client only, so server and client HTML match
  useEffect(newGame, [scope, mode, pairs]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!startedAt || won) return
    const timer = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(timer)
  }, [startedAt, won])

  const flip = (index: number) => {
    const card = deck[index]
    if (!card || matched[card.pokemon.id] || open.length >= 2 || open.indexOf(index) !== -1) return
    if (!startedAt) {
      setStartedAt(Date.now())
      setNow(Date.now())
    }
    const nextOpen = open.concat(index)
    setOpen(nextOpen)
    if (nextOpen.length < 2) return

    const nextMoves = moves + 1
    setMoves(nextMoves)
    const [a, b] = nextOpen.map(i => deck[i])
    if (a.pokemon.id === b.pokemon.id) {
      const nextMatched = { ...matched, [a.pokemon.id]: true as const }
      setMatched(nextMatched)
      setOpen([])
      if (Object.keys(nextMatched).length === deck.length / 2) {
        setNow(Date.now())
        setNewBest(saveBest(bestKey, nextMoves, false))
      }
    } else {
      setTimeout(() => setOpen([]), MISMATCH_DELAY)
    }
  }

  const backToMenu = () => router.push('/?section=learn')
  const modeInfo = MODES.find(m => m.id === mode)!
  const elapsed = startedAt ? now - startedAt : 0

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="text-sm tabular-nums" style={{ color: 'var(--text-secondary)' }}>
          {scope.label} · {moves} moves · {formatClock(elapsed)}
        </span>
      </div>

      <div className="card" style={{ gap: 'var(--space-4)' }}>
        <div>
          <div className="card-kicker">Memory Match</div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {modeInfo.hint} Fewer moves is better.{best !== null && ` Best: ${best} moves.`}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2">
            {MODES.map(m => (
              <button key={m.id} className={`nx-tab ${mode === m.id ? 'nx-tab-active' : ''}`} onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {PAIR_CHOICES.map(n => (
              <button key={n} className={`nx-tab ${pairs === n ? 'nx-tab-active' : ''}`} onClick={() => setPairs(n)}>
                {n} pairs
              </button>
            ))}
          </div>
        </div>

        <div className={`grid gap-2 ${pairs === 6 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4'}`}>
          {deck.map((card, i) => {
            const isMatched = !!matched[card.pokemon.id]
            const faceUp = isMatched || open.indexOf(i) !== -1
            const mismatch = open.length === 2 && open.indexOf(i) !== -1 && !isMatched
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => flip(i)}
                className={`flip-card aspect-[3/4] ${faceUp ? 'flipped' : ''}`}
                aria-label={faceUp ? bothNames(card.pokemon) : 'Hidden card'}
              >
                <div className="flip-card-inner">
                  <div
                    className="flip-card-face"
                    style={{ background: 'var(--color-accent-900)', border: '1px solid var(--color-accent-700)' }}
                  >
                    <span className="text-2xl" style={{ color: 'var(--color-accent-500)' }}>?</span>
                  </div>
                  <div
                    className="flip-card-face flip-card-back"
                    style={{
                      background: 'var(--color-bg)',
                      border: `1px solid ${isMatched ? 'var(--success-gradient)' : mismatch ? 'var(--error-gradient)' : 'var(--color-neutral-600)'}`,
                    }}
                  >
                    <CardFace card={card} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {won && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-semibold" style={{ color: 'var(--success-gradient)' }}>
              All pairs found in {moves} moves ({formatClock(elapsed)}).{newBest && ' New best!'}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm" style={{ color: 'var(--color-text)' }}>
              {deck.filter(c => c.face === 'en').map(c => <span key={c.key}>{bothNames(c.pokemon)}</span>)}
            </div>
            <Button onClick={newGame}>Play again</Button>
          </div>
        )}
      </div>
    </div>
  )
}
