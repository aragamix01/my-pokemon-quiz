'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Pokemon, PokemonSpecies, EvolutionChain as EvolutionChainData, GenerationNumber } from '@/types/pokemon'
import EvolutionChain from '@/components/EvolutionChain'
import { pokemonAPI } from '@/lib/pokemon-api'
import { extractPokemonTypes } from '@/lib/type-effectiveness'
import { getMoveData, getMoveTypeColor, hasMoveData } from '@/lib/moves-utils'
import { getAbility } from '@/lib/abilities-utils'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import PokemonImage from '@/components/PokemonImage'
import PokemonStatsChart from '@/components/PokemonStatsChart'
import PokemonTypeEffectiveness from '@/components/PokemonTypeEffectiveness'
import PokedexEntries from '@/components/PokedexEntries'
import StatRanks from '@/components/StatRanks'
import GamePokedexes from '@/components/GamePokedexes'
import { HoloCard } from '@/components/ui/HoloCard'
import { PokeballMark } from '@/components/ui/PokeballMark'
import { getTypeCardColor } from '@/lib/type-card-colors'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/cn'
import { markViewed } from '@/lib/recently-viewed'
import { formatPokemonName } from '@/lib/pokemon-names'
import PokemonArt from '@/components/learn/PokemonArt'
import { CaretLeft, CaretRight, Sparkle, SpeakerHigh, CaretDown, CaretUp } from '@phosphor-icons/react'

interface PokemonData {
  pokemon: Pokemon
  species: PokemonSpecies
  evolutionChain: EvolutionChainData | null
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
  const [previousPokemon, setPreviousPokemon] = useState<{ id: number; name: string } | null>(null)
  const [nextPokemon, setNextPokemon] = useState<{ id: number; name: string } | null>(null)

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
      // ?form=<id> opens straight on that form (links from the Type Chart)
      const formIndex = allForms.findIndex(f => String(f.id) === searchParams.get('form'))
      setSelectedForm(formIndex > 0 ? formIndex : 0)

      markViewed(species.id)

      // Previous / next: within the generation when browsing one, else by national number
      const generation = searchParams.get('gen')
      const neighbour = (id: number) => {
        const meta = pokemonMetadataService.getMetadataById(id)
        return meta ? { id: meta.id, name: formatPokemonName(meta.species_name) } : null
      }
      setPreviousPokemon(neighbour(species.id - 1))
      setNextPokemon(neighbour(species.id + 1))
      if (generation) {
        const genNumber = parseInt(generation) as GenerationNumber
        console.log('Loading navigation for Pokemon', pokemon.id, 'in generation', genNumber)
        const { previous, next } = await pokemonAPI.getPreviousNextPokemon(pokemon.id, genNumber)
        console.log('Navigation data:', { previous: previous?.id, next: next?.id })
        setPreviousPokemon(previous ? { id: previous.id, name: formatPokemonName(previous.species?.name || previous.name) } : null)
        setNextPokemon(next ? { id: next.id, name: formatPokemonName(next.species?.name || next.name) } : null)
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
    return data?.species.names.find(name => name.language.name === 'ja-roma')?.name || 
           data?.species.names.find(name => name.language.name === 'ja')?.name || ''
  }

  const getEnglishName = () => {
    return data?.species.names.find(name => name.language.name === 'en')?.name || data?.pokemon.name || ''
  }

  // Card color from the current form's first type, same palette as the Pokedex cards
  const getTypeColorForPage = () => getTypeCardColor(getCurrentForm()?.types[0]?.type.name ?? 'normal')

  // Category such as "Flame Pokémon"
  const getGenus = () => {
    return data?.species.genera?.find(g => g.language.name === 'en')?.genus || ''
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

  // Shared label/value row so every stat in the info panels lines up on the
  // same two-column grid regardless of whether the value is text, a tag or a bar.
  const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-3 py-1">
      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <div className="flex items-center justify-end gap-3 min-w-0">{children}</div>
    </div>
  )

  // Link to another Pokemon (or one of its forms), keeping the generation for prev/next navigation
  const evolutionHref = (speciesId: number, formId?: number) => {
    const params = new URLSearchParams()
    const generation = searchParams.get('gen')
    if (generation) params.set('gen', generation)
    if (formId) params.set('form', String(formId))
    const query = params.toString()
    return query ? `/pokemon/${speciesId}?${query}` : `/pokemon/${speciesId}`
  }

  const navigateToPokemon = (pokemonId: number) => {
    const generation = searchParams.get('gen')
    router.push(generation ? `/pokemon/${pokemonId}?gen=${generation}` : `/pokemon/${pokemonId}`)
  }


  // Section tabs follow the scroll: the last section whose top passed the tab bar is highlighted
  const [activeSection, setActiveSection] = useState('about')
  useEffect(() => {
    if (!data) return
    const onScroll = () => {
      let current = 'about'
      for (const s of DETAIL_SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top < 160) current = s.id
      }
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const DETAIL_SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'stats', label: 'Stats' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'matchups', label: 'Matchups' },
    { id: 'games', label: 'Games' },
    { id: 'moves', label: 'Moves' },
  ]

  const titleBlock = data && (
    <div className="min-w-0">
      <span className="font-number text-sm sm:text-base font-bold" style={{ color: 'var(--color-accent)' }}>
        #{String(data.species.id).padStart(4, '0')}
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold leading-none mt-1" style={{ color: 'var(--color-text)' }}>
        {getEnglishName()}
      </h1>
      <p className="text-base sm:text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
        {getJapaneseName() && <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{getJapaneseName()}</span>}
        {getJapaneseName() && getGenus() ? ' · ' : ''}
        {getGenus()}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top bar: back to the Pokedex, previous / next within the generation */}
        <div className="flex items-center gap-2 mb-5">
          <Button
            variant="secondary"
            onClick={() => {
              const generation = searchParams.get('gen')
              router.push(`/?section=pokedex${generation ? `&gen=${generation}` : ''}`)
            }}
          >
            <CaretLeft size={16} weight="bold" /> Pokédex
          </Button>
          <div className="flex-1" />
          {previousPokemon && (
            <Button
              variant="secondary"
              onClick={() => navigateToPokemon(previousPokemon.id)}
              aria-label={`Previous: ${previousPokemon.name}`}
              title={`Previous: ${previousPokemon.name}`}
            >
              <CaretLeft size={16} weight="bold" />
              <PokemonArt id={previousPokemon.id} alt="" className="w-8 h-8 -my-1 hidden sm:block" />
              <span className="font-number text-xs" style={{ color: 'var(--text-secondary)' }}>#{previousPokemon.id.toString().padStart(4, '0')}</span>
              <span className="hidden sm:inline capitalize">{previousPokemon.name}</span>
            </Button>
          )}
          {nextPokemon && (
            <Button
              variant="secondary"
              onClick={() => navigateToPokemon(nextPokemon.id)}
              aria-label={`Next: ${nextPokemon.name}`}
              title={`Next: ${nextPokemon.name}`}
            >
              <span className="hidden sm:inline capitalize">{nextPokemon.name}</span>
              <span className="font-number text-xs" style={{ color: 'var(--text-secondary)' }}>#{nextPokemon.id.toString().padStart(4, '0')}</span>
              <PokemonArt id={nextPokemon.id} alt="" className="w-8 h-8 -my-1 hidden sm:block" />
              <CaretRight size={16} weight="bold" />
            </Button>
          )}
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-6 lg:gap-8 animate-pulse">
            <div className="h-[380px] sm:h-[460px] rounded-[26px]" style={{ background: 'var(--color-neutral-800)' }} />
            <div className="space-y-4">
              <div className="h-12 w-2/3 rounded-xl" style={{ background: 'var(--color-neutral-800)' }} />
              <div className="h-10 w-full rounded-full" style={{ background: 'var(--color-neutral-800)' }} />
              <div className="h-64 rounded-2xl" style={{ background: 'var(--color-neutral-800)' }} />
            </div>
          </div>
        ) : data ? (
          <div className="nx-detail">
          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* Left: the holo card, sticky on desktop */}
            <div className="lg:sticky lg:top-4 flex flex-col gap-4 min-w-0">
              <div className="lg:hidden">{titleBlock}</div>
              {/* Artwork and types on a foil panel in the first type's color, like a holo trading card */}
              <HoloCard
                autoShine={5000}
                finish="random"
                seed={data.species.id}
                glow="idle"
                glowColor={getTypeColorForPage()}
                className="rounded-[26px] h-[380px] sm:h-[460px]"
                style={{ background: getTypeColorForPage() }}
              >
                <PokeballMark
                  className="absolute -right-16 -bottom-14 w-72 h-72 sm:w-80 sm:h-80 pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                />
                <span
                  className="absolute left-5 bottom-3 font-number font-bold text-6xl sm:text-7xl leading-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.26)' }}
                  aria-hidden
                >
                  {String(data.species.id).padStart(3, '0')}
                </span>
                <div className="absolute inset-x-4 top-4 flex items-center gap-2 z-[1]">
                  {getCurrentForm().types.map((typeInfo, index) => (
                    <span key={index} className="nx-typecard-pill lg nx-typecard-text">
                      {typeInfo.type.name}
                    </span>
                  ))}
                  <div className="flex-1" />
                  <button
                    type="button"
                    className="dex-iconbtn"
                    onClick={playPokemonCry}
                    disabled={!getCurrentForm()?.cries?.latest || audioPlaying}
                    aria-label="Play cry"
                    title="Play cry"
                  >
                    <SpeakerHigh size={20} weight={audioPlaying ? 'fill' : 'bold'} />
                  </button>
                  <button
                    type="button"
                    className="dex-iconbtn"
                    onClick={() => setShowShiny(!showShiny)}
                    disabled={!getAllForms()[selectedForm]?.shiny}
                    aria-pressed={showShiny}
                    aria-label={showShiny ? 'Show normal colors' : 'Show shiny colors'}
                    title={showShiny ? 'Normal colors' : 'Shiny colors'}
                    style={showShiny ? { background: '#fff', color: getTypeColorForPage() } : undefined}
                  >
                    <Sparkle size={20} weight={showShiny ? 'fill' : 'bold'} />
                  </button>
                </div>
                <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80">
                  <Image
                    src={getCurrentSprite() || '/pokemon-placeholder.png'}
                    alt={getEnglishName()}
                    fill
                    className="object-contain drop-shadow-xl"
                    draggable={false}
                    priority
                  />
                </div>
              </HoloCard>

              {/* Forms */}
              {getAllForms().length > 1 && (
                <div className="card" style={{ padding: 16 }}>
                  <h2 className="nx-label">Forms</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {getAllForms().map((form, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedForm(index)}
                        aria-pressed={selectedForm === index}
                        className={cn('nx-tab sm', selectedForm === index && 'nx-tab-active')}
                      >
                        {form.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: title, section tabs and sections. min-w-0 lets long rows (entry games, moves) scroll instead of widening the page */}
            <div className="min-w-0 flex flex-col gap-5">
              <div className="hidden lg:block">{titleBlock}</div>

              <nav aria-label="Sections" className="nx-sectionnav">
                {DETAIL_SECTIONS.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(activeSection === s.id && 'on')}
                    aria-current={activeSection === s.id ? 'location' : undefined}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <section id="about" className="card nx-section">
                <h2 className="nx-section-title">About</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    ['Height', `${(getCurrentForm().height / 10).toFixed(1)} m`],
                    ['Weight', `${(getCurrentForm().weight / 10).toFixed(1)} kg`],
                    ['Generation', data.species.generation?.name.replace('generation-', 'Gen ').toUpperCase().replace('GEN', 'Gen') || 'Unknown'],
                    ['Habitat', data.species.habitat ? data.species.habitat.name.replace('-', ' ').replace(/^./, c => c.toUpperCase()) : 'Unknown'],
                    ['Catch rate', `${data.species.capture_rate}`],
                    ['Base EXP', `${getCurrentForm().base_experience || 'N/A'}`],
                  ].map(([label, value]) => (
                    <div key={label} className="nx-tile">
                      <span className="nx-label">{label}</span>
                      <span className="font-display text-xl font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
                <PokedexEntries key={data.species.id} species={data.species} />

                <div className="hr" />

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
                          <div key={index} className="rounded-md overflow-hidden" style={{ border: '1px solid var(--color-neutral-800)' }}>
                            {/* Ability Header */}
                            <button
                              onClick={() => setExpandedAbility(isExpanded ? null : abilityInfo.ability.name)}
                              className="w-full flex items-center justify-between p-3 transition-colors"
                              style={{ backgroundColor: isExpanded ? 'var(--color-neutral-900)' : 'transparent' }}
                            >
                              <div className="flex items-center gap-3">
                                <span className="capitalize text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                  {abilityData?.displayName || abilityInfo.ability.name.replace('-', ' ')}
                                </span>
                                {abilityInfo.is_hidden && (
                                  <span className="tag tag-accent">Hidden</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {abilityData && (
                                  <span className="tag tag-neutral">
                                    Gen {abilityData.generation?.replace('generation-', '').toUpperCase() || '?'}
                                  </span>
                                )}
                                {isExpanded ? <CaretUp size={14} color="var(--color-neutral-400)" /> : <CaretDown size={14} color="var(--color-neutral-400)" />}
                              </div>
                            </button>

                            {/* Expanded Content */}
                            {isExpanded && abilityData && (
                              <div className="p-3 pt-0" style={{ borderTop: '1px solid var(--color-neutral-800)' }}>
                                {/* Short Effect */}
                                {abilityData.shortEffect && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Quick Summary:</h5>
                                    <p className="text-sm" style={{ color: 'var(--color-accent-300)' }}>
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
                              <div className="p-3 pt-0" style={{ borderTop: '1px solid var(--color-neutral-800)' }}>
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

                  {/* Species & Breeding - every row shares the same label/value grid */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Species Info</h3>
                      <div>
                        <InfoRow label="Capture Rate:">
                          <div className="flex-1">
                            <ProgressBar value={data.species.capture_rate} max={255} />
                          </div>
                          <span className="text-xs font-bold tabular-nums w-14 text-right">{data.species.capture_rate}/255</span>
                        </InfoRow>
                        <InfoRow label="Friendship:">
                          <div className="flex-1">
                            <ProgressBar value={data.species.base_happiness || 0} max={255} />
                          </div>
                          <span className="text-xs font-bold tabular-nums w-14 text-right">{data.species.base_happiness}/255</span>
                        </InfoRow>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Breeding Info</h3>
                      {getBreedingData() ? (
                        <div>
                          <InfoRow label="Growth Rate:">
                            <span className="tag tag-accent capitalize">
                              {getBreedingData()!.growthRate?.replace('-', ' ') || 'Unknown'}
                            </span>
                          </InfoRow>
                          <InfoRow label="Egg Groups:">
                            <div className="flex flex-wrap justify-end gap-1">
                              {getBreedingData()!.eggGroups.map((group, index) => (
                                <span key={index} className="tag tag-neutral">
                                  {formatEggGroup(group)}
                                </span>
                              ))}
                            </div>
                          </InfoRow>
                        </div>
                      ) : (
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          Breeding information not available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section id="stats" className="card nx-section">
                <h2 className="nx-section-title">Base stats</h2>
                <PokemonStatsChart stats={getCurrentForm().stats} showTotal={true} />
                <StatRanks stats={getCurrentForm().stats} />
              </section>

              {data.evolutionChain && (
                <section id="evolution" className="card nx-section">
                  <h2 className="nx-section-title">Evolution</h2>
                  <EvolutionChain
                    chain={data.evolutionChain.chain}
                    currentSpeciesId={data.species.id}
                    currentFormId={getCurrentForm()?.id}
                    hrefFor={evolutionHref}
                  />
                </section>
              )}

              <section id="matchups" className="card nx-section">
                <h2 className="nx-section-title">Damage taken</h2>
                <PokemonTypeEffectiveness types={extractPokemonTypes(getCurrentForm())} />
              </section>

              <section id="games" className="card nx-section">
                <GamePokedexes speciesId={data.species.id} />
              </section>

              {/* Moves Section */}
              <div id="moves" className="card nx-section">
                  <button
                    onClick={() => setMovesExpanded(!movesExpanded)}
                    className="w-full flex justify-between items-center text-base font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span>Moves ({getCurrentForm().moves.length})</span>
                    {movesExpanded ? <CaretUp size={16} color="var(--color-neutral-400)" /> : <CaretDown size={16} color="var(--color-neutral-400)" />}
                  </button>
                  {movesExpanded && (
                    <>
                      {/* Desktop Table Layout */}
                      <div className="hidden md:block rounded-md overflow-hidden" style={{ border: '1px solid var(--color-neutral-800)' }}>
                        <div className="max-h-96 overflow-y-auto overflow-x-auto">
                          <table className="w-full text-xs min-w-full">
                            <thead className="sticky top-0 z-10" style={{ background: 'var(--color-surface)' }}>
                              <tr style={{ borderBottom: '2px solid var(--color-neutral-800)' }}>
                                <th className="text-left p-3 font-semibold whitespace-nowrap min-w-32" style={{ color: 'var(--text-primary)' }}>Move</th>
                                <th className="text-center p-3 font-semibold whitespace-nowrap min-w-20" style={{ color: 'var(--text-primary)' }}>Type</th>
                                <th className="text-center p-3 font-semibold whitespace-nowrap min-w-24" style={{ color: 'var(--text-primary)' }}>Category</th>
                                <th className="text-center p-3 font-semibold whitespace-nowrap min-w-16" style={{ color: 'var(--text-primary)' }}>Power</th>
                                <th className="text-center p-3 font-semibold whitespace-nowrap min-w-12" style={{ color: 'var(--text-primary)' }}>PP</th>
                                <th className="text-center p-3 font-semibold whitespace-nowrap min-w-16" style={{ color: 'var(--text-primary)' }}>Acc</th>
                                <th className="text-left p-3 font-semibold min-w-48" style={{ color: 'var(--text-primary)' }}>Effect</th>
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
                                    style={{ borderBottom: "1px solid var(--color-neutral-800)" }}
                                  >
                                    <td className="p-3 whitespace-nowrap">
                                      <div className="capitalize font-medium text-[color:var(--color-text)] text-sm">
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
                                        <span className="font-semibold text-[color:var(--color-text)] text-sm">{moveData.power}</span>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {moveData?.pp !== null && moveData?.pp !== undefined ? (
                                        <span className="text-[color:var(--color-text)] text-sm">{moveData.pp}</span>
                                      ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {moveData?.accuracy ? (
                                        <span className="text-[color:var(--color-text)] text-sm">{moveData.accuracy}%</span>
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
                        
                        <div className="flex justify-center items-center p-2 text-xs" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-neutral-800)" }}>
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
                                className="rounded-md p-3" style={{ background: "var(--color-surface)", border: "1px solid var(--color-neutral-800)" }}
                              >
                                {/* Move Name and Type */}
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="capitalize font-bold text-[color:var(--color-text)] text-sm">
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
                                    <span className="font-semibold text-[color:var(--color-text)]">
                                      {moveData?.power || '—'}
                                    </span>
                                  </div>

                                  {/* PP */}
                                  <div className="text-xs">
                                    <span style={{ color: 'var(--text-secondary)' }}>PP: </span>
                                    <span className="text-[color:var(--color-text)]">
                                      {moveData?.pp !== null && moveData?.pp !== undefined ? moveData.pp : '—'}
                                    </span>
                                  </div>

                                  {/* Accuracy */}
                                  <div className="text-xs">
                                    <span style={{ color: 'var(--text-secondary)' }}>Acc: </span>
                                    <span className="text-[color:var(--color-text)]">
                                      {moveData?.accuracy ? `${moveData.accuracy}%` : '—'}
                                    </span>
                                  </div>
                                </div>

                                {/* Effect */}
                                {moveData?.shortEffect && (
                                  <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--color-neutral-800)" }}>
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
                        
                        <div className="flex justify-center items-center p-3 text-xs rounded-md mt-2" style={{ background: "var(--color-surface)", border: "1px solid var(--color-neutral-800)" }}>
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