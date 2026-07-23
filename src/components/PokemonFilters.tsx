'use client'

import { useState, useRef, useEffect } from 'react'
import { Funnel, CaretDown, Trash, Check } from '@phosphor-icons/react'
import { SortOption, SORT_OPTIONS, POKEMON_TYPES, POKEMON_HABITATS, POKEMON_COLORS } from '@/lib/pokemon-metadata'
import { PokemonTypeName } from '@/lib/type-effectiveness'
import { TypePill } from '@/components/ui/TypePill'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface PokemonFiltersProps {
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
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
  onResetFilters: () => void
  hasActiveFilters: boolean
}

const COLOR_SWATCH: Record<string, string> = {
  black: '#374151', blue: '#3b82f6', brown: '#92400e', gray: '#6b7280',
  green: '#10b981', pink: '#ec4899', purple: '#8b5cf6', red: '#ef4444',
  white: '#f3f4f6', yellow: '#f59e0b'
}

export default function PokemonFilters({
  sortOption,
  onSortChange,
  selectedTypes,
  onTypesChange,
  showLegendary,
  onLegendaryChange,
  showMythical,
  onMythicalChange,
  selectedHabitat,
  onHabitatChange,
  selectedColor,
  onColorChange,
  statsRange,
  onStatsRangeChange,
  onResetFilters,
  hasActiveFilters
}: PokemonFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter(t => t !== type))
    } else {
      onTypesChange([...selectedTypes, type])
    }
  }

  const handleLegendaryToggle = () => {
    onLegendaryChange(showLegendary === true ? null : true)
  }

  const handleMythicalToggle = () => {
    onMythicalChange(showMythical === true ? null : true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) setIsExpanded(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  return (
    <div className="mb-4" ref={filtersRef}>
      {/* Unified Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn('nx-tab justify-center w-full sm:w-auto', isExpanded && 'nx-tab-active')}
        >
          <Funnel size={16} />
          <span>Filters</span>
          <CaretDown size={14} style={{ transform: isExpanded ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s ease' }} />
        </button>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
          <select
            value={sortOption.value}
            onChange={(e) => {
              const option = SORT_OPTIONS.find(opt => opt.value === e.target.value)
              if (option) onSortChange(option)
            }}
            className="input w-full sm:min-w-[250px] pr-10 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <CaretDown size={14} color="var(--color-neutral-400)" />
          </div>
        </div>

        {hasActiveFilters && (
          <Button variant="secondary" onClick={onResetFilters} title="Clear all filters">
            <Trash size={16} />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Filter Status Pills */}
      {hasActiveFilters && (
        <div
          className="flex flex-wrap items-center gap-2 my-4 p-3 rounded-md"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-neutral-800)' }}
        >
          <span className="text-xs font-medium" style={{ color: 'var(--color-accent-300)' }}>Active filters:</span>

          {selectedTypes.length > 0 && (
            <span className="tag tag-outline">{selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''}</span>
          )}
          {showLegendary && <span className="tag tag-accent">Legendary</span>}
          {showMythical && <span className="tag tag-accent">Mythical</span>}
          {selectedHabitat && <span className="tag tag-neutral">{selectedHabitat.replace('-', ' ')}</span>}
          {selectedColor && <span className="tag tag-neutral">{selectedColor}</span>}
          {(statsRange.min > 0 || statsRange.max < 800) && (
            <span className="tag tag-neutral">Stats {statsRange.min}-{statsRange.max}</span>
          )}
        </div>
      )}

      {/* Expandable Filters */}
      {isExpanded && (
        <div className="card">
          <div className="space-y-6">
            {/* Type Filters Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>Types</h4>
                <span className="tag tag-neutral">{selectedTypes.length} selected</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {POKEMON_TYPES.map(type => (
                  <TypePill
                    key={type}
                    type={type as PokemonTypeName}
                    selected={selectedTypes.includes(type)}
                    onClick={() => handleTypeToggle(type)}
                  />
                ))}
              </div>
            </div>

            {/* Special Categories */}
            <div className="flex gap-6 flex-wrap">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: 'var(--color-neutral-200)' }}>
                <span
                  className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ border: `1.5px solid ${showLegendary === true ? 'var(--color-accent)' : 'var(--color-neutral-600)'}`, background: showLegendary === true ? 'var(--color-accent)' : 'transparent' }}
                >
                  {showLegendary === true && <Check size={11} color="var(--color-bg)" weight="bold" />}
                </span>
                <input type="checkbox" checked={showLegendary === true} onChange={handleLegendaryToggle} className="sr-only" />
                Legendary
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: 'var(--color-neutral-200)' }}>
                <span
                  className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ border: `1.5px solid ${showMythical === true ? 'var(--color-accent)' : 'var(--color-neutral-600)'}`, background: showMythical === true ? 'var(--color-accent)' : 'transparent' }}
                >
                  {showMythical === true && <Check size={11} color="var(--color-bg)" weight="bold" />}
                </span>
                <input type="checkbox" checked={showMythical === true} onChange={handleMythicalToggle} className="sr-only" />
                Mythical
              </label>
            </div>

            <div className="hr" />

            {/* Stats Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>Total Stats Range</h4>
                <span className="tag tag-neutral">{statsRange.min} - {statsRange.max}</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>Minimum</label>
                  <input
                    type="range" min="0" max="800" step="10"
                    value={statsRange.min}
                    onChange={(e) => onStatsRangeChange({ ...statsRange, min: parseInt(e.target.value) })}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${(statsRange.min / 800) * 100}%, var(--color-neutral-800) ${(statsRange.min / 800) * 100}%, var(--color-neutral-800) 100%)` }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>Maximum</label>
                  <input
                    type="range" min="0" max="800" step="10"
                    value={statsRange.max}
                    onChange={(e) => onStatsRangeChange({ ...statsRange, max: parseInt(e.target.value) })}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${(statsRange.max / 800) * 100}%, var(--color-neutral-800) ${(statsRange.max / 800) * 100}%, var(--color-neutral-800) 100%)` }}
                  />
                </div>
              </div>
            </div>

            <div className="hr" />

            {/* Habitat */}
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>Habitat</h4>
              <div className="relative">
                <select
                  value={selectedHabitat || ''}
                  onChange={(e) => onHabitatChange(e.target.value || null)}
                  className="input w-full appearance-none cursor-pointer"
                >
                  <option value="">All Habitats</option>
                  {POKEMON_HABITATS.map(habitat => (
                    <option key={habitat} value={habitat}>
                      {habitat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <CaretDown size={14} color="var(--color-neutral-400)" />
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>Color</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onColorChange(null)}
                  className={cn('nx-tab', !selectedColor && 'nx-tab-active')}
                >
                  All
                </button>
                {POKEMON_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => onColorChange(color)}
                    className={cn('nx-tab capitalize', selectedColor === color && 'nx-tab-active')}
                    title={`Filter by ${color} Pokemon`}
                  >
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLOR_SWATCH[color] }} />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
