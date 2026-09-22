'use client'

import { useState, useEffect, useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import { getScope, loadBest, saveBest } from '@/lib/game-utils'
import { buildTypeQuiz, TypeQuestion } from '@/lib/type-quiz'
import { formatPokemonName } from '@/lib/pokemon-names'
import { PokemonTypeName } from '@/lib/type-effectiveness'
import { Button } from '@/components/ui/Button'
import { TypePill } from '@/components/ui/TypePill'
import PokemonArt from '@/components/learn/PokemonArt'
import { CheckCircle, XCircle } from '@phosphor-icons/react'

interface TypeQuizPageProps {
  params: Promise<{ generation: string }>
}

const QUESTIONS = 10

export default function TypeQuizPage({ params }: TypeQuizPageProps) {
  const router = useRouter()
  const { generation: genParam } = use(params)
  const scope = useMemo(() => getScope(genParam), [genParam])
  const bestKey = `type-quiz-${genParam}`

  const [questions, setQuestions] = useState<TypeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [best, setBest] = useState<number | null>(null)
  const [newBest, setNewBest] = useState(false)

  const start = () => {
    setQuestions(buildTypeQuiz(scope.pool, QUESTIONS))
    setIndex(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
    setNewBest(false)
    setBest(loadBest(bestKey))
  }

  // Random questions are built on the client only, so server and client HTML match
  useEffect(start, [scope]) // eslint-disable-line react-hooks/exhaustive-deps

  const question = questions[index]

  const choose = (value: string) => {
    if (picked !== null) return
    setPicked(value)
    if (value === question.answer) setScore(s => s + 1)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      setNewBest(saveBest(bestKey, score))
      setFinished(true)
      return
    }
    setIndex(index + 1)
    setPicked(null)
  }

  useEffect(() => {
    if (picked === null || finished) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !(e.target as HTMLElement).closest('button')) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const backToMenu = () => router.push('/?section=learn')

  if (!question) return null

  if (finished) {
    return (
      <div className="max-w-xl mx-auto card items-center text-center" style={{ gap: 'var(--space-6)' }}>
        <div className="card-kicker">Type Quiz</div>
        <div className="text-4xl" style={{ color: 'var(--color-text)' }}>{score} / {questions.length}</div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {newBest ? 'New best score!' : best !== null ? `Best: ${Math.max(best, score)} / ${questions.length}` : ''}
        </p>
        <div className="flex gap-3">
          <Button onClick={start}>Play again</Button>
          <Button variant="secondary" onClick={backToMenu}>Menu</Button>
        </div>
      </div>
    )
  }

  const answered = picked !== null
  const correct = picked === question.answer
  const sixOptions = question.options.length > 4

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={backToMenu}>← Menu</Button>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {scope.label} · {index + 1}/{questions.length} · Score {score}
        </span>
      </div>

      <div className="card items-center text-center" style={{ gap: 'var(--space-4)' }}>
        <div className="card-kicker self-start">Type Quiz</div>

        {question.pokemon && (
          <div className="w-32 h-32 lighten">
            <PokemonArt id={question.pokemon.id} alt={formatPokemonName(question.pokemon.species_name)} className="w-full h-full" />
          </div>
        )}

        {/* Attacking type -> defending types, when the question has them */}
        {question.attackType && question.defendTypes && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <TypePill type={question.attackType as PokemonTypeName} selected />
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            {question.kind === 'pokemon-matchup' && !answered
              ? <span className="text-xs" style={{ color: 'var(--text-muted)' }}>its types?</span>
              : question.defendTypes.map(t => <TypePill key={t} type={t as PokemonTypeName} />)}
          </div>
        )}

        <h2 className="text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{question.prompt}</h2>

        <div className={`grid gap-3 w-full ${sixOptions ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {question.options.map(opt => {
            let cls = 'nx-quizopt'
            if (answered) {
              if (opt.value === question.answer) cls += ' correct'
              else if (opt.value === picked) cls += ' wrong'
              else cls += ' disabled'
            }
            return (
              <button key={opt.value} className={`${cls} flex items-center justify-center gap-1.5 flex-wrap`} disabled={answered} onClick={() => choose(opt.value)}>
                {opt.types
                  ? opt.types.map(t => <TypePill key={t} type={t as PokemonTypeName} />)
                  : <span className="text-lg">{opt.label}</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: correct ? 'var(--success-gradient)' : 'var(--error-gradient)' }}>
              {correct ? <CheckCircle size={18} weight="fill" /> : <XCircle size={18} weight="fill" />}
              {correct ? 'Correct!' : 'Not quite.'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{question.explanation}</p>
            <Button block onClick={next}>{index + 1 >= questions.length ? 'See score' : 'Next'}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
