/**
 * Script to fetch all Pokemon types from PokeAPI and generate a comprehensive database
 * Run with: node scripts/fetch-types.js
 */

const fs = require('fs')
const path = require('path')

// Node.js 18+ has native fetch support

async function fetchAllTypes() {
  console.log('🚀 Starting to fetch all Pokemon types from PokeAPI...')
  
  try {
    // Collect all types using proper pagination
    console.log('📋 Fetching types list with pagination...')
    const allTypesRefs = []
    let nextUrl = 'https://pokeapi.co/api/v2/type?limit=100'
    let pageCount = 1
    
    while (nextUrl) {
      console.log(`📄 Fetching page ${pageCount}...`)
      const response = await fetch(nextUrl)
      const data = await response.json()
      
      console.log(`📊 Page ${pageCount}: Found ${data.results.length} types`)
      console.log(`📊 Total count from API: ${data.count}`)
      
      allTypesRefs.push(...data.results)
      nextUrl = data.next
      pageCount++
      
      // Small delay between pages
      if (nextUrl) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    console.log(`✅ Collected ${allTypesRefs.length} type references from ${pageCount - 1} pages`)
    
    const allTypes = {}
    const effectivenessMatrix = {}
    const typesByGeneration = {
      'generation-i': [],
      'generation-ii': [],
      'generation-iii': [],
      'generation-iv': [],
      'generation-v': [],
      'generation-vi': [],
      'generation-vii': [],
      'generation-viii': [],
      'generation-ix': []
    }
    const total = allTypesRefs.length
    
    // Fetch details for each type
    console.log(`⏳ Processing ${total} types...`)
    
    const promises = allTypesRefs.map(async (type) => {
      try {
        const response = await fetch(type.url)
        const typeData = await response.json()
        
        // Skip unknown/shadow types
        if (['unknown', 'shadow'].includes(typeData.name)) {
          return
        }
        
        console.log(`✅ Processing ${typeData.name} type (ID: ${typeData.id})`)
        
        // Extract damage relations
        const damageRelations = {
          superEffectiveAgainst: typeData.damage_relations.double_damage_to.map(t => t.name),
          notVeryEffectiveAgainst: typeData.damage_relations.half_damage_to.map(t => t.name),
          noEffectAgainst: typeData.damage_relations.no_damage_to.map(t => t.name),
          weakTo: typeData.damage_relations.double_damage_from.map(t => t.name),
          resists: typeData.damage_relations.half_damage_from.map(t => t.name),
          immuneTo: typeData.damage_relations.no_damage_from.map(t => t.name)
        }
        
        // Generate simple modern icon structure
        let modernIconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typeData.id}.png`
        
        // Try to use API sprites if available
        if (typeData.sprites) {
          // Check for modern icons first (prefer Gen IX, fallback to Gen VIII)
          const modernSources = [
            typeData.sprites['generation-ix']?.['scarlet-violet']?.['name_icon'],
            typeData.sprites['generation-viii']?.['sword-shield']?.['name_icon'],
            typeData.sprites['generation-viii']?.['legends-arceus']?.['name_icon']
          ]
          
          const apiModernIcon = modernSources.find(Boolean)
          if (apiModernIcon) {
            modernIconUrl = apiModernIcon
          }
        }
        
        const icons = {
          modern: modernIconUrl
        }
        
        // Type color mapping (official Pokemon colors)
        const typeColors = {
          normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
          grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
          ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
          rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
          steel: '#B8B8D0', fairy: '#EE99AC', stellar: '#40E0D0'
        }
        
        // Process the type
        const processedType = {
          id: typeData.id,
          name: typeData.name,
          color: typeColors[typeData.name] || '#68A090',
          icons: icons,
          damageRelations: damageRelations,
          generation: typeData.generation?.name || 'generation-i'
        }
        
        allTypes[typeData.name] = processedType
        
        // Add to generation mapping
        const generation = typeData.generation?.name || 'generation-i'
        if (typesByGeneration[generation]) {
          typesByGeneration[generation].push(typeData.name)
        }
        
      } catch (error) {
        console.error(`❌ Error fetching ${type.name}:`, error.message)
      }
    })
    
    await Promise.all(promises)
    
    console.log(`✅ Successfully fetched ${Object.keys(allTypes).length} types`)
    
    // Generate effectiveness matrix for quick lookups
    console.log('🔄 Generating effectiveness matrix...')
    Object.keys(allTypes).forEach(attackingType => {
      effectivenessMatrix[attackingType] = {}
      
      Object.keys(allTypes).forEach(defendingType => {
        const attackerData = allTypes[attackingType]
        let multiplier = 1 // Normal effectiveness
        
        if (attackerData.damageRelations.noEffectAgainst.includes(defendingType)) {
          multiplier = 0
        } else if (attackerData.damageRelations.superEffectiveAgainst.includes(defendingType)) {
          multiplier = 2
        } else if (attackerData.damageRelations.notVeryEffectiveAgainst.includes(defendingType)) {
          multiplier = 0.5
        }
        
        effectivenessMatrix[attackingType][defendingType] = multiplier
      })
    })
    
    // Generate the complete database structure
    const databaseStructure = {
      metadata: {
        version: "1.0",
        source: "PokeAPI v2",
        description: "Complete Pokemon type effectiveness data for all 18 types",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalTypes: Object.keys(allTypes).length
      },
      types: allTypes,
      effectivenessMatrix: effectivenessMatrix,
      typesByGeneration: typesByGeneration
    }
    
    // Write the JSON database file  
    const dataDir = path.join(__dirname, '..', 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const jsonOutputPath = path.join(dataDir, 'pokemon-type-effectiveness.json')
    fs.writeFileSync(jsonOutputPath, JSON.stringify(databaseStructure, null, 2))
    
    console.log(`📁 JSON Database saved to: ${jsonOutputPath}`)
    console.log(`📊 Total types: ${Object.keys(allTypes).length}`)
    
    // Generate statistics
    const generationStats = {}
    Object.keys(typesByGeneration).forEach(gen => {
      generationStats[gen] = typesByGeneration[gen].length
    })
    
    console.log('📈 Types by generation:', generationStats)
    console.log('🎉 Complete! Type database generated successfully!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Run the script
fetchAllTypes()