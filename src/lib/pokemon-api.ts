import Pokedex from 'pokedex-promise-v2'
import { Pokemon, PokemonSpecies, Generation, GenerationNumber, EvolutionChain } from '@/types/pokemon'

const P = new Pokedex()

export class PokemonAPI {
  private cache = new Map<string, any>()

  private async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }
    const result = await fetcher()
    this.cache.set(key, result)
    return result
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

  getSilhouetteUrl(pokemon: Pokemon): string {
    return pokemon.sprites.other['official-artwork'].front_default || 
           pokemon.sprites.front_default || 
           '/pokemon-placeholder.png'
  }

  async getPreviousNextPokemon(currentId: number, generation: GenerationNumber): Promise<{previous: Pokemon | null, next: Pokemon | null}> {
    const allPokemon = await this.getPokemonsByGeneration(generation)
    const sortedPokemon = allPokemon.sort((a, b) => a.id - b.id)
    
    const currentIndex = sortedPokemon.findIndex(p => p.id === currentId)
    
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }
    
    const previous = currentIndex > 0 ? sortedPokemon[currentIndex - 1] : null
    const next = currentIndex < sortedPokemon.length - 1 ? sortedPokemon[currentIndex + 1] : null
    
    return { previous, next }
  }

}

export const pokemonAPI = new PokemonAPI()