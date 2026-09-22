'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getScope } from '@/lib/game-utils'
import { formatPokemonName, bothNames } from '@/lib/pokemon-names'
import {
  compareGuess, Clue, ClueStatus, MAX_GUESSES, SILHOUETTE_AFTER,
  GuessStats, loadGuessStats, recordGame,
} from '@/lib/pokedle'
import { dailyPick, getDailyResult, saveDailyResult } from '@/lib/daily'
import { todayKey } from '@/lib/learn-progress'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { PokemonTypeName, getTypeColor } from '@/lib/type-effectiveness'
import { Button } from '@/components/ui/Button'
import PokemonArt from '@/components/learn/PokemonArt'
import PokemonPicker from '@/components/PokemonPicker'
import DailyFooter from './DailyFooter'
import { ArrowUp, ArrowDown } from '@phosphor-icons/react'

interface PokedleGameProps {
  genParam: string
  /** Daily mode: one fixed puzzle per day, result saved and shareable */
  daily?: boolean
}

const STATUS_STYLE: Record<ClueStatus, { border: string; background: string; emoji: string }> = {
  match: {
    border: 'var(--success-gradient)',
    background: 'color-mix(in srgb, var(--success-gradient) 22%, transparent)',
    emoji: '🟩',
  },
  partial: {
    border: '#d4a94a',
    background: 'color-mix(in srgb, #d4a94a 20%, transparent)',
    emoji: '🟨',
  },
  miss: {
    border: 'var(--color-neutral-700)',
    background: 'var(--color-bg)',
    emoji: '⬛',
  },
}

function ClueTile({ clue }: { clue: Clue }) {
  const style = STATUS_STYLE[clue.status]
  const isType = clue.key.indexOf('type') === 0 && clue.value !== 'none'
  return (
    <div
      className="rounded-md px-1 py-1.5 text-center flex flex-col items-center justify-center min-h-[52px]"
      style={{ border: `1px solid ${style.border}`, background: style.background }}
    >
      <div className="text-[9px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{clue.label}</div>
      <div className="flex items-center gap-1 text-[12px] capitalize leading-tight" style={{ color: 'var(--color-text)' }}>
        {isType && (
          <span className="inline-block w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: getTypeColor(clue.value as PokemonTypeName) }} />
        )}
        <span className="break-all">{clue.value}</span>
        {clue.direction === 'up' && <ArrowUp size={12} weight="bold" />}
        {clue.direction === 'down' && <ArrowDown size={12} weight="bold" />}
      </div>
    </div>
  )
}

function pickAnswer(pool: PokemonMetadata[], avoidId?: number): PokemonMetadata {
  const choices = pool.length > 1 && avoidId !== undefined ? pool.filter(p => p.id !== avoidId) : pool
  return choices[Math.floor(Math.random() * choices.length)]
}

export default function PokedleGame({ genParam, daily = false }: PokedleGameProps) {
  const router = useRouter()
  const scope = useMemo(() => getScope(genParam), [genParam])
  const pool = scope.pool

  const [answer, setAnswer] = useState<PokemonMetadata | null>(null)
  const [guesses, setGuesses] = useState<PokemonMetadata[]>([])
  const [showSilhouette, setShowSilhouette] = useState(false)
  const [stats, setStats] = useState<GuessStats | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The answer is picked on the client only, so server and client HTML match.
  // Daily mode restores today's finished board if there is one.
  useEffect(() => {
    if (!pool.length) return
    if (daily) {
      const target = dailyPick(pool, 'pokedle', genParam)
      setAnswer(target)
      const saved = getDailyResult('pokedle', genParam)
      if (saved?.guesses) {
        setGuesses(saved.guesses.map(id => pool.find(p => p.id === id)).filter((p): p is PokemonMetadata => !!p))
      }
    } else {
      setAnswer(pickAnswer(pool))
      setStats(loadGuessStats())
    }
  }, [pool, daily, genParam])

  const won = !!answer && guesses.length > 0 && guesses[0].id === answer.id
  const lost = !won && guesses.length >= MAX_GUESSES
  const over = won || lost

  const makeGuess = (pokemon: PokemonMetadata) => {
    if (!answer || over) return
    const next = [pokemon].concat(guesses)
    setGuesses(next)
    const nowWon = pokemon.id === answer.id
    if (nowWon || next.length >= MAX_GUESSES) {
      if (daily) saveDailyResult('pokedle', genParam, { won: nowWon, score: next.length, guesses: next.map(g => g.id) })
      else if (stats) setStats(recordGame(stats, nowWon))
    }
    inputRef.current?.focus()
  }

  const newGame = () => {
    setAnswer(pickAnswer(pool, answer?.id))
    setGuesses([])
    setShowSilhouette(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  if (!answer) return null

  const guessesLeft = MAX_GUESSES - guesses.length
  const canShowSilhouette = guesses.length >= SILHOUETTE_AFTER
  const answerName = bothNames(answer)

  const shareText = [
    `Pokedle Daily ${todayKey()} (${scope.label}) ${won ? guesses.length : 'X'}/${MAX_GUESSES}`,
    ...guesses.slice().reverse().map(g => compareGuess(g, answer).map(c => STATUS_STYLE[c.status].emoji).join('')),
  ].join('\n')

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push(daily ? `/daily/${genParam}` : '/?section=learn')}>
          ← {daily ? 'Daily' : 'Menu'}
        </Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {scope.label}
          {daily ? ` · Daily ${todayKey()}` : stats && ` · ${stats.won}/${stats.played} won · streak ${stats.streak}`}
        </span>
      </div>

      <div className="card items-center text-center" style={{ gap: 'var(--space-4)' }}>
        <div className="card-kicker">{daily ? 'Daily Pokedle' : 'Pokedle'}</div>

        {over ? (
          <>
            <div className="w-36 h-36 lighten">
              <PokemonArt id={answer.id} alt={answerName} className="w-full h-full" />
            </div>
            <p className="text-sm font-semibold" style={{ color: won ? 'var(--success-gradient)' : 'var(--error-gradient)' }}>
              {won ? `Got it in ${guesses.length}!` : 'Out of guesses!'}
            </p>
            <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}>
              {answerName}
            </h2>
            {daily ? (
              <DailyFooter shareText={shareText} hubHref={`/daily/${genParam}`} />
            ) : (
              <div className="flex gap-3">
                <Button onClick={newGame}>Play again</Button>
                <Link href={`/pokemon/${answer.id}?gen=${answer.generation}`} className="btn btn-secondary">
                  View in Pokedex
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-28 h-28 flex items-center justify-center rounded-md" style={{ background: 'var(--color-bg)' }}>
              {showSilhouette ? (
                <PokemonArt id={answer.id} alt="Mystery Pokemon silhouette" silhouette className="w-full h-full p-2" />
              ) : (
                <span className="text-4xl" style={{ color: 'var(--color-neutral-600)' }}>?</span>
              )}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Guess the hidden Pokemon. Green = match, yellow = close, arrows point toward the answer.
            </p>

            <div className="w-full max-w-md">
              <PokemonPicker
                ref={inputRef}
                pool={pool}
                onPick={makeGuess}
                excludeIds={guesses.map(g => g.id)}
                placeholder={`English or Japanese name (${guessesLeft} left)`}
                autoFocus
              />
            </div>

            <Button
              variant="ghost"
              disabled={!canShowSilhouette || showSilhouette}
              onClick={() => setShowSilhouette(true)}
            >
              {showSilhouette
                ? 'Silhouette shown'
                : canShowSilhouette
                  ? 'Show silhouette hint'
                  : `Silhouette hint after ${SILHOUETTE_AFTER - guesses.length} more guess${SILHOUETTE_AFTER - guesses.length === 1 ? '' : 'es'}`}
            </Button>
          </>
        )}
      </div>

      {guesses.map(g => (
        <div key={g.id} className="card" style={{ gap: 'var(--space-3)', padding: 'var(--space-4)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0">
              <PokemonArt id={g.id} alt={formatPokemonName(g.species_name)} className="w-full h-full" />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {bothNames(g)}
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {compareGuess(g, answer).map(clue => <ClueTile key={clue.key} clue={clue} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
