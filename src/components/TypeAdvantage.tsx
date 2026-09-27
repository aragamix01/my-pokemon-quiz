'use client'

import { useState, useMemo } from 'react'
import { EFFECTIVENESS_MATRIX, PokemonTypeName, calculateDualTypeMultiplier } from '@/lib/type-effectiveness'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { bothNames, formatPokemonName } from '@/lib/pokemon-names'
import Link from 'next/link'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { TypePill } from '@/components/ui/TypePill'
import PokemonPicker from '@/components/PokemonPicker'
import PokemonArt from '@/components/learn/PokemonArt'
import { TypePanel } from '@/components/ui/TypePanel'
import { cn } from '@/lib/cn'
import { X } from '@phosphor-icons/react'

// Order used in the games' type lists. Stellar is left out: it is a Terastal-only
// attack type, not a type a Pokemon has, so it only confused the chart.
const TYPE_ORDER: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
]

type Mode = 'weakTo' | 'strongAgainst' | 'resists' | 'immuneTo'

const MODES: Array<{ id: Mode; label: string; title: string; subtitle: string; empty: string }> = [
  { id: 'weakTo', label: 'Weak to', title: 'Type Weaknesses', subtitle: 'Attacks that do ×2 damage to each type', empty: 'No weaknesses' },
  { id: 'strongAgainst', label: 'Strong against', title: 'Type Advantages', subtitle: 'Types each attack type does ×2 damage to', empty: 'Not super effective against any type' },
  { id: 'resists', label: 'Resists', title: 'Type Resistances', subtitle: 'Attacks that do only ×½ damage to each type', empty: 'No resistances' },
  { id: 'immuneTo', label: 'Immune to', title: 'Type Immunities', subtitle: 'Attacks that do no damage (×0) to each type', empty: 'No immunities' },
]

// multiplier of `attack` hitting `defend`
const hit = (attack: PokemonTypeName, defend: PokemonTypeName) => EFFECTIVENESS_MATRIX[attack][defend]

function listFor(mode: Mode, type: PokemonTypeName): PokemonTypeName[] {
  switch (mode) {
    case 'weakTo': return TYPE_ORDER.filter(a => hit(a, type) === 2)
    case 'strongAgainst': return TYPE_ORDER.filter(d => hit(type, d) === 2)
    case 'resists': return TYPE_ORDER.filter(a => hit(a, type) === 0.5)
    case 'immuneTo': return TYPE_ORDER.filter(a => hit(a, type) === 0)
  }
}

const GROUPS: Array<{ multiplier: number; label: string; note: string }> = [
  { multiplier: 4, label: '×4', note: 'Very weak' },
  { multiplier: 2, label: '×2', note: 'Weak' },
  { multiplier: 0.5, label: '×½', note: 'Resists' },
  { multiplier: 0.25, label: '×¼', note: 'Strongly resists' },
  { multiplier: 0, label: '×0', note: 'Immune' },
]

// How many matching Pokemon to show before "Show all"
const POKEMON_PREVIEW = 40

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] uppercase tracking-wide mb-2" style={{ color: 'var(--color-neutral-400)' }}>
      {children}
    </h4>
  )
}

/** Small picture + name chip that opens the Pokemon's page */
function PokemonChip({ pokemon, highlight }: { pokemon: PokemonMetadata; highlight?: boolean }) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="inline-flex items-center gap-1.5 rounded-full pr-3 max-w-full"
      style={{
        background: 'var(--color-bg)',
        border: `1px solid ${highlight ? 'var(--color-accent)' : 'var(--color-neutral-800)'}`,
      }}
      title={bothNames(pokemon)}
    >
      <TypePanel type={pokemon.types[0]} watermark={false} className="w-8 h-8 rounded-full p-0.5 flex-shrink-0">
        <PokemonArt id={pokemon.id} alt="" lazy className="w-full h-full" />
      </TypePanel>
      <span className="text-xs truncate" style={{ color: 'var(--color-text)' }}>{formatPokemonName(pokemon.species_name)}</span>
    </Link>
  )
}

/** Pick one or two types (or a Pokemon) and see how much damage every attack type does, and which Pokemon have those types */
function MatchupChecker() {
  const allPokemon = useMemo(() => pokemonMetadataService.getAllMetadata(), [])
  const [types, setTypes] = useState<PokemonTypeName[]>([])
  const [pokemon, setPokemon] = useState<PokemonMetadata | null>(null)
  const [showAll, setShowAll] = useState(false)

  const toggleType = (type: PokemonTypeName) => {
    setPokemon(null)
    setShowAll(false)
    if (types.indexOf(type) !== -1) setTypes(types.filter(t => t !== type))
    // A third pick replaces the older one, since a Pokemon has at most two types
    else setTypes(types.length < 2 ? types.concat(type) : [types[1], type])
  }

  const pickPokemon = (p: PokemonMetadata) => {
    setPokemon(p)
    setShowAll(false)
    setTypes(p.types as PokemonTypeName[])
  }

  const clear = () => {
    setPokemon(null)
    setShowAll(false)
    setTypes([])
  }

  const groups = GROUPS.map(g => ({
    ...g,
    attackers: types.length ? TYPE_ORDER.filter(a => calculateDualTypeMultiplier(a, types) === g.multiplier) : [],
  }))

  // One type: every Pokemon that has it (single-type ones first). Two types: Pokemon with both
  const matching = useMemo(() => {
    if (types.length === 0) return []
    const has = (p: PokemonMetadata) => types.every(t => p.types.indexOf(t) !== -1)
    const list = allPokemon.filter(has)
    return types.length === 1
      ? list.filter(p => p.types.length === 1).concat(list.filter(p => p.types.length > 1))
      : list
  }, [types, allPokemon])
  const shown = showAll ? matching : matching.slice(0, POKEMON_PREVIEW)

  return (
    <div className="card mb-4" style={{ gap: 'var(--space-4)' }}>
      <div>
        <h3 className="card-title">Matchup checker</h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Pick one or two types, or search a Pokemon, to see how much damage each attack does to it.
        </p>
      </div>

      <PokemonPicker pool={allPokemon} onPick={pickPokemon} placeholder="Search a Pokemon (English or Japanese)" />

      <div className="flex flex-wrap gap-2">
        {TYPE_ORDER.map(type => (
          <TypePill key={type} type={type} selected={types.indexOf(type) !== -1} onClick={() => toggleType(type)} />
        ))}
      </div>

      {types.length > 0 && (
        <>
          {/* Selected */}
          <div className="rounded-md p-3" style={{ background: 'var(--color-bg)' }}>
            <SectionTitle>Selected</SectionTitle>
            <div className="flex items-center gap-3">
              {pokemon && (
                <TypePanel type={pokemon.types[0]} watermark={false} className="w-12 h-12 rounded-full p-1 flex-shrink-0">
                  <PokemonArt id={pokemon.id} alt={bothNames(pokemon)} className="w-full h-full" />
                </TypePanel>
              )}
              <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                {pokemon && <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{bothNames(pokemon)}</span>}
                {types.map(t => <TypePill key={t} type={t} />)}
              </div>
              <button type="button" className="btn btn-ghost flex-shrink-0" onClick={clear} aria-label="Clear">
                <X size={16} /> Clear
              </button>
            </div>
          </div>

          {/* Damage taken */}
          <div>
            <SectionTitle>Damage taken from each attack type</SectionTitle>
            {groups.map(g => (
              <div
                key={g.label}
                className="flex items-center gap-4 py-2"
                style={{ borderTop: '1px solid var(--color-neutral-800)' }}
              >
                <div className="w-[88px] flex-shrink-0 text-center">
                  <div className="text-lg font-bold" style={{ color: g.multiplier >= 2 ? 'var(--error-gradient)' : g.multiplier === 0 ? 'var(--color-accent)' : 'var(--success-gradient)' }}>
                    {g.label}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{g.note}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.attackers.length === 0
                    ? <span className="text-sm" style={{ color: 'var(--text-muted)' }}>—</span>
                    : g.attackers.map(a => <TypePill key={a} type={a} />)}
                </div>
              </div>
            ))}
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>All other attack types do normal damage (×1).</p>
          </div>

          {/* Pokemon with these types */}
          <div>
            <SectionTitle>
              {types.length === 1 ? 'Pokemon with this type' : 'Pokemon with both types'} ({matching.length})
            </SectionTitle>
            {matching.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No Pokemon has this type combination.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {shown.map(p => <PokemonChip key={p.id} pokemon={p} highlight={pokemon?.id === p.id} />)}
                </div>
                {matching.length > POKEMON_PREVIEW && (
                  <button type="button" className="btn btn-ghost mt-2" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show fewer' : `Show all ${matching.length}`}
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function TypeAdvantage() {
  const [mode, setMode] = useState<Mode>('weakTo')
  const info = MODES.find(m => m.id === mode)!

  return (
    <>
      <MatchupChecker />

      <div className="card">
        <div className="text-center mb-4">
          <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}>
            {info.title}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{info.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {MODES.map(m => (
            <button key={m.id} className={cn('nx-tab', mode === m.id && 'nx-tab-active')} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        <div>
          {TYPE_ORDER.map(type => {
            const list = listFor(mode, type)
            return (
              <div
                key={type}
                className="flex items-center gap-5 py-3"
                style={{ borderBottom: '1px solid var(--color-neutral-800)' }}
              >
                <div className="w-[110px] flex-shrink-0 flex justify-center">
                  <TypePill type={type} />
                </div>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {list.length === 0 ? (
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{info.empty}</span>
                  ) : (
                    list.map(t => <TypePill key={t} type={t} />)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
