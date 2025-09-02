/**
 * Script to fetch all Pokemon abilities from PokeAPI and generate JSON database
 * Replaces the old TypeScript database with pure JSON format
 * Run with: node scripts/fetch-abilities-json.js
 */

const fs = require('fs')
const path = require('path')

// Delay between API calls to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchAllAbilities() {
  console.log('🚀 Starting to fetch all Pokemon abilities from PokeAPI...')
  
  try {
    // Collect all abilities using proper pagination
    console.log('📋 Fetching abilities list with pagination...')
    const allAbilitiesRefs = []
    let nextUrl = 'https://pokeapi.co/api/v2/ability?limit=100'
    let pageCount = 1
    
    while (nextUrl) {
      console.log(`📄 Fetching page ${pageCount}...`)
      const response = await fetch(nextUrl)
      const data = await response.json()
      
      console.log(`📊 Page ${pageCount}: Found ${data.results.length} abilities`)
      console.log(`📊 Total count from API: ${data.count}`)
      
      allAbilitiesRefs.push(...data.results)
      nextUrl = data.next
      pageCount++
      
      if (nextUrl) {
        await delay(500)
      }
    }
    
    console.log(`✅ Collected ${allAbilitiesRefs.length} ability references from ${pageCount - 1} pages`)
    
    const allAbilities = {}
    let processedCount = 0
    const totalAbilities = allAbilitiesRefs.length
    
    // Process abilities in batches
    for (const abilityRef of allAbilitiesRefs) {
      try {
        console.log(`⏳ Processing ${abilityRef.name} (${processedCount + 1}/${totalAbilities})...`)
        
        const abilityResponse = await fetch(abilityRef.url)
        const ability = await abilityResponse.json()
        
        // Extract comprehensive ability data
        const abilityData = {
          id: ability.id,
          name: ability.name,
          displayName: ability.names.find(n => n.language.name === 'en')?.name || ability.name,
          isMainSeries: ability.is_main_series,
          generation: ability.generation?.name || null,
          effect: ability.effect_entries.find(e => e.language.name === 'en')?.effect || 'No effect description available',
          shortEffect: ability.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'No short description available',
          flavorText: ability.flavor_text_entries
            .filter(fte => fte.language.name === 'en')
            .map(fte => ({
              text: fte.flavor_text,
              version: fte.version_group.name
            }))
            .slice(-1)[0]?.text || 'No flavor text available',
          pokemon: (ability.pokemon || []).map(p => ({
            name: p.pokemon.name,
            slot: p.slot,
            isHidden: p.is_hidden
          })),
          pokemonCount: ability.pokemon?.length || 0,
          changes: (ability.effect_changes || []).map(change => ({
            version: change.version_group.name,
            effect: change.effect_entries.find(e => e.language.name === 'en')?.effect || 'No effect description'
          }))
        }
        
        allAbilities[ability.name] = abilityData
        processedCount++
        
        // Rate limiting
        await delay(50)
        
        if (processedCount % 25 === 0) {
          console.log(`📈 Progress: ${processedCount}/${totalAbilities} abilities processed (${((processedCount/totalAbilities) * 100).toFixed(1)}%)`)
        }
        
      } catch (error) {
        console.error(`❌ Error fetching ability ${abilityRef.name}:`, error.message)
        continue
      }
    }
    
    console.log(`\n📊 Successfully fetched ${Object.keys(allAbilities).length} abilities`)
    
    // Create the database structure
    const databaseStructure = {
      metadata: {
        version: "1.0",
        source: "PokeAPI v2",
        description: "Complete Pokemon abilities database with all details",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalAbilities: Object.keys(allAbilities).length
      },
      abilities: allAbilities,
      stats: {
        byGeneration: {},
        hiddenAbilities: Object.values(allAbilities).filter(ability => 
          ability.pokemon.some(p => p.isHidden)
        ).length,
        mainSeries: Object.values(allAbilities).filter(ability => 
          ability.isMainSeries
        ).length,
        mostCommon: [],
        rarest: []
      }
    }
    
    // Generate statistics
    Object.values(allAbilities).forEach(ability => {
      // By generation
      const gen = ability.generation || 'unknown'
      databaseStructure.stats.byGeneration[gen] = (databaseStructure.stats.byGeneration[gen] || 0) + 1
    })
    
    // Most common abilities (by Pokemon count)
    const sortedByPopularity = Object.values(allAbilities)
      .sort((a, b) => b.pokemonCount - a.pokemonCount)
    
    databaseStructure.stats.mostCommon = sortedByPopularity.slice(0, 10).map(ability => ({
      name: ability.name,
      displayName: ability.displayName,
      pokemonCount: ability.pokemonCount
    }))
    
    databaseStructure.stats.rarest = sortedByPopularity.slice(-10).map(ability => ({
      name: ability.name,
      displayName: ability.displayName,
      pokemonCount: ability.pokemonCount
    }))
    
    // Write JSON database
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const jsonPath = path.join(dataDir, 'pokemon-abilities.json')
    fs.writeFileSync(jsonPath, JSON.stringify(databaseStructure, null, 2))
    
    console.log(`📁 JSON Database saved to: ${jsonPath}`)
    console.log(`📊 Database size: ~${Math.round(JSON.stringify(databaseStructure).length / 1024)}KB`)
    
    // Generate TypeScript types
    const typesContent = `// Auto-generated Pokemon abilities types
export interface AbilityData {
  id: number
  name: string
  displayName: string
  isMainSeries: boolean
  generation: string | null
  effect: string
  shortEffect: string
  flavorText: string
  pokemon: Array<{
    name: string
    slot: number
    isHidden: boolean
  }>
  pokemonCount: number
  changes: Array<{
    version: string
    effect: string
  }>
}

export interface AbilitiesDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalAbilities: number
  }
  abilities: Record<string, AbilityData>
  stats: {
    byGeneration: Record<string, number>
    hiddenAbilities: number
    mainSeries: number
    mostCommon: Array<{
      name: string
      displayName: string
      pokemonCount: number
    }>
    rarest: Array<{
      name: string
      displayName: string
      pokemonCount: number
    }>
  }
}
`
    
    const typesPath = path.join(__dirname, '..', 'src', 'types', 'pokemon-abilities.ts')
    const typesDir = path.dirname(typesPath)
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true })
    }
    fs.writeFileSync(typesPath, typesContent)
    console.log(`✅ TypeScript types saved to: ${typesPath}`)
    
    console.log(`\n🎉 Pokemon abilities database generation complete!`)
    console.log(`📊 Summary:`)
    console.log(`   • Total abilities: ${Object.keys(allAbilities).length}`)
    console.log(`   • Hidden abilities: ${databaseStructure.stats.hiddenAbilities}`)
    console.log(`   • Main series abilities: ${databaseStructure.stats.mainSeries}`)
    console.log(`   • Database format: JSON`)
    console.log(`   • Storage location: src/data/pokemon-abilities.json`)
    
  } catch (error) {
    console.error('❌ Error generating Pokemon abilities database:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  fetchAllAbilities()
}

module.exports = { fetchAllAbilities }