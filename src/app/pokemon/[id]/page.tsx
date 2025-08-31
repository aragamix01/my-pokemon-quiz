'use client'

import { useState, useEffect, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Pokemon, PokemonSpecies, EvolutionChain, EvolutionChainLink, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { getTypeIcon } from '@/lib/type-effectiveness'
import { getMoveData, getMoveTypeColor, hasMoveData } from '@/lib/moves-database'

interface PokemonData {
  pokemon: Pokemon
  species: PokemonSpecies
  evolutionChain: EvolutionChain | null
  allForms: Pokemon[]
}

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resolvedParams = use(params)
  const [data, setData] = useState<PokemonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShiny, setShowShiny] = useState(false)
  const [movesExpanded, setMovesExpanded] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [selectedForm, setSelectedForm] = useState(0)
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null)
  const [nextPokemon, setNextPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    if (resolvedParams.id) {
      loadPokemonData()
    }
  }, [resolvedParams.id])

  const loadPokemonData = async () => {
    setLoading(true)
    try {
      const [pokemon, species] = await Promise.all([
        pokemonAPI.getPokemon(resolvedParams.id),
        pokemonAPI.getPokemonSpecies(resolvedParams.id)
      ])
      
      let evolutionChain = null
      try {
        evolutionChain = await pokemonAPI.getEvolutionChainFromSpecies(species)
      } catch (error) {
        console.warn('Failed to load evolution chain:', error)
      }

      // Load all form variations
      let allForms = [pokemon] // Start with current form
      try {
        if (species.varieties && species.varieties.length > 1) {
          const formPromises = species.varieties
            .filter(variety => variety.pokemon.name !== pokemon.name) // Don't duplicate current form
            .map(variety => {
              const formId = variety.pokemon.url.split('/').slice(-2, -1)[0]
              return pokemonAPI.getPokemon(parseInt(formId))
            })
          
          const otherForms = await Promise.all(formPromises)
          allForms = [pokemon, ...otherForms]
        }
      } catch (error) {
        console.warn('Failed to load form variations:', error)
      }
      
      setData({ pokemon, species, evolutionChain, allForms })

      // Load previous/next Pokemon navigation
      const generation = searchParams.get('gen')
      if (generation) {
        const genNumber = parseInt(generation) as GenerationNumber
        console.log('Loading navigation for Pokemon', pokemon.id, 'in generation', genNumber)
        const { previous, next } = await pokemonAPI.getPreviousNextPokemon(pokemon.id, genNumber)
        console.log('Navigation data:', { previous: previous?.id, next: next?.id })
        setPreviousPokemon(previous)
        setNextPokemon(next)
      }
    } catch (error) {
      console.error('Failed to load Pokemon data:', error)
      setData(null)
    }
    setLoading(false)
  }

  const playPokemonCry = () => {
    const currentForm = getCurrentForm()
    if (currentForm?.cries?.latest) {
      setAudioPlaying(true)
      const audio = new Audio(currentForm.cries.latest)
      audio.onended = () => setAudioPlaying(false)
      audio.onerror = () => setAudioPlaying(false)
      audio.play().catch(() => setAudioPlaying(false))
    }
  }

  const getJapaneseName = () => {
    return data?.species.names.find(name => name.language.name === 'roomaji')?.name || 
           data?.species.names.find(name => name.language.name === 'ja')?.name || ''
  }

  const getEnglishName = () => {
    return data?.species.names.find(name => name.language.name === 'en')?.name || data?.pokemon.name || ''
  }

  const getFlavorText = () => {
    return data?.species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || ''
  }

  const getAllForms = () => {
    if (!data?.allForms || data.allForms.length === 0) return []
    
    return data.allForms.map(form => {
      // Clean up form name for display
      const formName = form.name
        .replace(`${data.species.name}-`, '') // Remove base name prefix
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
        .join(' ')
      
      return {
        name: formName || 'Default',
        pokemon: form,
        normal: form.sprites.other['official-artwork']?.front_default || form.sprites.front_default,
        shiny: form.sprites.other['official-artwork']?.front_shiny || form.sprites.front_shiny
      }
    })
  }

  const getCurrentSprite = () => {
    const forms = getAllForms()
    const currentForm = forms[selectedForm] || forms[0]
    return showShiny && currentForm?.shiny ? currentForm.shiny : currentForm?.normal
  }

  const getCurrentForm = () => {
    const forms = getAllForms()
    const currentForm = forms[selectedForm] || forms[0]
    return currentForm?.pokemon || data?.pokemon
  }

  const getEvolutionTriggerIcon = (triggerName: string) => {
    const icons: { [key: string]: string } = {
      'level-up': '📈',
      'use-item': '🎒',
      'trade': '🔄',
      'shed': '🐛',
      'spin': '🌪️',
      'tower-of-darkness': '🏯',
      'tower-of-waters': '🌊'
    }
    return icons[triggerName] || '❓'
  }

  const formatEvolutionCondition = (details: any) => {
    if (!details || details.length === 0) return ''
    
    const detail = details[0]
    const conditions = []
    
    if (detail.min_level) conditions.push(`Level ${detail.min_level}`)
    if (detail.min_happiness) conditions.push(`Happiness ${detail.min_happiness}`)
    if (detail.time_of_day) conditions.push(`${detail.time_of_day} time`)
    if (detail.item) conditions.push(`Use ${detail.item.name.replace('-', ' ')}`)
    if (detail.known_move) conditions.push(`Know ${detail.known_move.name.replace('-', ' ')}`)
    if (detail.location) conditions.push(`At ${detail.location.name.replace('-', ' ')}`)
    
    return conditions.join(', ')
  }

  const getItemSprite = (itemName: string) => {
    // PokeAPI item sprites are available at this URL pattern
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png`
  }

  const navigateToPokemon = (pokemonId: number) => {
    const generation = searchParams.get('gen')
    if (generation) {
      router.push(`/pokemon/${pokemonId}?gen=${generation}`)
    }
  }


  const renderEvolutionChain = (chainLink: EvolutionChainLink, depth = 0) => {
    const pokemonName = chainLink.species.name
    
    return (
      <>
        {/* Pokemon in chain - enhanced with more info */}
        <div className="flex flex-col items-center min-w-32">
          <div className="w-16 h-16 relative mb-2">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName === 'nidoran-f' ? '29' : pokemonName === 'nidoran-m' ? '32' : pokemonName === 'mr-mime' ? '122' : pokemonName === 'mime-jr' ? '439' : pokemonName.split('-')[0] === 'deoxys' ? '386' : chainLink.species.url.split('/').slice(-2, -1)[0]}.png`}
              alt={pokemonName}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-sm font-bold text-center capitalize" style={{ color: 'var(--text-primary)' }}>
            {pokemonName.replace('-', ' ')}
          </div>
          <div className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
            #{chainLink.species.url.split('/').slice(-2, -1)[0].padStart(3, '0')}
          </div>
        </div>

        {/* Evolution arrows and conditions */}
        {chainLink.evolves_to.map((evolution, index) => (
          <div key={index} className="flex items-center">
            {/* Evolution condition with detailed info */}
            <div className="flex flex-col items-center mx-3">
              {/* Item sprite if evolution requires an item */}
              {evolution.evolution_details[0]?.item && (
                <div className="w-6 h-6 relative mb-1 flex items-center justify-center">
                  <Image
                    src={getItemSprite(evolution.evolution_details[0].item.name)}
                    alt={evolution.evolution_details[0].item.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      // Show gem icon as fallback if sprite doesn't exist
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = '<span class="text-sm">💎</span>'
                      }
                    }}
                  />
                </div>
              )}
              
              <div className="text-xs text-center max-w-24 break-words" style={{ color: 'var(--text-secondary)' }}>
                {formatEvolutionCondition(evolution.evolution_details) || 'Level Up'}
              </div>
              <div className="text-lg mt-1" style={{ color: 'var(--text-primary)' }}>→</div>
            </div>
            
            {/* Next evolution */}
            {renderEvolutionChain(evolution, depth + 1)}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Navigation Buttons - Always show for debugging */}
      {(previousPokemon || nextPokemon) && (
        <>
          {/* Previous Button */}
          {previousPokemon && (
            <button
              onClick={() => navigateToPokemon(previousPokemon.id)}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 rounded-full shadow-lg hover:scale-110 transition-transform"
              title={`Previous: ${previousPokemon.name} #${previousPokemon.id.toString().padStart(3, '0')}`}
              style={{ 
                background: '#16213e', 
                border: '3px solid #e94560',
                color: 'white',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0'
              }}
            >
              <span style={{ 
                fontSize: '32px',
                fontWeight: 'bold',
                lineHeight: '0.8',
                marginTop: '-1px'
              }}>‹</span>
            </button>
          )}
          
          {/* Next Button */}
          {nextPokemon && (
            <button
              onClick={() => navigateToPokemon(nextPokemon.id)}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 rounded-full shadow-lg hover:scale-110 transition-transform"
              title={`Next: ${nextPokemon.name} #${nextPokemon.id.toString().padStart(3, '0')}`}
              style={{ 
                background: '#16213e', 
                border: '3px solid #e94560',
                color: 'white',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0'
              }}
            >
              <span style={{ 
                fontSize: '32px',
                fontWeight: 'bold',
                lineHeight: '0.8',
                marginTop: '-1px'
              }}>›</span>
            </button>
          )}
        </>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          animation: 'float 6s ease-in-out infinite'
        }}>⚪</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          animation: 'float 8s ease-in-out infinite 2s'
        }}>🔴</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          animation: 'float 7s ease-in-out infinite 4s'
        }}>🟡</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '25%',
          right: '5%',
          animation: 'float 9s ease-in-out infinite 1s'
        }}>🔵</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              const generation = searchParams.get('gen')
              if (generation) {
                router.push(`/?section=pokedex&gen=${generation}`)
              } else {
                router.back()
              }
            }}
            className="modern-button text-xs px-3 py-2"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold gradient-text">Pokemon Details</h1>
          <div className="w-16"></div>
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="modern-card">
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-64 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ) : data ? (
          <div className="modern-card p-2 sm:p-4" style={{ opacity: 1, transform: 'none' }}>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Left Side - Sprite, Types, Controls */}
              <div className="flex-shrink-0 lg:w-48 w-full">
                {/* Pokemon Sprite */}
                <div className="relative w-40 h-40 mx-auto mb-3">
                  <Image
                    src={getCurrentSprite() || '/pokemon-placeholder.png'}
                    alt={getEnglishName()}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Types under sprite */}
                <div className="text-center mb-3">
                  <div className="flex gap-2 justify-center">
                    {getCurrentForm().types.map((typeInfo, index) => (
                      <Image
                        key={index}
                        src={getTypeIcon(typeInfo.type.name as any)}
                        alt={typeInfo.type.name}
                        width={70}
                        height={70}
                        className="object-contain"
                        title={typeInfo.type.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Shiny and Cries buttons */}
                <div className="flex gap-1 justify-center mb-4">
                  <button
                    onClick={() => setShowShiny(!showShiny)}
                    className={`modern-button text-xs px-2 py-1 ${showShiny ? 'bg-yellow-500' : ''}`}
                    disabled={!getAllForms()[selectedForm]?.shiny}
                  >
                    ✨ {showShiny ? 'Normal' : 'Shiny'}
                  </button>
                  <button
                    onClick={playPokemonCry}
                    className={`modern-button text-xs px-2 py-1 ${audioPlaying ? 'bg-blue-500' : ''}`}
                    disabled={!getCurrentForm()?.cries?.latest || audioPlaying}
                  >
                    🔊 Cry
                  </button>
                </div>

                {/* Forms Variety Selections */}
                {getAllForms().length > 1 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Forms</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                      {getAllForms().map((form, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedForm(index)}
                          className={`text-xs px-3 py-2 rounded text-center lg:text-left ${selectedForm === index ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                          {form.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Information */}
              <div className="flex-1 space-y-4">
                {/* Basic Information Section */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <table className="w-full text-xs">
                        <tbody>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>ID:</td>
                            <td className="py-0.5 font-bold">#{data.pokemon.id.toString().padStart(3, '0')}</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Name:</td>
                            <td className="py-0.5 font-bold">{getEnglishName()}</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Romaji:</td>
                            <td className="py-0.5 font-bold">{getJapaneseName() || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Height:</td>
                            <td className="py-0.5 font-bold">{(getCurrentForm().height / 10).toFixed(1)} m</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table className="w-full text-xs">
                        <tbody>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Weight:</td>
                            <td className="py-0.5 font-bold">{(getCurrentForm().weight / 10).toFixed(1)} kg</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Generation:</td>
                            <td className="py-0.5 font-bold capitalize">{data.species.generation?.name.replace('generation-', 'Gen ') || 'Unknown'}</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Habitat:</td>
                            <td className="py-0.5 font-bold capitalize">{data.species.habitat?.name || 'Unknown'}</td>
                          </tr>
                          <tr>
                            <td className="py-0.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>Base EXP:</td>
                            <td className="py-0.5 font-bold">{getCurrentForm().base_experience || 'N/A'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {getFlavorText() && (
                    <div className="border-t border-gray-600 pt-3">
                      <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Description:</h4>
                      <p className="text-xs leading-tight" style={{ color: 'var(--text-primary)' }}>
                        {getFlavorText()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Separator Line */}
                <hr className="border-gray-600 my-4" />

                {/* Abilities and Species Info Row */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Abilities Section */}
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Abilities</h3>
                    <div className="space-y-1">
                      {getCurrentForm().abilities.map((abilityInfo, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <span className="capitalize text-xs font-semibold">
                            {abilityInfo.ability.name.replace('-', ' ')}
                          </span>
                          {abilityInfo.is_hidden && (
                            <span className="text-xs px-1.5 py-0.5 bg-purple-600 text-white rounded">Hidden</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Species Info Section */}
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Species Info</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between py-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Capture Rate:</span>
                        <span className="text-xs font-bold">{data.species.capture_rate}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Base Happiness:</span>
                        <span className="text-xs font-bold">{data.species.base_happiness}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator Line */}
                <hr className="border-gray-600 my-4" />

                {/* Base Stats Section */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Base Stats</h3>
                  <div className="space-y-0.5">
                    {getCurrentForm().stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-16 sm:w-20 text-xs font-semibold capitalize" style={{ color: 'var(--text-secondary)' }}>
                          {stat.stat.name.replace('-', ' ')}
                        </div>
                        <div className="w-8 sm:w-12 text-xs sm:text-sm font-bold text-right" style={{ color: 'var(--text-primary)' }}>
                          {stat.base_stat}
                        </div>
                        <div className="flex-1 bg-gray-600 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-green-500 h-1 rounded-full"
                            style={{ width: `${Math.min(stat.base_stat / 255 * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separator Line */}
                <hr className="border-gray-600 my-4" />

                {/* Evolution Chain Section */}
                {data.evolutionChain && (
                  <div className="mb-4">
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Evolution Chain</h3>
                    <div className="overflow-x-auto">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 py-2">
                        {renderEvolutionChain(data.evolutionChain.chain)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Separator Line */}
                <hr className="border-gray-600 my-4" />

                {/* Moves Section */}
                <div>
                  <button
                    onClick={() => setMovesExpanded(!movesExpanded)}
                    className="w-full flex justify-between items-center text-base font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span>Moves ({getCurrentForm().moves.length})</span>
                    <span>{movesExpanded ? '▼' : '▶'}</span>
                  </button>
                  {movesExpanded && (
                    <>
                      {/* Desktop Table Layout */}
                      <div className="hidden md:block border border-gray-600 rounded-lg overflow-hidden">
                        <div className="max-h-96 overflow-y-auto overflow-x-auto">
                          <table className="w-full text-xs min-w-full">
                            <thead className="sticky top-0 bg-gray-800 z-10 shadow-lg">
                              <tr className="border-b-2 border-gray-600">
                                <th className="text-left p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-32" style={{ color: 'var(--text-primary)' }}>Move</th>
                                <th className="text-center p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-20" style={{ color: 'var(--text-primary)' }}>Type</th>
                                <th className="text-center p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-24" style={{ color: 'var(--text-primary)' }}>Category</th>
                                <th className="text-center p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-16" style={{ color: 'var(--text-primary)' }}>Power</th>
                                <th className="text-center p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-12" style={{ color: 'var(--text-primary)' }}>PP</th>
                                <th className="text-center p-3 font-semibold bg-gray-800 whitespace-nowrap min-w-16" style={{ color: 'var(--text-primary)' }}>Acc</th>
                                <th className="text-left p-3 font-semibold bg-gray-800 min-w-48" style={{ color: 'var(--text-primary)' }}>Effect</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getCurrentForm().moves
                                .map((move) => {
                                  const moveName = move.move.name
                                  const moveData = getMoveData(moveName)
                                  return { moveName, moveData }
                                })
                                .sort((a, b) => {
                                  // Sort by type first, then by name
                                  const typeA = a.moveData?.type || 'zzz'
                                  const typeB = b.moveData?.type || 'zzz'
                                  if (typeA !== typeB) return typeA.localeCompare(typeB)
                                  return a.moveName.localeCompare(b.moveName)
                                })
                                .map(({ moveName, moveData }, index) => (
                                  <tr 
                                    key={index} 
                                    className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                                  >
                                    <td className="p-3 whitespace-nowrap">
                                      <div className="capitalize font-medium text-white text-sm">
                                        {moveName.replace('-', ' ')}
                                      </div>
                                    </td>
                                    <td className="p-3 text-center">
                                      {moveData && (
                                        <span 
                                          className="inline-block px-3 py-1 rounded text-xs font-bold text-white min-w-16 text-center"
                                          style={{ backgroundColor: getMoveTypeColor(moveData.type) }}
                                        >
                                          {moveData.type.toUpperCase()}
                                        </span>
                                      )}
                                      {!moveData && <span style={{ color: 'var(--text-muted)' }}>—</span>}
                                    </td>
                                    <td className="p-3 text-center">
                                      {moveData && (
                                        <span 
                                          className={`inline-block px-3 py-1 rounded text-xs font-medium capitalize min-w-16 text-center ${
                                            moveData.damageClass === 'physical' 
                                              ? 'bg-red-600 text-white' 
                                              : moveData.damageClass === 'special'
                                              ? 'bg-blue-600 text-white'
                                              : 'bg-gray-600 text-white'
                                          }`}
                                        >
                                          {moveData.damageClass}
                                        </span>
                                      )}
                                      {!moveData && <span style={{ color: 'var(--text-muted)' }}>—</span>}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {moveData?.power ? (
                                        <span className="font-semibold text-white text-sm">{moveData.power}</span>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {moveData?.pp !== null && moveData?.pp !== undefined ? (
                                        <span className="text-white text-sm">{moveData.pp}</span>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {moveData?.accuracy ? (
                                        <span className="text-white text-sm">{moveData.accuracy}%</span>
                                      ) : moveData?.accuracy === null && moveData ? (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      {moveData?.shortEffect ? (
                                        <div className="text-xs max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                          {moveData.shortEffect.length > 80 
                                            ? `${moveData.shortEffect.substring(0, 80)}...`
                                            : moveData.shortEffect
                                          }
                                          {moveData.effectChance && (
                                            <span className="ml-1 text-orange-400 font-semibold">
                                              ({moveData.effectChance}%)
                                            </span>
                                          )}
                                        </div>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>No data available</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="flex justify-center items-center p-2 bg-gray-800 text-xs border-t border-gray-600">
                          <div style={{ color: 'var(--text-muted)' }}>
                            All {getCurrentForm().moves.length} moves • 937 in database
                          </div>
                        </div>
                      </div>

                      {/* Mobile Card Layout */}
                      <div className="md:hidden">
                        <div className="max-h-96 overflow-y-auto space-y-2">
                          {getCurrentForm().moves
                            .map((move) => {
                              const moveName = move.move.name
                              const moveData = getMoveData(moveName)
                              return { moveName, moveData }
                            })
                            .sort((a, b) => {
                              // Sort by type first, then by name
                              const typeA = a.moveData?.type || 'zzz'
                              const typeB = b.moveData?.type || 'zzz'
                              if (typeA !== typeB) return typeA.localeCompare(typeB)
                              return a.moveName.localeCompare(b.moveName)
                            })
                            .map(({ moveName, moveData }, index) => (
                              <div 
                                key={index} 
                                className="bg-gray-700 rounded-lg p-3 border border-gray-600"
                              >
                                {/* Move Name and Type */}
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="capitalize font-bold text-white text-sm">
                                    {moveName.replace('-', ' ')}
                                  </h4>
                                  {moveData && (
                                    <span 
                                      className="inline-block px-3 py-1 rounded text-xs font-bold text-white"
                                      style={{ backgroundColor: getMoveTypeColor(moveData.type) }}
                                    >
                                      {moveData.type.toUpperCase()}
                                    </span>
                                  )}
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center gap-3 mb-2">
                                  {/* Category */}
                                  {moveData && (
                                    <span 
                                      className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${
                                        moveData.damageClass === 'physical' 
                                          ? 'bg-red-600 text-white' 
                                          : moveData.damageClass === 'special'
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-600 text-white'
                                      }`}
                                    >
                                      {moveData.damageClass}
                                    </span>
                                  )}

                                  {/* Power */}
                                  <div className="text-xs">
                                    <span style={{ color: 'var(--text-secondary)' }}>Power: </span>
                                    <span className="font-semibold text-white">
                                      {moveData?.power || '—'}
                                    </span>
                                  </div>

                                  {/* PP */}
                                  <div className="text-xs">
                                    <span style={{ color: 'var(--text-secondary)' }}>PP: </span>
                                    <span className="text-white">
                                      {moveData?.pp !== null && moveData?.pp !== undefined ? moveData.pp : '—'}
                                    </span>
                                  </div>

                                  {/* Accuracy */}
                                  <div className="text-xs">
                                    <span style={{ color: 'var(--text-secondary)' }}>Acc: </span>
                                    <span className="text-white">
                                      {moveData?.accuracy ? `${moveData.accuracy}%` : '—'}
                                    </span>
                                  </div>
                                </div>

                                {/* Effect */}
                                {moveData?.shortEffect && (
                                  <div className="mt-2 pt-2 border-t border-gray-600">
                                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                      {moveData.shortEffect.length > 100 
                                        ? `${moveData.shortEffect.substring(0, 100)}...`
                                        : moveData.shortEffect
                                      }
                                      {moveData.effectChance && (
                                        <span className="ml-1 text-orange-400 font-semibold">
                                          ({moveData.effectChance}%)
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {!moveData && (
                                  <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                                    Move data not available
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                        
                        <div className="flex justify-center items-center p-3 bg-gray-800 text-xs border border-gray-600 rounded-lg mt-2">
                          <div style={{ color: 'var(--text-muted)' }}>
                            All {getCurrentForm().moves.length} moves • 937 in database
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modern-card">
            <div className="text-center py-8">
              <div className="text-lg" style={{ color: 'var(--text-primary)' }}>
                Failed to load Pokemon data
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}