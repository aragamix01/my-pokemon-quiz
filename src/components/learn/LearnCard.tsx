'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { PokemonTypeName } from '@/lib/type-effectiveness'
import { pokemonAPI } from '@/lib/pokemon-api'
import { formatPokemonName, matchPokemonName, japaneseName, bothNames, cryUrl, NameMatch } from '@/lib/pokemon-names'
import { Grade, LearnMode } from '@/lib/learn-progress'
import { TypePill } from '@/components/ui/TypePill'
import { Button } from '@/components/ui/Button'
import PokemonArt from './PokemonArt'
import { SpeakerHigh, Lightbulb } from '@phosphor-icons/react'

interface LearnCardProps {
  pokemon: PokemonMetadata
  mode: LearnMode
  options: PokemonMetadata[]
  onDone: (grade: Grade) => void
}

const MAX_WRONG_TYPED = 3

function playCry(id: number) {
  const audio = new Audio(cryUrl(id))
  audio.volume = 0.4
  audio.play().catch(() => {})
}

/** "Bulbasaur" at hint 1 -> "_ _ _ _ _ _ _ _ _", hint 2 -> "B _ _ ...", hint 3 -> every other letter */
function hintMask(name: string, level: number): string {
  return name
    .split('')
    .map((ch, i) => {
      if (!/[a-zA-Z0-9]/.test(ch)) return ch
      if (level >= 3 && i % 2 === 0) return ch
      if (level >= 2 && i === 0) return ch
      return '_'
    })
    .join(' ')
}

function useFlavorText(id: number, enabled: boolean): string | null {
  const [text, setText] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    setText(null)
    pokemonAPI
      .getPokemonSpecies(id)
      .then(species => {
        const entries = species.flavor_text_entries.filter(e => e.language.name === 'en')
        const latest = entries[entries.length - 1]
        if (!cancelled && latest) setText(latest.flavor_text.replace(/[\f\n\r]+/g, ' '))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id, enabled])
  return text
}

function Facts({ pokemon }: { pokemon: PokemonMetadata }) {
  const facts = [
    { label: 'Gen', value: String(pokemon.generation) },
    { label: 'Height', value: `${(pokemon.height / 10).toFixed(1)} m` },
    { label: 'Weight', value: `${(pokemon.weight / 10).toFixed(1)} kg` },
    { label: 'Color', value: pokemon.color ?? '—' },
  ]
  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {facts.map(f => (
        <div key={f.label} className="rounded-md py-2 text-center" style={{ background: 'var(--color-bg)' }}>
          <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{f.label}</div>
          <div className={`text-sm ${f.label === 'Color' ? 'capitalize' : ''}`} style={{ color: 'var(--color-text)' }}>{f.value}</div>
        </div>
      ))}
    </div>
  )
}

function NameReveal({ pokemon, flavor }: { pokemon: PokemonMetadata; flavor: string | null }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="text-center">
        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>#{String(pokemon.id).padStart(4, '0')}</div>
        <h2 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}>
          {formatPokemonName(pokemon.species_name)}
        </h2>
        {japaneseName(pokemon) && (
          <div className="text-base" style={{ color: 'var(--color-accent-400)' }}>
            <span className="text-[10px] uppercase tracking-wide mr-1.5" style={{ color: 'var(--text-muted)' }}>Japanese</span>
            {japaneseName(pokemon)}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {pokemon.types.map(t => <TypePill key={t} type={t as PokemonTypeName} />)}
        {pokemon.is_legendary && <span className="tag tag-accent">Legendary</span>}
        {pokemon.is_mythical && <span className="tag tag-accent">Mythical</span>}
      </div>
      <Facts pokemon={pokemon} />
      {flavor && (
        <p className="text-sm text-center italic" style={{ color: 'var(--text-secondary)' }}>
          {flavor}
        </p>
      )}
    </div>
  )
}

export default function LearnCard({ pokemon, mode, options, onDone }: LearnCardProps) {
  const name = formatPokemonName(pokemon.species_name)

  // choose mode
  const [picked, setPicked] = useState<number | null>(null)

  // type mode
  const [typed, setTyped] = useState('')
  const [hints, setHints] = useState(0)
  const [wrongTries, setWrongTries] = useState(0)
  const [result, setResult] = useState<NameMatch | 'gaveup' | null>(null)
  // Whichever name (English or Japanese) the typed answer matched
  const [spelled, setSpelled] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const revealed = mode === 'intro' || picked !== null || result !== null
  const flavor = useFlavorText(pokemon.id, revealed)

  useEffect(() => {
    setPicked(null)
    setTyped('')
    setHints(0)
    setWrongTries(0)
    setResult(null)
    if (mode === 'type') setTimeout(() => inputRef.current?.focus(), 50)
  }, [pokemon.id, mode])

  const grade: Grade =
    mode === 'choose'
      ? picked === pokemon.id ? 'good' : 'again'
      : result === 'gaveup' || result === 'wrong' ? 'again' : hints >= 2 ? 'hard' : 'good'

  const submitTyped = (e: FormEvent) => {
    e.preventDefault()
    if (result) {
      onDone(grade)
      return
    }
    const { match, spelled } = matchPokemonName(typed, pokemon)
    if (match !== 'wrong') {
      setResult(match)
      setSpelled(spelled)
      return
    }
    const tries = wrongTries + 1
    setWrongTries(tries)
    setShake(true)
    setTimeout(() => setShake(false), 400)
    if (tries >= MAX_WRONG_TYPED) setResult('wrong')
  }

  // Enter moves on once an answer is revealed in intro / choose modes
  useEffect(() => {
    if (mode === 'type') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      // A focused button already turns Enter into its own click
      if ((e.target as HTMLElement).closest('button, input')) return
      if (mode === 'intro') onDone('good')
      else if (picked !== null) onDone(grade)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, picked, grade, onDone])

  const kicker = mode === 'intro' ? 'New Pokemon' : mode === 'choose' ? 'Pick the name' : 'Type the name'

  return (
    <div className="card max-w-xl mx-auto w-full items-center" style={{ gap: 'var(--space-6)' }}>
      <div className="flex justify-between items-center w-full">
        <span className="card-kicker">{kicker}</span>
        <button
          type="button"
          onClick={() => playCry(pokemon.id)}
          className="btn btn-ghost"
          aria-label="Play cry"
          title="Play cry"
        >
          <SpeakerHigh size={18} />
        </button>
      </div>

      <div className="w-44 h-44 sm:w-52 sm:h-52 relative lighten">
        <PokemonArt id={pokemon.id} alt={revealed ? name : 'Mystery Pokemon'} className="w-full h-full" />
      </div>

      {mode === 'intro' && (
        <>
          <NameReveal pokemon={pokemon} flavor={flavor} />
          <Button block onClick={() => onDone('good')}>Got it</Button>
        </>
      )}

      {mode === 'choose' && (
        <>
          <div className="grid grid-cols-2 gap-3 w-full">
            {options.map(opt => {
              let cls = 'nx-quizopt'
              if (picked !== null) {
                if (opt.id === pokemon.id) cls += ' correct'
                else if (opt.id === picked) cls += ' wrong'
                else cls += ' disabled'
              }
              return (
                <button key={opt.id} className={cls} disabled={picked !== null} onClick={() => setPicked(opt.id)}>
                  {formatPokemonName(opt.species_name)}
                  {japaneseName(opt) && (
                    <span className="block text-[11px] font-normal" style={{ color: 'var(--text-muted)' }}>
                      {japaneseName(opt)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <>
              <p className="text-sm font-semibold" style={{ color: grade === 'good' ? 'var(--success-gradient)' : 'var(--error-gradient)' }}>
                {grade === 'good' ? 'Correct!' : `It's ${bothNames(pokemon)}.`}
              </p>
              <NameReveal pokemon={pokemon} flavor={flavor} />
              <Button block onClick={() => onDone(grade)}>Next</Button>
            </>
          )}
        </>
      )}

      {mode === 'type' && (
        <form onSubmit={submitTyped} className="flex flex-col items-center gap-3 w-full">
          {!result && hints > 0 && (
            <div className="text-xl tracking-wider font-mono" style={{ color: 'var(--color-accent-400)' }}>
              {hintMask(name, hints)}
            </div>
          )}
          {!result && hints >= 3 && (
            <div className="flex gap-2">
              {pokemon.types.map(t => <TypePill key={t} type={t as PokemonTypeName} />)}
            </div>
          )}

          {!result ? (
            <>
              <input
                ref={inputRef}
                value={typed}
                onChange={e => setTyped(e.target.value)}
                placeholder="English or Japanese name"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className={`input w-full text-center text-lg ${shake ? 'learn-shake' : ''}`}
                style={wrongTries > 0 ? { borderColor: 'var(--error-gradient)' } : undefined}
              />
              {wrongTries > 0 && (
                <p className="text-xs" style={{ color: 'var(--error-gradient)' }}>
                  Not quite — {MAX_WRONG_TYPED - wrongTries} {MAX_WRONG_TYPED - wrongTries === 1 ? 'try' : 'tries'} left
                </p>
              )}
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setHints(h => Math.min(3, h + 1))
                    inputRef.current?.focus()
                  }}
                  disabled={hints >= 3}
                >
                  <Lightbulb size={16} /> Hint
                </Button>
                <Button type="button" variant="ghost" onClick={() => setResult('gaveup')}>
                  Show me
                </Button>
                <Button type="submit">Check</Button>
              </div>
            </>
          ) : (
            <>
              <p
                className="text-sm font-semibold text-center"
                style={{ color: result === 'exact' || result === 'close' ? 'var(--success-gradient)' : 'var(--error-gradient)' }}
              >
                {result === 'exact' && (hints >= 2 ? 'Correct — with help. It will come back sooner.' : 'Correct!')}
                {result === 'close' && `Close enough! Spelled: ${spelled}`}
                {(result === 'wrong' || result === 'gaveup') && "Let's try this one again soon."}
              </p>
              <NameReveal pokemon={pokemon} flavor={flavor} />
              <Button type="submit" block autoFocus>Next</Button>
            </>
          )}
        </form>
      )}
    </div>
  )
}
