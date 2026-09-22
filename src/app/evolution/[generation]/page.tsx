'use client'

import { useState, useEffect, useMemo, use, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, shuffle, loadBest, saveBest } from '@/lib/game-utils'
import { getEvolutionLines } from '@/lib/evolution-chains'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { formatPokemonName, japaneseName } from '@/lib/pokemon-names'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import PokemonArt from '@/components/learn/PokemonArt'
import { CaretRight, CheckCircle, XCircle } from '@phosphor-icons/react'

interface EvolutionPageProps {
  params: Promise<{ generation: string }>
}

const ROUNDS = 10

interface Round {
  line: PokemonMetadata[]
  shuffled: PokemonMetadata[]
}

function NameLabel({ pokemon }: { pokemon: PokemonMetadata }) {
  const ja = japaneseName(pokemon)
  return (
    <div className="text-center leading-tight">
      <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text)' }}>{formatPokemonName(pokemon.species_name)}</div>
      {ja && <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{ja}</div>}
    </div>
  )
}

/** One round per evolution family (a random branch of it), so Eevee doesn't show up five times */
function buildRounds(poolIds: Record<number, true>, byId: Record<number, PokemonMetadata>): Round[] {
  const byFamily: Record<number, number[][]> = {}
  getEvolutionLines()
    .filter(line => line.some(id => poolIds[id]) && line.every(id => byId[id]))
    .forEach(line => {
      const root = line[0]
      if (!byFamily[root]) byFamily[root] = []
      byFamily[root].push(line)
    })

  return shuffle(Object.keys(byFamily))
    .slice(0, ROUNDS)
    .map(root => {
      const options = byFamily[Number(root)]
      const ids = options[Math.floor(Math.random() * options.length)]
      const line = ids.map(id => byId[id])
      // Never hand out a round that is already solved
      let shuffled = shuffle(line)
      while (shuffled.every((p, i) => p.id === line[i].id)) shuffled = shuffle(line)
      return { line, shuffled }
    })
}

export default function EvolutionPage({ params }: EvolutionPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])
  const bestKey = `evolution-${genParam}`

  const byId = useMemo(() => {
    const map: Record<number, PokemonMetadata> = {}
    pokemonMetadataService.getAllMetadata().forEach(p => { map[p.id] = p })
    return map
  }, [])

  const [rounds, setRounds] = useState<Round[]>([])
  const [roundIndex, setRoundIndex] = useState(0)
  const [placed, setPlaced] = useState<PokemonMetadata[]>([])
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [best, setBest] = useState<number | null>(null)
  const [newBest, setNewBest] = useState(false)
  const [ready, setReady] = useState(false)

  const start = () => {
    const poolIds: Record<number, true> = {}
    scope.pool.forEach(p => { poolIds[p.id] = true })
    setRounds(buildRounds(poolIds, byId))
    setRoundIndex(0)
    setPlaced([])
    setScore(0)
    setFinished(false)
    setNewBest(false)
    setBest(loadBest(bestKey))
    setReady(true)
  }

  // Random rounds are built on the client only, so server and client HTML match
  useEffect(start, [scope, byId]) // eslint-disable-line react-hooks/exhaustive-deps

  const round = rounds[roundIndex]
  const complete = !!round && placed.length === round.line.length
  const correct = complete && placed.every((p, i) => p.id === round.line[i].id)

  const place = (pokemon: PokemonMetadata) => {
    if (!round || complete) return
    const next = placed.concat(pokemon)
    setPlaced(next)
    if (next.length === round.line.length && next.every((p, i) => p.id === round.line[i].id)) {
      setScore(s => s + 1)
    }
  }

  const unplace = (index: number) => {
    if (complete) return
    setPlaced(placed.filter((_, i) => i !== index))
  }

  const nextRound = () => {
    if (roundIndex + 1 >= rounds.length) {
      setNewBest(saveBest(bestKey, score))
      setFinished(true)
      return
    }
    setRoundIndex(roundIndex + 1)
    setPlaced([])
  }

  useEffect(() => {
    if (!complete) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !(e.target as HTMLElement).closest('button')) nextRound()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const backToMenu = () => router.push('/?section=learn')

  if (!ready) return null

  if (rounds.length === 0) {
    return (
      <div className="max-w-xl mx-auto card items-center text-center">
        <p style={{ color: 'var(--text-secondary)' }}>No evolution families found for {scope.label}.</p>
        <Button onClick={backToMenu}>Menu</Button>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto card items-center text-center" style={{ gap: 'var(--space-6)' }}>
        <div className="card-kicker">Evolution Order</div>
        <div className="text-4xl" style={{ color: 'var(--color-text)' }}>{score} / {rounds.length}</div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {newBest ? 'New best score!' : best !== null ? `Best: ${Math.max(best, score)} / ${rounds.length}` : ''}
        </p>
        <div className="flex gap-3">
          <Button onClick={start}>Play again</Button>
          <Button variant="secondary" onClick={backToMenu}>Menu</Button>
        </div>
      </div>
    )
  }

  const available = round.shuffled.filter(p => !placed.some(x => x.id === p.id))
  const cols = round.line.length

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {scope.label} · Round {roundIndex + 1}/{rounds.length} · Score {score}
        </span>
      </div>

      <div className="card" style={{ gap: 'var(--space-6)' }}>
        <div>
          <div className="card-kicker">Evolution Order</div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Tap the Pokemon from first form to final evolution. Tap a placed one to take it back.
          </p>
        </div>

        {/* Slots: equal-width slot columns with a narrow arrow column between each pair */}
        <div
          className="grid items-center gap-1 mx-auto w-full"
          style={{
            gridTemplateColumns: Array(cols).fill('minmax(0, 1fr)').join(' auto '),
            maxWidth: cols === 2 ? 360 : 440,
          }}
        >
          {round.line.map((answer, i) => {
            const p = placed[i]
            const state = !complete ? 'open' : p && p.id === answer.id ? 'right' : 'wrong'
            const border = state === 'right' ? 'var(--success-gradient)' : state === 'wrong' ? 'var(--error-gradient)' : 'var(--color-neutral-700)'
            return (
              <Fragment key={i}>
                <button
                  type="button"
                  onClick={() => unplace(i)}
                  disabled={!p || complete}
                  className="min-w-0 rounded-md p-2 flex flex-col items-center gap-1 aspect-[3/4]"
                  style={{ border: `1px ${p ? 'solid' : 'dashed'} ${border}`, background: 'var(--color-bg)' }}
                >
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Stage {i + 1}</span>
                  {p && (
                    <>
                      <div className="w-full flex-1 min-h-0"><PokemonArt id={p.id} alt={formatPokemonName(p.species_name)} className="w-full h-full" /></div>
                      <NameLabel pokemon={p} />
                    </>
                  )}
                </button>
                {i < cols - 1 && <CaretRight size={16} color="var(--text-muted)" />}
              </Fragment>
            )
          })}
        </div>

        {/* Pool */}
        {!complete && (
          <div className="flex justify-center gap-2">
            {available.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => place(p)}
                className="nx-pokecard rounded-md p-2 flex flex-col items-center gap-1 w-[30%] max-w-[140px]"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-neutral-700)' }}
              >
                <div className="w-full aspect-square"><PokemonArt id={p.id} alt={formatPokemonName(p.species_name)} className="w-full h-full" /></div>
                <NameLabel pokemon={p} />
              </button>
            ))}
          </div>
        )}

        {complete && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: correct ? 'var(--success-gradient)' : 'var(--error-gradient)' }}>
              {correct ? <CheckCircle size={18} weight="fill" /> : <XCircle size={18} weight="fill" />}
              {correct ? 'Correct!' : 'Not quite. The right order is:'}
            </p>
            {!correct && (
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                {round.line.map(p => formatPokemonName(p.species_name)).join(' → ')}
              </p>
            )}
            <Button block onClick={nextRound}>{roundIndex + 1 >= rounds.length ? 'See score' : 'Next'}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
