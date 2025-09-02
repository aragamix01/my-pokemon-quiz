/**
 * Script to fetch Pokemon evolution items from PokeAPI and generate JSON database
 * Focuses only on items used for Pokemon evolution
 * Run with: node scripts/fetch-evolution-items.js
 */

const fs = require('fs')
const path = require('path')

// Delay between API calls to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Known evolution items (will be verified against API)
const EVOLUTION_ITEM_NAMES = [
  // Stones
  'fire-stone', 'water-stone', 'thunder-stone', 'leaf-stone', 'moon-stone', 'sun-stone',
  'shiny-stone', 'dusk-stone', 'dawn-stone', 'ice-stone',
  
  // Hold items for evolution
  'kings-rock', 'metal-coat', 'dragon-scale', 'upgrade', 'protector', 'electirizer',
  'magmarizer', 'dubious-disc', 'reaper-cloth', 'razor-claw', 'razor-fang', 'prism-scale',
  'whipped-dream', 'sachet', 'oval-stone', 'deep-sea-tooth', 'deep-sea-scale',
  
  // Trade evolution items
  'linking-cord',
  
  // Special evolution items
  'sweet-apple', 'tart-apple', 'cracked-pot', 'chipped-pot', 'galarica-cuff', 'galarica-wreath',
  'strawberry-sweet', 'love-sweet', 'berry-sweet', 'clover-sweet', 'flower-sweet', 'star-sweet',
  'ribbon-sweet',
  
  // Gimmighoul items
  'gimmighoul-coin',
  
  // Other evolution items
  'black-augurite', 'peat-block', 'auspicious-armor', 'malicious-armor',
  'scroll-of-darkness', 'scroll-of-waters', 'leaders-crest', 'masterpiece-teacup'
]

async function fetchEvolutionItems() {
  console.log('🚀 Starting to fetch Pokemon evolution items from PokeAPI...')
  
  try {
    const evolutionItems = {}
    let processedCount = 0
    const totalItems = EVOLUTION_ITEM_NAMES.length
    
    console.log(`📋 Processing ${totalItems} evolution items...`)
    
    for (const itemName of EVOLUTION_ITEM_NAMES) {
      try {
        console.log(`⏳ Processing ${itemName} (${processedCount + 1}/${totalItems})...`)
        
        const itemResponse = await fetch(`https://pokeapi.co/api/v2/item/${itemName}`)
        
        if (!itemResponse.ok) {
          console.warn(`⚠️  Item ${itemName} not found, skipping...`)
          continue
        }
        
        const item = await itemResponse.json()
        
        // Extract comprehensive item data
        const itemData = {
          id: item.id,
          name: item.name,
          displayName: item.names.find(n => n.language.name === 'en')?.name || item.name,
          cost: item.cost,
          category: item.category?.name || null,
          attributes: (item.attributes || []).map(attr => attr.name),
          effect: item.effect_entries.find(e => e.language.name === 'en')?.effect || 'No effect description available',
          shortEffect: item.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'Evolution item',
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
          generation: item.generation?.name || null,
          evolutionType: determineEvolutionType(item.name),
          machines: (item.machines || []).map(machine => ({
            machine: machine.machine.url.split('/').slice(-2, -1)[0],
            version: machine.version_group.name
          }))
        }
        
        evolutionItems[item.name] = itemData
        processedCount++
        
        // Rate limiting
        await delay(100)
        
        if (processedCount % 10 === 0) {
          console.log(`📈 Progress: ${processedCount}/${totalItems} items processed (${((processedCount/totalItems) * 100).toFixed(1)}%)`)
        }
        
      } catch (error) {
        console.error(`❌ Error fetching item ${itemName}:`, error.message)
        continue
      }
    }
    
    console.log(`\n📊 Successfully fetched ${Object.keys(evolutionItems).length} evolution items`)
    
    // Create the database structure
    const databaseStructure = {
      metadata: {
        version: "1.0",
        source: "PokeAPI v2",
        description: "Pokemon evolution items database - items used specifically for Pokemon evolution",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalItems: Object.keys(evolutionItems).length
      },
      items: evolutionItems,
      categories: {
        stones: Object.values(evolutionItems).filter(item => 
          item.name.includes('stone') || item.evolutionType === 'stone'
        ).length,
        holdItems: Object.values(evolutionItems).filter(item => 
          item.evolutionType === 'hold'
        ).length,
        tradeItems: Object.values(evolutionItems).filter(item => 
          item.evolutionType === 'trade'
        ).length,
        special: Object.values(evolutionItems).filter(item => 
          item.evolutionType === 'special'
        ).length
      },
      evolutionTypes: {
        stone: Object.values(evolutionItems).filter(item => item.evolutionType === 'stone'),
        hold: Object.values(evolutionItems).filter(item => item.evolutionType === 'hold'),
        trade: Object.values(evolutionItems).filter(item => item.evolutionType === 'trade'),
        special: Object.values(evolutionItems).filter(item => item.evolutionType === 'special')
      }
    }
    
    // Write JSON database
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const jsonPath = path.join(dataDir, 'evolution-items.json')
    fs.writeFileSync(jsonPath, JSON.stringify(databaseStructure, null, 2))
    
    console.log(`📁 JSON Database saved to: ${jsonPath}`)
    console.log(`📊 Database size: ~${Math.round(JSON.stringify(databaseStructure).length / 1024)}KB`)
    
    // Generate TypeScript types
    const typesContent = `// Auto-generated evolution items types
export type EvolutionType = 'stone' | 'hold' | 'trade' | 'special'

export interface EvolutionItemData {
  id: number
  name: string
  displayName: string
  cost: number
  category: string | null
  attributes: string[]
  effect: string
  shortEffect: string
  flavorText: string
  sprite: string | null
  flingPower: number | null
  flingEffect: string | null
  generation: string | null
  evolutionType: EvolutionType
  machines: Array<{
    machine: string
    version: string
  }>
}

export interface EvolutionItemsDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalItems: number
  }
  items: Record<string, EvolutionItemData>
  categories: {
    stones: number
    holdItems: number
    tradeItems: number
    special: number
  }
  evolutionTypes: {
    stone: EvolutionItemData[]
    hold: EvolutionItemData[]
    trade: EvolutionItemData[]
    special: EvolutionItemData[]
  }
}
`
    
    const typesPath = path.join(__dirname, '..', 'src', 'types', 'evolution-items.ts')
    const typesDir = path.dirname(typesPath)
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true })
    }
    fs.writeFileSync(typesPath, typesContent)
    console.log(`✅ TypeScript types saved to: ${typesPath}`)
    
    console.log(`\n🎉 Evolution items database generation complete!`)
    console.log(`📊 Summary:`)
    console.log(`   • Total items: ${Object.keys(evolutionItems).length}`)
    console.log(`   • Evolution stones: ${databaseStructure.categories.stones}`)
    console.log(`   • Hold items: ${databaseStructure.categories.holdItems}`)
    console.log(`   • Trade items: ${databaseStructure.categories.tradeItems}`)
    console.log(`   • Special items: ${databaseStructure.categories.special}`)
    console.log(`   • Database format: JSON`)
    console.log(`   • Storage location: src/data/evolution-items.json`)
    
  } catch (error) {
    console.error('❌ Error generating evolution items database:', error)
    process.exit(1)
  }
}

/**
 * Determine evolution type based on item name and characteristics
 */
function determineEvolutionType(itemName) {
  if (itemName.includes('stone')) {
    return 'stone'
  }
  
  const holdItems = [
    'kings-rock', 'metal-coat', 'dragon-scale', 'upgrade', 'protector', 'electirizer',
    'magmarizer', 'dubious-disc', 'reaper-cloth', 'razor-claw', 'razor-fang', 'prism-scale',
    'deep-sea-tooth', 'deep-sea-scale', 'oval-stone'
  ]
  
  const tradeItems = [
    'linking-cord', 'whipped-dream', 'sachet'
  ]
  
  if (holdItems.includes(itemName)) {
    return 'hold'
  }
  
  if (tradeItems.includes(itemName)) {
    return 'trade'
  }
  
  return 'special'
}

// Run the script
if (require.main === module) {
  fetchEvolutionItems()
}

module.exports = { fetchEvolutionItems }