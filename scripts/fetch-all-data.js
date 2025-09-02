/**
 * Master script to fetch all Pokemon data from PokeAPI and generate comprehensive local databases
 * Run with: node scripts/fetch-all-data.js [specific-database]
 * 
 * Available databases: moves, types, abilities, items, all
 */

const { execSync } = require('child_process')
const path = require('path')

const DATABASES = {
  // JSON-based databases (new format)
  metadata: 'fetch-pokemon-metadata.js',
  types: 'fetch-types.js',
  moves: 'fetch-moves-json.js',
  abilities: 'fetch-abilities-json.js', 
  items: 'fetch-items-json.js',
  'evolution-items': 'fetch-evolution-items.js',
  
  // Legacy TypeScript databases (deprecated)
  'moves-legacy': 'fetch-moves.js',
  'abilities-legacy': 'fetch-abilities.js',
  'items-legacy': 'fetch-items.js'
}

async function runScript(scriptName, databaseName) {
  console.log(`\n🔄 Starting ${databaseName} database generation...`)
  console.log('=' .repeat(50))
  
  try {
    const scriptPath = path.join(__dirname, scriptName)
    execSync(`node "${scriptPath}"`, { 
      stdio: 'inherit',
      cwd: path.dirname(scriptPath)
    })
    console.log(`✅ ${databaseName} database completed successfully!`)
  } catch (error) {
    console.error(`❌ Error generating ${databaseName} database:`, error.message)
    return false
  }
  return true
}

async function main() {
  const args = process.argv.slice(2)
  const targetDatabase = args[0]?.toLowerCase() || 'all'
  
  console.log('🚀 Pokemon Database Generator')
  console.log('============================')
  console.log(`Target: ${targetDatabase}`)
  console.log(`Available databases: ${Object.keys(DATABASES).filter(k => !k.includes('legacy')).join(', ')}, all`)
  if (targetDatabase === 'all') {
    console.log('📊 Note: "all" generates only the new JSON-based databases (recommended)')
  }
  
  const startTime = Date.now()
  let successCount = 0
  let totalCount = 0
  
  if (targetDatabase === 'all') {
    // Generate only new JSON-based databases (exclude legacy)
    const jsonDatabases = Object.entries(DATABASES).filter(([name, _]) => !name.includes('legacy'))
    for (const [dbName, scriptName] of jsonDatabases) {
      totalCount++
      const success = await runScript(scriptName, dbName)
      if (success) successCount++
    }
  } else if (DATABASES[targetDatabase]) {
    // Generate specific database
    totalCount++
    const success = await runScript(DATABASES[targetDatabase], targetDatabase)
    if (success) successCount++
  } else {
    console.error(`❌ Unknown database: ${targetDatabase}`)
    console.log(`Available options: ${Object.keys(DATABASES).join(', ')}, all`)
    process.exit(1)
  }
  
  // Final summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log('\n🎉 Database Generation Complete!')
  console.log('=' .repeat(50))
  console.log(`✅ Success: ${successCount}/${totalCount} databases`)
  console.log(`⏱️  Duration: ${duration} seconds`)
  
  if (successCount > 0) {
    console.log('\n📁 Generated files:')
    if (targetDatabase === 'all' || targetDatabase === 'moves') {
      console.log('  - src/data/pokemon-moves.json')
      console.log('  - src/types/pokemon-moves.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'types') {
      console.log('  - src/data/pokemon-type-effectiveness.json')
    }
    if (targetDatabase === 'all' || targetDatabase === 'abilities') {
      console.log('  - src/data/pokemon-abilities.json')
      console.log('  - src/types/pokemon-abilities.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'items') {
      console.log('  - src/data/pokemon-items.json')
      console.log('  - src/types/pokemon-items.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'evolution-items') {
      console.log('  - src/data/evolution-items.json')
      console.log('  - src/types/evolution-items.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'metadata') {
      console.log('  - src/data/pokemon-metadata.json')
      console.log('  - src/data/pokemon-generations.json')
      console.log('  - src/types/pokemon-metadata.ts')
    }
    
    console.log('\n💡 Tips:')
    console.log('  - All databases now use JSON format for better performance')
    console.log('  - Import JSON data directly or use utility functions in src/lib/')
    console.log('  - Run this script periodically to update data from PokeAPI')
    console.log('  - Evolution items database provides lightweight evolution-only data')
    console.log('  - Use src/lib/*-utils.ts for search and filter functions')
  }
  
  if (successCount < totalCount) {
    process.exit(1)
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error)
  process.exit(1)
})

// Run the script
main()