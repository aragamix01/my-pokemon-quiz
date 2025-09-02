'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { SortOption, SORT_OPTIONS, POKEMON_TYPES, POKEMON_HABITATS, POKEMON_COLORS } from '@/lib/pokemon-metadata'
import { getTypeIcon } from '@/lib/type-effectiveness'

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
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter(t => t !== type))
    } else {
      onTypesChange([...selectedTypes, type])
    }
  }

  const handleLegendaryToggle = () => {
    if (showLegendary === true) {
      onLegendaryChange(null)
    } else {
      onLegendaryChange(true)
    }
  }

  const handleMythicalToggle = () => {
    if (showMythical === true) {
      onMythicalChange(null)
    } else {
      onMythicalChange(true)
    }
  }

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
        setActiveSection(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  return (
    <div className="mb-4" ref={filtersRef}>
      {/* Unified Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Filter Toggle Button - mobile optimized */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            h-12 px-4 flex items-center gap-2 sm:gap-3 rounded-lg border-2
            transition-all duration-300 justify-center w-full sm:min-w-[120px] sm:w-auto
            ${isExpanded 
              ? 'border-blue-500/50 bg-blue-500/20 shadow-lg' 
              : 'border-gray-600/50 hover:border-blue-400/50 hover:bg-gray-700/50'
            }
          `}
          style={{
            background: isExpanded ? 'rgba(59, 130, 246, 0.2)' : 'rgba(31, 41, 55, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff'
          }}
        >
          <span className="text-base">🔧</span>
          <span className="text-sm sm:text-sm font-medium">
            Filters
          </span>
          <span className={`text-xs sm:text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Sort Dropdown - mobile optimized */}
        <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
          <select
            value={sortOption.value}
            onChange={(e) => {
              const option = SORT_OPTIONS.find(opt => opt.value === e.target.value)
              if (option) onSortChange(option)
            }}
            className={`
              h-12 px-4 pr-12 rounded-lg border-2 border-gray-600/50
              outline-none transition-all duration-200
              focus:border-blue-500/50 focus:shadow-lg
              hover:border-blue-400/50 w-full sm:min-w-[250px] text-sm
              appearance-none cursor-pointer
            `}
            style={{ 
              background: 'rgba(31, 41, 55, 0.9)', 
              color: '#ffffff',
              backdropFilter: 'blur(10px)'
            }}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <span className="text-white text-sm">📊 ▼</span>
          </div>
        </div>

        {/* Reset Button - mobile optimized */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className={`
              h-12 px-4 rounded-lg border-2 transition-all duration-200
              border-red-500/50 text-red-400 bg-red-500/10
              hover:bg-red-500 hover:text-white hover:border-red-500
              active:scale-95 flex items-center justify-center gap-2 text-sm font-medium
              w-full sm:w-auto
            `}
            title="Clear all filters"
          >
            <span>🗑️</span>
            <span className="sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Filter Status Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 my-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <span className="text-xs sm:text-xs font-medium text-blue-300">Active filters:</span>
          
          {selectedTypes.length > 0 && (
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/40">
              {selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''}
            </span>
          )}
          
          {showLegendary && (
            <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded border border-yellow-500/40">
              Legendary
            </span>
          )}
          
          {showMythical && (
            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">
              Mythical
            </span>
          )}
          
          {selectedHabitat && (
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded border border-green-500/40">
              {selectedHabitat.replace('-', ' ')}
            </span>
          )}
          
          {selectedColor && (
            <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded border border-pink-500/40">
              {selectedColor}
            </span>
          )}
          
          {(statsRange.min > 0 || statsRange.max < 800) && (
            <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded border border-orange-500/40">
              Stats {statsRange.min}-{statsRange.max}
            </span>
          )}
        </div>
      )}

      {/* Expandable Filters */}
      {isExpanded && (
        <div 
          className="modern-card overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2"
          style={{ background: 'var(--surface-bg)' }}
        >
          <div className="p-4 sm:p-6 space-y-6">
            {/* Type Filters Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>⚡</span>
                  <span>Pokemon Types</span>
                </h4>
                <div className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/40">
                  {selectedTypes.length} selected
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {POKEMON_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeToggle(type)}
                    className={`
                      p-3 rounded-xl text-sm flex flex-col items-center justify-center relative
                      transition-all duration-200 border-2 group
                      ${selectedTypes.includes(type) 
                        ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-lg shadow-blue-500/25' 
                        : 'border-transparent bg-gray-700/50 hover:bg-gray-600/60 hover:scale-105'
                      }
                    `}
                    title={`Toggle ${type} type filter`}
                  >
                    <div className={`
                      w-12 h-12 flex items-center justify-center rounded-lg transition-transform
                      ${selectedTypes.includes(type) ? 'scale-110' : 'group-hover:scale-110'}
                    `}>
                      <Image
                        src={getTypeIcon(type as any)}
                        alt={type}
                        width={120}
                        height={120}
                        className="object-contain drop-shadow-md"
                        draggable={false}
                      />
                    </div>
                    {selectedTypes.includes(type) && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Type Selection Helper */}
              {selectedTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-sm text-blue-300">Selected:</span>
                  {selectedTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className="text-xs px-2 py-1 bg-blue-500/30 text-blue-200 rounded hover:bg-red-500/30 hover:text-red-200 transition-colors border border-blue-500/40 hover:border-red-500/40"
                      title={`Remove ${type} filter`}
                    >
                      {type} ×
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Special Categories */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>✨</span>
                  <span>Special Categories</span>
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`
                  flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
                  ${showLegendary === true 
                    ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/20' 
                    : 'border-gray-600 bg-gray-700/30 hover:bg-gray-600/40 hover:border-gray-500'
                  }
                `}>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showLegendary === true}
                      onChange={handleLegendaryToggle}
                      className="sr-only"
                    />
                    <div className={`
                      w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                      ${showLegendary === true
                        ? 'border-yellow-500 bg-yellow-500 text-white'
                        : 'border-gray-400 bg-transparent'
                      }
                    `}>
                      {showLegendary === true && <span className="text-sm">✓</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-medium transition-colors ${showLegendary === true ? 'text-yellow-200' : 'text-gray-300'}`}>
                      Legendary Only
                    </span>
                    <p className="text-xs text-gray-400 mt-1">Show only legendary Pokemon</p>
                  </div>
                  <span className="text-2xl">🏆</span>
                </label>
                
                <label className={`
                  flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
                  ${showMythical === true 
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20' 
                    : 'border-gray-600 bg-gray-700/30 hover:bg-gray-600/40 hover:border-gray-500'
                  }
                `}>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showMythical === true}
                      onChange={handleMythicalToggle}
                      className="sr-only"
                    />
                    <div className={`
                      w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                      ${showMythical === true
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-gray-400 bg-transparent'
                      }
                    `}>
                      {showMythical === true && <span className="text-sm">✓</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-medium transition-colors ${showMythical === true ? 'text-purple-200' : 'text-gray-300'}`}>
                      Mythical Only
                    </span>
                    <p className="text-xs text-gray-400 mt-1">Show only mythical Pokemon</p>
                  </div>
                  <span className="text-2xl">🌟</span>
                </label>
              </div>
            </div>

            {/* Enhanced Stats Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>📊</span>
                  <span>Total Stats Range</span>
                </h4>
                <div className="text-sm bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full border border-orange-500/40">
                  {statsRange.min} - {statsRange.max}
                </div>
              </div>
              
              <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/30">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">Minimum Stats</label>
                      <span className="text-sm bg-gray-600 px-2 py-1 rounded text-white min-w-[50px] text-center">
                        {statsRange.min}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="800"
                      step="10"
                      value={statsRange.min}
                      onChange={(e) => onStatsRangeChange({ ...statsRange, min: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(statsRange.min / 800) * 100}%, #4b5563 ${(statsRange.min / 800) * 100}%, #4b5563 100%)`
                      }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">Maximum Stats</label>
                      <span className="text-sm bg-gray-600 px-2 py-1 rounded text-white min-w-[50px] text-center">
                        {statsRange.max}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="800"
                      step="10"
                      value={statsRange.max}
                      onChange={(e) => onStatsRangeChange({ ...statsRange, max: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(statsRange.max / 800) * 100}%, #4b5563 ${(statsRange.max / 800) * 100}%, #4b5563 100%)`
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-600/30">
                    <span>Weak (0)</span>
                    <span>Balanced (400)</span>
                    <span>Legendary (800)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Habitat Filter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>🌍</span>
                  <span>Habitat</span>
                </h4>
              </div>
              
              <div className="relative">
                <select
                  value={selectedHabitat || ''}
                  onChange={(e) => onHabitatChange(e.target.value || null)}
                  className={`
                    w-full text-sm px-4 py-3 rounded-xl border-2 transition-all duration-200
                    bg-gray-700/50 border-gray-600 focus:border-green-500 focus:bg-gray-700/70
                    outline-none appearance-none cursor-pointer
                  `}
                  style={{ 
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="" className="bg-gray-800 text-white">All Habitats</option>
                  {POKEMON_HABITATS.map(habitat => (
                    <option key={habitat} value={habitat} className="bg-gray-800 text-white">
                      {habitat.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
              
              {selectedHabitat && (
                <div className="text-sm text-green-300 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/30">
                  Filtering by: <strong>{selectedHabitat.replace('-', ' ')}</strong> habitat
                </div>
              )}
            </div>

            {/* Enhanced Color Filter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>🎨</span>
                  <span>Pokemon Color</span>
                </h4>
              </div>
              
              <div className="space-y-3">
                {/* All Colors Button */}
                <button
                  onClick={() => onColorChange(null)}
                  className={`
                    w-full sm:w-auto px-4 py-3 text-sm rounded-xl border-2 transition-all duration-200 flex items-center gap-3
                    ${!selectedColor 
                      ? 'border-blue-500 bg-blue-500/20 text-blue-200 shadow-lg shadow-blue-500/20' 
                      : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500'
                    }
                  `}
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 border-2 border-white/20"></span>
                  <span className="font-medium">All Colors</span>
                  {!selectedColor && <span className="ml-auto text-blue-400">✓</span>}
                </button>
                
                {/* Color Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {POKEMON_COLORS.map(color => {
                    const colorMap: Record<string, string> = {
                      black: '#374151',
                      blue: '#3b82f6',
                      brown: '#92400e',
                      gray: '#6b7280',
                      green: '#10b981',
                      pink: '#ec4899',
                      purple: '#8b5cf6',
                      red: '#ef4444',
                      white: '#f3f4f6',
                      yellow: '#f59e0b'
                    }
                    
                    return (
                      <button
                        key={color}
                        onClick={() => onColorChange(color)}
                        className={`
                          p-3 text-sm rounded-xl border-2 transition-all duration-200 flex items-center gap-3
                          ${selectedColor === color 
                            ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20 scale-105' 
                            : 'border-gray-600 bg-gray-700/30 hover:bg-gray-600/40 hover:border-gray-500 hover:scale-105'
                          }
                        `}
                        title={`Filter by ${color} Pokemon`}
                      >
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white/20 shadow-md"
                          style={{ backgroundColor: colorMap[color] }}
                        ></div>
                        <span className={`capitalize font-medium transition-colors ${selectedColor === color ? 'text-blue-200' : 'text-gray-300'}`}>
                          {color}
                        </span>
                        {selectedColor === color && (
                          <span className="ml-auto text-blue-400 animate-pulse">✓</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}