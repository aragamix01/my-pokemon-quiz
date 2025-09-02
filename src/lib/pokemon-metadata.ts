import { PokemonMetadata, GenerationsDatabase } from '@/types/pokemon-metadata'

// Import metadata databases
let pokemonMetadata: PokemonMetadata[] = []
let generationsData: GenerationsDatabase = {}

// Dynamic imports to handle cases where data might not exist yet
try {
  pokemonMetadata = require('@/data/pokemon-metadata.json')
} catch (error) {
  console.warn('Pokemon metadata not found. Run: node scripts/fetch-pokemon-metadata.js')
}

try {
  generationsData = require('@/data/pokemon-generations.json')
} catch (error) {
  console.warn('Pokemon generations data not found. Run: node scripts/fetch-pokemon-metadata.js')
}

export interface SortOption {
  value: string
  label: string
  field: keyof PokemonMetadata | 'total_stats'
  direction: 'asc' | 'desc'
}

export interface FilterOptions {
  search?: string
  types?: string[]
  generation?: number
  isLegendary?: boolean
  isMythical?: boolean
  habitat?: string
  color?: string
  minStats?: number
  maxStats?: number
}

// Available sort options
export const SORT_OPTIONS: SortOption[] = [
  { value: 'id_asc', label: 'Pokedex Number (Low to High)', field: 'id', direction: 'asc' },
  { value: 'id_desc', label: 'Pokedex Number (High to Low)', field: 'id', direction: 'desc' },
  { value: 'name_asc', label: 'Name (A-Z)', field: 'name', direction: 'asc' },
  { value: 'name_desc', label: 'Name (Z-A)', field: 'name', direction: 'desc' },
  { value: 'total_stats_desc', label: 'Total Stats (High to Low)', field: 'total_stats', direction: 'desc' },
  { value: 'total_stats_asc', label: 'Total Stats (Low to High)', field: 'total_stats', direction: 'asc' },
  { value: 'height_desc', label: 'Height (Tallest)', field: 'height', direction: 'desc' },
  { value: 'height_asc', label: 'Height (Shortest)', field: 'height', direction: 'asc' },
  { value: 'weight_desc', label: 'Weight (Heaviest)', field: 'weight', direction: 'desc' },
  { value: 'weight_asc', label: 'Weight (Lightest)', field: 'weight', direction: 'asc' }
]

// Available Pokemon types for filtering
export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

// Available habitats for filtering
export const POKEMON_HABITATS = [
  'cave', 'forest', 'grassland', 'mountain', 'rare', 'rough-terrain',
  'sea', 'urban', 'waters-edge'
]

// Available colors for filtering
export const POKEMON_COLORS = [
  'black', 'blue', 'brown', 'gray', 'green', 'pink',
  'purple', 'red', 'white', 'yellow'
]

// Generation data with emojis for UI
export const POKEMON_GENERATIONS = [
  { id: 1, name: 'Kanto', emoji: '🔥', region: 'Kanto' },
  { id: 2, name: 'Johto', emoji: '🌙', region: 'Johto' },
  { id: 3, name: 'Hoenn', emoji: '🌊', region: 'Hoenn' },
  { id: 4, name: 'Sinnoh', emoji: '⭐', region: 'Sinnoh' },
  { id: 5, name: 'Unova', emoji: '⚡', region: 'Unova' },
  { id: 6, name: 'Kalos', emoji: '✨', region: 'Kalos' },
  { id: 7, name: 'Alola', emoji: '🌺', region: 'Alola' },
  { id: 8, name: 'Galar', emoji: '⚔️', region: 'Galar' },
  { id: 9, name: 'Paldea', emoji: '🌟', region: 'Paldea' }
]

class PokemonMetadataService {
  /**
   * Get all Pokemon metadata
   */
  getAllMetadata(): PokemonMetadata[] {
    return pokemonMetadata
  }

  /**
   * Get metadata for Pokemon by generation
   */
  getMetadataByGeneration(generation: number): PokemonMetadata[] {
    return pokemonMetadata.filter(p => p.generation === generation)
  }

  /**
   * Get Pokemon metadata by ID
   */
  getMetadataById(id: number): PokemonMetadata | undefined {
    return pokemonMetadata.find(p => p.id === id)
  }

  /**
   * Get generations data
   */
  getGenerationsData(): GenerationsDatabase {
    return generationsData
  }

  /**
   * Search and filter Pokemon metadata
   */
  searchAndFilter(options: FilterOptions): PokemonMetadata[] {
    let results = [...pokemonMetadata]

    // Filter by generation
    if (options.generation) {
      results = results.filter(p => p.generation === options.generation)
    }

    // Enhanced search by name or species name
    if (options.search && options.search.trim()) {
      const searchTerm = options.search.toLowerCase().trim()
      
      // Normalize search term and Pokemon names for better matching
      const normalizeString = (str: string) => {
        return str
          .toLowerCase()
          .replace(/[àáâäãåā]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôöõø]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ñ]/g, 'n')
          .replace(/[ç]/g, 'c')
          .replace(/['-]/g, '') // Remove hyphens and apostrophes
          .replace(/\s+/g, '') // Remove spaces
      }
      
      const normalizedSearchTerm = normalizeString(searchTerm)
      
      results = results.filter(p => {
        const normalizedName = normalizeString(p.name)
        const normalizedSpecies = normalizeString(p.species_name)
        
        return (
          normalizedName.includes(normalizedSearchTerm) ||
          normalizedSpecies.includes(normalizedSearchTerm) ||
          p.name.toLowerCase().includes(searchTerm) ||
          p.species_name.toLowerCase().includes(searchTerm)
        )
      })
    }

    // Filter by types
    if (options.types && options.types.length > 0) {
      results = results.filter(p => 
        options.types!.some(type => p.types.includes(type))
      )
    }

    // Filter by legendary/mythical status
    if (options.isLegendary !== undefined) {
      results = results.filter(p => p.is_legendary === options.isLegendary)
    }

    if (options.isMythical !== undefined) {
      results = results.filter(p => p.is_mythical === options.isMythical)
    }

    // Filter by habitat
    if (options.habitat) {
      results = results.filter(p => p.habitat === options.habitat)
    }

    // Filter by color
    if (options.color) {
      results = results.filter(p => p.color === options.color)
    }

    // Filter by total stats range
    if (options.minStats !== undefined) {
      results = results.filter(p => p.total_stats >= options.minStats!)
    }

    if (options.maxStats !== undefined) {
      results = results.filter(p => p.total_stats <= options.maxStats!)
    }

    return results
  }

  /**
   * Sort Pokemon metadata
   */
  sortMetadata(metadata: PokemonMetadata[], sortOption: SortOption): PokemonMetadata[] {
    return [...metadata].sort((a, b) => {
      let valueA = a[sortOption.field] as any
      let valueB = b[sortOption.field] as any

      // Handle string comparisons
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      // Handle null values
      if (valueA === null || valueA === undefined) valueA = sortOption.direction === 'asc' ? '' : 'zzz'
      if (valueB === null || valueB === undefined) valueB = sortOption.direction === 'asc' ? '' : 'zzz'

      if (sortOption.direction === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
      }
    })
  }

  /**
   * Get Pokemon IDs for a generation (for lazy loading)
   */
  getPokemonIdsForGeneration(generation: number): number[] {
    return this.getMetadataByGeneration(generation)
      .map(p => p.id)
      .sort((a, b) => a - b)
  }

  /**
   * Check if metadata is available
   */
  isMetadataAvailable(): boolean {
    return pokemonMetadata.length > 0
  }

  /**
   * Get summary statistics
   */
  getStatsSummary(metadata: PokemonMetadata[]) {
    if (metadata.length === 0) {
      return {
        total: 0,
        legendary: 0,
        mythical: 0,
        avgStats: 0,
        typeDistribution: {}
      }
    }

    const typeDistribution: Record<string, number> = {}
    let totalStats = 0

    metadata.forEach(p => {
      totalStats += p.total_stats
      p.types.forEach(type => {
        typeDistribution[type] = (typeDistribution[type] || 0) + 1
      })
    })

    return {
      total: metadata.length,
      legendary: metadata.filter(p => p.is_legendary).length,
      mythical: metadata.filter(p => p.is_mythical).length,
      avgStats: Math.round(totalStats / metadata.length),
      typeDistribution
    }
  }
}

// Export singleton instance
export const pokemonMetadataService = new PokemonMetadataService()
export { pokemonMetadata, generationsData }