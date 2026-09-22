'use client'

import { useState, useEffect, useMemo, useRef, use, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, shuffle, loadBest, saveBest } from '@/lib/game-utils'
import { generateConfusingAnswers } from '@/lib/pokemon-similarity'
import { formatPokemonName, bothNames, matchPokemonName } from '@/lib/pokemon-names'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import PixelatedArt from '@/components/learn/PixelatedArt'

interface RevealPageProps {
  params: Promise<{ generation: string }>
}

const ROUNDS = 10
// Blocks across the image at each step; 0 is the sharp picture
const LEVELS = [6, 10, 16, 26, 42, 0]
const MAX_POINTS = LEVELS.length
// Picking from choices instead of typing is worth at most this much
const CHOICE_POINTS = 1

type Outcome = 'typed' | 'picked' | 'missed'

export default function RevealPage({ params }: RevealPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])
  const bestKey = `reveal-${genParam}`

  const [targets, setTargets] = useState<PokemonMetadata[]>([])
  const [roundIndex, setRoundIndex] = useState(0)
  const [level, setLevel] = useState(0)
  const [typed, setTyped] = useState('')
  const [choices, setChoices] = useState<PokemonMetadata[] | null>(null)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [roundPoints, setRoundPoints] = useState(0)
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(false)
  const [finished, setFinished] = useState(false)
  const [best, setBest] = useState<number | null>(null)
  const [newBest, setNewBest] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const start = () => {
    setTargets(shuffle(scope.pool).slice(0, ROUNDS))
    setRoundIndex(0)
    resetRound()
    setScore(0)
    setFinished(false)
    setNewBest(false)
    setBest(loadBest(bestKey))
  }

  const resetRound = () => {
    setLevel(0)
    setTyped('')
    setChoices(null)
    setOutcome(null)
    setRoundPoints(0)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // Random targets are picked on the client only, so server and client HTML match
  useEffect(start, [scope]) // eslint-disable-line react-hooks/exhaustive-deps

  const target = targets[roundIndex]
  const currentPoints = choices ? Math.min(CHOICE_POINTS, MAX_POINTS - level) : MAX_POINTS - level

  const win = (how: Outcome) => {
    setOutcome(how)
    setRoundPoints(currentPoints)
    setScore(s => s + currentPoints)
  }

  const miss = () => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
    if (level + 1 >= LEVELS.length) {
      setOutcome('missed')
      setLevel(LEVELS.length - 1)
      return
    }
    setLevel(level + 1)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (outcome) {
      next()
      return
    }
    if (!typed.trim()) return
    if (matchPokemonName(typed, target).match !== 'wrong') win('typed')
    else miss()
    setTyped('')
  }

  const showChoices = () => {
    const pickRandom = (exclude: number[], n: number) =>
      shuffle(scope.pool.filter(p => exclude.indexOf(p.id) === -1)).slice(0, n)
    generateConfusingAnswers(target.id, 4)
      .catch(() => [] as number[])
      .then(ids => {
        const similar = ids
          .map(id => scope.pool.find(p => p.id === id))
          .filter((p): p is PokemonMetadata => !!p)
          .slice(0, 3)
        const wrong = similar.concat(pickRandom([target.id].concat(similar.map(p => p.id)), 3 - similar.length))
        setChoices(shuffle([target].concat(wrong)))
      })
  }

  const pick = (pokemon: PokemonMetadata) => {
    if (outcome) return
    if (pokemon.id === target.id) win('picked')
    else {
      setOutcome('missed')
      setLevel(LEVELS.length - 1)
    }
  }

  const next = () => {
    if (roundIndex + 1 >= targets.length) {
      setNewBest(saveBest(bestKey, score))
      setFinished(true)
      return
    }
    setRoundIndex(roundIndex + 1)
    resetRound()
  }

  // Enter moves on after the answer is shown (the input is gone by then)
  useEffect(() => {
    if (!outcome) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !(e.target as HTMLElement).closest('button')) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const backToMenu = () => router.push('/?section=learn')

  if (!target) return null

  if (finished) {
    const maxScore = targets.length * MAX_POINTS
    return (
      <div className="max-w-xl mx-auto card items-center text-center" style={{ gap: 'var(--space-6)' }}>
        <div className="card-kicker">Pixel Reveal</div>
        <div className="text-4xl" style={{ color: 'var(--color-text)' }}>{score} / {maxScore}</div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {newBest ? 'New best score!' : best !== null ? `Best: ${Math.max(best, score)}` : ''}
        </p>
        <div className="flex gap-3">
          <Button onClick={start}>Play again</Button>
          <Button variant="secondary" onClick={backToMenu}>Menu</Button>
        </div>
      </div>
    )
  }

  const revealed = outcome !== null
  const blocks = revealed ? 0 : LEVELS[level]

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {scope.label} · Round {roundIndex + 1}/{targets.length} · Score {score}
        </span>
      </div>

      <div className="card items-center" style={{ gap: 'var(--space-4)' }}>
        <div className="flex justify-between w-full">
          <span className="card-kicker">Pixel Reveal</span>
          {!revealed && (
            <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
              Worth {currentPoints} point{currentPoints === 1 ? '' : 's'}
            </span>
          )}
        </div>

        <div className="rounded-md p-2" style={{ background: 'var(--color-bg)' }}>
          <PixelatedArt id={target.id} blocks={blocks} size={220} />
        </div>

        {/* Blur level indicator */}
        <div className="flex gap-1">
          {LEVELS.map((_, i) => (
            <span
              key={i}
              className="w-6 h-1.5 rounded-full"
              style={{ background: i <= level ? 'var(--color-accent)' : 'var(--color-neutral-800)' }}
            />
          ))}
        </div>

        {revealed ? (
          <div className="flex flex-col items-center gap-2 text-center w-full">
            <p className="text-sm font-semibold" style={{ color: outcome === 'missed' ? 'var(--error-gradient)' : 'var(--success-gradient)' }}>
              {outcome === 'missed' ? 'The answer was' : `+${roundPoints} point${roundPoints === 1 ? '' : 's'}!`}
            </p>
            <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}>
              {bothNames(target)}
            </h2>
            <Button block onClick={next}>{roundIndex + 1 >= targets.length ? 'See score' : 'Next'}</Button>
          </div>
        ) : choices ? (
          <div className="grid grid-cols-2 gap-3 w-full">
            {choices.map(p => (
              <button key={p.id} className="nx-quizopt" onClick={() => pick(p)}>
                {formatPokemonName(p.species_name)}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 w-full">
            <input
              ref={inputRef}
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder="English or Japanese name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={`input text-center text-lg ${shake ? 'learn-shake' : ''}`}
            />
            <div className="grid grid-cols-3 gap-2">
              <Button type="button" variant="secondary" onClick={miss}>Clearer</Button>
              <Button type="button" variant="ghost" onClick={showChoices}>4 choices</Button>
              <Button type="submit">Guess</Button>
            </div>
            <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
              Each wrong guess or &quot;Clearer&quot; sharpens the picture and lowers the points. Choices are worth {CHOICE_POINTS} point.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
