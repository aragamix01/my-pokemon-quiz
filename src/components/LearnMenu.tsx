'use client'

import { useState, useEffect, useMemo, ReactNode } from 'react'
import Link from 'next/link'
import { LearnState, loadLearnState, scopeStats } from '@/lib/learn-progress'
import { Cards, MagnifyingGlass, Keyboard, SquaresFour, ImageSquare, TreeStructure, Sword, Ruler, Fire, Check, CaretDown } from '@phosphor-icons/react'
import { dailyStreak, getDailyResult, DAILY_PUZZLES, DailyPuzzle } from '@/lib/daily'
import { getScope } from '@/lib/game-utils'
import { DEX_SCOPE_PREFIX, getPokedexes, pokedexOptionLabel } from '@/lib/regional-pokedexes'
import { POPULAR_SCOPE_PREFIX, POPULAR_TIERS } from '@/lib/popular-pokemon'
import PokemonArt from '@/components/learn/PokemonArt'
import { cn } from '@/lib/cn'

const GEN_KEY = 'learn-generation'
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

interface Game {
  path: string
  title: string
  icon: ReactNode
  color: string
  description: string
  /** Not scoped by generation; you can use every Pokemon */
  unscoped?: boolean
}

const GAMES: Game[] = [
  {
    path: 'learn',
    title: 'Flashcards',
    icon: <Cards size={22} weight="bold" />,
    color: '#2a5fa8',
    description: 'Spaced repetition: see it, pick it, then type it from memory.',
  },
  {
    path: 'guess',
    title: 'Pokédle',
    icon: <MagnifyingGlass size={22} weight="bold" />,
    color: '#2f9e63',
    description: 'Guess the hidden Pokémon in 8 tries from type, size and color clues.',
  },
  {
    path: 'name-all',
    title: 'Name Them All',
    icon: <Keyboard size={22} weight="bold" />,
    color: '#c62a1f',
    description: 'Type every name you remember before time runs out.',
  },
  {
    path: 'memory',
    title: 'Memory Match',
    icon: <SquaresFour size={22} weight="bold" />,
    color: '#6a55d8',
    description: 'Flip cards to pair each picture with its name.',
  },
  {
    path: 'reveal',
    title: 'Pixel Reveal',
    icon: <ImageSquare size={22} weight="bold" />,
    color: '#b7780b',
    description: 'Name it from a pixelated picture before it gets sharp.',
  },
  {
    path: 'evolution',
    title: 'Evolution Order',
    icon: <TreeStructure size={22} weight="bold" />,
    color: '#1f8a7a',
    description: 'Put each evolution family in the right order.',
  },
  {
    path: 'type-quiz',
    title: 'Type Quiz',
    icon: <Sword size={22} weight="bold" />,
    color: '#b83a6e',
    description: 'Super effective or not? Learn the type chart question by question.',
  },
  {
    path: 'size',
    title: 'Size Compare',
    icon: <Ruler size={22} weight="bold" />,
    color: '#565a68',
    description: 'See any Pokémon next to you at real scale.',
    unscoped: true,
  },
]

const PUZZLE_LABEL: Record<DailyPuzzle, string> = { pokedle: 'Pokédle', reveal: 'Pixel Reveal' }

/** Play & Learn hub: pick what to practise, then the daily puzzles, the silhouette quiz, flashcards and games */
export default function LearnMenu() {
  // Scope slug shared by every game: "all", "1".."9", a game Pokedex like "dex-paldea", or "popular-50"
  const [slug, setSlug] = useState('1')
  const [learn, setLearn] = useState<LearnState | null>(null)

  useEffect(() => {
    setLearn(loadLearnState())
    const saved = sessionStorage.getItem(GEN_KEY)
    if (saved) setSlug(saved)
  }, [])

  const selectSlug = (next: string) => {
    setSlug(next)
    sessionStorage.setItem(GEN_KEY, next)
  }

  const isDex = slug.indexOf(DEX_SCOPE_PREFIX) === 0
  const isPopular = slug.indexOf(POPULAR_SCOPE_PREFIX) === 0
  const scope = useMemo(() => getScope(slug), [slug])
  const scopeIds = scope.pool.map(p => p.id)
  const progress = learn ? scopeStats(learn, scopeIds) : null
  // The silhouette quiz runs on one generation or all of them
  const quizHref = /^[1-9]$/.test(slug) ? `/quiz/${slug}` : '/quiz/all'

  // Daily status reads localStorage, so it is only known after mount
  const [daily, setDaily] = useState<{ streak: number; done: Record<string, boolean> } | null>(null)
  useEffect(() => {
    const done: Record<string, boolean> = {}
    DAILY_PUZZLES.forEach(p => { done[p] = !!getDailyResult(p, slug) })
    setDaily({ streak: dailyStreak(), done })
  }, [slug])

  const today = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const masteredPct = progress && progress.total ? progress.mastered / progress.total : 0
  const RING = 2 * Math.PI * 30

  return (
    <div className="flex flex-col gap-5">
      {/* What to practise */}
      <section className="flex flex-col gap-2" aria-label="Pokémon to practise">
        <span className="nx-label">Practise with</span>
        <div className="flex items-center gap-1.5 nx-scroll-x pb-1 -mx-1 px-1">
          <button type="button" className={cn('nx-tab sm flex-shrink-0', slug === 'all' && 'nx-tab-active')} onClick={() => selectSlug('all')} aria-pressed={slug === 'all'}>
            All gens
          </button>
          {ROMAN.map((label, i) => {
            const s = String(i + 1)
            return (
              <button key={s} type="button" className={cn('nx-tab sm flex-shrink-0', slug === s && 'nx-tab-active')} onClick={() => selectSlug(s)} aria-pressed={slug === s} title={`Generation ${s}`}>
                Gen {label}
              </button>
            )
          })}
          {POPULAR_TIERS.map(n => (
            <button
              key={n}
              type="button"
              className={cn('nx-tab sm flex-shrink-0', slug === POPULAR_SCOPE_PREFIX + n && 'nx-tab-active')}
              onClick={() => selectSlug(POPULAR_SCOPE_PREFIX + n)}
              aria-pressed={slug === POPULAR_SCOPE_PREFIX + n}
            >
              Top {n}
            </button>
          ))}
          <div className="relative flex-shrink-0">
            <select
              value={isDex ? slug.slice(DEX_SCOPE_PREFIX.length) : ''}
              onChange={e => { if (e.target.value) selectSlug(DEX_SCOPE_PREFIX + e.target.value) }}
              className={cn('nx-tab sm appearance-none pr-8 cursor-pointer', isDex && 'nx-tab-active')}
              aria-label="Game Pokédex"
            >
              <option value="">Game Pokédex…</option>
              {getPokedexes().map(dex => (
                <option key={dex.name} value={dex.name}>{pokedexOptionLabel(dex)} · {dex.entries.length}</option>
              ))}
            </select>
            <CaretDown size={12} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {isDex
            ? <>{scope.label}: {scope.pool.length} Pokémon, in the game&apos;s own order</>
            : isPopular
              ? <>The {scope.pool.length} most popular Pokémon from every generation, most popular first</>
              : <>{scope.label}: {scope.pool.length} Pokémon. Progress is saved in this browser.</>}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Daily challenge */}
        <section className="nx-hero yellow" aria-label="Daily challenge">
          <svg className="nx-hero-ball" viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="42" /><path d="M8 50h28M64 50h28" /><circle cx="50" cy="50" r="14" /></svg>
          <div className="flex items-center gap-2">
            <span className="nx-label" style={{ color: 'inherit' }}>Daily challenge · {today}</span>
            <div className="flex-1" />
            {daily && (
              <span className="nx-streak" title="Days in a row">
                <Fire size={14} weight="fill" /> {daily.streak} {daily.streak === 1 ? 'day' : 'days'}
              </span>
            )}
          </div>
          <div className="font-display text-2xl font-bold leading-tight">Same puzzles for everyone today</div>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {DAILY_PUZZLES.map((p, i) => (
              <Link key={p} href={`/daily/${slug}/${p}`} className={cn('nx-hero-btn', i === 0 ? 'solid' : 'soft')}>
                {daily?.done[p] && <Check size={16} weight="bold" />}
                {PUZZLE_LABEL[p]}
              </Link>
            ))}
          </div>
        </section>

        {/* Silhouette quiz */}
        <Link href={quizHref} className="nx-hero red" aria-label="Who's that Pokémon? Silhouette quiz, 10 questions">
          <svg className="nx-hero-ball" viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="42" /><path d="M8 50h28M64 50h28" /><circle cx="50" cy="50" r="14" /></svg>
          <span className="nx-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Quiz · 10 questions</span>
          <div className="flex items-end gap-3 flex-1">
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-display text-2xl font-bold leading-tight">Who&apos;s that Pokémon?</span>
              <span className="text-sm opacity-90">Name the silhouette</span>
            </div>
            <PokemonArt id={25} alt="" silhouette className="w-28 h-28 flex-shrink-0 opacity-90" />
          </div>
        </Link>

        {/* Flashcard progress */}
        <section className="card md:col-span-2 lg:col-span-1" style={{ gap: 14 }} aria-label="Flashcards progress">
          <div className="flex items-center gap-4">
            <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={progress ? `${progress.mastered} of ${progress.total} mastered` : 'Progress'}>
              <circle cx="38" cy="38" r="30" fill="none" stroke="var(--color-neutral-800)" strokeWidth="9" />
              <circle
                cx="38" cy="38" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={`${RING * masteredPct} ${RING}`} transform="rotate(-90 38 38)"
              />
              <text x="38" y="43" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--color-text)" style={{ fontFamily: 'var(--font-number)' }}>
                {Math.round(masteredPct * 100)}%
              </text>
            </svg>
            <div className="flex-1 min-w-0">
              <div className="font-display text-xl font-semibold leading-tight">
                {progress ? `${progress.mastered} of ${progress.total} mastered` : 'Flashcards'}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {progress ? `${progress.due} due · ${progress.seen} met so far` : 'Learn a few new names a day'}
              </div>
            </div>
          </div>
          <Link href={`/learn/${slug}`} className="btn btn-primary btn-block">Study flashcards</Link>
        </section>
      </div>

      {/* Games */}
      <section className="flex flex-col gap-3" aria-label="Games">
        <h2 className="nx-section-title">Games</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GAMES.map(game => (
            <Link key={game.path} href={game.unscoped ? `/${game.path}` : `/${game.path}/${slug}`} className="nx-game">
              <span className="nx-game-icon" style={{ background: game.color }}>{game.icon}</span>
              <span className="font-display text-lg font-semibold leading-tight">{game.title}</span>
              <span className="text-[13px] leading-snug" style={{ color: 'var(--text-secondary)' }}>{game.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
