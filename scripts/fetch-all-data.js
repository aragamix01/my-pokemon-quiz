/**
 * Master script to fetch all Pokemon data from PokeAPI and generate comprehensive local databases
 * Run with: node scripts/fetch-all-data.js [specific-database]
 * 
 * Available databases: moves, types, abilities, items, all
 */

const { execSync } = require('child_process')
const path = require('path')

const DATABASES = {
  moves: 'fetch-moves.js',
  types: 'fetch-types.js', 
  abilities: 'fetch-abilities.js',
  items: 'fetch-items.js'
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
  console.log(`Available databases: ${Object.keys(DATABASES).join(', ')}, all`)
  
  const startTime = Date.now()
  let successCount = 0
  let totalCount = 0
  
  if (targetDatabase === 'all') {
    // Generate all databases
    for (const [dbName, scriptName] of Object.entries(DATABASES)) {
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
      console.log('  - src/lib/moves-database.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'types') {
      console.log('  - type-effectiveness.json')
    }
    if (targetDatabase === 'all' || targetDatabase === 'abilities') {
      console.log('  - src/lib/abilities-database.ts')
    }
    if (targetDatabase === 'all' || targetDatabase === 'items') {
      console.log('  - src/lib/items-database.ts')
    }
    
    console.log('\n💡 Tips:')
    console.log('  - Use these local databases instead of API calls for better performance')
    console.log('  - Import the TypeScript databases in your components')
    console.log('  - Run this script periodically to update data from PokeAPI')
    console.log('  - All databases include search and utility functions')
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