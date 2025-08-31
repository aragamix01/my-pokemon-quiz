/**
 * Script to fetch all Pokemon items from PokeAPI and generate a comprehensive database
 * Run with: node scripts/fetch-items.js
 */

const fs = require('fs')
const path = require('path')

// Node.js 18+ has native fetch support

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
      
      // Small delay between pages
      if (nextUrl) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    console.log(`✅ Collected ${allItemsRefs.length} item references from ${pageCount - 1} pages`)
    
    const allItems = {}
    const itemsByCategory = {}
    const total = allItemsRefs.length
    
    // Fetch details for each item (in batches to avoid overwhelming the API)
    const batchSize = 50
    for (let i = 0; i < total; i += batchSize) {
      const batch = allItemsRefs.slice(i, i + batchSize)
      console.log(`⏳ Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(total/batchSize)} (items ${i + 1}-${Math.min(i + batchSize, total)})`)
      
      const promises = batch.map(async (item) => {
        try {
          const response = await fetch(item.url)
          const itemData = await response.json()
          
          // Get English effect entries
          const effectEntry = itemData.effect_entries?.find(entry => entry.language.name === 'en')
          const flavorTextEntry = itemData.flavor_text_entries?.find(entry => entry.language.name === 'en')
          
          // Extract relevant data
          const processedItem = {
            id: itemData.id,
            name: itemData.name,
            cost: itemData.cost,
            flingPower: itemData.fling_power,
            flingEffect: itemData.fling_effect?.name || null,
            category: itemData.category?.name || 'miscellaneous',
            effect: effectEntry?.effect || 'No description available.',
            shortEffect: effectEntry?.short_effect || 'No description available.',
            flavorText: flavorTextEntry?.text || 'No flavor text available.',
            sprite: itemData.sprites?.default || null,
            attributes: itemData.attributes?.map(attr => attr.name) || [],
            gameIndices: itemData.game_indices?.map(gi => gi.generation.name) || []
          }
          
          allItems[itemData.name] = processedItem
          
          // Group by category
          if (!itemsByCategory[processedItem.category]) {
            itemsByCategory[processedItem.category] = []
          }
          itemsByCategory[processedItem.category].push(itemData.name)
          
        } catch (error) {
          console.error(`❌ Error fetching ${item.name}:`, error.message)
        }
      })
      
      await Promise.all(promises)
      
      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < total) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Successfully fetched ${Object.keys(allItems).length} items`)
    
    // Generate the TypeScript database file
    const tsContent = `/**
 * Complete Pokemon Items Database
 * Auto-generated from PokeAPI v2
 * Contains all ${Object.keys(allItems).length} Pokemon items with comprehensive data
 */

export interface ItemData {
  id: number
  name: string
  cost: number
  flingPower: number | null
  flingEffect: string | null
  category: string
  effect: string
  shortEffect: string
  flavorText: string
  sprite: string | null
  attributes: string[]
  gameIndices: string[]
}

export type ItemCategory = ${Object.keys(itemsByCategory).map(cat => `'${cat}'`).join(' | ')}

// Complete Pokemon items database - ${Object.keys(allItems).length} items
export const ITEMS_DATABASE: Record<string, ItemData> = ${JSON.stringify(allItems, null, 2)}

// Items organized by category
export const ITEMS_BY_CATEGORY: Record<ItemCategory, string[]> = ${JSON.stringify(itemsByCategory, null, 2)}

/**
 * Get item data by name
 */
export function getItemData(itemName: string): ItemData | null {
  const cleanName = itemName.toLowerCase().replace(/\\s+/g, '-')
  return ITEMS_DATABASE[cleanName] || null
}

/**
 * Check if item exists in database
 */
export function hasItemData(itemName: string): boolean {
  const cleanName = itemName.toLowerCase().replace(/\\s+/g, '-')
  return cleanName in ITEMS_DATABASE
}

/**
 * Get all items from a specific category
 */
export function getItemsByCategory(category: ItemCategory): ItemData[] {
  const itemNames = ITEMS_BY_CATEGORY[category] || []
  return itemNames.map(name => ITEMS_DATABASE[name]).filter(Boolean)
}

/**
 * Search items by name or effect
 */
export function searchItems(query: string): ItemData[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(ITEMS_DATABASE).filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.effect.toLowerCase().includes(lowerQuery) ||
    item.shortEffect.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get items within a cost range
 */
export function getItemsByPriceRange(minCost: number, maxCost: number): ItemData[] {
  return Object.values(ITEMS_DATABASE).filter(item => 
    item.cost >= minCost && item.cost <= maxCost
  )
}

/**
 * Get items that can be flung in battle
 */
export function getFlingItems(): ItemData[] {
  return Object.values(ITEMS_DATABASE).filter(item => 
    item.flingPower !== null && item.flingPower > 0
  )
}

/**
 * Get items with specific attributes
 */
export function getItemsWithAttribute(attribute: string): ItemData[] {
  return Object.values(ITEMS_DATABASE).filter(item => 
    item.attributes.includes(attribute)
  )
}

/**
 * Get all available item categories
 */
export function getAllCategories(): ItemCategory[] {
  return Object.keys(ITEMS_BY_CATEGORY) as ItemCategory[]
}`
    
    // Write the TypeScript file
    const tsOutputPath = path.join(__dirname, '..', 'src', 'lib', 'items-database.ts')
    fs.writeFileSync(tsOutputPath, tsContent)
    
    console.log(`📁 TypeScript Database saved to: ${tsOutputPath}`)
    console.log(`📊 Total items: ${Object.keys(allItems).length}`)
    
    // Generate some statistics
    const categoryStats = {}
    const costStats = { free: 0, cheap: 0, moderate: 0, expensive: 0 }
    
    Object.values(allItems).forEach(item => {
      categoryStats[item.category] = (categoryStats[item.category] || 0) + 1
      
      if (item.cost === 0) costStats.free++
      else if (item.cost <= 1000) costStats.cheap++
      else if (item.cost <= 10000) costStats.moderate++
      else costStats.expensive++
    })
    
    console.log('📈 Category distribution:', categoryStats)
    console.log('📈 Cost distribution:', costStats)
    console.log('🎉 Complete! Items database generated successfully!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Run the script
fetchAllItems()