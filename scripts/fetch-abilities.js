/**
 * Script to fetch all Pokemon abilities from PokeAPI and generate a comprehensive database
 * Run with: node scripts/fetch-abilities.js
 */

const fs = require('fs')
const path = require('path')

// Node.js 18+ has native fetch support

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
      
      // Small delay between pages
      if (nextUrl) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    console.log(`✅ Collected ${allAbilitiesRefs.length} ability references from ${pageCount - 1} pages`)
    
    const allAbilities = {}
    const total = allAbilitiesRefs.length
    
    // Fetch details for each ability (in batches to avoid overwhelming the API)
    const batchSize = 50
    for (let i = 0; i < total; i += batchSize) {
      const batch = allAbilitiesRefs.slice(i, i + batchSize)
      console.log(`⏳ Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(total/batchSize)} (abilities ${i + 1}-${Math.min(i + batchSize, total)})`)
      
      const promises = batch.map(async (ability) => {
        try {
          const response = await fetch(ability.url)
          const abilityData = await response.json()
          
          // Get English effect entries
          const effectEntry = abilityData.effect_entries?.find(entry => entry.language.name === 'en')
          const flavorTextEntry = abilityData.flavor_text_entries?.find(entry => entry.language.name === 'en')
          
          // Extract relevant data
          const processedAbility = {
            id: abilityData.id,
            name: abilityData.name,
            isMainSeries: abilityData.is_main_series,
            generation: abilityData.generation?.name || 'unknown',
            effect: effectEntry?.effect || 'No description available.',
            shortEffect: effectEntry?.short_effect || 'No description available.',
            flavorText: flavorTextEntry?.flavor_text || 'No flavor text available.',
            pokemon: abilityData.pokemon.map(p => ({
              name: p.pokemon.name,
              url: p.pokemon.url,
              isHidden: p.is_hidden,
              slot: p.slot
            }))
          }
          
          allAbilities[abilityData.name] = processedAbility
        } catch (error) {
          console.error(`❌ Error fetching ${ability.name}:`, error.message)
        }
      })
      
      await Promise.all(promises)
      
      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < total) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Successfully fetched ${Object.keys(allAbilities).length} abilities`)
    
    // Generate the TypeScript database file
    const tsContent = `/**
 * Complete Pokemon Abilities Database
 * Auto-generated from PokeAPI v2
 * Contains all ${Object.keys(allAbilities).length} Pokemon abilities with comprehensive data
 */

export interface AbilityPokemon {
  name: string
  url: string
  isHidden: boolean
  slot: number
}

export interface AbilityData {
  id: number
  name: string
  isMainSeries: boolean
  generation: string
  effect: string
  shortEffect: string
  flavorText: string
  pokemon: AbilityPokemon[]
}

// Complete Pokemon abilities database - ${Object.keys(allAbilities).length} abilities
export const ABILITIES_DATABASE: Record<string, AbilityData> = ${JSON.stringify(allAbilities, null, 2)}

/**
 * Get ability data by name
 */
export function getAbilityData(abilityName: string): AbilityData | null {
  const cleanName = abilityName.toLowerCase().replace(/\\s+/g, '-')
  return ABILITIES_DATABASE[cleanName] || null
}

/**
 * Check if ability exists in database
 */
export function hasAbilityData(abilityName: string): boolean {
  const cleanName = abilityName.toLowerCase().replace(/\\s+/g, '-')
  return cleanName in ABILITIES_DATABASE
}

/**
 * Get all abilities from a specific generation
 */
export function getAbilitiesByGeneration(generation: string): AbilityData[] {
  return Object.values(ABILITIES_DATABASE).filter(ability => ability.generation === generation)
}

/**
 * Search abilities by name or effect
 */
export function searchAbilities(query: string): AbilityData[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(ABILITIES_DATABASE).filter(ability => 
    ability.name.toLowerCase().includes(lowerQuery) ||
    ability.effect.toLowerCase().includes(lowerQuery) ||
    ability.shortEffect.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get abilities that can be hidden
 */
export function getHiddenAbilities(): AbilityData[] {
  return Object.values(ABILITIES_DATABASE).filter(ability => 
    ability.pokemon.some(p => p.isHidden)
  )
}

/**
 * Get Pokemon that have a specific ability
 */
export function getPokemonWithAbility(abilityName: string): AbilityPokemon[] {
  const ability = getAbilityData(abilityName)
  return ability?.pokemon || []
}`
    
    // Write the TypeScript file
    const tsOutputPath = path.join(__dirname, '..', 'src', 'lib', 'abilities-database.ts')
    fs.writeFileSync(tsOutputPath, tsContent)
    
    console.log(`📁 TypeScript Database saved to: ${tsOutputPath}`)
    console.log(`📊 Total abilities: ${Object.keys(allAbilities).length}`)
    
    // Generate some statistics
    const generationStats = {}
    const mainSeriesCount = Object.values(allAbilities).filter(ability => ability.isMainSeries).length
    
    Object.values(allAbilities).forEach(ability => {
      generationStats[ability.generation] = (generationStats[ability.generation] || 0) + 1
    })
    
    console.log('📈 Generation distribution:', generationStats)
    console.log(`📈 Main series abilities: ${mainSeriesCount}`)
    console.log('🎉 Complete! Abilities database generated successfully!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Run the script
fetchAllAbilities()