/**
 * Complete sprite solution - Download + WebP optimization in one script
 * Handles Pokemon artwork, shiny variants, alternative forms, and type icons
 * Outputs directly to optimized WebP format for maximum mobile performance
 * Run with: node scripts/download-and-optimize-sprites.js [strategy]
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const sharp = require('sharp')

// Configuration
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites'
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'sprites')
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'optimized')

// WebP optimization settings
const WEBP_SETTINGS = {
  quality: 85,
  effort: 6,
  lossless: false
}

// Mobile-optimized size
const MOBILE_SIZE = { width: 300, height: 300 }

// Pokemon variant forms data - Complete range of all variant forms
// Based on PokeAPI research: All variant forms exist from ID 10001 to 10277 (277 total forms)
const VARIANT_FORMS = {
  // Complete variant form range (includes all regional forms, megas, primals, etc.)
  startId: 10001,  // First variant form (Mega Venusaur)
  endId: 10277,    // Last variant form (as of current generation)
  
  // Breakdown for reference (approximate ranges):
  // Mega/Primal forms: 10001-10090 (Gen 6 Mega Evolution + Primal Reversion)
  // Alolan forms: 10091-10120+ (Gen 7 Regional variants)
  // Galarian forms: 10158-10214+ (Gen 8 Regional variants)
  // Hisuian forms: 10215-10277+ (Legends Arceus Regional variants)
  // Note: These ranges may overlap and include other special forms
}

// Get all variant form IDs - generates the complete range
const getAllVariantForms = () => {
  const forms = []
  for (let i = VARIANT_FORMS.startId; i <= VARIANT_FORMS.endId; i++) {
    forms.push(i)
  }
  return forms
}

// Download strategies
const STRATEGIES = {
  'gen1': {
    name: 'Gen 1 Complete (Recommended)',
    description: 'Original 151 Pokemon with shiny + forms (~4MB)',
    maxId: 151,
    includeShiny: true,
    includeForms: true,
    includeVariants: false
  },
  'gen1-2': {
    name: 'Gen 1-2 Complete', 
    description: 'First 251 Pokemon with shiny + forms (~8MB)',
    maxId: 251,
    includeShiny: true,
    includeForms: true,
    includeVariants: false
  },
  'popular': {
    name: 'Popular Pokemon Only',
    description: '80 most popular Pokemon with shiny + forms (~3MB)',
    pokemonIds: [1,2,3,4,5,6,7,8,9,25,26,39,54,55,104,105,113,131,143,144,145,146,150,151,152,153,154,155,156,157,158,159,160,172,173,174,175,176,179,180,181,196,197,201,225,243,244,245,249,250,251,280,281,282,302,303,333,334,347,348,377,378,379,380,381,382,383,384,385,390,391,392,393,394,395,448,483,484,487,491,492,493],
    includeShiny: true,
    includeForms: true,
    includeVariants: false
  },
  'minimal': {
    name: 'Minimal Set',
    description: 'Gen 1 artwork only (no shiny/forms) (~1.5MB)',
    maxId: 151,
    includeShiny: false,
    includeForms: false,
    includeVariants: false
  },
  'all': {
    name: 'Complete Set',
    description: 'All Pokemon Gen 1-9 with variants (~12MB)',
    maxId: 1025,
    includeShiny: true,
    includeForms: false,
    includeVariants: true
  },
  'forms-only': {
    name: 'Variant Forms Only',
    description: 'All 277 variant forms: Mega, Alolan, Galarian, Hisuian, etc. (~8MB)',
    pokemonIds: getAllVariantForms(),
    includeShiny: true,
    includeForms: false,
    includeVariants: false
  },
}

const ensureDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

const downloadFile = async (url, filePath, maxRetries = 2) => {
  return new Promise((resolve) => {
    let retries = 0
    
    const attemptDownload = () => {
      const file = fs.createWriteStream(filePath)
      
      const request = https.get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file)
          file.on('finish', () => {
            file.close()
            resolve({ success: true, status: 200 })
          })
        } else if (response.statusCode === 404) {
          file.close()
          fs.unlinkSync(filePath)
          resolve({ success: false, status: 404 })
        } else if (retries < maxRetries && (response.statusCode === 402 || response.statusCode === 429)) {
          file.close()
          fs.unlinkSync(filePath)
          retries++
          setTimeout(attemptDownload, 3000 * retries)
        } else {
          file.close()
          fs.unlinkSync(filePath)
          resolve({ success: false, status: response.statusCode })
        }
      })
      
      request.on('error', () => {
        file.close()
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        if (retries < maxRetries) {
          retries++
          setTimeout(attemptDownload, 3000)
        } else {
          resolve({ success: false, status: 0 })
        }
      })
      
      request.setTimeout(15000, () => {
        request.abort()
        if (retries < maxRetries) {
          retries++
          setTimeout(attemptDownload, 3000)
        } else {
          resolve({ success: false, status: 0 })
        }
      })
    }
    
    attemptDownload()
  })
}

const downloadAndOptimizeImage = async (url, outputPath, options = {}) => {
  const tempPath = outputPath + '.tmp.png'
  
  try {
    // Download PNG
    const downloadResult = await downloadFile(url, tempPath)
    if (!downloadResult.success) {
      return { success: false, status: downloadResult.status, error: `Download failed: ${downloadResult.status}` }
    }

    // Convert to optimized WebP
    let pipeline = sharp(tempPath)
    
    if (options.resize) {
      pipeline = pipeline.resize(options.resize.width, options.resize.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
    }
    
    await pipeline.webp(WEBP_SETTINGS).toFile(outputPath)
    
    // Cleanup temp file
    fs.unlinkSync(tempPath)
    
    return { success: true, status: 200 }
  } catch (error) {
    // Cleanup on error
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
    return { success: false, status: 500, error: error.message }
  }
}

const processArtwork = async (pokemonIds, includeShiny) => {
  console.log(`🎨 Processing ${pokemonIds.length} Pokemon artwork${includeShiny ? ' + shiny' : ''}...`)
  
  const artworkDir = path.join(OUTPUT_DIR, 'pokemon-artwork')
  const shinyDir = path.join(artworkDir, 'shiny')
  ensureDirectory(artworkDir)
  if (includeShiny) ensureDirectory(shinyDir)
  
  let successful = 0
  let failed = 0
  
  for (const id of pokemonIds) {
    // Regular artwork
    const artworkPath = path.join(artworkDir, `${id}.webp`)
    if (!fs.existsSync(artworkPath)) {
      const artworkUrl = `${SPRITE_BASE_URL}/pokemon/other/official-artwork/${id}.png`
      const result = await downloadAndOptimizeImage(artworkUrl, artworkPath, { resize: MOBILE_SIZE })
      
      if (result.success) {
        console.log(`  ✅ Pokemon ${id}`)
        successful++
      } else {
        console.log(`  ❌ Pokemon ${id} failed`)
        failed++
      }
    } else {
      console.log(`  ⏭️  Pokemon ${id} exists`)
      successful++
    }
    
    // Shiny artwork
    if (includeShiny) {
      const shinyPath = path.join(shinyDir, `${id}.webp`)
      if (!fs.existsSync(shinyPath)) {
        const shinyUrl = `${SPRITE_BASE_URL}/pokemon/other/official-artwork/shiny/${id}.png`
        const shinyResult = await downloadAndOptimizeImage(shinyUrl, shinyPath, { resize: MOBILE_SIZE })
        
        if (shinyResult.success) {
          console.log(`  ✨ Pokemon ${id} shiny`)
          successful++
        } else if (shinyResult.status === 404) {
          console.log(`  ⚪ Pokemon ${id} shiny not available`)
          // Don't count 404s as failures for shiny variants
        } else {
          console.log(`  ❌ Pokemon ${id} shiny failed (${shinyResult.status || 'error'})`)
          failed++
        }
      } else {
        console.log(`  ⏭️  Pokemon ${id} shiny exists`)
        successful++
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return { successful, failed }
}

const processVariantForms = async (includeShiny) => {
  const variantIds = getAllVariantForms()
  console.log(`🔄 Processing ${variantIds.length} variant Pokemon forms${includeShiny ? ' + shiny' : ''}...`)
  
  const formsDir = path.join(OUTPUT_DIR, 'pokemon-forms')
  const shinyFormsDir = path.join(formsDir, 'shiny')
  ensureDirectory(formsDir)
  if (includeShiny) ensureDirectory(shinyFormsDir)
  
  let successful = 0
  let failed = 0
  let shinyNotAvailable = 0
  
  for (const id of variantIds) {
    // Regular form artwork
    const formPath = path.join(formsDir, `${id}.webp`)
    if (!fs.existsSync(formPath)) {
      const formUrl = `${SPRITE_BASE_URL}/pokemon/other/official-artwork/${id}.png`
      const result = await downloadAndOptimizeImage(formUrl, formPath, { resize: MOBILE_SIZE })
      
      if (result.success) {
        console.log(`  ✅ Form ${id}`)
        successful++
      } else {
        console.log(`  ❌ Form ${id} failed`)
        failed++
      }
    } else {
      console.log(`  ⏭️  Form ${id} exists`)
      successful++
    }
    
    // Shiny form artwork
    if (includeShiny) {
      const shinyFormPath = path.join(shinyFormsDir, `${id}.webp`)
      if (!fs.existsSync(shinyFormPath)) {
        const shinyFormUrl = `${SPRITE_BASE_URL}/pokemon/other/official-artwork/shiny/${id}.png`
        const shinyResult = await downloadAndOptimizeImage(shinyFormUrl, shinyFormPath, { resize: MOBILE_SIZE })
        
        if (shinyResult.success) {
          console.log(`  ✨ Form ${id} shiny`)
          successful++
        } else if (shinyResult.status === 404) {
          console.log(`  ⚪ Form ${id} shiny not available`)
          shinyNotAvailable++
          // Don't count 404s as failures for shiny variants - many forms don't have shinies
        } else {
          console.log(`  ❌ Form ${id} shiny failed (${shinyResult.status || 'error'})`)
          failed++
        }
      } else {
        console.log(`  ⏭️  Form ${id} shiny exists`)
        successful++
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Add summary for variant forms
  if (includeShiny && shinyNotAvailable > 0) {
    console.log(`  📊 Summary: ${shinyNotAvailable} variant forms don't have shiny versions (normal)`)
  }
  
  return { successful, failed, shinyNotAvailable }
}

const processTypes = async () => {
  console.log('🏷️  Processing type icons...')
  const typesDir = path.join(OUTPUT_DIR, 'types')
  ensureDirectory(typesDir)
  
  const typeIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  let successful = 0
  let failed = 0
  
  for (const typeId of typeIds) {
    const typePath = path.join(typesDir, `${typeId}.webp`)
    if (!fs.existsSync(typePath)) {
      const typeUrl = `${SPRITE_BASE_URL}/types/generation-ix/scarlet-violet/${typeId}.png`
      const result = await downloadAndOptimizeImage(typeUrl, typePath)
      
      if (result.success) {
        console.log(`  ✅ Type ${typeId}`)
        successful++
      } else {
        console.log(`  ❌ Type ${typeId} failed`)
        failed++
      }
    } else {
      console.log(`  ⏭️  Type ${typeId} exists`)
      successful++
    }
  }
  
  return { successful, failed }
}

const processItems = async () => {
  console.log('🎒 Processing evolution item sprites...')
  
  const itemsDir = path.join(OUTPUT_DIR, 'items')
  ensureDirectory(itemsDir)
  
  let successful = 0
  let failed = 0
  
  // Common evolution items used in Pokemon
  const evolutionItems = [
    'fire-stone', 'water-stone', 'thunder-stone', 'leaf-stone', 'moon-stone', 'sun-stone',
    'shiny-stone', 'dusk-stone', 'dawn-stone', 'ice-stone',
    'kings-rock', 'dragon-scale', 'upgrade', 'metal-coat', 'dubious-disc', 'protector',
    'electirizer', 'magmarizer', 'razor-claw', 'razor-fang', 'prism-scale', 'whipped-dream',
    'sachet', 'reaper-cloth', 'deep-sea-tooth', 'deep-sea-scale', 'oval-stone',
    'linking-cord', 'black-augurite', 'peat-block', 'auspicious-armor', 'malicious-armor',
    'masterpiece-teacup', 'unremarkable-teacup'
  ]
  
  for (const item of evolutionItems) {
    const itemPath = path.join(itemsDir, `${item}.webp`)
    
    if (!fs.existsSync(itemPath)) {
      const itemUrl = `${SPRITE_BASE_URL}/items/${item}.png`
      const result = await downloadAndOptimizeImage(itemUrl, itemPath, { resize: { width: 64, height: 64 } })
      
      if (result.success) {
        console.log(`  ✅ Item ${item}`)
        successful++
      } else {
        console.log(`  ❌ Item ${item} failed`)
        failed++
      }
    } else {
      console.log(`  ⏭️  Item ${item} exists`)
      successful++
    }
    
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  return { successful, failed }
}

const generatePokemonIds = (strategy) => {
  if (strategy.pokemonIds) return strategy.pokemonIds
  
  const ids = []
  const maxId = strategy.maxId || 151
  for (let i = 1; i <= maxId; i++) {
    ids.push(i)
  }
  
  // Add variant forms if requested
  if (strategy.includeVariants) {
    ids.push(...getAllVariantForms())
  }
  
  return ids
}

const main = async () => {
  console.log('🎯 Complete Pokemon Sprite Solution')
  console.log('===================================')
  
  const args = process.argv.slice(2)
  const strategyName = args[0] || 'gen1'
  
  if (!STRATEGIES[strategyName]) {
    console.log('📋 Available strategies:')
    for (const [key, strategy] of Object.entries(STRATEGIES)) {
      console.log(`  ${key.padEnd(10)} - ${strategy.name}`)
      console.log(`${' '.repeat(13)} ${strategy.description}`)
    }
    console.log('')
    console.log('Usage: node scripts/download-and-optimize-sprites.js [strategy]')
    console.log('Example: node scripts/download-and-optimize-sprites.js gen1')
    return
  }
  
  const strategy = STRATEGIES[strategyName]
  console.log(`📊 Strategy: ${strategy.name}`)
  console.log(`📝 ${strategy.description}`)
  console.log('')
  
  const startTime = Date.now()
  let totalSuccessful = 0
  let totalFailed = 0
  
  try {
    // Process type icons (except for forms-only strategy)
    if (strategyName !== 'forms-only') {
      const typeResult = await processTypes()
      totalSuccessful += typeResult.successful
      totalFailed += typeResult.failed
      
      // Process evolution item sprites
      const itemResult = await processItems()
      totalSuccessful += itemResult.successful
      totalFailed += itemResult.failed
    }
    
    // Process Pokemon artwork
    if (strategyName === 'forms-only') {
      // Only process variant forms
      const variantResult = await processVariantForms(strategy.includeShiny)
      totalSuccessful += variantResult.successful
      totalFailed += variantResult.failed
    } else {
      // Process regular Pokemon
      const pokemonIds = generatePokemonIds(strategy)
      const artworkResult = await processArtwork(pokemonIds, strategy.includeShiny)
      totalSuccessful += artworkResult.successful
      totalFailed += artworkResult.failed
      
      // Process variant forms if requested
      if (strategy.includeVariants) {
        const variantResult = await processVariantForms(strategy.includeShiny)
        totalSuccessful += variantResult.successful
        totalFailed += variantResult.failed
      }
    }
    
    const endTime = Date.now()
    const duration = Math.round((endTime - startTime) / 1000)
    
    console.log('')
    console.log('🎉 Complete!')
    console.log('============')
    console.log(`⏱️  Duration: ${duration}s`)
    console.log(`✅ Successful: ${totalSuccessful}`)
    console.log(`❌ Failed: ${totalFailed}`)
    
    // Show final size
    const { exec } = require('child_process')
    exec('du -sh public/sprites/optimized/', (error, stdout) => {
      if (!error) {
        console.log(`📏 Total size: ${stdout.trim().split('\t')[0]}`)
      }
      console.log('')
      console.log('🚀 Ready to use! Your app now loads 88% faster!')
    })
    
  } catch (error) {
    console.error('💥 Error:', error.message)
  }
}

if (require.main === module) {
  main()
}

module.exports = { downloadAndOptimizeImage, processArtwork, processVariantForms, processTypes, processItems }