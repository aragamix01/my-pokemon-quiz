'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-500 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-500 text-black',
    grass: 'bg-green-500 text-white',
    ice: 'bg-cyan-300 text-black',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-600 text-white',
    ground: 'bg-yellow-600 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-lime-500 text-black',
    rock: 'bg-yellow-800 text-white',
    ghost: 'bg-purple-800 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-400 text-black',
    fairy: 'bg-pink-300 text-black',
  }
  return typeColors[type] || 'bg-gray-500 text-white'
}

export default function Pokedex() {
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationNumber>(1)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [showPokedex, setShowPokedex] = useState(false)
  const [showShiny, setShowShiny] = useState(false)

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

  if (!showPokedex) {
    return (
      <div className="pixel-card">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--pixel-accent)' }}>
          POKEDEX
        </h2>
        <div className="text-sm mb-6 text-center" style={{ color: 'var(--pixel-white)' }}>
          Browse Pokemon by generation (ordered by Pokedex number)
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
            <button
              key={gen}
              onClick={() => handleGenerationSelect(gen as GenerationNumber)}
              className="pixel-button"
            >
              Gen {gen}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="pixel-card">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowPokedex(false)}
          className="pixel-button text-xs px-3 py-2"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold" style={{ color: 'var(--pixel-accent)' }}>
          Generation {selectedGeneration}
        </h2>
        <div className="w-16"></div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            onClick={() => setSelectedGeneration(gen as GenerationNumber)}
            className={`pixel-button text-xs px-3 py-2 ${
              selectedGeneration === gen ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
            style={{
              background: selectedGeneration === gen ? 'var(--pixel-accent)' : 'var(--pixel-secondary)',
              color: selectedGeneration === gen ? 'var(--pixel-bg)' : 'var(--pixel-white)'
            }}
          >
            {gen}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowShiny(!showShiny)}
          className={`pixel-button text-xs px-4 py-2 ${showShiny ? '' : 'bg-opacity-50'}`}
          style={{
            background: showShiny ? 'var(--pixel-accent)' : 'var(--pixel-secondary)',
            color: showShiny ? 'var(--pixel-bg)' : 'var(--pixel-white)'
          }}
        >
          ✨ {showShiny ? 'Shiny' : 'Normal'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="pixel-spinner mx-auto mb-4">
            <div className="pokeball-line"></div>
            <div className="pokeball-center"></div>
          </div>
          <div className="text-sm" style={{ color: 'var(--pixel-white)' }}>
            Loading Pokemon...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                className="pixel-card p-3 text-center hover:scale-105 transition-transform cursor-pointer relative"
                style={{ background: 'var(--pixel-secondary)' }}
              >
                {showShiny && hasShiny && (
                  <div className="absolute top-1 right-1 text-xs">✨</div>
                )}
                {showShiny && !hasShiny && (
                  <div className="absolute top-1 right-1 text-xs opacity-30">❌</div>
                )}
                
                <div className="text-xs mb-2" style={{ color: 'var(--pixel-gray)' }}>
                  #{p.id.toString().padStart(3, '0')}
                </div>
                
                <div className="w-20 h-20 mx-auto mb-2 relative">
                  <Image
                    src={imageUrl}
                    alt={showShiny && hasShiny ? `Shiny ${p.name}` : p.name}
                    fill
                    className="object-contain pixel-smooth"
                  />
                </div>
                
                <div className="text-xs font-bold mb-2 capitalize" style={{ color: 'var(--pixel-white)' }}>
                  {p.name}
                  {showShiny && hasShiny && ' ✨'}
                </div>
                
                <div className="flex gap-1 justify-center flex-wrap">
                  {p.types.map((typeInfo, index) => (
                    <span
                      key={index}
                      className={`px-1 py-0.5 text-xs font-bold uppercase ${getTypeColor(typeInfo.type.name)}`}
                      style={{ 
                        border: '1px solid var(--pixel-border)',
                        fontSize: '0.6rem'
                      }}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}