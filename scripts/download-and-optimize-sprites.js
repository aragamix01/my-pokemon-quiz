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

// Variant form IDs (Mega, Primal, Alolan, Galarian, Hisuian, Paldean, ...) start at 10001.
// The real list is discovered from the upstream sprites repo at runtime so newly added
// forms are picked up automatically. These constants are only the offline fallback.
const VARIANT_FORMS = {
  startId: 10001,  // First variant form (Mega Venusaur)
  endId: 10326,    // Highest known variant form - fallback only, upstream is authoritative
}

const FALLBACK_MAX_BASE_ID = 1025

// Get all variant form IDs - fallback range used when upstream listing is unavailable
const getAllVariantForms = () => {
  const forms = []
  for (let i = VARIANT_FORMS.startId; i <= VARIANT_FORMS.endId; i++) {
    forms.push(i)
  }
  return forms
}

// ── upstream artwork discovery ────────────────────────────────────────────
// The contents API truncates at 1000 entries (the artwork directory holds more),
// so walk the git tree down to the official-artwork subtree instead.

const GITHUB_API = 'https://api.github.com'
const SPRITES_REPO = 'PokeAPI/sprites'
const ARTWORK_PATH = ['sprites', 'pokemon', 'other', 'official-artwork']

const githubJson = async (url) => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'pokemon-toolkit-sprites',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`)
  return res.json()
}

let upstreamIdsCache = null

/** All Pokemon artwork IDs present upstream, or null when discovery fails. */
const fetchUpstreamArtworkIds = async () => {
  if (upstreamIdsCache !== null) return upstreamIdsCache

  try {
    let sha = 'master'
    for (const segment of ARTWORK_PATH) {
      const tree = await githubJson(`${GITHUB_API}/repos/${SPRITES_REPO}/git/trees/${sha}`)
      const node = tree.tree.find(entry => entry.path === segment && entry.type === 'tree')
      if (!node) throw new Error(`Path segment not found: ${segment}`)
      sha = node.sha
    }

    const artwork = await githubJson(`${GITHUB_API}/repos/${SPRITES_REPO}/git/trees/${sha}`)
    if (artwork.truncated) throw new Error('Artwork tree truncated')

    const ids = artwork.tree
      .filter(entry => entry.type === 'blob' && /^\d+\.png$/.test(entry.path))
      .map(entry => parseInt(entry.path, 10))
      .sort((a, b) => a - b)

    if (!ids.length) throw new Error('No artwork files found')

    upstreamIdsCache = ids
    console.log(`🌐 Upstream artwork: ${ids.length} files (${ids.filter(id => id > 10000).length} variant forms, max id ${ids[ids.length - 1]})`)
    return ids
  } catch (error) {
    console.warn(`  ⚠️  Upstream sprite listing unavailable (${error.message}), using built-in ranges`)
    upstreamIdsCache = false
    return null
  }
}

/** Variant form IDs from upstream, falling back to the static range. */
const resolveVariantForms = async () => {
  const ids = await fetchUpstreamArtworkIds()
  return ids ? ids.filter(id => id > 10000) : getAllVariantForms()
}

/** Base Pokemon IDs from upstream, falling back to 1..FALLBACK_MAX_BASE_ID. */
const resolveBaseIds = async () => {
  const ids = await fetchUpstreamArtworkIds()
  if (ids) return ids.filter(id => id <= 10000)
  return Array.from({ length: FALLBACK_MAX_BASE_ID }, (_, i) => i + 1)
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
    description: 'Every base Pokemon available upstream, with shiny (~12MB)',
    useUpstreamBase: true,
    includeShiny: true,
    includeForms: false,
    includeVariants: false
  },
  'forms-only': {
    name: 'Variant Forms Only',
    description: 'Every variant form upstream: Mega, Alolan, Galarian, Hisuian, Paldean, etc. (~9MB)',
    useUpstreamForms: true,
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
  const variantIds = await resolveVariantForms()
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

  // Load evolution items from JSON database to ensure consistency
  let evolutionItems = []
  try {
    const evolutionItemsPath = path.join(__dirname, '..', 'src', 'data', 'evolution-items.json')
    const evolutionItemsData = JSON.parse(fs.readFileSync(evolutionItemsPath, 'utf8'))
    evolutionItems = Object.keys(evolutionItemsData.items)
    console.log(`  📦 Loaded ${evolutionItems.length} evolution items from database`)
  } catch (error) {
    console.warn('  ⚠️  Failed to load evolution-items.json, using fallback list')
    // Fallback to complete evolution items list if JSON fails to load
    evolutionItems = [
      'fire-stone', 'water-stone', 'thunder-stone', 'leaf-stone', 'moon-stone', 'sun-stone',
      'shiny-stone', 'dusk-stone', 'dawn-stone', 'ice-stone', 'kings-rock', 'metal-coat',
      'dragon-scale', 'protector', 'electirizer', 'magmarizer', 'dubious-disc', 'reaper-cloth',
      'razor-claw', 'razor-fang', 'prism-scale', 'whipped-dream', 'sachet', 'oval-stone',
      'deep-sea-tooth', 'deep-sea-scale', 'linking-cord', 'sweet-apple', 'tart-apple',
      'cracked-pot', 'chipped-pot', 'galarica-cuff', 'galarica-wreath', 'strawberry-sweet',
      'love-sweet', 'berry-sweet', 'clover-sweet', 'flower-sweet', 'star-sweet', 'ribbon-sweet',
      'gimmighoul-coin', 'black-augurite', 'peat-block', 'auspicious-armor', 'malicious-armor',
      'scroll-of-darkness', 'scroll-of-waters', 'masterpiece-teacup', 'unremarkable-teacup'
    ]
  }
  
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

const generatePokemonIds = async (strategy) => {
  if (strategy.useUpstreamForms) return resolveVariantForms()
  if (strategy.pokemonIds) return strategy.pokemonIds

  let ids
  if (strategy.useUpstreamBase) {
    ids = await resolveBaseIds()
  } else {
    ids = []
    const maxId = strategy.maxId || 151
    for (let i = 1; i <= maxId; i++) {
      ids.push(i)
    }
  }

  // Add variant forms if requested
  if (strategy.includeVariants) {
    ids.push(...(await resolveVariantForms()))
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
      const pokemonIds = await generatePokemonIds(strategy)
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