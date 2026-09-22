'use client'

import { useState, useEffect, useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, formatClock } from '@/lib/game-utils'
import { getDailyResult, dailyStreak, msUntilTomorrow, DailyResult } from '@/lib/daily'
import { todayKey } from '@/lib/learn-progress'
import { MAX_GUESSES } from '@/lib/pokedle'
import { Button } from '@/components/ui/Button'
import { Fire, MagnifyingGlass, ImageSquare, CheckCircle } from '@phosphor-icons/react'

interface DailyPageProps {
  params: Promise<{ generation: string }>
}

const PUZZLES = [
  {
    id: 'pokedle' as const,
    title: 'Daily Pokedle',
    icon: <MagnifyingGlass size={22} color="var(--color-accent)" />,
    description: 'Find today’s hidden Pokemon in 8 guesses.',
    result: (r: DailyResult) => (r.won ? `Solved in ${r.score}/${MAX_GUESSES}` : `Not solved (${MAX_GUESSES}/${MAX_GUESSES})`),
  },
  {
    id: 'reveal' as const,
    title: 'Daily Pixel Reveal',
    icon: <ImageSquare size={22} color="var(--color-accent)" />,
    description: 'Name today’s pixelated Pokemon with as few hints as you can.',
    result: (r: DailyResult) => `${r.score} / 6 points`,
  },
]

export default function DailyPage({ params }: DailyPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])

  const [results, setResults] = useState<Record<string, DailyResult | null> | null>(null)
  const [streak, setStreak] = useState(0)
  const [left, setLeft] = useState(0)

  // Results live in localStorage, so read them on the client only
  useEffect(() => {
    setResults({
      pokedle: getDailyResult('pokedle', genParam),
      reveal: getDailyResult('reveal', genParam),
    })
    setStreak(dailyStreak())
    setLeft(msUntilTomorrow())
    const timer = setInterval(() => setLeft(msUntilTomorrow()), 1000)
    return () => clearInterval(timer)
  }, [genParam])

  if (!results) return null

  const hours = Math.floor(left / 3600000)
  const doneCount = PUZZLES.filter(p => results[p.id]).length

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push('/?section=learn')}>← Menu</Button>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-accent)' }}>
          <Fire size={18} weight="fill" /> {streak} day streak
        </span>
      </div>

      <div className="card" style={{ gap: 'var(--space-2)' }}>
        <div className="card-kicker">Daily Challenge · {todayKey()}</div>
        <h1 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{scope.label}</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Everyone playing {scope.label} gets the same puzzles today. You get one try at each.
          {doneCount === PUZZLES.length
            ? ` All done! New puzzles in ${hours}:${formatClock(left % 3600000).padStart(5, '0')}.`
            : ` ${doneCount} of ${PUZZLES.length} done.`}
        </p>
      </div>

      {PUZZLES.map(puzzle => {
        const result = results[puzzle.id]
        return (
          <div key={puzzle.id} className="card" style={{ gap: 'var(--space-4)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {puzzle.icon}
                <h3 className="card-title">{puzzle.title}</h3>
              </div>
              {result && <CheckCircle size={22} weight="fill" color="var(--success-gradient)" />}
            </div>
            <p className="card-body">{result ? puzzle.result(result) : puzzle.description}</p>
            <Button
              block
              variant={result ? 'secondary' : 'primary'}
              onClick={() => router.push(`/daily/${genParam}/${puzzle.id}`)}
            >
              {result ? 'See result' : 'Play'}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
