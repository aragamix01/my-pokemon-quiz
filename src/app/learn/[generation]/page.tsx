'use client'

import { useState, useEffect, useCallback, useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { generateConfusingAnswers } from '@/lib/pokemon-similarity'
import { bothNames } from '@/lib/pokemon-names'
import {
  LearnState, Grade, emptyState, loadLearnState, saveLearnState, buildQueue, introduceCard,
  gradeCard, touchStreak, scopeStats, modeForStage, isMastered, newCardsLeftToday,
} from '@/lib/learn-progress'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import LearnCard from '@/components/learn/LearnCard'
import PokemonArt from '@/components/learn/PokemonArt'
import { Fire, Cards, CheckCircle } from '@phosphor-icons/react'

interface LearnPageProps {
  params: Promise<{ generation: string }>
}

// A card answered wrong (or still learning) comes back after this many other cards
const REQUEUE_GAP = 3
const NEW_PER_DAY_CHOICES = [5, 10, 20]

function shuffle<T>(array: T[]): T[] {
  const out = array.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

interface SessionStats {
  introduced: number
  answered: number
  correct: number
}

export default function LearnPage({ params }: LearnPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const generation = genParam === 'all' ? null : parseInt(genParam, 10)
  const scopeLabel = generation === null ? 'All Generations' : `Gen ${generation}`

  const scope = useMemo<PokemonMetadata[]>(
    () => generation === null
      ? pokemonMetadataService.getAllMetadata()
      : pokemonMetadataService.getMetadataByGeneration(generation),
    [generation]
  )
  const scopeIds = useMemo(() => scope.map(p => p.id), [scope])
  const byId = useMemo(() => {
    const map: Record<number, PokemonMetadata> = {}
    pokemonMetadataService.getAllMetadata().forEach(p => { map[p.id] = p })
    return map
  }, [])

  const [learn, setLearn] = useState<LearnState>(emptyState())
  const [loaded, setLoaded] = useState(false)
  const [phase, setPhase] = useState<'home' | 'session' | 'summary'>('home')
  const [queue, setQueue] = useState<number[]>([])
  const [options, setOptions] = useState<PokemonMetadata[]>([])
  const [stats, setStats] = useState<SessionStats>({ introduced: 0, answered: 0, correct: 0 })
  // Bumps on every answer so a card shown twice in a row still remounts fresh
  const [step, setStep] = useState(0)

  useEffect(() => {
    setLearn(loadLearnState())
    setLoaded(true)
  }, [])

  const update = useCallback((next: LearnState) => {
    setLearn(next)
    saveLearnState(next)
  }, [])

  const currentId = queue[0]
  const current = currentId !== undefined ? byId[currentId] : undefined
  const currentMode = current ? (learn.cards[current.id] ? modeForStage(learn.cards[current.id].stage) : 'intro') : 'intro'

  // Build four name choices, favouring look-alikes so the choice is a real test
  useEffect(() => {
    if (!current || currentMode !== 'choose') return
    let cancelled = false
    const pickRandom = (exclude: number[], n: number) =>
      shuffle(scope.filter(p => exclude.indexOf(p.id) === -1)).slice(0, n)

    generateConfusingAnswers(current.id, 4)
      .catch(() => [] as number[])
      .then(ids => {
        if (cancelled) return
        const similar = ids.map(id => byId[id]).filter((p): p is PokemonMetadata => !!p).slice(0, 3)
        const wrong = similar.concat(pickRandom([current.id].concat(similar.map(p => p.id)), 3 - similar.length))
        setOptions(shuffle([current].concat(wrong)))
      })
    return () => {
      cancelled = true
    }
  }, [current, currentMode, scope, byId, step])

  const home = scopeStats(learn, scopeIds)
  const plan = buildQueue(learn, scopeIds)

  const startSession = () => {
    const ids = plan.reviews.concat(plan.fresh)
    if (ids.length === 0) return
    setQueue(ids)
    setOptions([])
    setStats({ introduced: 0, answered: 0, correct: 0 })
    setPhase('session')
  }

  const handleDone = useCallback((grade: Grade) => {
    if (currentId === undefined) return
    const rest = queue.slice(1)
    let next: LearnState
    let repeat: boolean

    if (!learn.cards[currentId]) {
      next = introduceCard(learn, currentId)
      repeat = true
      setStats(s => ({ ...s, introduced: s.introduced + 1 }))
    } else {
      const graded = gradeCard(learn, currentId, grade)
      next = graded.state
      repeat = graded.repeatInSession
      setStats(s => ({ ...s, answered: s.answered + 1, correct: s.correct + (grade === 'again' ? 0 : 1) }))
    }

    update(touchStreak(next))
    if (repeat) rest.splice(Math.min(REQUEUE_GAP, rest.length), 0, currentId)
    setOptions([])
    setStep(n => n + 1)
    setQueue(rest)
    if (rest.length === 0) setPhase('summary')
  }, [currentId, queue, learn, update])

  const backToMenu = () => router.push('/?section=learn')

  if (!loaded) return null

  if (phase === 'session' && current) {
    const waitingForOptions = currentMode === 'choose' && options.length === 0
    return (
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setPhase('home')}>← Stop</Button>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {scopeLabel} · {queue.length} left
          </span>
        </div>
        {waitingForOptions ? (
          <div className="card items-center py-16">
            <div className="modern-spinner">
              <div className="pokeball-line"></div>
              <div className="pokeball-center"></div>
            </div>
          </div>
        ) : (
          <LearnCard key={step} pokemon={current} mode={currentMode} options={options} onDone={handleDone} />
        )}
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 100
    return (
      <div className="max-w-xl mx-auto card items-center text-center" style={{ gap: 'var(--space-6)' }}>
        <CheckCircle size={48} color="var(--success-gradient)" />
        <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Session complete</h2>
        <div className="grid grid-cols-3 gap-3 w-full">
          <Stat label="New" value={stats.introduced} />
          <Stat label="Answers" value={stats.answered} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Cards you know come back in a few days. Come back tomorrow for more.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => setPhase('home')}>Continue</Button>
          <Button variant="secondary" onClick={backToMenu}>Menu</Button>
        </div>
      </div>
    )
  }

  const sessionSize = plan.reviews.length + plan.fresh.length
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-accent)' }}>
          <Fire size={18} weight="fill" /> {learn.streak.count} day streak
        </span>
      </div>

      <div className="card" style={{ gap: 'var(--space-6)' }}>
        <div>
          <div className="card-kicker">Learn</div>
          <h1 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{scopeLabel}</h1>
        </div>

        <ProgressBar value={home.mastered} max={home.total} label="Mastered" valueLabel={`${home.mastered} / ${home.total}`} />

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Seen" value={home.seen} />
          <Stat label="Due now" value={plan.reviews.length} />
          <Stat label="New today" value={newCardsLeftToday(learn)} />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          New per day:
          {NEW_PER_DAY_CHOICES.map(n => (
            <button
              key={n}
              className={`nx-tab ${learn.newPerDay === n ? 'nx-tab-active' : ''}`}
              onClick={() => update({ ...learn, newPerDay: n })}
            >
              {n}
            </button>
          ))}
        </div>

        <Button block onClick={startSession} disabled={sessionSize === 0}>
          <Cards size={18} />
          {sessionSize === 0
            ? 'All done for today'
            : `Start: ${plan.reviews.length} review${plan.reviews.length === 1 ? '' : 's'} + ${plan.fresh.length} new`}
        </Button>
      </div>

      <div className="card">
        <div className="card-kicker">Your collection</div>
        <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          Silhouettes are Pokemon you haven&apos;t met yet. A star means mastered.
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {scope.map(p => {
            const card = learn.cards[p.id]
            const name = bothNames(p)
            return (
              <div
                key={p.id}
                className="relative rounded-md aspect-square flex items-center justify-center"
                style={{ background: 'var(--color-bg)' }}
                title={card ? name : '???'}
              >
                <PokemonArt id={p.id} alt={card ? name : 'Unknown Pokemon'} silhouette={!card} lazy className="w-full h-full p-1" />
                {isMastered(card) && (
                  <span className="absolute top-0.5 right-1 text-[11px]" style={{ color: '#f5c542' }}>★</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md py-3 text-center" style={{ background: 'var(--color-bg)' }}>
      <div className="text-xl" style={{ color: 'var(--color-text)' }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}
