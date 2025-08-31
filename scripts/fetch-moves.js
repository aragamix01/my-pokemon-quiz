/**
 * Script to fetch all Pokemon moves from PokeAPI and generate a comprehensive database
 * Run with: node scripts/fetch-moves.js
 */

const fs = require('fs')
const path = require('path')

// Node.js 18+ has native fetch support

async function fetchAllMoves() {
  console.log('🚀 Starting to fetch all Pokemon moves from PokeAPI...')
  
  try {
    // Collect all moves using proper pagination
    console.log('📋 Fetching moves list with pagination...')
    const allMovesRefs = []
    let nextUrl = 'https://pokeapi.co/api/v2/move?limit=100'
    let pageCount = 1
    
    while (nextUrl) {
      console.log(`📄 Fetching page ${pageCount}...`)
      const response = await fetch(nextUrl)
      const data = await response.json()
      
      console.log(`📊 Page ${pageCount}: Found ${data.results.length} moves`)
      console.log(`📊 Total count from API: ${data.count}`)
      
      allMovesRefs.push(...data.results)
      nextUrl = data.next
      pageCount++
      
      // Small delay between pages
      if (nextUrl) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    console.log(`✅ Collected ${allMovesRefs.length} move references from ${pageCount - 1} pages`)
    
    const allMoves = {}
    const total = allMovesRefs.length
    
    // Fetch details for each move (in batches to avoid overwhelming the API)
    const batchSize = 50
    for (let i = 0; i < total; i += batchSize) {
      const batch = allMovesRefs.slice(i, i + batchSize)
      console.log(`⏳ Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(total/batchSize)} (moves ${i + 1}-${Math.min(i + batchSize, total)})`)
      
      const promises = batch.map(async (move) => {
        try {
          const response = await fetch(move.url)
          const moveData = await response.json()
          
          // Extract relevant data
          const processedMove = {
            id: moveData.id,
            name: moveData.name,
            type: moveData.type?.name || 'normal',
            power: moveData.power,
            pp: moveData.pp,
            accuracy: moveData.accuracy,
            priority: moveData.priority,
            damageClass: moveData.damage_class?.name || 'status',
            effectChance: moveData.effect_chance,
            effect: moveData.effect_entries?.find(entry => entry.language.name === 'en')?.effect || 'No description available.',
            shortEffect: moveData.effect_entries?.find(entry => entry.language.name === 'en')?.short_effect || 'No description available.',
            generation: moveData.generation?.name || 'unknown',
            contestType: moveData.contest_type?.name || null,
            target: moveData.target?.name || 'selected-pokemon',
            ailment: moveData.meta?.ailment?.name || null,
            category: moveData.meta?.category?.name || null,
            minHits: moveData.meta?.min_hits || null,
            maxHits: moveData.meta?.max_hits || null,
            minTurns: moveData.meta?.min_turns || null,
            maxTurns: moveData.meta?.max_turns || null,
            drain: moveData.meta?.drain || null,
            healing: moveData.meta?.healing || null,
            critRate: moveData.meta?.crit_rate || null,
            ailmentChance: moveData.meta?.ailment_chance || null,
            flinchChance: moveData.meta?.flinch_chance || null,
            statChance: moveData.meta?.stat_chance || null
          }
          
          allMoves[moveData.name] = processedMove
        } catch (error) {
          console.error(`❌ Error fetching ${move.name}:`, error.message)
        }
      })
      
      await Promise.all(promises)
      
      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < total) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Successfully fetched ${Object.keys(allMoves).length} moves`)
    
    // Generate the TypeScript database file
    const tsContent = `/**
 * Complete Pokemon Moves Database
 * Auto-generated from PokeAPI v2
 * Contains all ${Object.keys(allMoves).length} Pokemon moves with comprehensive data
 */

export type MoveDamageClass = 'physical' | 'special' | 'status'
export type MoveCategory = 'damage' | 'ailment' | 'net-good-stats' | 'heal' | 'damage+ailment' | 'swagger' | 'damage+lower' | 'damage+raise' | 'damage+heal' | 'ohko' | 'whole-field-effect' | 'field-effect' | 'force-switch' | 'unique'
export type MoveTarget = 'selected-pokemon' | 'all-other-pokemon' | 'user' | 'random-opponent' | 'all-opponents' | 'entire-field' | 'user-or-ally' | 'user-and-allies' | 'all-pokemon' | 'all-allies' | 'ally' | 'fainting-pokemon' | 'opponents-field' | 'selected-pokemon-me-first' | 'specific-move' | 'users-field'

export interface MoveData {
  id: number
  name: string
  type: string
  power: number | null
  pp: number | null
  accuracy: number | null
  priority: number
  damageClass: MoveDamageClass
  effectChance: number | null
  effect: string
  shortEffect: string
  generation: string
  contestType: string | null
  target: MoveTarget
  ailment: string | null
  category: MoveCategory | null
  minHits: number | null
  maxHits: number | null
  minTurns: number | null
  maxTurns: number | null
  drain: number | null
  healing: number | null
  critRate: number | null
  ailmentChance: number | null
  flinchChance: number | null
  statChance: number | null
}

// Complete Pokemon moves database - ${Object.keys(allMoves).length} moves
export const MOVES_DATABASE: Record<string, MoveData> = ${JSON.stringify(allMoves, null, 2)}

/**
 * Get move data by name
 */
export function getMoveData(moveName: string): MoveData | null {
  const cleanName = moveName.toLowerCase().replace(/\\s+/g, '-')
  return MOVES_DATABASE[cleanName] || null
}

/**
 * Get move type color for display
 */
export function getMoveTypeColor(type: string): string {
  const typeColors: {[key: string]: string} = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
    grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC'
  }
  return typeColors[type] || '#68A090'
}

/**
 * Check if move exists in database
 */
export function hasMoveData(moveName: string): boolean {
  const cleanName = moveName.toLowerCase().replace(/\\s+/g, '-')
  return cleanName in MOVES_DATABASE
}

/**
 * Get all moves of a specific type
 */
export function getMovesByType(type: string): MoveData[] {
  return Object.values(MOVES_DATABASE).filter(move => move.type === type)
}

/**
 * Get all moves of a specific damage class
 */
export function getMovesByDamageClass(damageClass: MoveDamageClass): MoveData[] {
  return Object.values(MOVES_DATABASE).filter(move => move.damageClass === damageClass)
}

/**
 * Search moves by name or effect
 */
export function searchMoves(query: string): MoveData[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(MOVES_DATABASE).filter(move => 
    move.name.toLowerCase().includes(lowerQuery) ||
    move.effect.toLowerCase().includes(lowerQuery) ||
    move.shortEffect.toLowerCase().includes(lowerQuery)
  )
}`
    
    // Write the TypeScript file
    const outputPath = path.join(__dirname, '..', 'src', 'lib', 'moves-database.ts')
    fs.writeFileSync(outputPath, tsContent)
    
    console.log(`📁 Database saved to: ${outputPath}`)
    console.log(`📊 Total moves: ${Object.keys(allMoves).length}`)
    
    // Generate some statistics
    const typeStats = {}
    const classStats = {}
    Object.values(allMoves).forEach(move => {
      typeStats[move.type] = (typeStats[move.type] || 0) + 1
      classStats[move.damageClass] = (classStats[move.damageClass] || 0) + 1
    })
    
    console.log('📈 Type distribution:', typeStats)
    console.log('📈 Damage class distribution:', classStats)
    
    console.log('🎉 Complete! Database generated successfully!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Run the script
fetchAllMoves()