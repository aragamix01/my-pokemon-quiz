'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import GenerationSelector from './GenerationSelector'
import { getTypeIcon } from '@/lib/type-effectiveness'
import PokemonImage from './PokemonImage'
import PokemonSkeleton from './PokemonSkeleton'
import PokemonSearchBar from './PokemonSearchBar'
import PokemonFilters from './PokemonFilters'
import { usePokemonFilter } from '@/hooks/usePokemonFilter'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'


export default function Pokedex() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationNumber | null>(null)
  const [showPokedex, setShowPokedex] = useState(false) // Start false, let restoration logic handle it
  const [showShiny, setShowShiny] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [itemsPerLoad] = useState(50) // Load 50 items at a time
  const scrollPositionRef = useRef<number>(0)
  
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
        for (const card of pokemonCards) {
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
      console.log('No generation in URL, checking if we need to show default Pokedex')
      // Check if user is on main pokedex route without any saved state
      const hasNoSavedState = !sessionStorage.getItem('pokedex-scroll-position')
      if (hasNoSavedState) {
        console.log('No saved state, showing GenerationSelector by default')
        setShowPokedex(false)
      }
    }
  }, [searchParams])

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
      
    } else {
      console.log('❌ No saved state found, showing GenerationSelector')
      // No saved state, start fresh
      setShowPokedex(false)
    }
  }, [setSearchTerm, setSelectedTypes, setSortOption, setShowLegendary, setShowMythical, setSelectedHabitat, setSelectedColor, setStatsRange]) // Include all setter dependencies

  // Load Pokemon when metadata changes - with pagination (FIXED: Don't reset on every change)
  useEffect(() => {
    if (loading || isLoadingMore) return // Prevent double-loading
    
    // Only reset and load from beginning if this is a fresh start or filter change
    const shouldResetToFirstPage = currentPage === 1 || hasActiveFilters
    
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
      if (hasActiveFilters && filteredMetadata.length > 0) {
        loadPokemonPage(filteredMetadata, 1, false)
      } else if (!hasActiveFilters) {
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
  }, [showPokedex, isMetadataAvailable, hasActiveFilters, filteredMetadata, selectedGeneration])

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
          
          const currentMetadata = hasActiveFilters && filteredMetadata.length > 0
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
    setSelectedGeneration(gen)
    setPokemon([])
    setCurrentPage(1)
    pokemonCacheRef.current.clear() // Clear cache when generation changes
    if (!showPokedex) {
      setShowPokedex(true)
    }
  }

  // Load More functionality with scroll preservation
  const loadMorePokemon = useCallback(() => {
    if (isLoadingMore || loading) return
    
    const currentMetadata = hasActiveFilters && filteredMetadata.length > 0
      ? filteredMetadata
      : selectedGeneration === null 
        ? pokemonMetadataService.getAllMetadata() 
        : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
    
    const totalPages = Math.ceil(currentMetadata.length / itemsPerLoad)
    if (currentPage >= totalPages) return // No more pages
    
    setIsLoadingMore(true)
    loadPokemonPage(currentMetadata, currentPage + 1, true) // true = append
  }, [isLoadingMore, loading, hasActiveFilters, filteredMetadata, selectedGeneration, currentPage, itemsPerLoad, loadPokemonPage])

  // Check if we can load more
  const hasMorePages = useMemo(() => {
    const currentMetadata = hasActiveFilters && filteredMetadata.length > 0
      ? filteredMetadata
      : selectedGeneration === null 
        ? pokemonMetadataService.getAllMetadata() 
        : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
    
    const totalPages = Math.ceil(currentMetadata.length / itemsPerLoad)
    return currentPage < totalPages
  }, [hasActiveFilters, filteredMetadata, selectedGeneration, currentPage, itemsPerLoad])

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
    
    console.log('Storing navigation data:', {
      scrollY,
      pokemonId,
      generation: selectedGeneration,
      currentPage,
      pokemonCount: pokemon.length
    })
    
    // Navigate with or without generation parameter based on selection
    const url = selectedGeneration === null 
      ? `/pokemon/${pokemonId}` 
      : `/pokemon/${pokemonId}?gen=${selectedGeneration}`
    
    router.push(url)
  }

  const renderPokemonCard = useCallback((pokemonData: Pokemon, index: number) => {
    // Check if shiny sprites exist
    const shinyFallbacks = pokemonAPI.getPokemonImageFallbacks(pokemonData, true)
    const hasShiny = shinyFallbacks.some(url => !url.includes('placeholder'))
    
    return (
      <div
        key={pokemonData.id}
        className="modern-card pokemon-card p-1 sm:p-3 text-center cursor-pointer relative"
        style={{ background: 'var(--surface-bg)', transform: 'none', opacity: 1 }}
        onClick={() => handlePokemonClick(pokemonData.id)}
        data-pokemon-id={pokemonData.id}
      >
        {showShiny && hasShiny && (
          <div className="absolute top-1 right-1 text-xs">✨</div>
        )}
        {showShiny && !hasShiny && (
          <div className="absolute top-1 right-1 text-xs opacity-30">❌</div>
        )}
        
        <div className="text-xs mb-1 sm:mb-2" style={{ color: 'var(--text-muted)' }}>
          #{pokemonData.id.toString().padStart(3, '0')}
        </div>
        
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-1 sm:mb-2 relative">
          <PokemonImage
            pokemon={pokemonData}
            shiny={showShiny}
            fill
            className="object-contain"
            key={`pokemon-image-${pokemonData.id}-${showShiny}-stable`} // Stable key to prevent resets
          />
        </div>
        
        <div className="text-xs font-bold mb-1 sm:mb-2 capitalize" style={{ color: 'var(--text-primary)' }}>
          {pokemonData.name}
        </div>
        
        <div className="flex gap-1 justify-center flex-wrap">
          {pokemonData.types.map((typeInfo, typeIndex) => (
            <Image
              key={typeIndex}
              src={getTypeIcon(typeInfo.type.name as any)}
              alt={typeInfo.type.name}
              width={40}
              height={40}
              className="object-contain sm:w-14 sm:h-14"
              title={typeInfo.type.name}
              draggable={false}
            />
          ))}
        </div>
      </div>
    )
  }, [showShiny, handlePokemonClick])

  if (!showPokedex) {
    return (
      <GenerationSelector
        title="POKEDEX"
        subtitle="Browse Pokemon by generation (ordered by Pokedex number)"
        onGenerationSelect={handleGenerationSelect}
      />
    )
  }

  return (
    <>
      {/* Floating Shiny Toggle */}
      <button
        onClick={() => setShowShiny(!showShiny)}
        className={`floating-shiny-toggle ${showShiny ? 'active' : ''}`}
        title={showShiny ? 'Switch to Normal Pokemon' : 'Switch to Shiny Pokemon'}
      >
        ✨
      </button>
      
      <div className="modern-card p-1 sm:p-4">
      <div className="flex justify-between items-center mb-2 sm:mb-6">
        <button
          onClick={() => setShowPokedex(false)}
          className="modern-button text-xs px-3 py-2"
        >
          ← Back
        </button>
        <h2 className="text-lg sm:text-xl font-bold gradient-text">
          Generation {selectedGeneration}
        </h2>
        <div className="w-16"></div>
      </div>

      <GenerationSelector
        title=""
        onGenerationSelect={setSelectedGeneration}
        selectedGeneration={selectedGeneration}
        minimized={true}
      />

      {/* Unified Search and Controls */}
      {isMetadataAvailable && (
        <div className="space-y-3 mb-4 sm:space-y-4 sm:mb-6">
          {/* Main Control Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Box */}
            <div className="flex-1">
              <PokemonSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={clearSearch}
                placeholder="Search Pokemon by name..."
                totalResults={totalResults}
              />
            </div>
          </div>
          
          {/* Filter and Sort Controls */}
          <PokemonFilters
            sortOption={sortOption}
            onSortChange={setSortOption}
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
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}

      {/* Metadata unavailable warning */}
      {!isMetadataAvailable && (
        <div className="modern-card p-4 mb-4" style={{ background: 'var(--surface-bg)', borderColor: '#fbbf24' }}>
          <div className="text-sm" style={{ color: '#fbbf24' }}>
            ⚠️ Search and filters require Pokemon metadata. Run: <code>node scripts/fetch-pokemon-metadata.js</code>
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center py-8 text-red-400">
          {error}
        </div>
      ) : !isMetadataAvailable ? (
        <div className="text-center py-8">
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            ⚠️ Pokemon metadata not available. Please run the metadata fetch script.
          </div>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-3 md:gap-4">
          <PokemonSkeleton count={20} />
        </div>
      ) : pokemon.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-lg mb-2">😔</div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No Pokemon found with current filters
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-3 md:gap-4">
            {pokemon.map((p, index) => renderPokemonCard(p, index))}
          </div>
          
          {/* Load More Button */}
          {hasMorePages && (
            <div className="text-center py-6">
              <button
                onClick={loadMorePokemon}
                disabled={isLoadingMore}
                className="modern-button px-6 py-3 text-sm font-semibold disabled:opacity-50"
                style={{ minWidth: '120px' }}
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          
          {/* Pokemon count indicator */}
          <div className="text-center py-4">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Showing {pokemon.length} of {totalResults} Pokemon
              {hasMorePages && (
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  📱 Loading {itemsPerLoad} at a time for better performance
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}