'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { SortOption, FilterOptions, pokemonMetadataService, SORT_OPTIONS } from '@/lib/pokemon-metadata'
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
  resetFilters: () => void
  clearSearch: () => void
}

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
        maxStats: statsRange.max < 800 ? statsRange.max : undefined
      }

      // Apply filters
      const filtered = pokemonMetadataService.searchAndFilter(filterOptions)
      
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
    statsRange
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
      statsRange.max < 800
    )
  }, [searchTerm, selectedTypes, sortOption, showLegendary, showMythical, selectedHabitat, selectedColor, statsRange])

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