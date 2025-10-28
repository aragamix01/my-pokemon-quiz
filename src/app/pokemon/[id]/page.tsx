'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Pokemon, PokemonSpecies, EvolutionChain, EvolutionChainLink, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { getTypeIcon, extractPokemonTypes } from '@/lib/type-effectiveness'
import { getMoveData, getMoveTypeColor, hasMoveData } from '@/lib/moves-utils'
import { getAbility } from '@/lib/abilities-utils'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import PokemonImage from '@/components/PokemonImage'
import PokemonStatsChart from '@/components/PokemonStatsChart'
import PokemonTypeEffectiveness from '@/components/PokemonTypeEffectiveness'

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
  const [expandedAbility, setExpandedAbility] = useState<string | null>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [selectedForm, setSelectedForm] = useState(0)
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null)
  const [nextPokemon, setNextPokemon] = useState<Pokemon | null>(null)

  const loadPokemonData = useCallback(async () => {
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
  }, [resolvedParams.id, searchParams])

  useEffect(() => {
    if (resolvedParams.id) {
      loadPokemonData()
    }
  }, [resolvedParams.id, loadPokemonData])

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

  const getBreedingData = () => {
    if (!data?.pokemon) return null
    
    const metadata = pokemonMetadataService.getMetadataById(data.pokemon.id)
    if (!metadata) return null

    return {
      eggGroups: metadata.egg_groups,
      growthRate: metadata.growth_rate,
      captureRate: data.species.capture_rate,
      baseHappiness: data.species.base_happiness
    }
  }

  const formatEggGroup = (eggGroup: string) => {
    return eggGroup.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getGrowthRateColor = (growthRate: string) => {
    const colors: { [key: string]: string } = {
      'slow': '#e74c3c',
      'medium-slow': '#e67e22', 
      'medium': '#f39c12',
      'medium-fast': '#27ae60',
      'fast': '#2ecc71',
      'erratic': '#9b59b6',
      'fluctuating': '#3498db'
    }
    return colors[growthRate] || '#95a5a6'
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
        normal: pokemonAPI.getPokemonImageUrl(form, false),
        shiny: pokemonAPI.getPokemonImageUrl(form, true)
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
    // Use optimized local WebP items first, with API URL fallback
    return `/sprites/optimized/items/${itemName}.webp`
  }
  
  const getEvolutionPokemonImageUrl = (pokemonId: number) => {
    // Create a temporary Pokemon-like object for image URL generation
    const tempPokemon = {
      id: pokemonId,
      name: '', // We don't need name for ID-based variant form detection
    } as Pokemon
    
    // Use the improved image URL logic with variant form support
    return pokemonAPI.getPokemonImageUrl(tempPokemon, false)
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
              src={getEvolutionPokemonImageUrl(parseInt(chainLink.species.url.split('/').slice(-2, -1)[0]))}
              alt={pokemonName}
              fill
              className="object-contain"
              draggable={false}
              onError={(e) => {
                // Better fallback chain for evolution sprites
                const target = e.target as HTMLImageElement
                const pokemonId = parseInt(chainLink.species.url.split('/').slice(-2, -1)[0])
                
                if (target.src.includes('/pokemon-artwork/')) {
                  // Try variant forms directory if artwork fails
                  target.src = `/sprites/optimized/pokemon-forms/${pokemonId}.webp`
                } else if (target.src.includes('/pokemon-forms/')) {
                  // Final fallback to placeholder
                  target.src = '/pokemon-placeholder.png'
                } else if (target.src.includes('.webp')) {
                  // Try PNG fallback (legacy)
                  target.src = `/sprites/pokemon-artwork/${pokemonId}.png`
                } else {
                  target.src = '/pokemon-placeholder.png'
                }
              }}
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
                    draggable={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const itemName = evolution.evolution_details[0].item?.name
                      
                      if (target.src.includes('optimized/items') && target.src.includes('.webp')) {
                        // Fallback to non-optimized PNG
                        target.src = `/sprites/items/${itemName}.png`
                      } else if (target.src.includes('/sprites/items/') && target.src.includes('.png')) {
                        // Fallback to GitHub API URL
                        target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png`
                      } else {
                        // Final fallback: show gem icon
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = '<span class="text-sm">💎</span>'
                        }
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
              router.push(`/?section=pokedex${generation ? `&gen=${generation}` : ''}`)
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
          <div className="modern-card p-4" style={{ opacity: 1, transform: 'none' }}>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Left Side - Sprite, Types, Controls */}
              <div className="flex-shrink-0 lg:w-48 w-full">
                {/* Pokemon Sprite */}
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <Image
                    src={getCurrentSprite() || '/pokemon-placeholder.png'}
                    alt={getEnglishName()}
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                </div>
                
                {/* Types under sprite */}
                <div className="text-center mb-4">
                  <div className="flex gap-2 justify-center">
                    {getCurrentForm().types.map((typeInfo, index) => (
                      <Image
                        key={index}
                        src={getTypeIcon(typeInfo.type.name as any)}
                        alt={typeInfo.type.name}
                        width={70}
                        height={70}
                        className="object-contain"
                        draggable={false}
                        title={typeInfo.type.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Shiny and Cries buttons */}
                <div className="flex gap-2 justify-center mb-4">
                  <button
                    onClick={() => setShowShiny(!showShiny)}
                    className={`modern-button text-xs px-3 py-2 ${showShiny ? 'bg-yellow-500' : ''}`}
                    disabled={!getAllForms()[selectedForm]?.shiny}
                  >
                    ✨ {showShiny ? 'Normal' : 'Shiny'}
                  </button>
                  <button
                    onClick={playPokemonCry}
                    className={`modern-button text-xs px-3 py-2 ${audioPlaying ? 'bg-blue-500' : ''}`}
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

                {/* Type Effectiveness Section - In Sidebar */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold mb-2 text-center lg:text-left" style={{ color: 'var(--text-primary)' }}>Type Effectiveness</h4>
                  <PokemonTypeEffectiveness types={extractPokemonTypes(getCurrentForm())} />
                </div>
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
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>ID:</td>
                            <td className="py-1 font-bold">#{data.pokemon.id.toString().padStart(3, '0')}</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Name:</td>
                            <td className="py-1 font-bold">{getEnglishName()}</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Romaji:</td>
                            <td className="py-1 font-bold">{getJapaneseName() || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Height:</td>
                            <td className="py-1 font-bold">{(getCurrentForm().height / 10).toFixed(1)} m</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table className="w-full text-xs">
                        <tbody>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Weight:</td>
                            <td className="py-1 font-bold">{(getCurrentForm().weight / 10).toFixed(1)} kg</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Generation:</td>
                            <td className="py-1 font-bold capitalize">{data.species.generation?.name.replace('generation-', 'Gen ') || 'Unknown'}</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Habitat:</td>
                            <td className="py-1 font-bold capitalize">{data.species.habitat?.name || 'Unknown'}</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-semibold" style={{ color: 'var(--text-secondary)' }}>Base EXP:</td>
                            <td className="py-1 font-bold">{getCurrentForm().base_experience || 'N/A'}</td>
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
                    <div className="space-y-2">
                      {getCurrentForm().abilities.map((abilityInfo, index) => {
                        const abilityData = getAbility(abilityInfo.ability.name)
                        const isExpanded = expandedAbility === abilityInfo.ability.name
                        
                        return (
                          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
                            {/* Ability Header */}
                            <button
                              onClick={() => setExpandedAbility(isExpanded ? null : abilityInfo.ability.name)}
                              className="w-full flex items-center justify-between p-3 hover:bg-gray-700 transition-colors"
                              style={{ backgroundColor: isExpanded ? 'var(--bg-secondary)' : 'transparent' }}
                            >
                              <div className="flex items-center gap-3">
                                <span className="capitalize text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                  {abilityData?.displayName || abilityInfo.ability.name.replace('-', ' ')}
                                </span>
                                {abilityInfo.is_hidden && (
                                  <span className="text-xs px-2 py-1 bg-purple-600 text-white rounded">Hidden</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {abilityData && (
                                  <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded">
                                    Gen {abilityData.generation?.replace('generation-', '').toUpperCase() || '?'}
                                  </span>
                                )}
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                  {isExpanded ? '▼' : '▶'}
                                </span>
                              </div>
                            </button>
                            
                            {/* Expanded Content */}
                            {isExpanded && abilityData && (
                              <div className="p-3 pt-0 border-t border-gray-600">
                                {/* Short Effect */}
                                {abilityData.shortEffect && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Quick Summary:</h5>
                                    <p className="text-sm" style={{ color: 'var(--accent-color)' }}>
                                      {abilityData.shortEffect}
                                    </p>
                                  </div>
                                )}
                                
                                {/* Flavor Text */}
                                {abilityData.flavorText && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Description:</h5>
                                    <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                                      {abilityData.flavorText}
                                    </p>
                                  </div>
                                )}
                                
                                {/* Full Effect */}
                                {abilityData.effect && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Detailed Effect:</h5>
                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                      {abilityData.effect.length > 300 
                                        ? `${abilityData.effect.substring(0, 300)}...`
                                        : abilityData.effect
                                      }
                                    </p>
                                  </div>
                                )}
                                
                                {/* Pokemon Count */}
                                {abilityData.pokemon && (
                                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    Used by {abilityData.pokemon.length} Pokemon
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Fallback if no ability data */}
                            {isExpanded && !abilityData && (
                              <div className="p-3 pt-0 border-t border-gray-600">
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                  Detailed ability information not available.
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
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

                {/* Breeding Information Section */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Breeding Section */}
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Breeding Info</h3>
                    {getBreedingData() ? (
                      <div className="space-y-2">
                        {/* Egg Groups */}
                        <div>
                          <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Egg Groups:</h4>
                          <div className="flex flex-wrap gap-1">
                            {getBreedingData()!.eggGroups.map((group, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: '#2c3e50',
                                  color: '#ecf0f1',
                                  border: '1px solid #34495e'
                                }}
                              >
                                {formatEggGroup(group)}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Growth Rate */}
                        <div className="flex justify-between items-center py-1">
                          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Growth Rate:</span>
                          <span 
                            className="text-xs font-bold px-2 py-1 rounded capitalize"
                            style={{ 
                              backgroundColor: getGrowthRateColor(getBreedingData()!.growthRate || ''),
                              color: 'white'
                            }}
                          >
                            {getBreedingData()!.growthRate?.replace('-', ' ') || 'Unknown'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Breeding information not available
                      </p>
                    )}
                  </div>

                  {/* Additional Breeding Details */}
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Breeding Details</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between py-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Catch Difficulty:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">{data.species.capture_rate}/255</span>
                          <div className="w-12 bg-gray-600 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-green-500 h-1 rounded-full"
                              style={{ width: `${(data.species.capture_rate / 255) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Friendship:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">{data.species.base_happiness}/255</span>
                          <div className="w-12 bg-gray-600 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-green-500 h-1 rounded-full"
                              style={{ width: `${((data.species.base_happiness || 0) / 255) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator Line */}
                <hr className="border-gray-600 my-4" />

                {/* Base Stats Section - Radar Chart */}
                <div className="mb-4">
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Base Stats</h3>
                  <PokemonStatsChart stats={getCurrentForm().stats} showTotal={true} />
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
                                          {moveData.type?.toUpperCase() || 'UNKNOWN'}
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
                                      {moveData.type?.toUpperCase() || 'UNKNOWN'}
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