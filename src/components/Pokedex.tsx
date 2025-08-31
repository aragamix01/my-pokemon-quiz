'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import GenerationSelector from './GenerationSelector'
import { getTypeIcon } from '@/lib/type-effectiveness'


export default function Pokedex() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationNumber>(1)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [showPokedex, setShowPokedex] = useState(false)
  const [showShiny, setShowShiny] = useState(false)

  useEffect(() => {
    const gen = searchParams.get('gen')
    if (gen && Number(gen) >= 1 && Number(gen) <= 9) {
      setSelectedGeneration(Number(gen) as GenerationNumber)
      setShowPokedex(true)
    }
  }, [searchParams])

  const loadGeneration = async (gen: GenerationNumber) => {
    setLoading(true)
    try {
      const allPokemon = await pokemonAPI.getPokemonsByGeneration(gen)
      // Sort by pokedex number (ID)
      const sortedPokemon = allPokemon.sort((a, b) => a.id - b.id)
      setPokemon(sortedPokemon)
    } catch (error) {
      console.error('Failed to load Pokemon:', error)
      setPokemon([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (showPokedex) {
      loadGeneration(selectedGeneration)
    }
  }, [selectedGeneration, showPokedex])

  const handleGenerationSelect = (gen: GenerationNumber) => {
    setSelectedGeneration(gen)
    if (!showPokedex) {
      setShowPokedex(true)
    }
  }

  const handlePokemonClick = (pokemonId: number) => {
    router.push(`/pokemon/${pokemonId}?gen=${selectedGeneration}`)
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


      {loading ? (
        <div className="text-center py-8">
          <div className="modern-spinner mx-auto mb-4">
            <div className="pokeball-line"></div>
            <div className="pokeball-center"></div>
          </div>
          <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
            Loading Pokemon...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {pokemon.map((p) => {
            const normalImageUrl = p.sprites.other['official-artwork']?.front_default || 
                                  p.sprites.front_default || 
                                  '/pokemon-placeholder.png'
            
            const shinyImageUrl = p.sprites.other['official-artwork']?.front_shiny || 
                                p.sprites.front_shiny || 
                                null
            
            const imageUrl = showShiny && shinyImageUrl ? shinyImageUrl : normalImageUrl
            const hasShiny = shinyImageUrl !== null
            
            return (
              <div
                key={p.id}
                className="modern-card p-2 sm:p-3 text-center cursor-pointer relative hover:scale-105 transition-transform duration-200"
                style={{ background: 'var(--surface-bg)' }}
                onClick={() => handlePokemonClick(p.id)}
              >
                {showShiny && hasShiny && (
                  <div className="absolute top-1 right-1 text-xs">✨</div>
                )}
                {showShiny && !hasShiny && (
                  <div className="absolute top-1 right-1 text-xs opacity-30">❌</div>
                )}
                
                <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                  #{p.id.toString().padStart(3, '0')}
                </div>
                
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 relative">
                  <Image
                    src={imageUrl}
                    alt={showShiny && hasShiny ? `Shiny ${p.name}` : p.name}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="text-xs font-bold mb-2 capitalize" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                  
                </div>
                
                <div className="flex gap-1 justify-center flex-wrap">
                  {p.types.map((typeInfo, index) => (
                    <Image
                      key={index}
                      src={getTypeIcon(typeInfo.type.name as any, 'modern')}
                      alt={typeInfo.type.name}
                      width={40}
                      height={40}
                      className="object-contain hover:scale-110 transition-transform duration-200 sm:w-14 sm:h-14"
                      title={typeInfo.type.name}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
    </>
  )
}