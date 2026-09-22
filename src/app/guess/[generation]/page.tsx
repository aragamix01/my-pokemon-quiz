'use client'

import { useState, useEffect, useMemo, useRef, use, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { formatPokemonName, normalizeName, japaneseName, bothNames } from '@/lib/pokemon-names'
import {
  compareGuess, Clue, ClueStatus, MAX_GUESSES, SILHOUETTE_AFTER,
  GuessStats, loadGuessStats, recordGame,
} from '@/lib/pokedle'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { PokemonTypeName, getTypeColor } from '@/lib/type-effectiveness'
import { Button } from '@/components/ui/Button'
import PokemonArt from '@/components/learn/PokemonArt'
import { ArrowUp, ArrowDown } from '@phosphor-icons/react'

interface GuessPageProps {
  params: Promise<{ generation: string }>
}

const MAX_SUGGESTIONS = 6

const STATUS_STYLE: Record<ClueStatus, { border: string; background: string }> = {
  match: {
    border: 'var(--success-gradient)',
    background: 'color-mix(in srgb, var(--success-gradient) 22%, transparent)',
  },
  partial: {
    border: '#d4a94a',
    background: 'color-mix(in srgb, #d4a94a 20%, transparent)',
  },
  miss: {
    border: 'var(--color-neutral-700)',
    background: 'var(--color-bg)',
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

export default function GuessPage({ params }: GuessPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const generation = genParam === 'all' ? null : parseInt(genParam, 10)
  const scopeLabel = generation === null ? 'All Generations' : `Gen ${generation}`

  const pool = useMemo<PokemonMetadata[]>(
    () => generation === null
      ? pokemonMetadataService.getAllMetadata()
      : pokemonMetadataService.getMetadataByGeneration(generation),
    [generation]
  )
  const searchIndex = useMemo(
    // Each Pokemon is findable by its English or Japanese (romaji) name
    () => pool.map(p => ({
      pokemon: p,
      keys: [normalizeName(formatPokemonName(p.species_name))].concat(japaneseName(p) ? [normalizeName(japaneseName(p) as string)] : []),
    })),
    [pool]
  )

  const [answer, setAnswer] = useState<PokemonMetadata | null>(null)
  const [guesses, setGuesses] = useState<PokemonMetadata[]>([])
  const [query, setQuery] = useState('')
  const [showSilhouette, setShowSilhouette] = useState(false)
  const [stats, setStats] = useState<GuessStats | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Random answer is picked on the client only, so server and client HTML match
  useEffect(() => {
    if (pool.length) setAnswer(pickAnswer(pool))
    setStats(loadGuessStats())
  }, [pool])

  const won = !!answer && guesses.length > 0 && guesses[0].id === answer.id
  const lost = !won && guesses.length >= MAX_GUESSES
  const over = won || lost

  const suggestions = useMemo(() => {
    const q = normalizeName(query)
    if (!q) return []
    const guessed: Record<number, true> = {}
    guesses.forEach(g => { guessed[g.id] = true })
    const available = searchIndex.filter(s => !guessed[s.pokemon.id])
    const starts = available.filter(s => s.keys.some(k => k.indexOf(q) === 0))
    const contains = available.filter(s => !s.keys.some(k => k.indexOf(q) === 0) && s.keys.some(k => k.indexOf(q) > 0))
    return starts.concat(contains).slice(0, MAX_SUGGESTIONS).map(s => s.pokemon)
  }, [query, searchIndex, guesses])

  const makeGuess = (pokemon: PokemonMetadata) => {
    if (!answer || over) return
    const next = [pokemon].concat(guesses)
    setGuesses(next)
    setQuery('')
    const nowWon = pokemon.id === answer.id
    if ((nowWon || next.length >= MAX_GUESSES) && stats) setStats(recordGame(stats, nowWon))
    inputRef.current?.focus()
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (suggestions.length) makeGuess(suggestions[0])
  }

  const newGame = () => {
    setAnswer(pickAnswer(pool, answer?.id))
    setGuesses([])
    setQuery('')
    setShowSilhouette(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  if (!answer) return null

  const guessesLeft = MAX_GUESSES - guesses.length
  const canShowSilhouette = guesses.length >= SILHOUETTE_AFTER
  const answerName = bothNames(answer)

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push('/?section=learn')}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {scopeLabel}
          {stats && ` · ${stats.won}/${stats.played} won · streak ${stats.streak}`}
        </span>
      </div>

      <div className="card items-center text-center" style={{ gap: 'var(--space-4)' }}>
        <div className="card-kicker">Pokedle</div>

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
            <div className="flex gap-3">
              <Button onClick={newGame}>Play again</Button>
              <Link href={`/pokemon/${answer.id}?gen=${answer.generation}`} className="btn btn-secondary">
                View in Pokedex
              </Link>
            </div>
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

            <form onSubmit={onSubmit} className="relative w-full max-w-md">
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`English or Japanese name (${guessesLeft} left)`}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="input text-center"
                autoFocus
              />
              {suggestions.length > 0 && (
                <ul
                  className="absolute left-0 right-0 top-full mt-1 z-20 rounded-md overflow-hidden text-left"
                  style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)' }}
                >
                  {suggestions.map(p => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => makeGuess(p)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--color-neutral-800)]"
                        style={{ color: 'var(--color-text)' }}
                      >
                        <PokemonArt id={p.id} alt="" className="w-8 h-8" />
                        {bothNames(p)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>

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
