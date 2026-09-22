'use client'

import { useState, useMemo, forwardRef, FormEvent } from 'react'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { formatPokemonName, normalizeName, japaneseName, bothNames } from '@/lib/pokemon-names'
import PokemonArt from '@/components/learn/PokemonArt'

interface PokemonPickerProps {
  pool: PokemonMetadata[]
  onPick: (pokemon: PokemonMetadata) => void
  /** Pokemon to leave out of suggestions, e.g. ones already guessed */
  excludeIds?: number[]
  placeholder?: string
  autoFocus?: boolean
}

const MAX_SUGGESTIONS = 6

/** Name search over English and Japanese names; Enter picks the top suggestion */
const PokemonPicker = forwardRef<HTMLInputElement, PokemonPickerProps>(
  ({ pool, onPick, excludeIds = [], placeholder = 'English or Japanese name', autoFocus = false }, ref) => {
    const [query, setQuery] = useState('')

    const searchIndex = useMemo(
      () => pool.map(p => {
        const ja = japaneseName(p)
        return {
          pokemon: p,
          keys: [normalizeName(formatPokemonName(p.species_name))].concat(ja ? [normalizeName(ja)] : []),
        }
      }),
      [pool]
    )

    const suggestions = useMemo(() => {
      const q = normalizeName(query)
      if (!q) return []
      const available = searchIndex.filter(s => excludeIds.indexOf(s.pokemon.id) === -1)
      // Exact name first ("mew" -> Mew, not Mewtwo), then names starting with it, then names containing it
      const exact = available.filter(s => s.keys.some(k => k === q))
      const starts = available.filter(s => !s.keys.some(k => k === q) && s.keys.some(k => k.indexOf(q) === 0))
      const contains = available.filter(s => !s.keys.some(k => k.indexOf(q) === 0) && s.keys.some(k => k.indexOf(q) > 0))
      return exact.concat(starts, contains).slice(0, MAX_SUGGESTIONS).map(s => s.pokemon)
    }, [query, searchIndex, excludeIds])

    const pick = (pokemon: PokemonMetadata) => {
      setQuery('')
      onPick(pokemon)
    }

    const onSubmit = (e: FormEvent) => {
      e.preventDefault()
      if (suggestions.length) pick(suggestions[0])
    }

    return (
      <form onSubmit={onSubmit} className="relative w-full">
        <input
          ref={ref}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="input text-center"
          autoFocus={autoFocus}
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
                  onClick={() => pick(p)}
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
    )
  }
)

PokemonPicker.displayName = 'PokemonPicker'

export default PokemonPicker
