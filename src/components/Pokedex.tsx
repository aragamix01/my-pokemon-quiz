'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import GenerationSelector from './GenerationSelector'
import { getTypeIcon } from '@/lib/type-effectiveness'


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
      
      <div className="modern-card">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowPokedex(false)}
          className="modern-button text-xs px-3 py-2"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold gradient-text">
          Generation {selectedGeneration}
        </h2>
        <div className="w-16"></div>
      </div>

      <div className="compact-generation-grid mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => {
          const regionData = [
            { gen: 1, name: 'Kanto', color: '#ff6b6b', emoji: '🔥' },
            { gen: 2, name: 'Johto', color: '#4ecdc4', emoji: '🌸' },
            { gen: 3, name: 'Hoenn', color: '#45b7d1', emoji: '🌊' },
            { gen: 4, name: 'Sinnoh', color: '#96ceb4', emoji: '⚡' },
            { gen: 5, name: 'Unova', color: '#ffeaa7', emoji: '❄️' },
            { gen: 6, name: 'Kalos', color: '#dda0dd', emoji: '🌟' },
            { gen: 7, name: 'Alola', color: '#ff9ff3', emoji: '🌺' },
            { gen: 8, name: 'Galar', color: '#74b9ff', emoji: '⚔️' },
            { gen: 9, name: 'Paldea', color: '#fd79a8', emoji: '🎓' }
          ].find(r => r.gen === gen)!
          
          return (
            <button
              key={gen}
              onClick={() => setSelectedGeneration(gen as GenerationNumber)}
              className={`compact-generation-button ${
                selectedGeneration === gen ? 'selected' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, ${regionData.color} 0%, ${regionData.color}dd 100%)`,
                boxShadow: `0 2px 8px ${regionData.color}33`,
                opacity: selectedGeneration === gen ? 1 : 0.7
              }}
            >
              <span className="gen-emoji-small">{regionData.emoji}</span>
              <div className="gen-info-compact">
                <div className="gen-number-small">Gen {gen}</div>
                <div className="gen-name-small">{regionData.name}</div>
              </div>
            </button>
          )
        })}
      </div>


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
                className="modern-card p-3 text-center cursor-pointer relative"
                style={{ background: 'var(--surface-bg)' }}
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
                
                <div className="w-20 h-20 mx-auto mb-2 relative">
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
                      width={56}
                      height={56}
                      className="object-contain hover:scale-110 transition-transform duration-200"
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