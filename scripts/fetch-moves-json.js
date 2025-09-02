/**
 * Script to fetch all Pokemon moves from PokeAPI and generate JSON database
 * Replaces the old TypeScript database with pure JSON format
 * Run with: node scripts/fetch-moves-json.js
 */

const fs = require('fs')
const path = require('path')

// Delay between API calls to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
      
      if (nextUrl) {
        await delay(500)
      }
    }
    
    console.log(`✅ Collected ${allMovesRefs.length} move references from ${pageCount - 1} pages`)
    
    const allMoves = {}
    let processedCount = 0
    const totalMoves = allMovesRefs.length
    
    // Process moves in batches
    for (const moveRef of allMovesRefs) {
      try {
        console.log(`⏳ Processing ${moveRef.name} (${processedCount + 1}/${totalMoves})...`)
        
        const moveResponse = await fetch(moveRef.url)
        const move = await moveResponse.json()
        
        // Extract comprehensive move data
        const moveData = {
          id: move.id,
          name: move.name,
          type: move.type?.name || null,
          power: move.power,
          pp: move.pp,
          accuracy: move.accuracy,
          priority: move.priority,
          damageClass: move.damage_class?.name || null,
          effectChance: move.effect_chance,
          effect: move.effect_entries.find(e => e.language.name === 'en')?.effect || 'No effect description available',
          shortEffect: move.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'No description available',
          generation: move.generation?.name || null,
          contestType: move.contest_type?.name || null,
          target: move.target?.name || null,
          ailment: move.meta?.ailment?.name || null,
          category: move.meta?.category?.name || null,
          minHits: move.meta?.min_hits,
          maxHits: move.meta?.max_hits,
          minTurns: move.meta?.min_turns,
          maxTurns: move.meta?.max_turns,
          drain: move.meta?.drain || 0,
          healing: move.meta?.healing || 0,
          critRate: move.meta?.crit_rate || 0,
          ailmentChance: move.meta?.ailment_chance || 0,
          flinchChance: move.meta?.flinch_chance || 0,
          statChance: move.meta?.stat_chance || 0,
          statChanges: (move.stat_changes || []).map(sc => ({
            stat: sc.stat.name,
            change: sc.change
          })),
          flavorText: move.flavor_text_entries
            .filter(fte => fte.language.name === 'en')
            .map(fte => ({
              text: fte.flavor_text,
              version: fte.version_group.name
            }))
            .slice(-1)[0]?.text || 'No flavor text available', // Get latest version's flavor text
          machines: (move.machines || []).map(machine => ({
            machine: machine.machine.url.split('/').slice(-2, -1)[0],
            version: machine.version_group.name
          }))
        }
        
        allMoves[move.name] = moveData
        processedCount++
        
        // Rate limiting
        await delay(50)
        
        if (processedCount % 50 === 0) {
          console.log(`📈 Progress: ${processedCount}/${totalMoves} moves processed (${((processedCount/totalMoves) * 100).toFixed(1)}%)`)
        }
        
      } catch (error) {
        console.error(`❌ Error fetching move ${moveRef.name}:`, error.message)
        continue
      }
    }
    
    console.log(`\n📊 Successfully fetched ${Object.keys(allMoves).length} moves`)
    
    // Create the database structure
    const databaseStructure = {
      metadata: {
        version: "1.0",
        source: "PokeAPI v2",
        description: "Complete Pokemon moves database with all details",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalMoves: Object.keys(allMoves).length
      },
      moves: allMoves,
      stats: {
        byType: {},
        byDamageClass: {},
        byGeneration: {},
        powerDistribution: {
          noPower: 0,
          low: 0,      // 1-60
          medium: 0,   // 61-90
          high: 0,     // 91-120
          extreme: 0   // 121+
        }
      }
    }
    
    // Generate statistics
    Object.values(allMoves).forEach(move => {
      // By type
      const type = move.type || 'unknown'
      databaseStructure.stats.byType[type] = (databaseStructure.stats.byType[type] || 0) + 1
      
      // By damage class
      const damageClass = move.damageClass || 'unknown'
      databaseStructure.stats.byDamageClass[damageClass] = (databaseStructure.stats.byDamageClass[damageClass] || 0) + 1
      
      // By generation
      const gen = move.generation || 'unknown'
      databaseStructure.stats.byGeneration[gen] = (databaseStructure.stats.byGeneration[gen] || 0) + 1
      
      // Power distribution
      if (!move.power) {
        databaseStructure.stats.powerDistribution.noPower++
      } else if (move.power <= 60) {
        databaseStructure.stats.powerDistribution.low++
      } else if (move.power <= 90) {
        databaseStructure.stats.powerDistribution.medium++
      } else if (move.power <= 120) {
        databaseStructure.stats.powerDistribution.high++
      } else {
        databaseStructure.stats.powerDistribution.extreme++
      }
    })
    
    // Write JSON database
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const jsonPath = path.join(dataDir, 'pokemon-moves.json')
    fs.writeFileSync(jsonPath, JSON.stringify(databaseStructure, null, 2))
    
    console.log(`📁 JSON Database saved to: ${jsonPath}`)
    console.log(`📊 Database size: ~${Math.round(JSON.stringify(databaseStructure).length / 1024)}KB`)
    
    // Generate TypeScript types
    const typesContent = `// Auto-generated Pokemon moves types
export type MoveDamageClass = 'physical' | 'special' | 'status'
export type MoveCategory = 'damage' | 'ailment' | 'net-good-stats' | 'heal' | 'damage+ailment' | 'swagger' | 'damage+lower' | 'damage+raise' | 'damage+heal' | 'ohko' | 'whole-field-effect' | 'field-effect' | 'force-switch' | 'unique'
export type MoveTarget = 'selected-pokemon' | 'all-other-pokemon' | 'user' | 'random-opponent' | 'all-opponents' | 'entire-field' | 'user-or-ally' | 'user-and-allies' | 'all-pokemon' | 'all-allies' | 'ally' | 'fainting-pokemon' | 'opponents-field' | 'selected-pokemon-me-first' | 'specific-move' | 'users-field'

export interface MoveData {
  id: number
  name: string
  type: string | null
  power: number | null
  pp: number | null
  accuracy: number | null
  priority: number
  damageClass: MoveDamageClass | null
  effectChance: number | null
  effect: string
  shortEffect: string
  generation: string | null
  contestType: string | null
  target: MoveTarget | null
  ailment: string | null
  category: MoveCategory | null
  minHits: number | null
  maxHits: number | null
  minTurns: number | null
  maxTurns: number | null
  drain: number
  healing: number
  critRate: number
  ailmentChance: number
  flinchChance: number
  statChance: number
  statChanges: Array<{
    stat: string
    change: number
  }>
  flavorText: string
  machines: Array<{
    machine: string
    version: string
  }>
}

export interface MovesDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalMoves: number
  }
  moves: Record<string, MoveData>
  stats: {
    byType: Record<string, number>
    byDamageClass: Record<string, number>
    byGeneration: Record<string, number>
    powerDistribution: {
      noPower: number
      low: number
      medium: number
      high: number
      extreme: number
    }
  }
}
`
    
    const typesPath = path.join(__dirname, '..', 'src', 'types', 'pokemon-moves.ts')
    const typesDir = path.dirname(typesPath)
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true })
    }
    fs.writeFileSync(typesPath, typesContent)
    console.log(`✅ TypeScript types saved to: ${typesPath}`)
    
    console.log(`\n🎉 Pokemon moves database generation complete!`)
    console.log(`📊 Summary:`)
    console.log(`   • Total moves: ${Object.keys(allMoves).length}`)
    console.log(`   • Database format: JSON`)
    console.log(`   • Storage location: src/data/pokemon-moves.json`)
    
  } catch (error) {
    console.error('❌ Error generating Pokemon moves database:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  fetchAllMoves()
}

module.exports = { fetchAllMoves }