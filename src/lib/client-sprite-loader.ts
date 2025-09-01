/**
 * Client-side on-demand sprite loader
 * Downloads sprites via API route when needed
 */

// Cache for tracking download attempts
const downloadAttempts = new Map<string, boolean>()

// Request sprite download via API route
export const requestSpriteDownload = async (spriteType: 'pokemon-artwork' | 'pokemon' | 'types', id: string | number): Promise<boolean> => {
  const spriteId = id.toString()
  const cacheKey = `${spriteType}-${spriteId}`
  
  // Don't retry if already attempted
  if (downloadAttempts.has(cacheKey)) {
    return downloadAttempts.get(cacheKey)!
  }
  
  try {
    const response = await fetch('/api/download-sprite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spriteType,
        id: spriteId
      })
    })
    
    const success = response.ok
    downloadAttempts.set(cacheKey, success)
    
    if (success) {
      console.log(`📥 Successfully requested download for ${spriteType}/${spriteId}`)
    } else {
      console.log(`❌ Failed to download ${spriteType}/${spriteId}`)
    }
    
    return success
  } catch (error) {
    console.error(`Error downloading sprite:`, error)
    downloadAttempts.set(cacheKey, false)
    return false
  }
}

// Get sprite URL - optimized WebP with fallback chain
export const getSpriteUrl = (pokemonId: number, type: 'artwork' | 'sprite' = 'artwork'): string => {
  if (type === 'artwork') {
    return `/sprites/optimized/pokemon-artwork/${pokemonId}.webp`
  } else {
    return `/sprites/optimized/pokemon-artwork/${pokemonId}.webp` // Only artwork now
  }
}

// Get sprite fallback URLs - optimized WebP with PNG fallback
export const getSpriteFallbacks = (pokemonId: number): string[] => {
  return [
    `/sprites/optimized/pokemon-artwork/${pokemonId}.webp`,
    `/sprites/pokemon-artwork/${pokemonId}.png`, // PNG fallback
    '/pokemon-placeholder.png'
  ]
}

// Get type icon - optimized WebP with PNG fallback
export const getTypeIconUrl = (typeId: number): string => {
  return `/sprites/optimized/types/${typeId}.webp`
}

// Get type icon fallbacks - optimized WebP with PNG fallback
export const getTypeIconFallbacks = (typeId: number): string[] => {
  return [
    `/sprites/optimized/types/${typeId}.webp`,
    `/sprites/types/${typeId}.png`, // PNG fallback
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typeId}.png`,
    '/type-placeholder.png'
  ]
}