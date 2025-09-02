'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [showPokedex, setShowPokedex] = useState(true)
  const [showShiny, setShowShiny] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
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

  // Convert metadata to Pokemon format for rendering
  const convertMetadataToPokemon = useCallback((metadata: any[]): Pokemon[] => {
    return metadata.map(meta => ({
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
    }))
  }, [])

  // Load Pokemon from metadata only - instant, no API requests
  const loadPokemonFromMetadata = useCallback((metadata: any[]) => {
    if (!metadata || metadata.length === 0) {
      setPokemon([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // For large datasets, use setTimeout to allow UI to update
      if (metadata.length > 200) {
        setTimeout(() => {
          try {
            const pokemonData = convertMetadataToPokemon(metadata)
            setPokemon(pokemonData)
            setLoading(false)
          } catch (error) {
            console.error('Failed to process Pokemon metadata:', error)
            setError('Failed to process Pokemon data')
            setLoading(false)
          }
        }, 50) // Small delay to allow skeleton to show
      } else {
        // Small datasets can be processed immediately
        const pokemonData = convertMetadataToPokemon(metadata)
        setPokemon(pokemonData)
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to process Pokemon metadata:', error)
      setError('Failed to process Pokemon data')
      setLoading(false)
    }
  }, [convertMetadataToPokemon])

  useEffect(() => {
    const gen = searchParams.get('gen')
    if (gen && Number(gen) >= 1 && Number(gen) <= 9) {
      setSelectedGeneration(Number(gen) as GenerationNumber)
      setShowPokedex(true)
    }
  }, [searchParams])

  // Load Pokemon when metadata changes - instant
  useEffect(() => {
    if (showPokedex && isMetadataAvailable) {
      if (hasActiveFilters && filteredMetadata.length > 0) {
        loadPokemonFromMetadata(filteredMetadata)
      } else if (!hasActiveFilters) {
        const generationMetadata = selectedGeneration === null 
          ? pokemonMetadataService.getAllMetadata() 
          : pokemonMetadataService.getMetadataByGeneration(selectedGeneration)
        loadPokemonFromMetadata(generationMetadata)
      } else {
        setPokemon([]) // No results with current filters
      }
    } else if (showPokedex && !isMetadataAvailable) {
      // Fallback: Load from API only if metadata not available
      loadPokemonFromAPI()
    }
  }, [showPokedex, isMetadataAvailable, hasActiveFilters, filteredMetadata, selectedGeneration, loadPokemonFromMetadata])

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

  // Restore scroll position when coming back from Pokemon detail
  useEffect(() => {
    if (showPokedex && pokemon.length > 0) {
      const savedScrollPosition = sessionStorage.getItem('pokedex-scroll-position')
      const lastClickedPokemon = sessionStorage.getItem('pokedex-last-clicked-pokemon')
      
      if (savedScrollPosition && lastClickedPokemon) {
        // Clear the stored values
        sessionStorage.removeItem('pokedex-scroll-position')
        sessionStorage.removeItem('pokedex-last-clicked-pokemon')
        
        // Restore scroll position
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition))
        }, 100)
      }
    }
  }, [showPokedex, pokemon])

  const handleGenerationSelect = (gen: GenerationNumber | null) => {
    setSelectedGeneration(gen)
    setPokemon([]) // Clear current Pokemon
    if (!showPokedex) {
      setShowPokedex(true)
    }
  }

  const handlePokemonClick = (pokemonId: number) => {
    // Store scroll position and clicked Pokemon ID
    sessionStorage.setItem('pokedex-scroll-position', window.scrollY.toString())
    sessionStorage.setItem('pokedex-last-clicked-pokemon', pokemonId.toString())
    
    // Navigate with or without generation parameter based on selection
    const url = selectedGeneration === null 
      ? `/pokemon/${pokemonId}` 
      : `/pokemon/${pokemonId}?gen=${selectedGeneration}`
    
    console.log('Navigating to Pokemon:', pokemonId, 'URL:', url, 'Generation:', selectedGeneration)
    router.push(url)
  }

  const renderPokemonCard = (pokemonData: Pokemon, index: number) => {
    // Check if shiny sprites exist
    const shinyFallbacks = pokemonAPI.getPokemonImageFallbacks(pokemonData, true)
    const hasShiny = shinyFallbacks.some(url => !url.includes('placeholder'))
    
    return (
      <div
        key={pokemonData.id}
        className="modern-card p-2 sm:p-3 text-center cursor-pointer relative"
        style={{ background: 'var(--surface-bg)', transform: 'none', opacity: 1 }}
        onClick={() => handlePokemonClick(pokemonData.id)}
      >
        {showShiny && hasShiny && (
          <div className="absolute top-1 right-1 text-xs">✨</div>
        )}
        {showShiny && !hasShiny && (
          <div className="absolute top-1 right-1 text-xs opacity-30">❌</div>
        )}
        
        <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          #{pokemonData.id.toString().padStart(3, '0')}
        </div>
        
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 relative">
          <PokemonImage
            pokemon={pokemonData}
            shiny={showShiny}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="text-xs font-bold mb-2 capitalize" style={{ color: 'var(--text-primary)' }}>
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
  }

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
      
      <div className="modern-card p-2 sm:p-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
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
        <div className="space-y-4 mb-6">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {pokemon.map((p) => renderPokemonCard(p, p.id))}
          </div>
          
          {/* Pokemon count indicator */}
          <div className="text-center py-4">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Showing {pokemon.length} Pokemon
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}