/**
 * Pokemon Moves Utilities
 * Provides search, filter, and utility functions for moves database
 */

import { MoveData, MovesDatabase } from '@/types/pokemon-moves'

// Import moves database
let movesDatabase: MovesDatabase
try {
  movesDatabase = require('@/data/pokemon-moves.json')
} catch (error) {
  console.warn('Pokemon moves data not found. Run: node scripts/fetch-moves-json.js')
  movesDatabase = {
    metadata: { version: '', source: '', description: '', lastUpdated: '', totalMoves: 0 },
    moves: {},
    stats: { byType: {}, byDamageClass: {}, byGeneration: {}, powerDistribution: { noPower: 0, low: 0, medium: 0, high: 0, extreme: 0 } }
  }
}

export interface MoveSearchOptions {
  query?: string
  type?: string
  damageClass?: string
  generation?: string
  minPower?: number
  maxPower?: number
  minPP?: number
  maxPP?: number
  minAccuracy?: number
  maxAccuracy?: number
  priority?: number
  hasEffect?: boolean
  contestType?: string
  target?: string
}

class MovesService {
  /**
   * Get all moves
   */
  getAllMoves(): Record<string, MoveData> {
    return movesDatabase.moves
  }

  /**
   * Get move by name
   */
  getMoveByName(name: string): MoveData | undefined {
    return movesDatabase.moves[name.toLowerCase().replace(/[^a-z0-9]/g, '-')]
  }

  /**
   * Get moves by type
   */
  getMovesByType(type: string): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.type === type
    )
  }

  /**
   * Get moves by damage class
   */
  getMovesByDamageClass(damageClass: string): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.damageClass === damageClass
    )
  }

  /**
   * Search and filter moves
   */
  searchMoves(options: MoveSearchOptions): MoveData[] {
    let results = Object.values(movesDatabase.moves)

    // Text search in name, effect, and short effect
    if (options.query && options.query.trim()) {
      const searchTerm = options.query.toLowerCase().trim()
      results = results.filter(move =>
        move.name.toLowerCase().includes(searchTerm) ||
        move.effect.toLowerCase().includes(searchTerm) ||
        move.shortEffect.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by type
    if (options.type) {
      results = results.filter(move => move.type === options.type)
    }

    // Filter by damage class
    if (options.damageClass) {
      results = results.filter(move => move.damageClass === options.damageClass)
    }

    // Filter by generation
    if (options.generation) {
      results = results.filter(move => move.generation === options.generation)
    }

    // Filter by power range
    if (options.minPower !== undefined) {
      results = results.filter(move => move.power !== null && move.power >= options.minPower!)
    }
    if (options.maxPower !== undefined) {
      results = results.filter(move => move.power !== null && move.power <= options.maxPower!)
    }

    // Filter by PP range
    if (options.minPP !== undefined) {
      results = results.filter(move => move.pp !== null && move.pp >= options.minPP!)
    }
    if (options.maxPP !== undefined) {
      results = results.filter(move => move.pp !== null && move.pp <= options.maxPP!)
    }

    // Filter by accuracy range
    if (options.minAccuracy !== undefined) {
      results = results.filter(move => move.accuracy !== null && move.accuracy >= options.minAccuracy!)
    }
    if (options.maxAccuracy !== undefined) {
      results = results.filter(move => move.accuracy !== null && move.accuracy <= options.maxAccuracy!)
    }

    // Filter by priority
    if (options.priority !== undefined) {
      results = results.filter(move => move.priority === options.priority)
    }

    // Filter by effect presence
    if (options.hasEffect !== undefined) {
      results = results.filter(move => {
        const hasEffect = move.effect && move.effect !== 'No effect description available'
        return options.hasEffect ? hasEffect : !hasEffect
      })
    }

    // Filter by contest type
    if (options.contestType) {
      results = results.filter(move => move.contestType === options.contestType)
    }

    // Filter by target
    if (options.target) {
      results = results.filter(move => move.target === options.target)
    }

    return results
  }

  /**
   * Get moves statistics
   */
  getStatistics() {
    return movesDatabase.stats
  }

  /**
   * Get database metadata
   */
  getMetadata() {
    return movesDatabase.metadata
  }

  /**
   * Get high power moves (90+ power)
   */
  getHighPowerMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.power !== null && move.power >= 90
    ).sort((a, b) => (b.power || 0) - (a.power || 0))
  }

  /**
   * Get status moves (no damage)
   */
  getStatusMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.damageClass === 'status'
    )
  }

  /**
   * Get moves with stat changes
   */
  getStatChangeMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.statChanges && move.statChanges.length > 0
    )
  }

  /**
   * Get priority moves
   */
  getPriorityMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.priority !== 0
    ).sort((a, b) => b.priority - a.priority)
  }

  /**
   * Get signature moves (unique category moves)
   */
  getSignatureMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.category === 'unique'
    )
  }

  /**
   * Check if moves database is available
   */
  isMovesAvailable(): boolean {
    return Object.keys(movesDatabase.moves).length > 0
  }

  /**
   * Get random moves
   */
  getRandomMoves(count: number = 10): MoveData[] {
    const allMoves = Object.values(movesDatabase.moves)
    const shuffled = allMoves.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  /**
   * Get moves by contest type
   */
  getMovesByContest(contestType: string): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.contestType === contestType
    )
  }

  /**
   * Get OHKO moves
   */
  getOHKOMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.category === 'ohko'
    )
  }

  /**
   * Get healing moves
   */
  getHealingMoves(): MoveData[] {
    return Object.values(movesDatabase.moves).filter(move => 
      move.healing > 0 || move.category === 'heal'
    )
  }
}

// Export singleton instance
export const movesService = new MovesService()
export { movesDatabase }

// Export utility functions for direct use
export const getAllMoves = () => movesService.getAllMoves()
export const getMove = (name: string) => movesService.getMoveByName(name)
export const searchMoves = (options: MoveSearchOptions) => movesService.searchMoves(options)
export const getMovesStats = () => movesService.getStatistics()
export const getMovesByType = (type: string) => movesService.getMovesByType(type)

// Legacy compatibility functions (matching old moves-database.ts API)
export const getMoveData = (moveName: string) => movesService.getMoveByName(moveName) || null
export const hasMoveData = (moveName: string) => movesService.getMoveByName(moveName) !== undefined

/**
 * Get move type color for display (legacy compatibility)
 */
export function getMoveTypeColor(type: string | null): string {
  if (!type) return '#68A090' // Default color for unknown/null types
  
  const typeColors: {[key: string]: string} = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
    grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC'
  }
  return typeColors[type] || '#68A090'
}