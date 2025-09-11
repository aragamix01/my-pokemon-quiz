import Pokedex from 'pokedex-promise-v2'
import { Pokemon, PokemonSpecies, Generation, GenerationNumber, EvolutionChain } from '@/types/pokemon'

const P = new Pokedex()

export class PokemonAPI {
  private cache = new Map<string, any>()
  private pendingRequests = new Map<string, Promise<any>>()

  private async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // Return cached result if available
    if (this.cache.has(key)) {
      console.log(`🎯 Cache HIT for ${key}`)
      return this.cache.get(key)
    }
    
    // Return pending request if already in progress (prevents duplicate requests)
    if (this.pendingRequests.has(key)) {
      console.log(`⏳ Using pending request for ${key}`)
      return this.pendingRequests.get(key)
    }
    
    // Start new request and cache the promise
    console.log(`🔄 Making API call for ${key}`)
    const promise = fetcher()
    this.pendingRequests.set(key, promise)
    
    try {
      const result = await promise
      this.cache.set(key, result)
      this.pendingRequests.delete(key)
      console.log(`✅ Cached result for ${key}`)
      return result
    } catch (error) {
      this.pendingRequests.delete(key)
      console.error(`❌ Failed request for ${key}:`, error)
      throw error
    }
  }

  async getGeneration(genNumber: GenerationNumber): Promise<Generation> {
    return this.getCached(`gen-${genNumber}`, () => P.getGenerationByName(genNumber))
  }

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return this.getCached(`pokemon-${nameOrId}`, async () => {
      try {
        return await P.getPokemonByName(nameOrId)
      } catch (error) {
        // If direct lookup fails, try to get the species and use the first variety
        if (typeof nameOrId === 'string') {
          try {
            const species = await P.getPokemonSpeciesByName(nameOrId)
            if (species.varieties && species.varieties.length > 0) {
              const firstVariety = species.varieties[0].pokemon.name
              return await P.getPokemonByName(firstVariety)
            }
          } catch (speciesError) {
            // If species lookup also fails, throw the original error
          }
        }
        throw error
      }
    })
  }

  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    return this.getCached(`species-${nameOrId}`, () => P.getPokemonSpeciesByName(nameOrId))
  }

  async getEvolutionChain(id: number): Promise<EvolutionChain> {
    return this.getCached(`evolution-chain-${id}`, () => P.getEvolutionChainById(id))
  }

  async getEvolutionChainFromSpecies(species: PokemonSpecies): Promise<EvolutionChain> {
    const evolutionChainId = parseInt(species.evolution_chain.url.split('/').slice(-2, -1)[0])
    return this.getEvolutionChain(evolutionChainId)
  }

  async getPokemonsByGeneration(genNumber: GenerationNumber): Promise<Pokemon[]> {
    const generation = await this.getGeneration(genNumber)
    
    // Extract ID from species URL and use that instead of name
    const pokemonPromises = generation.pokemon_species
      .map(species => {
        // Extract ID from URL like "https://pokeapi.co/api/v2/pokemon-species/1/"
        const speciesId = species.url.split('/').slice(-2, -1)[0]
        return this.getPokemon(parseInt(speciesId))
      })
    
    return Promise.all(pokemonPromises)
  }

  async getRandomPokemonFromGeneration(genNumber: GenerationNumber, count: number = 4): Promise<Pokemon[]> {
    const allPokemon = await this.getPokemonsByGeneration(genNumber)
    const shuffled = allPokemon.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Get Pokemon image URL - Optimized WebP sprites with variant form support
  getPokemonImageUrl(pokemon: Pokemon, shiny: boolean = false): string {
    const pokemonId = pokemon.id
    const pokemonName = pokemon.name
    
    // Check if this is a variant form by ID ranges or name patterns
    const isVariantForm = this.isVariantFormPokemon(pokemonId, pokemonName)
    
    if (isVariantForm) {
      // For variant forms, use the forms directory with the Pokemon ID
      if (shiny) {
        return `/sprites/optimized/pokemon-forms/shiny/${pokemonId}.webp`
      } else {
        return `/sprites/optimized/pokemon-forms/${pokemonId}.webp`
      }
    }
    
    if (shiny) {
      // Try local shiny WebP artwork first
      return `/sprites/optimized/pokemon-artwork/shiny/${pokemonId}.webp`
    } else {
      // For normal sprites, use local optimized WebP sprites
      return `/sprites/optimized/pokemon-artwork/${pokemonId}.webp`
    }
  }
  
  // Helper function to determine if a Pokemon is a variant form
  private isVariantFormPokemon(pokemonId: number, pokemonName: string): boolean {
    // Check by complete ID range (more reliable) - all variant forms from 10001 to 10277
    // This includes Mega, Primal, Alolan, Galarian, Hisuian, Paldean, and other variant forms
    const isInIdRange = pokemonId >= 10001 && pokemonId <= 10277
    
    // Also check by name patterns as fallback for edge cases
    const isInNamePattern = pokemonName.includes('-alola') || pokemonName.includes('-galar') || 
                           pokemonName.includes('-hisui') || pokemonName.includes('-paldea') ||
                           pokemonName.includes('-mega') || pokemonName.includes('-primal') ||
                           pokemonName.includes('-origin') || pokemonName.includes('-altered')
    
    return isInIdRange || isInNamePattern
  }
  
  // Get fallback URLs with optimized WebP, variant forms, and GitHub backup support
  getPokemonImageFallbacks(pokemon: Pokemon, shiny: boolean = false): string[] {
    const pokemonId = pokemon.id
    const pokemonName = pokemon.name
    
    // Check if this is a variant form using the same logic as getPokemonImageUrl
    const isVariantForm = this.isVariantFormPokemon(pokemonId, pokemonName)
    
    if (isVariantForm) {
      // Variant form fallbacks - use ID-based paths
      const fallbacks: string[] = []
      
      if (shiny) {
        // For shiny variants, try shiny form first, then regular form
        fallbacks.push(`/sprites/optimized/pokemon-forms/shiny/${pokemonId}.webp`)
        fallbacks.push(`/sprites/optimized/pokemon-forms/${pokemonId}.webp`)
      } else {
        fallbacks.push(`/sprites/optimized/pokemon-forms/${pokemonId}.webp`)
      }
      
      // Add GitHub fallbacks for variants
      const artwork = pokemon.sprites.other?.['official-artwork']
      const regularSprites = pokemon.sprites
      
      if (shiny) {
        if (artwork?.front_shiny) fallbacks.push(artwork.front_shiny)
        if (regularSprites.front_shiny) fallbacks.push(regularSprites.front_shiny)
        // Fallback to non-shiny if shiny doesn't exist
        if (artwork?.front_default) fallbacks.push(artwork.front_default)
        if (regularSprites.front_default) fallbacks.push(regularSprites.front_default)
      } else {
        if (artwork?.front_default) fallbacks.push(artwork.front_default)
        if (regularSprites.front_default) fallbacks.push(regularSprites.front_default)
      }
      
      fallbacks.push('/pokemon-placeholder.png')
      return fallbacks
    }
    
    if (shiny) {
      // Shiny fallbacks - optimized WebP first, PNG fallback, then GitHub backup
      const fallbacks: string[] = [
        `/sprites/optimized/pokemon-artwork/shiny/${pokemonId}.webp`,
        `/sprites/pokemon-artwork/shiny/${pokemonId}.png` // PNG fallback
      ]
      
      // Add GitHub fallbacks as backup
      const artwork = pokemon.sprites.other?.['official-artwork']
      const regularSprites = pokemon.sprites
      if (artwork?.front_shiny) fallbacks.push(artwork.front_shiny)
      if (regularSprites.front_shiny) fallbacks.push(regularSprites.front_shiny)
      fallbacks.push('/pokemon-placeholder.png')
      return fallbacks
    } else {
      // Normal sprite fallbacks - WebP first, PNG fallback, then placeholder
      return [
        `/sprites/optimized/pokemon-artwork/${pokemonId}.webp`,
        `/sprites/pokemon-artwork/${pokemonId}.png`, // PNG fallback
        '/pokemon-placeholder.png'
      ]
    }
  }

  getSilhouetteUrl(pokemon: Pokemon): string {
    return this.getPokemonImageUrl(pokemon, false)
  }

  async getPreviousNextPokemon(currentId: number, generation: GenerationNumber): Promise<{previous: Pokemon | null, next: Pokemon | null}> {
    // Use local metadata instead of fetching all Pokemon (much faster!)
    const { pokemonMetadataService } = await import('@/lib/pokemon-metadata')
    
    // Get Pokemon IDs for this generation from metadata (instant, no API calls)
    const pokemonIds = pokemonMetadataService.getPokemonIdsForGeneration(generation)
    const sortedIds = pokemonIds.sort((a, b) => a - b)
    
    const currentIndex = sortedIds.findIndex(id => id === currentId)
    
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }
    
    // Only fetch the specific previous/next Pokemon if they exist (2 API calls max instead of 100+)
    let previous: Pokemon | null = null
    let next: Pokemon | null = null
    
    if (currentIndex > 0) {
      const previousId = sortedIds[currentIndex - 1]
      previous = await this.getPokemon(previousId)
    }
    
    if (currentIndex < sortedIds.length - 1) {
      const nextId = sortedIds[currentIndex + 1] 
      next = await this.getPokemon(nextId)
    }
    
    return { previous, next }
  }

}

export const pokemonAPI = new PokemonAPI()