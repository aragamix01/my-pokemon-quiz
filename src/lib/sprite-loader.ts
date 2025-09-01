/**
 * On-demand sprite loader - only downloads sprites when needed
 * Avoids GitHub rate limits by caching sprites locally as they're used
 */

import fs from 'fs'
import path from 'path'
import https from 'https'

const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites'

// In-memory cache to avoid redundant downloads
const downloadCache = new Map<string, Promise<boolean>>()

// Download a single sprite file
const downloadSprite = async (url: string, localPath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Ensure directory exists
    const dir = path.dirname(localPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = fs.createWriteStream(localPath)
    
    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`📥 Downloaded sprite: ${path.basename(localPath)}`)
          resolve(true)
        })
      } else {
        file.close()
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath) // Remove empty file
        }
        console.log(`❌ Failed to download sprite: ${url} (${response.statusCode})`)
        resolve(false)
      }
    })
    
    request.on('error', () => {
      file.close()
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath)
      }
      resolve(false)
    })
    
    // Timeout after 10 seconds
    request.setTimeout(10000, () => {
      request.abort()
      resolve(false)
    })
  })
}

// Check if sprite exists locally, download if needed
export const ensureSpriteExists = async (spriteType: 'pokemon-artwork' | 'pokemon' | 'types', id: string | number): Promise<string> => {
  const spriteId = id.toString()
  const localPath = path.join(process.cwd(), 'public', 'sprites', spriteType, `${spriteId}.png`)
  const webPath = `/sprites/${spriteType}/${spriteId}.png`
  
  // Check if already exists locally
  if (fs.existsSync(localPath)) {
    return webPath
  }
  
  // Check if download is already in progress
  const cacheKey = `${spriteType}-${spriteId}`
  if (downloadCache.has(cacheKey)) {
    const success = await downloadCache.get(cacheKey)!
    return success ? webPath : ''
  }
  
  // Start download
  let downloadUrl = ''
  switch (spriteType) {
    case 'pokemon-artwork':
      downloadUrl = `${SPRITE_BASE_URL}/pokemon/other/official-artwork/${spriteId}.png`
      break
    case 'pokemon':
      downloadUrl = `${SPRITE_BASE_URL}/pokemon/${spriteId}.png`
      break
    case 'types':
      downloadUrl = `${SPRITE_BASE_URL}/types/generation-ix/scarlet-violet/${spriteId}.png`
      break
    default:
      return ''
  }
  
  // Cache the download promise
  const downloadPromise = downloadSprite(downloadUrl, localPath)
  downloadCache.set(cacheKey, downloadPromise)
  
  const success = await downloadPromise
  return success ? webPath : ''
}

// Browser-side function to check sprite availability
export const checkSpriteAvailability = (spriteType: 'pokemon-artwork' | 'pokemon' | 'types', id: string | number): string => {
  // This just returns the expected path - actual availability is checked when image loads/fails
  return `/sprites/${spriteType}/${id}.png`
}