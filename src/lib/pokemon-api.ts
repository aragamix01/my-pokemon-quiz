import Pokedex from 'pokedex-promise-v2'
import { Pokemon, PokemonSpecies, Generation, GenerationNumber } from '@/types/pokemon'

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

  async getPokemonsByGeneration(genNumber: GenerationNumber): Promise<Pokemon[]> {
    const generation = await this.getGeneration(genNumber)
    const pokemonPromises = generation.pokemon_species
      .slice(0, 50) // Limit to first 50 for performance
      .map(species => this.getPokemon(species.name))
    
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
}

export const pokemonAPI = new PokemonAPI()