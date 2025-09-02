/**
 * Script to fetch all Pokemon items from PokeAPI and generate JSON database
 * Replaces the old TypeScript database with pure JSON format
 * Run with: node scripts/fetch-items-json.js
 */

const fs = require('fs')
const path = require('path')

// Delay between API calls to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchAllItems() {
  console.log('🚀 Starting to fetch all Pokemon items from PokeAPI...')
  
  try {
    // Collect all items using proper pagination
    console.log('📋 Fetching items list with pagination...')
    const allItemsRefs = []
    let nextUrl = 'https://pokeapi.co/api/v2/item?limit=100'
    let pageCount = 1
    
    while (nextUrl) {
      console.log(`📄 Fetching page ${pageCount}...`)
      const response = await fetch(nextUrl)
      const data = await response.json()
      
      console.log(`📊 Page ${pageCount}: Found ${data.results.length} items`)
      console.log(`📊 Total count from API: ${data.count}`)
      
      allItemsRefs.push(...data.results)
      nextUrl = data.next
      pageCount++
      
      if (nextUrl) {
        await delay(500)
      }
    }
    
    console.log(`✅ Collected ${allItemsRefs.length} item references from ${pageCount - 1} pages`)
    
    const allItems = {}
    let processedCount = 0
    const totalItems = allItemsRefs.length
    
    // Process items in batches
    for (const itemRef of allItemsRefs) {
      try {
        console.log(`⏳ Processing ${itemRef.name} (${processedCount + 1}/${totalItems})...`)
        
        const itemResponse = await fetch(itemRef.url)
        const item = await itemResponse.json()
        
        // Extract comprehensive item data
        const itemData = {
          id: item.id,
          name: item.name,
          displayName: item.names.find(n => n.language.name === 'en')?.name || item.name,
          cost: item.cost,
          category: item.category?.name || null,
          categoryDisplayName: item.category?.names?.find(n => n.language.name === 'en')?.name || null,
          attributes: (item.attributes || []).map(attr => ({
            name: attr.name,
            displayName: attr.names?.find(n => n.language.name === 'en')?.name || attr.name
          })),
          effect: item.effect_entries.find(e => e.language.name === 'en')?.effect || 'No effect description available',
          shortEffect: item.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'No short description available',
          flavorText: item.flavor_text_entries
            .filter(fte => fte.language.name === 'en')
            .map(fte => ({
              text: fte.flavor_text,
              version: fte.version_group.name
            }))
            .slice(-1)[0]?.text || 'No flavor text available',
          sprite: item.sprites?.default || null,
          flingPower: item.fling_power,
          flingEffect: item.fling_effect?.name || null,
          flingEffectDisplayName: item.fling_effect?.names?.find(n => n.language.name === 'en')?.name || null,
          generation: item.generation?.name || null,
          isEvolutionItem: isEvolutionItem(item.name),
          isBattleItem: isBattleItem(item.category?.name),
          isBerry: item.category?.name === 'standard-balls' ? false : item.name.includes('berry'),
          isPokeball: item.category?.name === 'standard-balls' || item.category?.name === 'special-balls',
          machines: (item.machines || []).map(machine => ({
            machine: machine.machine.url.split('/').slice(-2, -1)[0],
            version: machine.version_group.name
          })),
          heldByPokemon: (item.held_by_pokemon || []).map(held => ({
            pokemon: held.pokemon.name,
            rarity: held.version_details.map(vd => ({
              version: vd.version.name,
              rarity: vd.rarity
            }))
          }))
        }
        
        allItems[item.name] = itemData
        processedCount++
        
        // Rate limiting
        await delay(50)
        
        if (processedCount % 50 === 0) {
          console.log(`📈 Progress: ${processedCount}/${totalItems} items processed (${((processedCount/totalItems) * 100).toFixed(1)}%)`)
        }
        
      } catch (error) {
        console.error(`❌ Error fetching item ${itemRef.name}:`, error.message)
        continue
      }
    }
    
    console.log(`\n📊 Successfully fetched ${Object.keys(allItems).length} items`)
    
    // Create the database structure
    const databaseStructure = {
      metadata: {
        version: "1.0",
        source: "PokeAPI v2",
        description: "Complete Pokemon items database with all details",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalItems: Object.keys(allItems).length
      },
      items: allItems,
      stats: {
        byCategory: {},
        byGeneration: {},
        evolutionItems: Object.values(allItems).filter(item => item.isEvolutionItem).length,
        battleItems: Object.values(allItems).filter(item => item.isBattleItem).length,
        berries: Object.values(allItems).filter(item => item.isBerry).length,
        pokeballs: Object.values(allItems).filter(item => item.isPokeball).length,
        costDistribution: {
          free: 0,
          cheap: 0,      // 1-1000
          moderate: 0,   // 1001-5000  
          expensive: 0,  // 5001-20000
          premium: 0     // 20000+
        }
      },
      categories: {}
    }
    
    // Generate statistics
    Object.values(allItems).forEach(item => {
      // By category
      const category = item.category || 'unknown'
      databaseStructure.stats.byCategory[category] = (databaseStructure.stats.byCategory[category] || 0) + 1
      
      // By generation
      const gen = item.generation || 'unknown'
      databaseStructure.stats.byGeneration[gen] = (databaseStructure.stats.byGeneration[gen] || 0) + 1
      
      // Cost distribution
      const cost = item.cost
      if (cost === 0) {
        databaseStructure.stats.costDistribution.free++
      } else if (cost <= 1000) {
        databaseStructure.stats.costDistribution.cheap++
      } else if (cost <= 5000) {
        databaseStructure.stats.costDistribution.moderate++
      } else if (cost <= 20000) {
        databaseStructure.stats.costDistribution.expensive++
      } else {
        databaseStructure.stats.costDistribution.premium++
      }
    })
    
    // Group items by category for easy access
    Object.values(allItems).forEach(item => {
      const category = item.category || 'unknown'
      if (!databaseStructure.categories[category]) {
        databaseStructure.categories[category] = []
      }
      databaseStructure.categories[category].push(item)
    })
    
    // Write JSON database
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const jsonPath = path.join(dataDir, 'pokemon-items.json')
    fs.writeFileSync(jsonPath, JSON.stringify(databaseStructure, null, 2))
    
    console.log(`📁 JSON Database saved to: ${jsonPath}`)
    console.log(`📊 Database size: ~${Math.round(JSON.stringify(databaseStructure).length / 1024)}KB`)
    
    // Generate TypeScript types
    const typesContent = `// Auto-generated Pokemon items types
export interface ItemData {
  id: number
  name: string
  displayName: string
  cost: number
  category: string | null
  categoryDisplayName: string | null
  attributes: Array<{
    name: string
    displayName: string
  }>
  effect: string
  shortEffect: string
  flavorText: string
  sprite: string | null
  flingPower: number | null
  flingEffect: string | null
  flingEffectDisplayName: string | null
  generation: string | null
  isEvolutionItem: boolean
  isBattleItem: boolean
  isBerry: boolean
  isPokeball: boolean
  machines: Array<{
    machine: string
    version: string
  }>
  heldByPokemon: Array<{
    pokemon: string
    rarity: Array<{
      version: string
      rarity: number
    }>
  }>
}

export interface ItemsDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalItems: number
  }
  items: Record<string, ItemData>
  stats: {
    byCategory: Record<string, number>
    byGeneration: Record<string, number>
    evolutionItems: number
    battleItems: number
    berries: number
    pokeballs: number
    costDistribution: {
      free: number
      cheap: number
      moderate: number
      expensive: number
      premium: number
    }
  }
  categories: Record<string, ItemData[]>
}
`
    
    const typesPath = path.join(__dirname, '..', 'src', 'types', 'pokemon-items.ts')
    const typesDir = path.dirname(typesPath)
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true })
    }
    fs.writeFileSync(typesPath, typesContent)
    console.log(`✅ TypeScript types saved to: ${typesPath}`)
    
    console.log(`\n🎉 Pokemon items database generation complete!`)
    console.log(`📊 Summary:`)
    console.log(`   • Total items: ${Object.keys(allItems).length}`)
    console.log(`   • Evolution items: ${databaseStructure.stats.evolutionItems}`)
    console.log(`   • Battle items: ${databaseStructure.stats.battleItems}`)
    console.log(`   • Berries: ${databaseStructure.stats.berries}`)
    console.log(`   • Pokeballs: ${databaseStructure.stats.pokeballs}`)
    console.log(`   • Database format: JSON`)
    console.log(`   • Storage location: src/data/pokemon-items.json`)
    
  } catch (error) {
    console.error('❌ Error generating Pokemon items database:', error)
    process.exit(1)
  }
}

/**
 * Check if item is used for evolution
 */
function isEvolutionItem(itemName) {
  const evolutionItems = [
    'fire-stone', 'water-stone', 'thunder-stone', 'leaf-stone', 'moon-stone', 'sun-stone',
    'shiny-stone', 'dusk-stone', 'dawn-stone', 'ice-stone', 'kings-rock', 'metal-coat',
    'dragon-scale', 'upgrade', 'protector', 'electirizer', 'magmarizer', 'dubious-disc',
    'reaper-cloth', 'razor-claw', 'razor-fang', 'prism-scale', 'whipped-dream', 'sachet',
    'oval-stone', 'deep-sea-tooth', 'deep-sea-scale', 'linking-cord', 'sweet-apple',
    'tart-apple', 'cracked-pot', 'chipped-pot', 'galarica-cuff', 'galarica-wreath',
    'strawberry-sweet', 'love-sweet', 'berry-sweet', 'clover-sweet', 'flower-sweet',
    'star-sweet', 'ribbon-sweet', 'gimmighoul-coin', 'black-augurite', 'peat-block',
    'auspicious-armor', 'malicious-armor', 'scroll-of-darkness', 'scroll-of-waters'
  ]
  return evolutionItems.includes(itemName)
}

/**
 * Check if item is primarily used in battle
 */
function isBattleItem(categoryName) {
  const battleCategories = [
    'stat-boosts', 'effort-drop', 'medicine', 'other', 'in-a-pinch', 
    'picky-healing', 'type-protection', 'baking-only'
  ]
  return battleCategories.includes(categoryName)
}

// Run the script
if (require.main === module) {
  fetchAllItems()
}

module.exports = { fetchAllItems }