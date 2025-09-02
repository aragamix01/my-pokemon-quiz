/**
 * Script to fetch lightweight Pokemon metadata from PokeAPI for search/sort functionality
 * This creates a lightweight database with just essential data for filtering and sorting
 * Run with: node scripts/fetch-pokemon-metadata.js
 */

const fs = require('fs')
const path = require('path')

// Delay between API calls to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchPokemonMetadata() {
  console.log('🚀 Starting to fetch Pokemon metadata from PokeAPI...')
  
  try {
    const pokemonMetadata = []
    const generationsData = {}
    
    // Fetch all 9 generations
    for (let genNumber = 1; genNumber <= 9; genNumber++) {
      console.log(`\n📋 Fetching Generation ${genNumber}...`)
      
      const genResponse = await fetch(`https://pokeapi.co/api/v2/generation/${genNumber}`)
      const generation = await genResponse.json()
      
      console.log(`📊 Generation ${genNumber}: ${generation.pokemon_species.length} Pokemon species`)
      
      const genPokemon = []
      let processed = 0
      
      for (const species of generation.pokemon_species) {
        try {
          // Extract species ID from URL
          const speciesId = species.url.split('/').slice(-2, -1)[0]
          
          // Fetch species data for generation info and basic details
          const speciesResponse = await fetch(species.url)
          const speciesData = await speciesResponse.json()
          
          // Get the default Pokemon variety (usually the first one)
          let pokemonUrl = speciesData.varieties[0].pokemon.url
          const pokemonResponse = await fetch(pokemonUrl)
          const pokemonData = await pokemonResponse.json()
          
          // Create lightweight metadata entry
          const metadata = {
            id: pokemonData.id,
            name: pokemonData.name,
            species_name: speciesData.name,
            generation: genNumber,
            types: pokemonData.types.map(t => t.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
            base_experience: pokemonData.base_experience || 0,
            habitat: speciesData.habitat?.name || null,
            color: speciesData.color?.name || null,
            shape: speciesData.shape?.name || null,
            is_legendary: speciesData.is_legendary,
            is_mythical: speciesData.is_mythical,
            capture_rate: speciesData.capture_rate,
            base_happiness: speciesData.base_happiness || 0,
            growth_rate: speciesData.growth_rate?.name || null,
            egg_groups: speciesData.egg_groups?.map(eg => eg.name) || [],
            // Base stats for sorting
            stats: {
              hp: pokemonData.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
              attack: pokemonData.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
              defense: pokemonData.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
              'special-attack': pokemonData.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
              'special-defense': pokemonData.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
              speed: pokemonData.stats.find(s => s.stat.name === 'speed')?.base_stat || 0
            },
            total_stats: pokemonData.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
            // Form information for variants
            has_variants: speciesData.varieties.length > 1,
            variants: speciesData.varieties.map(v => ({
              name: v.pokemon.name,
              is_default: v.is_default,
              id: parseInt(v.pokemon.url.split('/').slice(-2, -1)[0])
            }))
          }
          
          pokemonMetadata.push(metadata)
          genPokemon.push(metadata)
          processed++
          
          if (processed % 10 === 0) {
            console.log(`  ⏳ Processed ${processed}/${generation.pokemon_species.length} Pokemon...`)
          }
          
          // Rate limiting
          await delay(50)
          
        } catch (error) {
          console.error(`❌ Error fetching ${species.name}:`, error.message)
          continue
        }
      }
      
      generationsData[genNumber] = {
        id: genNumber,
        name: generation.name,
        pokemon_count: genPokemon.length,
        pokemon: genPokemon.map(p => ({ id: p.id, name: p.name }))
      }
      
      console.log(`✅ Generation ${genNumber} complete: ${genPokemon.length} Pokemon processed`)
    }
    
    // Sort all Pokemon by ID
    pokemonMetadata.sort((a, b) => a.id - b.id)
    
    console.log(`\n📊 Total Pokemon metadata collected: ${pokemonMetadata.length}`)
    
    // Write the complete metadata database
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const metadataPath = path.join(dataDir, 'pokemon-metadata.json')
    fs.writeFileSync(metadataPath, JSON.stringify(pokemonMetadata, null, 2))
    console.log(`✅ Pokemon metadata saved to: ${metadataPath}`)
    
    // Write generations data
    const generationsPath = path.join(dataDir, 'pokemon-generations.json')
    fs.writeFileSync(generationsPath, JSON.stringify(generationsData, null, 2))
    console.log(`✅ Generations data saved to: ${generationsPath}`)
    
    // Generate TypeScript types
    const typesContent = `// Auto-generated Pokemon metadata types
export interface PokemonMetadata {
  id: number
  name: string
  species_name: string
  generation: number
  types: string[]
  height: number
  weight: number
  base_experience: number
  habitat: string | null
  color: string | null
  shape: string | null
  is_legendary: boolean
  is_mythical: boolean
  capture_rate: number
  base_happiness: number
  growth_rate: string | null
  egg_groups: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    'special-attack': number
    'special-defense': number
    speed: number
  }
  total_stats: number
  has_variants: boolean
  variants: Array<{
    name: string
    is_default: boolean
    id: number
  }>
}

export interface GenerationData {
  id: number
  name: string
  pokemon_count: number
  pokemon: Array<{
    id: number
    name: string
  }>
}

export type GenerationsDatabase = Record<number, GenerationData>
`
    
    const typesPath = path.join(__dirname, '..', 'src', 'types', 'pokemon-metadata.ts')
    const typesDir = path.dirname(typesPath)
    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir, { recursive: true })
    }
    fs.writeFileSync(typesPath, typesContent)
    console.log(`✅ TypeScript types saved to: ${typesPath}`)
    
    console.log(`\n🎉 Pokemon metadata database generation complete!`)
    console.log(`📊 Summary:`)
    console.log(`   • Total Pokemon: ${pokemonMetadata.length}`)
    console.log(`   • Generations: ${Object.keys(generationsData).length}`)
    console.log(`   • Database size: ~${Math.round(JSON.stringify(pokemonMetadata).length / 1024)}KB`)
    
  } catch (error) {
    console.error('❌ Error generating Pokemon metadata database:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  fetchPokemonMetadata()
}

module.exports = { fetchPokemonMetadata }