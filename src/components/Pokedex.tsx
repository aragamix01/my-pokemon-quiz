'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import PokemonImage from './PokemonImage'
import PokemonSkeleton from './PokemonSkeleton'
import PokedexFilterPanel, { REGION_NAMES } from './PokedexFilterPanel'
import AISearchBar from './AISearchBar'
import { usePokemonFilter } from '@/hooks/usePokemonFilter'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import type { PokemonMetadata } from '@/types/pokemon-metadata'
import { Button } from '@/components/ui/Button'
import { Sparkle, Shuffle, SquaresFour, Rows, Funnel, CaretDown, X } from '@phosphor-icons/react'
import { SORT_OPTIONS, FormKind } from '@/lib/pokemon-metadata'
import { popularIds } from '@/lib/popular-pokemon'
import { cn } from '@/lib/cn'
import { loadRecentlyViewed } from '@/lib/recently-viewed'
import { TypeIcon } from '@/components/ui/TypeIcon'
import { HoloCard } from '@/components/ui/HoloCard'
import { PokeballMark } from '@/components/ui/PokeballMark'
import { getTypeCardColor } from '@/lib/type-card-colors'
import { PokemonTypeName } from '@/lib/type-effectiveness'
import { japaneseName } from '@/lib/pokemon-names'
import { getPokedex, regionalNumber, pokedexOptionLabel } from '@/lib/regional-pokedexes'
import { LearnState, loadLearnState, isMastered } from '@/lib/learn-progress'


const COMPACT_KEY = 'pokedex-compact-view'

// First-stage starters of every generation, Gen 1 to 9
const STARTER_IDS = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728, 810, 813, 816, 906, 909, 912]
const FAN_FAVOURITES = popularIds(100)

// Compact sort names so the sort menu fits on phones: "Pokedex Number (Low to High)" -> "No. ↑"
const shortSortLabel = (label: string) =>
  label.replace('Pokedex Number', 'No.').replace(' (Low to High)', ' ↑').replace(' (High to Low)', ' ↓')

type QuickPick = 'all' | 'starters' | 'favourites' | 'legendary' | 'mythical' | 'mega' | 'recent'
const QUICK_PICKS: Array<{ id: QuickPick; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'favourites', label: 'Fan favourites' },
  { id: 'legendary', label: 'Legendary' },
  { id: 'mythical', label: 'Mythical' },
  { id: 'mega', label: 'Mega' },
  { id: 'recent', label: 'Recently viewed' },
]

export default function Pokedex() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationNumber | null>(null)
  const [showPokedex, setShowPokedex] = useState(true) // Opens on all generations; restoration may pick another
  const [showShiny, setShowShiny] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [itemsPerLoad] = useState(50) // Load 50 items at a time
  const scrollPositionRef = useRef<number>(0)
  const [useAISearch, setUseAISearch] = useState(false) // Toggle between classic and AI search
  const [aiFilteredPokemon, setAiFilteredPokemon] = useState<Pokemon[]>([]) // Results from AI search
  // Flashcard progress for the badges on cards (localStorage, read after mount)
  const [learnState, setLearnState] = useState<LearnState | null>(null)
  useEffect(() => {
    setLearnState(loadLearnState())
  }, [])
  // Compact list view (small row cards), remembered in this browser
  const [compactView, setCompactView] = useState(false)
  // Detail pages opened lately, newest first (localStorage, read after mount)
  const [recentIds, setRecentIds] = useState<number[]>([])
  useEffect(() => { setRecentIds(loadRecentlyViewed()) }, [])
  // Phone/tablet filter sheet
  const [filtersOpen, setFiltersOpen] = useState(false)
  useEffect(() => {
    try {
      setCompactView(localStorage.getItem(COMPACT_KEY) === 'true')
    } catch {
      // keep the default card view
    }
  }, [])
  const toggleCompactView = (compact: boolean) => {
    setCompactView(compact)
    try {
      localStorage.setItem(COMPACT_KEY, String(compact))
    } catch {
      // choice lasts for this visit only
    }
  }
  const metadataById = useMemo(() => {
    const map: Record<number, PokemonMetadata> = {}
    pokemonMetadataService.getAllMetadata().forEach(m => { map[m.id] = m })
    return map
  }, [])
  
  // Use Pokemon filter hook for search and sort
  const {
    filteredMetadata,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    showLegendary,
    setShowLegendary,
    showMythical,
    setShowMythical,
    selectedHabitat,
    setSelectedHabitat,
    selectedColor,
    setSelectedColor,
    statsRange,
    setStatsRange,
    evolutionStage,
    setEvolutionStage,
    formKind,
    setFormKind,
    learnFilter,
    setLearnFilter,
    regionalDex,
    setRegionalDex,
    collection,
    setCollection,
    resetFilters,
    clearSearch,
    hasActiveFilters,
    summary,
    isMetadataAvailable,
    totalResults
  } = usePokemonFilter(selectedGeneration)

  // Mobile performance: Use pagination for large datasets
  const ITEMS_PER_PAGE = selectedGeneration === null ? 50 : 100 // Smaller batches for "All" mode
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const effectiveItemsPerPage = isMobile && selectedGeneration === null ? 30 : ITEMS_PER_PAGE

  // Pokemon object cache to prevent recreating identical objects
  const pokemonCacheRef = useRef<Map<number, Pokemon>>(new Map())

  // Convert metadata to Pokemon format for rendering with caching
  const convertMetadataToPokemon = useCallback((metadata: any[]): Pokemon[] => {
    return metadata.map(meta => {
      // Check if we already have this Pokemon object cached
      const existingPokemon = pokemonCacheRef.current.get(meta.id)
      if (existingPokemon && 
          existingPokemon.name === meta.name && 
          existingPokemon.height === meta.height &&
          existingPokemon.weight === meta.weight) {
        return existingPokemon // Return cached version to maintain React identity
      }

      // Create new Pokemon object
      const newPokemon: Pokemon = {
        id: meta.id,
        name: meta.name,
        types: meta.types.map((type: string) => ({
          type: { name: type, url: '' },
          slot: 1 // Not used in display
        })),
        // Add any other required Pokemon fields for card display
        species: { name: meta.species_name, url: '' },
        sprites: {
          // These will be handled by PokemonImage component
          front_default: null,
          front_shiny: null,
          other: {
            'official-artwork': {
              front_default: null,
              front_shiny: null
            }
          }
        },
        height: meta.height,
        weight: meta.weight,
        base_experience: meta.base_experience,
        abilities: [],
        moves: [],
        cries: { latest: null, legacy: null },
        stats: [
          { base_stat: meta.stats.hp, effort: 0, stat: { name: 'hp', url: '' } },
          { base_stat: meta.stats.attack, effort: 0, stat: { name: 'attack', url: '' } },
          { base_stat: meta.stats.defense, effort: 0, stat: { name: 'defense', url: '' } },
          { base_stat: meta.stats['special-attack'], effort: 0, stat: { name: 'special-attack', url: '' } },
          { base_stat: meta.stats['special-defense'], effort: 0, stat: { name: 'special-defense', url: '' } },
          { base_stat: meta.stats.speed, effort: 0, stat: { name: 'speed', url: '' } }
        ]
      }
      
      // Cache the new Pokemon object
      pokemonCacheRef.current.set(meta.id, newPokemon)
      return newPokemon
    })
  }, [])

  // Load Pokemon with pagination
  const loadPokemonPage = useCallback((metadata: any[], page: number, append: boolean = false) => {
    if (!metadata || metadata.length === 0) {
      setPokemon([])
      setLoading(false)
      return
    }

    try {
      if (!append) {
        setLoading(true)
        setError(null)
      }
      
      // Calculate items for this page
      const startIndex = (page - 1) * itemsPerLoad
      const endIndex = Math.min(startIndex + itemsPerLoad, metadata.length)
      const pageMetadata = metadata.slice(startIndex, endIndex)
      
      const pokemonData = convertMetadataToPokemon(pageMetadata)
      
      if (append) {
        // CRITICAL FIX: Store scroll position and element reference before DOM changes
        const currentScrollY = window.scrollY
        const viewportHeight = window.innerHeight
        
        // Find an anchor element near the viewport center for reference
        const viewportCenter = currentScrollY + viewportHeight / 2
        const pokemonCards = document.querySelectorAll('[data-pokemon-id]')
        let anchorElement = null
        let anchorOffset = 0
        
        // Find the best anchor element (closest to viewport center)
        for (let i = 0; i < pokemonCards.length; i++) {
          const card = pokemonCards[i]
          const rect = card.getBoundingClientRect()
          const elementTop = rect.top + currentScrollY
          const elementCenter = elementTop + rect.height / 2
          
          if (elementCenter <= viewportCenter) {
            anchorElement = card
            anchorOffset = currentScrollY - elementTop
          }
        }
        
        console.log('🔄 Load More: Anchoring to element', {
          scrollY: currentScrollY,
          anchorId: anchorElement?.getAttribute('data-pokemon-id'),
          anchorOffset
        })
        
        // Update Pokemon state
        setPokemon(prev => [...prev, ...pokemonData])
        
        // Restore scroll position using anchor element
        setTimeout(() => {
          if (anchorElement) {
            const anchorId = anchorElement.getAttribute('data-pokemon-id')
            const updatedAnchor = document.querySelector(`[data-pokemon-id="${anchorId}"]`)
            
            if (updatedAnchor) {
              const rect = updatedAnchor.getBoundingClientRect()
              const elementTop = rect.top + window.scrollY
              const targetScroll = elementTop + anchorOffset
              
              window.scrollTo({ top: targetScroll, behavior: 'instant' })
              
              console.log('✅ Load More: Restored using anchor', {
                anchorId,
                targetScroll,
                actualScroll: window.scrollY
              })
            } else {
              // Fallback to original position
              window.scrollTo({ top: currentScrollY, behavior: 'instant' })
              console.log('⚠️ Load More: Used fallback scroll position')
            }
          } else {
            // No anchor found, use original position
            window.scrollTo({ top: currentScrollY, behavior: 'instant' })
            console.log('⚠️ Load More: No anchor found, using original position')
          }
        }, 100)
      } else {
        setPokemon(pokemonData)
      }
      
      setCurrentPage(page)
      setLoading(false)
      setIsLoadingMore(false)
    } catch (error) {
      console.error('Failed to process Pokemon metadata:', error)
      setError('Failed to process Pokemon data')
      setLoading(false)
      setIsLoadingMore(false)
    }
  }, [convertMetadataToPokemon, itemsPerLoad, pokemon.length])

  useEffect(() => {
    const gen = searchParams.get('gen')
    if (gen && Number(gen) >= 1 && Number(gen) <= 9) {
      console.log('URL has generation param:', gen)
      setSelectedGeneration(Number(gen) as GenerationNumber)
      setShowPokedex(true)
    } else {
      // No generation in the URL: the Pokedex opens on all generations
      setShowPokedex(true)
    }
  }, [searchParams])

  // Search comes from the header search box (?q=...)
  const urlQuery = searchParams.get('q') ?? ''
  useEffect(() => {
    setSearchTerm(urlQuery)
  }, [urlQuery, setSearchTerm])

  // Restore complete Pokedex state on component mount
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('pokedex-scroll-position')
    const lastClickedPokemon = sessionStorage.getItem('pokedex-last-clicked-pokemon')
    const savedGeneration = sessionStorage.getItem('pokedex-generation')
    const savedShowPokedex = sessionStorage.getItem('pokedex-show-pokedex')
    const savedShowShiny = sessionStorage.getItem('pokedex-show-shiny')
    const savedPage = sessionStorage.getItem('pokedex-page')
    
    // Retrieve ALL filter states
    const savedSearchTerm = sessionStorage.getItem('pokedex-search-term')
    const savedSelectedTypes = sessionStorage.getItem('pokedex-selected-types')
    const savedSortOption = sessionStorage.getItem('pokedex-sort-option')
    const savedShowLegendary = sessionStorage.getItem('pokedex-show-legendary')
    const savedShowMythical = sessionStorage.getItem('pokedex-show-mythical')
    const savedSelectedHabitat = sessionStorage.getItem('pokedex-selected-habitat')
    const savedSelectedColor = sessionStorage.getItem('pokedex-selected-color')
    const savedStatsRange = sessionStorage.getItem('pokedex-stats-range')
    const savedExtraFilters = sessionStorage.getItem('pokedex-extra-filters')
    
    console.log('Component mounted, checking for saved state:', {
      hasScrollPosition: !!savedScrollPosition,
      hasLastPokemon: !!lastClickedPokemon,
      generation: savedGeneration,
      showPokedex: savedShowPokedex,
      showShiny: savedShowShiny,
      page: savedPage,
      hasFilters: !!(savedSearchTerm || savedSelectedTypes || savedSortOption)
    })
    
    // If we have saved state, restore it
    if (savedScrollPosition && lastClickedPokemon) {
      console.log('✅ Restoring complete Pokedex state on mount')
      
      // Restore generation
      if (savedGeneration) {
        const gen = savedGeneration === 'null' ? null : parseInt(savedGeneration) as GenerationNumber
        console.log('Restoring generation:', gen)
        setSelectedGeneration(gen)
      }
      
      // Restore Pokedex view state - THIS IS KEY
      if (savedShowPokedex === 'true') {
        console.log('Restoring showPokedex to true')
        setShowPokedex(true)
      }
      
      // Restore shiny toggle
      if (savedShowShiny === 'true') {
        setShowShiny(true)
      }
      
      // Restore page will be handled by pagination logic
      if (savedPage) {
        setCurrentPage(parseInt(savedPage))
      }
      
      // Restore ALL filter states
      console.log('🔍 Restoring filter states...')
      
      if (savedSearchTerm) {
        console.log('Restoring search term:', savedSearchTerm)
        setSearchTerm(savedSearchTerm)
      }
      
      if (savedSelectedTypes) {
        try {
          const types = JSON.parse(savedSelectedTypes)
          console.log('Restoring selected types:', types)
          setSelectedTypes(types)
        } catch (e) {
          console.error('Failed to parse saved types:', e)
        }
      }
      
      if (savedSortOption) {
        try {
          const sortOpt = JSON.parse(savedSortOption)
          console.log('Restoring sort option:', sortOpt)
          setSortOption(sortOpt)
        } catch (e) {
          console.error('Failed to parse saved sort option:', e)
        }
      }
      
      if (savedShowLegendary && savedShowLegendary !== 'null') {
        const legendary = savedShowLegendary === 'true'
        console.log('Restoring legendary filter:', legendary)
        setShowLegendary(legendary)
      }
      
      if (savedShowMythical && savedShowMythical !== 'null') {
        const mythical = savedShowMythical === 'true'
        console.log('Restoring mythical filter:', mythical)
        setShowMythical(mythical)
      }
      
      if (savedSelectedHabitat && savedSelectedHabitat !== 'null') {
        console.log('Restoring habitat filter:', savedSelectedHabitat)
        setSelectedHabitat(savedSelectedHabitat)
      }
      
      if (savedSelectedColor && savedSelectedColor !== 'null') {
        console.log('Restoring color filter:', savedSelectedColor)
        setSelectedColor(savedSelectedColor)
      }
      
      if (savedStatsRange) {
        try {
          const statsRng = JSON.parse(savedStatsRange)
          console.log('Restoring stats range:', statsRng)
          setStatsRange(statsRng)
        } catch (e) {
          console.error('Failed to parse saved stats range:', e)
        }
      }

      if (savedExtraFilters) {
        try {
          const extra = JSON.parse(savedExtraFilters)
          setEvolutionStage(extra.evolutionStage ?? null)
          setFormKind(extra.formKind ?? null)
          setLearnFilter(extra.learnFilter ?? null)
          setRegionalDex(extra.regionalDex ?? null)
          setCollection(extra.collection ?? null)
        } catch (e) {
          console.error('Failed to parse saved extra filters:', e)
        }
      }
      
    } else {
      // No saved state, start fresh on all generations
      setShowPokedex(true)
    }
  }, [setSearchTerm, setSelectedTypes, setSortOption, setShowLegendary, setShowMythical, setSelectedHabitat, setSelectedColor, setStatsRange]) // Include all setter dependencies

  // Load Pokemon when metadata changes - with pagination (FIXED: Don't reset on every change)
  useEffect(() => {
    if (loading || isLoadingMore) return // Prevent double-loading
    
    // Only reset and load from beginning if this is a fresh start or filter change
    const shouldResetToFirstPage = currentPage === 1 || hasActiveFilters || !!regionalDex
    
    console.log('useEffect triggered - Pokemon loading decision:', {
      shouldReset: shouldResetToFirstPage,
      currentPage,
      hasActiveFilters,
      pokemonCount: pokemon.length
    })
    
    if (!shouldResetToFirstPage && pokemon.length > 0) {
      console.log('Skipping reset - keeping current Pokemon and page')
      return // Don't reset if we already have Pokemon loaded and aren't starting fresh
    }
    
    console.log('Loading first page of Pokemon (fresh start or filter change)')
    setCurrentPage(1)
    setIsLoadingMore(false)
    
    if (showPokedex && isMetadataAvailable) {
      if ((hasActiveFilters || regionalDex) && filteredMetadata.length > 0) {
        loadPokemonPage(filteredMetadata, 1, false)
      } else if (!hasActiveFilters && !regionalDex) {
        const generationMetadata = selectedGeneration === null 
          ? pokemonMetadataService.getAllMetadata() 
          : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
        loadPokemonPage(generationMetadata, 1, false)
      } else {
        setPokemon([])
        setCurrentPage(1)
      }
    } else if (showPokedex && !isMetadataAvailable) {
      loadPokemonFromAPI()
    }
  }, [showPokedex, isMetadataAvailable, hasActiveFilters, filteredMetadata, selectedGeneration, regionalDex])

  // Fallback function to load Pokemon from API when metadata is not available
  const loadPokemonFromAPI = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Can't load from API if no generation is selected
      if (selectedGeneration === null) {
        setError('Please select a generation')
        setLoading(false)
        return
      }
      
      const gen = await pokemonAPI.getGeneration(selectedGeneration)
      const pokemonIds = gen.pokemon_species
        .map(species => {
          const speciesId = species.url.split('/').slice(-2, -1)[0]
          return parseInt(speciesId)
        })
        .sort((a, b) => a - b)

      const pokemonPromises = pokemonIds.map(async (id) => {
        try {
          return await pokemonAPI.getPokemon(id)
        } catch (error) {
          console.error(`Failed to load Pokemon ${id}:`, error)
          return null
        }
      })

      const loadedPokemon = await Promise.all(pokemonPromises)
      const validPokemon = loadedPokemon.filter((p): p is Pokemon => p !== null)
      
      setPokemon(validPokemon)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load Pokemon from API:', error)
      setError('Failed to load Pokemon')
      setLoading(false)
    }
  }, [selectedGeneration])

  // Restore scroll position when coming back from Pokemon detail - FIXED
  useEffect(() => {
    // CRITICAL FIX: Trigger restoration when Pokemon are loaded AND we have saved state
    // This ensures restoration works for both "All" and individual generations
    if (showPokedex && !loading && !isLoadingMore) {
      const savedScrollPosition = sessionStorage.getItem('pokedex-scroll-position')
      const lastClickedPokemon = sessionStorage.getItem('pokedex-last-clicked-pokemon')
      const savedGeneration = sessionStorage.getItem('pokedex-generation')
      const savedPage = sessionStorage.getItem('pokedex-page')
      const savedPokemonCount = sessionStorage.getItem('pokedex-pokemon-count')
      
      // Only attempt restoration if we have saved state AND Pokemon are loaded (or need to be loaded)
      if (savedScrollPosition && lastClickedPokemon) {
        const expectedPage = savedPage ? parseInt(savedPage) : 1
        const expectedGeneration = savedGeneration === 'null' ? null : (savedGeneration ? parseInt(savedGeneration) : null)
        const expectedPokemonCount = savedPokemonCount ? parseInt(savedPokemonCount) : itemsPerLoad
        
        console.log('🔍 Restoring state from detail:', {
          scrollPosition: savedScrollPosition,
          pokemon: lastClickedPokemon,
          savedGeneration: expectedGeneration,
          currentGeneration: selectedGeneration, 
          savedPage: expectedPage,
          currentPage: currentPage,
          savedPokemonCount: expectedPokemonCount,
          currentPokemonCount: pokemon.length,
          generationMatch: selectedGeneration === expectedGeneration
        })
        
        // FIXED: Allow restoration if generation matches OR if we're in the right context
        const needsMorePokemon = pokemon.length < expectedPokemonCount
        const generationMatches = selectedGeneration === expectedGeneration
        const canRestore = generationMatches || (expectedGeneration !== null && selectedGeneration !== null)
        
        console.log('🎯 Restoration check:', {
          generationMatches,
          needsMorePokemon,
          canRestore,
          currentCount: pokemon.length,
          expectedCount: expectedPokemonCount
        })
        
        if (needsMorePokemon && canRestore) {
          console.log('🔄 Auto-loading missing Pokemon...')
          
          const currentMetadata = (hasActiveFilters || regionalDex) && filteredMetadata.length > 0
            ? filteredMetadata
            : selectedGeneration === null 
              ? pokemonMetadataService.getAllMetadata() 
              : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
          
          // Load exact number of Pokemon needed
          const pokemonToLoad = Math.min(expectedPokemonCount, currentMetadata.length)
          const loadMetadata = currentMetadata.slice(0, pokemonToLoad)
          const convertedPokemon = convertMetadataToPokemon(loadMetadata)
          
          console.log('📥 Loading Pokemon:', {
            available: currentMetadata.length,
            needed: expectedPokemonCount,
            loading: pokemonToLoad
          })
          
          setPokemon(convertedPokemon)
          const newPage = Math.ceil(pokemonToLoad / itemsPerLoad)
          setCurrentPage(newPage)
          
          console.log('✅ Auto-loaded Pokemon count:', convertedPokemon.length)
          return // Don't restore scroll yet, wait for next effect cycle
        }
        
        // Clear the stored values to prevent repeated attempts
        sessionStorage.removeItem('pokedex-scroll-position')
        sessionStorage.removeItem('pokedex-last-clicked-pokemon')
        sessionStorage.removeItem('pokedex-generation')
        sessionStorage.removeItem('pokedex-page')
        sessionStorage.removeItem('pokedex-show-pokedex')
        sessionStorage.removeItem('pokedex-show-shiny')
        sessionStorage.removeItem('pokedex-pokemon-count')
        
        // Clear ALL filter states
        sessionStorage.removeItem('pokedex-search-term')
        sessionStorage.removeItem('pokedex-selected-types')
        sessionStorage.removeItem('pokedex-sort-option')
        sessionStorage.removeItem('pokedex-show-legendary')
        sessionStorage.removeItem('pokedex-show-mythical')
        sessionStorage.removeItem('pokedex-selected-habitat')
        sessionStorage.removeItem('pokedex-selected-color')
        sessionStorage.removeItem('pokedex-stats-range')
        sessionStorage.removeItem('pokedex-extra-filters')
        
        // IMPROVED: Robust scroll restoration
        const position = parseInt(savedScrollPosition)
        const targetPokemonId = parseInt(lastClickedPokemon)
        
        console.log('🔄 Starting scroll restoration:', {
          position,
          targetPokemon: targetPokemonId,
          currentPokemonCount: pokemon.length
        })
        
        // Multi-strategy approach for scroll restoration
        const restoreScroll = () => {
          // Strategy 1: Direct position restoration
          window.scrollTo({ top: position, behavior: 'instant' })
          
          // Strategy 2: Verify and use Pokemon card as backup
          requestAnimationFrame(() => {
            const actualY = window.scrollY
            const positionDiff = Math.abs(actualY - position)
            
            console.log('📏 Direct scroll result:', {
              target: position,
              actual: actualY,
              diff: positionDiff
            })
            
            // If position is significantly off, try Pokemon card fallback
            if (positionDiff > 100) {
              const targetCard = document.querySelector(`[data-pokemon-id="${targetPokemonId}"]`)
              if (targetCard) {
                console.log('🎯 Using Pokemon card fallback')
                targetCard.scrollIntoView({ block: 'center', behavior: 'instant' })
                
                // Final verification
                setTimeout(() => {
                  const finalY = window.scrollY
                  console.log('✅ Scroll restoration completed:', {
                    method: positionDiff > 100 ? 'pokemon-card' : 'direct',
                    finalPosition: finalY
                  })
                }, 100)
              } else {
                console.log('⚠️ Pokemon card not found, position may be inaccurate')
              }
            } else {
              console.log('✅ Direct scroll restoration successful')
            }
          })
        }
        
        // Wait for DOM to fully render
        setTimeout(restoreScroll, 200)
      }
    }
  }, [showPokedex, pokemon.length, loading, isLoadingMore, selectedGeneration, hasActiveFilters, filteredMetadata])

  // Handle generation changes - clear any stored scroll positions
  useEffect(() => {
    if (selectedGeneration !== null) {
      // When user selects a specific generation, clear any stored positions
      sessionStorage.removeItem('pokedex-scroll-position')
      sessionStorage.removeItem('pokedex-last-clicked-pokemon')
    }
  }, [selectedGeneration])

  const handleGenerationSelect = (gen: GenerationNumber | null) => {
    setRegionalDex(null)
    setSelectedGeneration(gen)
    setPokemon([])
    setCurrentPage(1)
    pokemonCacheRef.current.clear() // Clear cache when generation changes
    if (!showPokedex) {
      setShowPokedex(true)
    }
  }

  // Browse a game's own Pokedex: all generations, limited to that game's list and order
  const handleDexSelect = (name: string) => {
    setSelectedGeneration(null)
    setRegionalDex(name)
    setPokemon([])
    setCurrentPage(1)
    pokemonCacheRef.current.clear()
    if (!showPokedex) setShowPokedex(true)
  }

  // Load More functionality with scroll preservation
  const loadMorePokemon = useCallback(() => {
    if (isLoadingMore || loading) return
    
    const currentMetadata = (hasActiveFilters || regionalDex) && filteredMetadata.length > 0
      ? filteredMetadata
      : selectedGeneration === null 
        ? pokemonMetadataService.getAllMetadata() 
        : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
    
    const totalPages = Math.ceil(currentMetadata.length / itemsPerLoad)
    if (currentPage >= totalPages) return // No more pages
    
    setIsLoadingMore(true)
    loadPokemonPage(currentMetadata, currentPage + 1, true) // true = append
  }, [isLoadingMore, loading, hasActiveFilters, regionalDex, filteredMetadata, selectedGeneration, currentPage, itemsPerLoad, loadPokemonPage])

  // Check if we can load more
  const hasMorePages = useMemo(() => {
    const currentMetadata = (hasActiveFilters || regionalDex) && filteredMetadata.length > 0
      ? filteredMetadata
      : selectedGeneration === null 
        ? pokemonMetadataService.getAllMetadata() 
        : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
    
    const totalPages = Math.ceil(currentMetadata.length / itemsPerLoad)
    return currentPage < totalPages
  }, [hasActiveFilters, regionalDex, filteredMetadata, selectedGeneration, currentPage, itemsPerLoad])

  const handlePokemonClick = (pokemonId: number) => {
    // Store scroll position and clicked Pokemon ID
    const scrollY = window.scrollY
    sessionStorage.setItem('pokedex-scroll-position', scrollY.toString())
    sessionStorage.setItem('pokedex-last-clicked-pokemon', pokemonId.toString())
    
    // Store complete Pokedex state for restoration - ALL states
    sessionStorage.setItem('pokedex-generation', selectedGeneration?.toString() || 'null')
    sessionStorage.setItem('pokedex-page', currentPage.toString())
    sessionStorage.setItem('pokedex-show-pokedex', showPokedex.toString())
    sessionStorage.setItem('pokedex-show-shiny', showShiny.toString())
    sessionStorage.setItem('pokedex-pokemon-count', pokemon.length.toString())
    
    // Store ALL filter states from usePokemonFilter hook
    sessionStorage.setItem('pokedex-search-term', searchTerm)
    sessionStorage.setItem('pokedex-selected-types', JSON.stringify(selectedTypes))
    sessionStorage.setItem('pokedex-sort-option', JSON.stringify(sortOption))
    sessionStorage.setItem('pokedex-show-legendary', showLegendary?.toString() || 'null')
    sessionStorage.setItem('pokedex-show-mythical', showMythical?.toString() || 'null')
    sessionStorage.setItem('pokedex-selected-habitat', selectedHabitat || 'null')
    sessionStorage.setItem('pokedex-selected-color', selectedColor || 'null')
    sessionStorage.setItem('pokedex-stats-range', JSON.stringify(statsRange))
    sessionStorage.setItem('pokedex-extra-filters', JSON.stringify({ evolutionStage, formKind, learnFilter, regionalDex, collection }))
    
    console.log('Storing navigation data:', {
      scrollY,
      pokemonId,
      generation: selectedGeneration,
      currentPage,
      pokemonCount: pokemon.length
    })
    
    // Navigate with or without generation parameter based on selection
    const url = selectedGeneration === null || regionalDex 
      ? `/pokemon/${pokemonId}` 
      : `/pokemon/${pokemonId}?gen=${selectedGeneration}`
    
    router.push(url)
  }

  // Handle AI search results
  const handleAISearchResults = useCallback((results: PokemonMetadata[]) => {
    // Convert metadata results to Pokemon format
    const aiPokemon = convertMetadataToPokemon(results)
    setAiFilteredPokemon(aiPokemon)
  }, [convertMetadataToPokemon])

  const renderPokemonCard = useCallback((pokemonData: Pokemon, index: number) => {
    // Check if shiny sprites exist
    const shinyFallbacks = pokemonAPI.getPokemonImageFallbacks(pokemonData, true)
    const hasShiny = shinyFallbacks.some(url => !url.includes('placeholder'))
    const meta = metadataById[pokemonData.id]
    const jaName = meta ? japaneseName(meta) : null
    const learnCard = learnState?.cards[pokemonData.id]
    const mastered = isMastered(learnCard)
    const dexNumber = regionalDex ? regionalNumber(regionalDex, pokemonData.id) : undefined

    // Card color comes from the first type, like the games' Pokedex screens
    const cardColor = getTypeCardColor(pokemonData.types[0]?.type.name ?? 'normal')
    const numberLabel = `#${(dexNumber ?? pokemonData.id).toString().padStart(3, '0')}`
    const numberTitle = dexNumber !== undefined ? `National #${pokemonData.id}` : undefined
    const learnBadge = learnCard && (
      <span
        title={mastered ? 'Mastered in Flashcards' : 'Learning in Flashcards'}
        style={{ color: mastered ? '#ffe066' : '#fff' }}
      >
        {mastered ? '★' : '●'}
      </span>
    )

    if (compactView) {
      return (
        <HoloCard
          still
          glow
          glowColor={cardColor}
          key={pokemonData.id}
          className="nx-pokerow typed"
          style={{ background: cardColor }}
          onClick={() => handlePokemonClick(pokemonData.id)}
          data-pokemon-id={pokemonData.id}
        >
          <PokeballMark className="absolute -right-3 -bottom-4 w-16 h-16 pointer-events-none" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex-shrink-0 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.25)' }}>
            <PokemonImage
              pokemon={pokemonData}
              shiny={showShiny}
              fill
              lighten={false}
              className="object-contain p-0.5"
              key={`pokemon-row-image-${pokemonData.id}-${showShiny}`}
            />
          </div>
          <div className="flex-1 min-w-0 sm:text-center relative">
            <div className="nx-typecard-text text-[11px] sm:text-sm font-semibold capitalize truncate">
              {pokemonData.name}
            </div>
            <div className="flex items-center sm:justify-center gap-1 mt-0.5">
              {pokemonData.types.map((typeInfo, typeIndex) => (
                <TypeIcon key={typeIndex} type={typeInfo.type.name as PokemonTypeName} size={16} ring />
              ))}
              {/* On phones the number sits here so the name gets the full width */}
              <span className="nx-typecard-text sm:hidden ml-auto text-[10px] tabular-nums" title={numberTitle}>
                #{dexNumber ?? pokemonData.id} {learnBadge}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-0.5 flex-shrink-0 relative">
            <span
              className="text-[11px] tabular-nums rounded px-1.5 py-0.5"
              style={{ background: 'rgba(255,255,255,0.28)', color: '#fff' }}
              title={numberTitle}
            >
              #{dexNumber ?? pokemonData.id}
            </span>
            {learnBadge && <span className="text-[10px] leading-none">{learnBadge}</span>}
          </div>
        </HoloCard>
      )
    }

    return (
      <HoloCard
        still
        glow
        glowColor={cardColor}
        key={pokemonData.id}
        className="nx-typecard"
        style={{ background: cardColor }}
        onClick={() => handlePokemonClick(pokemonData.id)}
        data-pokemon-id={pokemonData.id}
      >
        {/* Faint Pokeball behind the artwork */}
        <PokeballMark
          className="absolute -right-5 -bottom-6 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        />

        {/* Big faded number, top right */}
        <span
          className="absolute top-1.5 right-2.5 sm:top-2 sm:right-3.5 text-base sm:text-2xl font-extrabold tabular-nums pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          title={numberTitle}
        >
          {numberLabel}
        </span>

        {/* On phones the name may run over the faded number; bigger cards keep them apart */}
        <div className="relative sm:pr-14 min-w-0">
          <div className="nx-typecard-text text-sm sm:text-base font-bold capitalize truncate leading-tight">
            {pokemonData.name}
          </div>
          {jaName && (
            <div className="nx-typecard-text text-[10px] sm:text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {jaName}
            </div>
          )}
          <div className="flex flex-col items-start gap-1 mt-1.5">
            {pokemonData.types.map((typeInfo, typeIndex) => (
              <span key={typeIndex} className="nx-typecard-pill">{typeInfo.type.name}</span>
            ))}
          </div>
        </div>

        {/* Artwork, bottom right over the Pokeball */}
        <div className="absolute right-1 bottom-1 w-[72px] h-[72px] sm:w-[104px] sm:h-[104px]">
          <PokemonImage
            pokemon={pokemonData}
            shiny={showShiny}
            fill
            lighten={false}
            className="object-contain drop-shadow-md"
            key={`pokemon-image-${pokemonData.id}-${showShiny}-stable`} // Stable key to prevent resets
          />
        </div>

        {/* Bottom-left badges: flashcard progress and shiny availability */}
        {(learnBadge || showShiny) && (
          <div className="absolute left-2.5 bottom-2 sm:left-3.5 sm:bottom-2.5 flex items-center gap-1.5 text-xs nx-typecard-text">
            {learnBadge}
            {showShiny && (
              <Sparkle size={13} color="#fff" weight={hasShiny ? 'fill' : 'regular'} style={{ opacity: hasShiny ? 1 : 0.5 }} />
            )}
          </div>
        )}
      </HoloCard>
    )
  }, [showShiny, handlePokemonClick, metadataById, learnState, regionalDex, compactView])

  // Quick picks: shortcuts over the filters (and hand-picked lists), shown above the grid
  const sameList = (a: number[] | null, b: number[]) => !!a && a.length === b.length && a.every((id, i) => id === b[i])
  const activePick: QuickPick | null =
    sameList(collection, STARTER_IDS) ? 'starters'
      : recentIds.length > 0 && sameList(collection, recentIds) ? 'recent'
      : sameList(collection, FAN_FAVOURITES) ? 'favourites'
        : collection ? null
          : showLegendary === true ? 'legendary'
            : showMythical === true ? 'mythical'
              : formKind === 'mega' ? 'mega'
                : 'all'

  const applyQuickPick = (pick: QuickPick) => {
    setCollection(null)
    setShowLegendary(null)
    setShowMythical(null)
    if (formKind === 'mega') setFormKind(null)
    if (pick === 'starters' || pick === 'favourites' || pick === 'recent') {
      // Lists span every generation
      setSelectedGeneration(null)
      setRegionalDex(null)
      setCollection(pick === 'starters' ? STARTER_IDS : pick === 'recent' ? recentIds : FAN_FAVOURITES)
    }
    if (pick === 'legendary') setShowLegendary(true)
    if (pick === 'mythical') setShowMythical(true)
    if (pick === 'mega') setFormKind('mega' as FormKind)
    setPokemon([])
    setCurrentPage(1)
  }

  const clearHeaderSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.replace(`/?${params.toString()}`, { scroll: false })
  }

  // Removable chips for everything that narrows the list
  const activeChips: Array<{ key: string; label: string; clear: () => void }> = [
    ...(searchTerm ? [{ key: 'q', label: `“${searchTerm}”`, clear: clearHeaderSearch }] : []),
    ...selectedTypes.map(t => ({ key: `t-${t}`, label: t.charAt(0).toUpperCase() + t.slice(1), clear: () => setSelectedTypes(selectedTypes.filter(x => x !== t)) })),
    ...(evolutionStage ? [{ key: 'evo', label: `Stage: ${evolutionStage}`, clear: () => setEvolutionStage(null) }] : []),
    ...(formKind && formKind !== 'mega' ? [{ key: 'form', label: `Form: ${formKind}`, clear: () => setFormKind(null) }] : []),
    ...(learnFilter ? [{ key: 'learn', label: `Learning: ${learnFilter}`, clear: () => setLearnFilter(null) }] : []),
    ...(selectedHabitat ? [{ key: 'hab', label: selectedHabitat.replace('-', ' '), clear: () => setSelectedHabitat(null) }] : []),
    ...(selectedColor ? [{ key: 'col', label: selectedColor, clear: () => setSelectedColor(null) }] : []),
    ...(statsRange.min > 0 || statsRange.max < 800 ? [{ key: 'stats', label: `Stats ${statsRange.min}–${statsRange.max}`, clear: () => setStatsRange({ min: 0, max: 800 }) }] : []),
  ]
  const filterCount = activeChips.filter(c => c.key !== 'q').length + (activePick && activePick !== 'all' ? 1 : 0)

  const dex = regionalDex ? getPokedex(regionalDex) : undefined
  const title = dex
    ? `${dex.label} Pokédex`
    : activePick === 'starters' ? 'Starters'
      : activePick === 'favourites' ? 'Fan favourites'
        : activePick === 'recent' ? 'Recently viewed'
        : selectedGeneration === null ? 'All Pokémon' : `Generation ${selectedGeneration} · ${REGION_NAMES[selectedGeneration - 1]}`
  const listCount = useAISearch ? aiFilteredPokemon.length : totalResults

  const panel = (
    <PokedexFilterPanel
      generation={selectedGeneration}
      onGenerationChange={handleGenerationSelect}
      regionalDex={regionalDex}
      onDexChange={handleDexSelect}
      selectedTypes={selectedTypes}
      onTypesChange={setSelectedTypes}
      showLegendary={showLegendary}
      onLegendaryChange={setShowLegendary}
      showMythical={showMythical}
      onMythicalChange={setShowMythical}
      selectedHabitat={selectedHabitat}
      onHabitatChange={setSelectedHabitat}
      selectedColor={selectedColor}
      onColorChange={setSelectedColor}
      statsRange={statsRange}
      onStatsRangeChange={setStatsRange}
      evolutionStage={evolutionStage}
      onEvolutionStageChange={setEvolutionStage}
      formKind={formKind}
      onFormKindChange={setFormKind}
      learnFilter={learnFilter}
      onLearnFilterChange={setLearnFilter}
      onResetFilters={() => { resetFilters(); if (searchTerm) clearHeaderSearch() }}
      hasActiveFilters={hasActiveFilters}
    />
  )

  return (
    <div className="lg:grid lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-7 lg:items-start">
      {/* Desktop: filters always open in a sticky sidebar */}
      <aside aria-label="Filters" className="hidden lg:block nx-sidebar-wrap">
        <div className="card nx-sidebar">{panel}</div>
      </aside>

      {/* Phones and tablets: the same filters in a bottom sheet */}
      {filtersOpen && (
        <div className="nx-sheet-backdrop lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div
            className="nx-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between -mt-1 mb-3">
              <span className="nx-sheet-handle" aria-hidden />
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            {panel}
            <div className="nx-sheet-footer">
              <button type="button" className="btn btn-primary btn-block" onClick={() => setFiltersOpen(false)}>
                Show {listCount} Pokémon
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-w-0 flex flex-col gap-4">
        {/* Quick picks */}
        <div className="flex items-center gap-2 nx-scroll-x p-1 -m-1">
          <span className="nx-label mr-1 hidden sm:inline flex-shrink-0">Quick picks</span>
          {QUICK_PICKS.filter(p => p.id !== 'recent' || recentIds.length > 0).map(p => (
            <button
              key={p.id}
              type="button"
              aria-pressed={activePick === p.id}
              onClick={() => applyQuickPick(p.id)}
              className={cn('nx-tab sm flex-shrink-0', activePick === p.id && 'nx-tab-active')}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Title and list controls */}
        <div className="flex flex-wrap items-end gap-2 sm:gap-3">
          <div className="w-full">
            <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{title}</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {listCount} Pokémon
              {dex ? ` · ${pokedexOptionLabel(dex)} order` : ` · sorted by ${shortSortLabel(sortOption.label)}`}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary lg:!hidden"
            onClick={() => setFiltersOpen(true)}
            aria-label={`Filters${filterCount ? `, ${filterCount} on` : ''}`}
          >
            <Funnel size={16} weight="bold" /> Filters
            {filterCount > 0 && <span className="nx-count">{filterCount}</span>}
          </button>
          <div className="relative">
            <select
              value={sortOption.value}
              onChange={e => {
                const option = SORT_OPTIONS.find(opt => opt.value === e.target.value)
                if (option) setSortOption(option)
              }}
              className="input pr-9 appearance-none cursor-pointer font-semibold max-w-[190px] sm:max-w-none truncate"
              style={{ width: 'auto', background: 'var(--color-surface)' }}
              aria-label="Sort"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{shortSortLabel(option.label)}</option>
              ))}
            </select>
            <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" color="var(--color-neutral-400)" />
          </div>
          <div className="nx-seg" role="group" aria-label="View">
            <button type="button" onClick={() => toggleCompactView(false)} className={cn(!compactView && 'on')} aria-pressed={!compactView} title="Card view">
              <SquaresFour size={16} weight="bold" /><span className="hidden sm:inline">Cards</span>
            </button>
            <button type="button" onClick={() => toggleCompactView(true)} className={cn(compactView && 'on')} aria-pressed={compactView} title="Compact list view">
              <Rows size={16} weight="bold" /><span className="hidden sm:inline">Compact</span>
            </button>
          </div>
          <button
            type="button"
            className={cn('nx-tab', showShiny && 'nx-tab-active')}
            onClick={() => setShowShiny(!showShiny)}
            aria-pressed={showShiny}
            title={showShiny ? 'Show normal colors' : 'Show shiny colors'}
          >
            <Sparkle size={16} weight={showShiny ? 'fill' : 'bold'} /> Shiny
          </button>
          <button
            type="button"
            className="btn btn-primary ml-auto"
            disabled={filteredMetadata.length === 0}
            onClick={() => handlePokemonClick(filteredMetadata[Math.floor(Math.random() * filteredMetadata.length)].id)}
            title="Open a random Pokemon from the current list"
          >
            <Shuffle size={16} weight="bold" /> Random
          </button>
        </div>

        {/* Active filters, each removable, plus the smart (AI) search switch */}
        <div className="flex flex-wrap items-center gap-1.5">
          {activeChips.map(chip => (
            <button key={chip.key} type="button" className="nx-tab sm capitalize" onClick={chip.clear} aria-label={`Remove ${chip.label}`}>
              {chip.label} <X size={12} weight="bold" />
            </button>
          ))}
          {dex && (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Numbers and order from {pokedexOptionLabel(dex)}
            </span>
          )}
          {isMetadataAvailable && (
            <button
              type="button"
              className={cn('nx-tab sm ml-auto', useAISearch && 'nx-tab-active')}
              onClick={() => setUseAISearch(!useAISearch)}
              aria-pressed={useAISearch}
              title="Describe what you're looking for, like 'fast electric types'"
            >
              <Sparkle size={14} weight="bold" /> Smart search
            </button>
          )}
        </div>

        {useAISearch && (
          <AISearchBar
            pokemonList={
              regionalDex
                ? pokemonMetadataService.searchAndFilter({ regionalDex })
                : selectedGeneration === null
                  ? pokemonMetadataService.getAllMetadata()
                  : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
            }
            onResults={handleAISearchResults}
            placeholder="Try: 'strong fire starter' or 'fast electric types'"
            maxResults={50}
          />
        )}

        {!isMetadataAvailable && (
          <div className="card p-4">
            <div className="text-sm" style={{ color: 'var(--error-gradient)' }}>
              Search and filters require Pokemon metadata. Run: <code>node scripts/fetch-pokemon-metadata.js</code>
            </div>
          </div>
        )}

        {error ? (
          <div className="text-center py-8" style={{ color: 'var(--error-gradient)' }}>{error}</div>
        ) : loading || (!useAISearch && pokemon.length === 0 && totalResults > 0) ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
            <PokemonSkeleton count={20} />
          </div>
        ) : (useAISearch ? aiFilteredPokemon.length === 0 : pokemon.length === 0) ? (
          <div className="card items-center text-center py-10">
            <div className="font-display text-lg font-semibold">No Pokémon found</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {useAISearch ? 'Try describing it another way.' : 'Try removing a filter.'}
            </div>
          </div>
        ) : (
          <div>
            <div className={compactView
              ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1.5 sm:gap-2'
              : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3'}>
              {(useAISearch ? aiFilteredPokemon : pokemon).map((p, index) => renderPokemonCard(p, index))}
            </div>

            {!useAISearch && hasMorePages && (
              <div className="text-center py-6">
                <Button variant="secondary" onClick={loadMorePokemon} disabled={isLoadingMore} style={{ minWidth: 160 }}>
                  {isLoadingMore ? 'Loading…' : 'Load more'}
                </Button>
              </div>
            )}

            <div className="text-center py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              Showing {useAISearch ? aiFilteredPokemon.length : pokemon.length} {useAISearch ? 'results' : `of ${totalResults} Pokémon`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
