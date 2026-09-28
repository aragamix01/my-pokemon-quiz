'use client'

import { ReactNode } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { POKEMON_TYPES, POKEMON_HABITATS, POKEMON_COLORS, FormKind } from '@/lib/pokemon-metadata'
import { EvolutionStage } from '@/lib/evolution-chains'
import { LearnFilter } from '@/hooks/usePokemonFilter'
import { GenerationNumber } from '@/types/pokemon'
import { getTypeCardColor } from '@/lib/type-card-colors'
import PokedexSelect from './PokedexSelect'
import { cn } from '@/lib/cn'

export const REGION_NAMES = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea']
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

const EVOLUTION_OPTIONS: Array<{ value: EvolutionStage; label: string }> = [
  { value: 'first', label: 'First form' },
  { value: 'middle', label: 'Middle' },
  { value: 'final', label: 'Fully evolved' },
  { value: 'none', label: 'Single' },
]

const FORM_OPTIONS: Array<{ value: FormKind; label: string }> = [
  { value: 'mega', label: 'Mega' },
  { value: 'regional', label: 'Regional' },
  { value: 'gmax', label: 'Gigantamax' },
]

const LEARN_OPTIONS: Array<{ value: LearnFilter; label: string }> = [
  { value: 'new', label: 'Not met' },
  { value: 'learning', label: '● Learning' },
  { value: 'mastered', label: '★ Mastered' },
]

const COLOR_SWATCH: Record<string, string> = {
  black: '#374151', blue: '#3b82f6', brown: '#92400e', gray: '#6b7280',
  green: '#10b981', pink: '#ec4899', purple: '#8b5cf6', red: '#ef4444',
  white: '#f3f4f6', yellow: '#f59e0b'
}

export interface PokedexFilterPanelProps {
  generation: GenerationNumber | null
  onGenerationChange: (gen: GenerationNumber | null) => void
  regionalDex: string | null
  onDexChange: (name: string) => void
  selectedTypes: string[]
  onTypesChange: (types: string[]) => void
  showLegendary: boolean | null
  onLegendaryChange: (show: boolean | null) => void
  showMythical: boolean | null
  onMythicalChange: (show: boolean | null) => void
  selectedHabitat: string | null
  onHabitatChange: (habitat: string | null) => void
  selectedColor: string | null
  onColorChange: (color: string | null) => void
  statsRange: { min: number; max: number }
  onStatsRangeChange: (range: { min: number; max: number }) => void
  evolutionStage: EvolutionStage | null
  onEvolutionStageChange: (stage: EvolutionStage | null) => void
  formKind: FormKind | null
  onFormKindChange: (kind: FormKind | null) => void
  learnFilter: LearnFilter | null
  onLearnFilterChange: (filter: LearnFilter | null) => void
  onResetFilters: () => void
  hasActiveFilters: boolean
}

function Section({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h3 className="nx-label">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  )
}

/** Toggle chips where picking the chosen one again clears it */
function Chips<T extends string>({ options, value, onChange }: {
  options: Array<{ value: T; label: string }>
  value: T | null
  onChange: (value: T | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(value === opt.value ? null : opt.value)}
          className={cn('nx-tab sm', value === opt.value && 'nx-tab-active')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/** Every Pokedex filter in one column: the desktop sidebar and the phone filter sheet */
export default function PokedexFilterPanel(props: PokedexFilterPanelProps) {
  const {
    generation, onGenerationChange, regionalDex, onDexChange,
    selectedTypes, onTypesChange, showLegendary, onLegendaryChange, showMythical, onMythicalChange,
    selectedHabitat, onHabitatChange, selectedColor, onColorChange, statsRange, onStatsRangeChange,
    evolutionStage, onEvolutionStageChange, formKind, onFormKindChange, learnFilter, onLearnFilterChange,
    onResetFilters, hasActiveFilters,
  } = props

  const toggleType = (type: string) =>
    onTypesChange(selectedTypes.includes(type) ? selectedTypes.filter(t => t !== type) : [...selectedTypes, type])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
          className="text-sm font-bold px-1 min-h-[36px] disabled:opacity-40"
          style={{ color: 'var(--color-accent)' }}
        >
          Reset
        </button>
      </div>

      <Section title="Generation">
        <div className="grid grid-cols-5 gap-1.5">
          <button
            type="button"
            onClick={() => onGenerationChange(null)}
            aria-pressed={!regionalDex && generation === null}
            className={cn('nx-tab sm justify-center px-0', !regionalDex && generation === null && 'nx-tab-active')}
          >
            All
          </button>
          {ROMAN.map((label, i) => {
            const gen = (i + 1) as GenerationNumber
            const on = !regionalDex && generation === gen
            return (
              <button
                key={label}
                type="button"
                title={`Generation ${gen} · ${REGION_NAMES[i]}`}
                onClick={() => onGenerationChange(gen)}
                aria-pressed={on}
                className={cn('nx-tab sm justify-center px-0', on && 'nx-tab-active')}
              >
                {label}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Game Pokédex">
        <PokedexSelect value={regionalDex ?? ''} onChange={onDexChange} />
      </Section>

      <Section
        title="Type"
        aside={selectedTypes.length > 0 && (
          <button type="button" className="text-xs font-bold" style={{ color: 'var(--color-accent)' }} onClick={() => onTypesChange([])}>
            Clear {selectedTypes.length}
          </button>
        )}
      >
        <div className="grid grid-cols-3 gap-1.5">
          {POKEMON_TYPES.map(type => {
            const on = selectedTypes.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={on}
                className={cn('nx-tab sm justify-start px-2 capitalize', on && 'nx-tab-active')}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: getTypeCardColor(type) }} />
                {type}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Category">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={showLegendary === true}
            onClick={() => onLegendaryChange(showLegendary === true ? null : true)}
            className={cn('nx-tab sm', showLegendary === true && 'nx-tab-active')}
          >
            Legendary
          </button>
          <button
            type="button"
            aria-pressed={showMythical === true}
            onClick={() => onMythicalChange(showMythical === true ? null : true)}
            className={cn('nx-tab sm', showMythical === true && 'nx-tab-active')}
          >
            Mythical
          </button>
        </div>
      </Section>

      <Section title="Evolution stage">
        <Chips options={EVOLUTION_OPTIONS} value={evolutionStage} onChange={onEvolutionStageChange} />
      </Section>

      <Section title="Special forms">
        <Chips options={FORM_OPTIONS} value={formKind} onChange={onFormKindChange} />
      </Section>

      <Section title="Learning">
        <Chips options={LEARN_OPTIONS} value={learnFilter} onChange={onLearnFilterChange} />
      </Section>

      <Section title="Total stats" aside={<span className="font-number text-xs">{statsRange.min}–{statsRange.max}</span>}>
        <label className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span className="w-8">Min</span>
          <input
            type="range" min="0" max="800" step="10"
            value={statsRange.min}
            onChange={e => onStatsRangeChange({ ...statsRange, min: Math.min(parseInt(e.target.value), statsRange.max) })}
            className="nx-range flex-1"
            style={{ '--fill': `${(statsRange.min / 800) * 100}%` } as React.CSSProperties}
          />
        </label>
        <label className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span className="w-8">Max</span>
          <input
            type="range" min="0" max="800" step="10"
            value={statsRange.max}
            onChange={e => onStatsRangeChange({ ...statsRange, max: Math.max(parseInt(e.target.value), statsRange.min) })}
            className="nx-range flex-1"
            style={{ '--fill': `${(statsRange.max / 800) * 100}%` } as React.CSSProperties}
          />
        </label>
      </Section>

      <Section title="Habitat">
        <div className="relative">
          <select
            value={selectedHabitat || ''}
            onChange={e => onHabitatChange(e.target.value || null)}
            className="input w-full pr-10 appearance-none cursor-pointer"
            aria-label="Habitat"
          >
            <option value="">All habitats</option>
            {POKEMON_HABITATS.map(habitat => (
              <option key={habitat} value={habitat}>
                {habitat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
          <CaretDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" color="var(--color-neutral-400)" />
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-1.5">
          {POKEMON_COLORS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange(selectedColor === color ? null : color)}
              aria-pressed={selectedColor === color}
              className={cn('nx-tab sm capitalize', selectedColor === color && 'nx-tab-active')}
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLOR_SWATCH[color], boxShadow: '0 0 0 1px var(--color-neutral-700)' }} />
              {color}
            </button>
          ))}
        </div>
      </Section>
    </div>
  )
}
