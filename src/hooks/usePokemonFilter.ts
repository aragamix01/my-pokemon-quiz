'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { SortOption, FilterOptions, FormKind, pokemonMetadataService, SORT_OPTIONS } from '@/lib/pokemon-metadata'
import { EvolutionStage } from '@/lib/evolution-chains'
import { LearnState, loadLearnState, isMastered } from '@/lib/learn-progress'
import { GenerationNumber } from '@/types/pokemon'

interface UsePokemonFilterState {
  filteredMetadata: PokemonMetadata[]
  loading: boolean
  error: string | null
  searchTerm: string
  selectedTypes: string[]
  sortOption: SortOption
  showLegendary: boolean | null
  showMythical: boolean | null
  selectedHabitat: string | null
  selectedColor: string | null
  statsRange: { min: number; max: number }
  evolutionStage: EvolutionStage | null
  formKind: FormKind | null
  learnFilter: LearnFilter | null
  totalResults: number
}

interface UsePokemonFilterActions {
  setSearchTerm: (term: string) => void
  setSelectedTypes: (types: string[]) => void
  setSortOption: (option: SortOption) => void
  setShowLegendary: (show: boolean | null) => void
  setShowMythical: (show: boolean | null) => void
  setSelectedHabitat: (habitat: string | null) => void
  setSelectedColor: (color: string | null) => void
  setStatsRange: (range: { min: number; max: number }) => void
  setEvolutionStage: (stage: EvolutionStage | null) => void
  setFormKind: (kind: FormKind | null) => void
  setLearnFilter: (filter: LearnFilter | null) => void
  resetFilters: () => void
  clearSearch: () => void
}

/** Flashcard progress: mastered, seen but still learning, or not met yet */
export type LearnFilter = 'mastered' | 'learning' | 'new'

const DEFAULT_STATS_RANGE = { min: 0, max: 800 }
const DEFAULT_SORT = SORT_OPTIONS[0] // Pokedex number ascending

export function usePokemonFilter(generation?: GenerationNumber | null) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT)
  const [showLegendary, setShowLegendary] = useState<boolean | null>(null)
  const [showMythical, setShowMythical] = useState<boolean | null>(null)
  const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [statsRange, setStatsRange] = useState(DEFAULT_STATS_RANGE)
  const [evolutionStage, setEvolutionStage] = useState<EvolutionStage | null>(null)
  const [formKind, setFormKind] = useState<FormKind | null>(null)
  const [learnFilter, setLearnFilter] = useState<LearnFilter | null>(null)
  // Flashcard progress lives in localStorage, so it is read after mount
  const [learnState, setLearnState] = useState<LearnState | null>(null)
  useEffect(() => {
    setLearnState(loadLearnState())
  }, [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Memoized filtered and sorted results
  const filteredMetadata = useMemo(() => {
    if (!pokemonMetadataService.isMetadataAvailable()) {
      return []
    }

    try {
      setLoading(true)
      setError(null)

      const filterOptions: FilterOptions = {
        search: searchTerm,
        types: selectedTypes.length > 0 ? selectedTypes : undefined,
        generation: generation ?? undefined,
        isLegendary: showLegendary ?? undefined,
        isMythical: showMythical ?? undefined,
        habitat: selectedHabitat ?? undefined,
        color: selectedColor ?? undefined,
        minStats: statsRange.min > 0 ? statsRange.min : undefined,
        maxStats: statsRange.max < 800 ? statsRange.max : undefined,
        evolutionStage: evolutionStage ?? undefined,
        formKind: formKind ?? undefined
      }

      // Apply filters
      let filtered = pokemonMetadataService.searchAndFilter(filterOptions)
      if (learnFilter && learnState) {
        filtered = filtered.filter(p => {
          const card = learnState.cards[p.id]
          const status: LearnFilter = !card ? 'new' : isMastered(card) ? 'mastered' : 'learning'
          return status === learnFilter
        })
      }
      
      // Apply sorting
      const sorted = pokemonMetadataService.sortMetadata(filtered, sortOption)

      setLoading(false)
      return sorted
    } catch (err) {
      setError('Failed to filter Pokemon data')
      setLoading(false)
      return []
    }
  }, [
    searchTerm,
    selectedTypes,
    generation,
    sortOption,
    showLegendary,
    showMythical,
    selectedHabitat,
    selectedColor,
    statsRange,
    evolutionStage,
    formKind,
    learnFilter,
    learnState
  ])

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedTypes([])
    setSortOption(DEFAULT_SORT)
    setShowLegendary(null)
    setShowMythical(null)
    setSelectedHabitat(null)
    setSelectedColor(null)
    setStatsRange(DEFAULT_STATS_RANGE)
    setEvolutionStage(null)
    setFormKind(null)
    setLearnFilter(null)
  }, [])

  // Clear search only
  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== '' ||
      selectedTypes.length > 0 ||
      sortOption.value !== DEFAULT_SORT.value ||
      showLegendary !== null ||
      showMythical !== null ||
      selectedHabitat !== null ||
      selectedColor !== null ||
      statsRange.min > 0 ||
      statsRange.max < 800 ||
      evolutionStage !== null ||
      formKind !== null ||
      learnFilter !== null
    )
  }, [searchTerm, selectedTypes, sortOption, showLegendary, showMythical, selectedHabitat, selectedColor, statsRange, evolutionStage, formKind, learnFilter])

  // Get summary statistics for current results
  const summary = useMemo(() => {
    return pokemonMetadataService.getStatsSummary(filteredMetadata)
  }, [filteredMetadata])

  const state: UsePokemonFilterState = {
    filteredMetadata,
    loading,
    error,
    searchTerm,
    selectedTypes,
    sortOption,
    showLegendary,
    showMythical,
    selectedHabitat,
    selectedColor,
    statsRange,
    evolutionStage,
    formKind,
    learnFilter,
    totalResults: filteredMetadata.length
  }

  const actions: UsePokemonFilterActions = {
    setSearchTerm,
    setSelectedTypes,
    setSortOption,
    setShowLegendary,
    setShowMythical,
    setSelectedHabitat,
    setSelectedColor,
    setStatsRange,
    setEvolutionStage,
    setFormKind,
    setLearnFilter,
    resetFilters,
    clearSearch
  }

  return {
    ...state,
    ...actions,
    hasActiveFilters,
    summary,
    isMetadataAvailable: pokemonMetadataService.isMetadataAvailable()
  }
}