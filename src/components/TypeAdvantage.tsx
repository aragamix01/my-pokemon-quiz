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
import { MULTIPLIER_BADGES } from '@/components/PokemonTypeEffectiveness'
import { getTypeCardColor } from '@/lib/type-card-colors'
import { cn } from '@/lib/cn'
import { X } from '@phosphor-icons/react'
import { getTypeForms, formDisplayName } from '@/lib/pokemon-forms'

// Order used in the games' type lists. Stellar is left out: it is a Terastal-only
// attack type, not a type a Pokemon has, so it only confused the chart.
const TYPE_ORDER: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
]

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

type Mode = 'weakTo' | 'strongAgainst' | 'resists' | 'immuneTo'

const MODES: Array<{ id: Mode; label: string; subtitle: string; empty: string }> = [
  { id: 'weakTo', label: 'Weak to', subtitle: 'Attacks that do ×2 damage to each type', empty: 'No weaknesses' },
  { id: 'strongAgainst', label: 'Strong against', subtitle: 'Types each attack type does ×2 damage to', empty: 'Not super effective against any type' },
  { id: 'resists', label: 'Resists', subtitle: 'Attacks that do only ×½ damage to each type', empty: 'No resistances' },
  { id: 'immuneTo', label: 'Immune to', subtitle: 'Attacks that do no damage (×0) to each type', empty: 'No immunities' },
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

const EFFECT_WORDS: Record<number, string> = { 2: 'super effective, ×2', 0.5: 'not very effective, ×½', 0: 'no effect, ×0', 1: 'normal damage, ×1' }

// How many matching Pokemon to show before "Show all"
const POKEMON_PREVIEW = 40

/** A Pokemon or one of its alternate forms (Zacian Crowned, Alolan Raichu...) */
interface TypedEntry {
  key: string
  artId: number
  speciesId: number
  name: string
  title: string
  types: string[]
  href: string
}

/** Small picture + name chip that opens the Pokemon's page (on the form, for alternate forms) */
function PokemonChip({ entry, highlight }: { entry: TypedEntry; highlight?: boolean }) {
  return (
    <Link
      href={entry.href}
      className="inline-flex items-center gap-1.5 rounded-full pr-3 max-w-full"
      style={{
        background: 'var(--color-surface-2)',
        boxShadow: highlight ? '0 0 0 2px var(--color-accent)' : undefined,
      }}
      title={entry.title}
    >
      <TypePanel type={entry.types[0]} watermark={false} className="w-8 h-8 rounded-full p-0.5 flex-shrink-0">
        <PokemonArt id={entry.artId} alt="" lazy className="w-full h-full" />
      </TypePanel>
      <span className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>{entry.name}</span>
    </Link>
  )
}

/** Type chip with its color dot, used to pick types */
function TypeChip({ type, on, onClick }: { type: PokemonTypeName; on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={cn('nx-tab sm justify-start px-2 capitalize', on && 'nx-tab-active')}>
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: getTypeCardColor(type) }} />
      {type}
    </button>
  )
}

interface CheckerState {
  types: PokemonTypeName[]
  pokemon: PokemonMetadata | null
  toggleType: (type: PokemonTypeName) => void
  pickPokemon: (p: PokemonMetadata) => void
  clear: () => void
}

/** Pick one or two types (or a Pokemon) and see how much damage every attack type does, and which Pokemon have those types */
function MatchupChecker({ types, pokemon, toggleType, pickPokemon, clear }: CheckerState) {
  const allPokemon = useMemo(() => pokemonMetadataService.getAllMetadata(), [])
  // Every Pokemon plus its alternate forms, each with its own types
  const entries = useMemo(() => {
    const byId: Record<number, PokemonMetadata> = {}
    allPokemon.forEach(p => { byId[p.id] = p })
    const list: TypedEntry[] = allPokemon.map(p => ({
      key: String(p.id),
      artId: p.id,
      speciesId: p.id,
      name: formatPokemonName(p.species_name),
      title: bothNames(p),
      types: p.types,
      href: `/pokemon/${p.id}`,
    }))
    getTypeForms(byId).forEach(form => {
      const name = formDisplayName(form, byId[form.speciesId])
      list.push({
        key: `form-${form.id}`,
        artId: form.id,
        speciesId: form.speciesId,
        name,
        title: name,
        types: form.types,
        href: `/pokemon/${form.speciesId}?form=${form.id}`,
      })
    })
    return list
  }, [allPokemon])
  const [showAll, setShowAll] = useState(false)

  const groups = MULTIPLIER_BADGES.map(g => ({
    ...g,
    attackers: types.length ? TYPE_ORDER.filter(a => calculateDualTypeMultiplier(a, types) === g.multiplier) : [],
  })).filter(g => g.attackers.length > 0)

  // One type: every Pokemon and form that has it (single-type ones first). Two types: those with both.
  // Forms sit right after their base Pokemon's national number
  const matching = useMemo(() => {
    if (types.length === 0) return []
    const has = (e: TypedEntry) => types.every(t => e.types.indexOf(t) !== -1)
    const list = entries.filter(has).sort((a, b) => a.speciesId - b.speciesId || a.artId - b.artId)
    return types.length === 1
      ? list.filter(e => e.types.length === 1).concat(list.filter(e => e.types.length > 1))
      : list
  }, [types, entries])
  const shown = showAll ? matching : matching.slice(0, POKEMON_PREVIEW)

  return (
    <div className="card" style={{ gap: 16 }}>
      <div>
        <h2 className="nx-section-title">Matchup checker</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Pick one or two types, or search a Pokémon.
        </p>
      </div>

      <PokemonPicker pool={allPokemon} onPick={p => { setShowAll(false); pickPokemon(p) }} placeholder="Search a Pokémon (English or Japanese)" />

      <div className="grid grid-cols-3 gap-1.5">
        {TYPE_ORDER.map(type => (
          <TypeChip key={type} type={type} on={types.indexOf(type) !== -1} onClick={() => { setShowAll(false); toggleType(type) }} />
        ))}
      </div>

      {types.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Pick a type above, or click a column in the chart, to see what it is weak to.
        </p>
      ) : (
        <>
          <div className="hr" style={{ margin: 0 }} />
          {/* Selected */}
          <div className="flex items-center gap-3">
            {pokemon && (
              <TypePanel type={pokemon.types[0]} watermark={false} className="w-12 h-12 rounded-full p-1 flex-shrink-0">
                <PokemonArt id={pokemon.id} alt={bothNames(pokemon)} className="w-full h-full" />
              </TypePanel>
            )}
            <div className="flex-1 min-w-0">
              <div className="nx-label">Defending as</div>
              <div className="font-display text-2xl font-bold leading-tight">
                {pokemon ? bothNames(pokemon) : types.map(cap).join(' / ')}
              </div>
            </div>
            <button type="button" className="btn btn-secondary flex-shrink-0" onClick={() => { setShowAll(false); clear() }} aria-label="Clear">
              <X size={14} weight="bold" /> Clear
            </button>
          </div>

          {/* Damage taken */}
          <div className="flex flex-col gap-3">
            {groups.map(g => (
              <div key={g.label} className="flex items-start gap-3">
                <span className={g.className}>{g.label}</span>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{g.title} · {g.attackers.length}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {g.attackers.map(a => <TypePill key={a} type={a} />)}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Every other attack type does normal damage (×1).</p>
          </div>

          {/* Attacking with the picked types */}
          <div className="flex flex-col gap-2">
            <div className="nx-label">Attacking</div>
            {types.map(t => {
              const targets = TYPE_ORDER.filter(d => hit(t, d) === 2)
              return (
                <div key={t} className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold">{cap(t)} moves hit ×2 on</span>
                  <div className="flex flex-wrap gap-1.5">
                    {targets.length === 0
                      ? <span className="text-sm" style={{ color: 'var(--text-muted)' }}>nothing</span>
                      : targets.map(d => <TypePill key={d} type={d} />)}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pokemon with these types */}
          <div className="flex flex-col gap-2">
            <div className="nx-label">
              {types.length === 1 ? 'Pokémon with this type' : 'Pokémon with both types'} · {matching.length}
            </div>
            {matching.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No Pokémon has this type combination.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {shown.map(e => <PokemonChip key={e.key} entry={e} highlight={pokemon?.id === e.artId} />)}
                </div>
                {matching.length > POKEMON_PREVIEW && (
                  <button type="button" className="btn btn-secondary self-start" onClick={() => setShowAll(!showAll)}>
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

/** The classic 18 × 18 chart: attacking type down the side, defending type across the top */
function TypeMatrix({ picked, onPickDefender }: { picked: PokemonTypeName[]; onPickDefender: (type: PokemonTypeName) => void }) {
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null)
  const readout = hover
    ? `${cap(TYPE_ORDER[hover.row])} attacking ${cap(TYPE_ORDER[hover.col])}: ${EFFECT_WORDS[hit(TYPE_ORDER[hover.row], TYPE_ORDER[hover.col])]}`
    : 'Hover or tap a cell to read it. Click a column to check that type.'

  return (
    <div className="card" style={{ gap: 12 }}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
        <span className="inline-flex items-center gap-1.5"><span className="nx-cell x2 static">2</span>Super effective</span>
        <span className="inline-flex items-center gap-1.5"><span className="nx-cell x05 static">½</span>Not very effective</span>
        <span className="inline-flex items-center gap-1.5"><span className="nx-cell x0 static">0</span>No effect</span>
      </div>
      <div className="nx-scroll-x pb-1" onPointerLeave={() => setHover(null)}>
        <table className="nx-matrix" aria-label="Type effectiveness chart">
          <thead>
            <tr>
              <th scope="col" className="corner">
                <span>ATK ↓</span><span>DEF →</span>
              </th>
              {TYPE_ORDER.map((d, ci) => (
                <th key={d} scope="col">
                  <button
                    type="button"
                    className={cn('colh', (hover?.col === ci || picked.indexOf(d) !== -1) && 'on')}
                    style={{ background: getTypeCardColor(d) }}
                    onClick={() => onPickDefender(d)}
                    title={`Check ${cap(d)}`}
                    aria-label={`Check ${cap(d)} as the defending type`}
                  >
                    {d.slice(0, 3).toUpperCase()}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TYPE_ORDER.map((a, ri) => (
              <tr key={a}>
                <th scope="row">
                  <span className={cn('rowh', hover?.row === ri && 'on')} style={{ background: getTypeCardColor(a) }}>{cap(a)}</span>
                </th>
                {TYPE_ORDER.map((d, ci) => {
                  const m = hit(a, d)
                  const lit = !hover || hover.row === ri || hover.col === ci
                  return (
                    <td key={d}>
                      <button
                        type="button"
                        className={cn('nx-cell', m === 2 && 'x2', m === 0.5 && 'x05', m === 0 && 'x0', hover?.row === ri && hover?.col === ci && 'here')}
                        style={{ opacity: lit ? 1 : 0.4 }}
                        onPointerEnter={() => setHover({ row: ri, col: ci })}
                        onFocus={() => setHover({ row: ri, col: ci })}
                        onClick={() => onPickDefender(d)}
                        aria-label={`${cap(a)} against ${cap(d)}: ${EFFECT_WORDS[m]}`}
                      >
                        {m === 2 ? '2' : m === 0.5 ? '½' : m === 0 ? '0' : ''}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm font-semibold min-h-[22px]" aria-live="polite">{readout}</p>
    </div>
  )
}

/** Every type with the types it is weak to / strong against / resists / is immune to */
function TypeLists() {
  const [mode, setMode] = useState<Mode>('weakTo')
  const info = MODES.find(m => m.id === mode)!
  return (
    <div className="card" style={{ gap: 12 }}>
      <div className="flex flex-wrap gap-1.5">
        {MODES.map(m => (
          <button key={m.id} type="button" className={cn('nx-tab sm', mode === m.id && 'nx-tab-active')} onClick={() => setMode(m.id)} aria-pressed={mode === m.id}>
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{info.subtitle}</p>
      <div>
        {TYPE_ORDER.map(type => {
          const list = listFor(mode, type)
          return (
            <div key={type} className="flex items-center gap-4 py-2.5" style={{ borderTop: '1px solid var(--color-divider)' }}>
              <div className="w-[100px] flex-shrink-0"><TypePill type={type} /></div>
              <div className="flex flex-wrap gap-1.5 min-w-0">
                {list.length === 0
                  ? <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{info.empty}</span>
                  : list.map(t => <TypePill key={t} type={t} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type View = 'checker' | 'chart' | 'lists'

export default function TypeAdvantage() {
  // Phones open on the checker (the full chart is wide); desktop always shows the checker beside the chart
  const [view, setView] = useState<View>('checker')
  const [types, setTypes] = useState<PokemonTypeName[]>([])
  const [pokemon, setPokemon] = useState<PokemonMetadata | null>(null)

  const toggleType = (type: PokemonTypeName) => {
    setPokemon(null)
    if (types.indexOf(type) !== -1) setTypes(types.filter(t => t !== type))
    // A third pick replaces the older one, since a Pokemon has at most two types
    else setTypes(types.length < 2 ? types.concat(type) : [types[1], type])
  }
  const checker: CheckerState = {
    types,
    pokemon,
    toggleType,
    pickPokemon: p => { setPokemon(p); setTypes(p.types as PokemonTypeName[]) },
    clear: () => { setPokemon(null); setTypes([]) },
  }
  // From the chart: check that defending type on its own
  const pickDefender = (type: PokemonTypeName) => {
    setPokemon(null)
    setTypes([type])
    if (typeof window !== 'undefined' && window.innerWidth < 1024) setView('checker')
  }

  const chartOn = view === 'chart' || view === 'checker'
  return (
    <div className="flex flex-col gap-4">
      <div className="nx-seg self-start" role="group" aria-label="View">
        <button type="button" className={cn('lg:!hidden', view === 'checker' && 'on')} onClick={() => setView('checker')} aria-pressed={view === 'checker'}>Checker</button>
        <button type="button" className={cn('!hidden lg:!inline-flex', chartOn && 'on')} onClick={() => setView('chart')} aria-pressed={chartOn}>Full chart</button>
        <button type="button" className={cn('lg:!hidden', view === 'chart' && 'on')} onClick={() => setView('chart')} aria-pressed={view === 'chart'}>Full chart</button>
        <button type="button" className={cn(view === 'lists' && 'on')} onClick={() => setView('lists')} aria-pressed={view === 'lists'}>By type</button>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 lg:items-start">
        <div className="min-w-0">
          {view === 'checker' && <div className="lg:hidden"><MatchupChecker {...checker} /></div>}
          {chartOn && (
            <div className={cn(view === 'checker' && 'hidden lg:block')}>
              <TypeMatrix picked={types} onPickDefender={pickDefender} />
            </div>
          )}
          {view === 'lists' && <TypeLists />}
        </div>
        <aside className="hidden lg:block lg:sticky lg:top-4">
          <MatchupChecker {...checker} />
        </aside>
      </div>
    </div>
  )
}
