/**
 * Pokemon Abilities Utilities
 * Service class and utilities for the abilities JSON database
 */

import { AbilityData, AbilitiesDatabase } from '@/types/pokemon-abilities'

// Import the JSON database
import abilitiesDatabase from '@/data/pokemon-abilities.json'

export interface AbilitySearchOptions {
  query?: string
  generation?: string
  onlyHidden?: boolean
  onlyMainSeries?: boolean
  minPokemonCount?: number
  maxPokemonCount?: number
}

export interface AbilitySortOptions {
  field: 'name' | 'displayName' | 'pokemonCount' | 'id' | 'generation'
  direction: 'asc' | 'desc'
}

export class AbilitiesService {
  private database: AbilitiesDatabase

  constructor() {
    this.database = abilitiesDatabase as AbilitiesDatabase
  }

  /**
   * Get all abilities
   */
  getAllAbilities(): Record<string, AbilityData> {
    return this.database.abilities
  }

  /**
   * Get ability by name
   */
  getAbility(name: string): AbilityData | null {
    return this.database.abilities[name] || null
  }

  /**
   * Get abilities by IDs
   */
  getAbilitiesByIds(ids: number[]): AbilityData[] {
    return Object.values(this.database.abilities)
      .filter(ability => ids.includes(ability.id))
      .sort((a, b) => a.id - b.id)
  }

  /**
   * Search and filter abilities
   */
  searchAndFilter(options: AbilitySearchOptions = {}): AbilityData[] {
    let results = Object.values(this.database.abilities)

    // Text search
    if (options.query) {
      const query = options.query.toLowerCase()
      results = results.filter(ability =>
        ability.name.toLowerCase().includes(query) ||
        ability.displayName.toLowerCase().includes(query) ||
        ability.effect.toLowerCase().includes(query) ||
        ability.shortEffect.toLowerCase().includes(query)
      )
    }

    // Filter by generation
    if (options.generation) {
      results = results.filter(ability => ability.generation === options.generation)
    }

    // Filter hidden abilities
    if (options.onlyHidden) {
      results = results.filter(ability => 
        ability.pokemon.some(pokemon => pokemon.isHidden)
      )
    }

    // Filter main series abilities
    if (options.onlyMainSeries) {
      results = results.filter(ability => ability.isMainSeries)
    }

    // Filter by Pokemon count
    if (options.minPokemonCount !== undefined) {
      results = results.filter(ability => ability.pokemonCount >= options.minPokemonCount!)
    }

    if (options.maxPokemonCount !== undefined) {
      results = results.filter(ability => ability.pokemonCount <= options.maxPokemonCount!)
    }

    return results
  }

  /**
   * Sort abilities
   */
  sortAbilities(abilities: AbilityData[], options: AbilitySortOptions): AbilityData[] {
    const { field, direction } = options

    return [...abilities].sort((a, b) => {
      let aVal = a[field]
      let bVal = b[field]

      // Handle null values
      if (aVal === null && bVal === null) return 0
      if (aVal === null) return direction === 'asc' ? 1 : -1
      if (bVal === null) return direction === 'asc' ? -1 : 1

      // Handle string comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  /**
   * Get abilities statistics
   */
  getStats() {
    return this.database.stats
  }

  /**
   * Get database metadata
   */
  getMetadata() {
    return this.database.metadata
  }

  /**
   * Get abilities by generation
   */
  getAbilitiesByGeneration(generation?: string): Record<string, AbilityData[]> {
    const abilities = Object.values(this.database.abilities)
    
    if (generation) {
      return {
        [generation]: abilities.filter(ability => ability.generation === generation)
      }
    }

    // Group by all generations
    const grouped: Record<string, AbilityData[]> = {}
    abilities.forEach(ability => {
      const gen = ability.generation || 'unknown'
      if (!grouped[gen]) {
        grouped[gen] = []
      }
      grouped[gen].push(ability)
    })

    return grouped
  }

  /**
   * Get most common abilities
   */
  getMostCommon(limit = 10): AbilityData[] {
    return this.database.stats.mostCommon.slice(0, limit).map(stat => 
      this.database.abilities[stat.name]
    ).filter(Boolean)
  }

  /**
   * Get rarest abilities  
   */
  getRarest(limit = 10): AbilityData[] {
    return this.database.stats.rarest.slice(0, limit).map(stat =>
      this.database.abilities[stat.name]
    ).filter(Boolean)
  }

  /**
   * Get abilities that affect specific Pokemon
   */
  getAbilitiesForPokemon(pokemonName: string): AbilityData[] {
    return Object.values(this.database.abilities).filter(ability =>
      ability.pokemon.some(pokemon => pokemon.name === pokemonName)
    )
  }

  /**
   * Get hidden abilities
   */
  getHiddenAbilities(): AbilityData[] {
    return Object.values(this.database.abilities).filter(ability =>
      ability.pokemon.some(pokemon => pokemon.isHidden)
    )
  }

  /**
   * Get abilities with changes over versions
   */
  getAbilitiesWithChanges(): AbilityData[] {
    return Object.values(this.database.abilities).filter(ability =>
      ability.changes && ability.changes.length > 0
    )
  }

  /**
   * Search abilities by effect
   */
  searchByEffect(query: string): AbilityData[] {
    const lowerQuery = query.toLowerCase()
    return Object.values(this.database.abilities).filter(ability =>
      ability.effect.toLowerCase().includes(lowerQuery) ||
      ability.shortEffect.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get database summary for display
   */
  getSummary() {
    return {
      totalAbilities: this.database.metadata.totalAbilities,
      hiddenAbilities: this.database.stats.hiddenAbilities,
      mainSeriesAbilities: this.database.stats.mainSeries,
      byGeneration: this.database.stats.byGeneration,
      lastUpdated: this.database.metadata.lastUpdated,
      mostCommon: this.database.stats.mostCommon.slice(0, 5),
      rarest: this.database.stats.rarest.slice(0, 5)
    }
  }
}

// Export singleton instance for easy use
export const abilitiesService = new AbilitiesService()

// Export utility functions for direct use
export const getAllAbilities = () => abilitiesService.getAllAbilities()
export const getAbility = (name: string) => abilitiesService.getAbility(name)
export const searchAbilities = (options: AbilitySearchOptions) => abilitiesService.searchAndFilter(options)
export const sortAbilities = (abilities: AbilityData[], options: AbilitySortOptions) => abilitiesService.sortAbilities(abilities, options)
export const getAbilitiesStats = () => abilitiesService.getStats()
export const getAbilitiesForPokemon = (pokemonName: string) => abilitiesService.getAbilitiesForPokemon(pokemonName)
export const getHiddenAbilities = () => abilitiesService.getHiddenAbilities()