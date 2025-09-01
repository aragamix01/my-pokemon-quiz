import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import https from 'https'

const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites'

// Download sprite with retry logic for 402 errors
const downloadSprite = async (url: string, localPath: string, retries = 2): Promise<boolean> => {
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
          resolve(true)
        })
      } else if (response.statusCode === 402 && retries > 0) {
        // Handle 402 rate limit with retry
        file.close()
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath)
        }
        console.log(`🔄 Rate limited (402), retrying in 3 seconds... (${retries} retries left)`)
        setTimeout(() => {
          downloadSprite(url, localPath, retries - 1).then(resolve)
        }, 3000)
      } else {
        file.close()
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath)
        }
        console.log(`❌ Download failed: HTTP ${response.statusCode}`)
        resolve(false)
      }
    })
    
    request.on('error', (error) => {
      file.close()
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath)
      }
      console.error(`❌ Download error:`, error)
      resolve(false)
    })
    
    // 15 second timeout
    request.setTimeout(15000, () => {
      request.abort()
      resolve(false)
    })
  })
}

export async function POST(request: NextRequest) {
  try {
    const { spriteType, id } = await request.json()
    
    if (!spriteType || !id) {
      return NextResponse.json({ error: 'Missing spriteType or id' }, { status: 400 })
    }
    
    const spriteId = id.toString()
    const localPath = path.join(process.cwd(), 'public', 'sprites', spriteType, `${spriteId}.png`)
    
    // Check if already exists
    if (fs.existsSync(localPath)) {
      return NextResponse.json({ success: true, message: 'Sprite already exists' })
    }
    
    // Determine download URL
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
        return NextResponse.json({ error: 'Invalid sprite type' }, { status: 400 })
    }
    
    console.log(`📥 Downloading sprite: ${spriteType}/${spriteId}`)
    const success = await downloadSprite(downloadUrl, localPath)
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: `Successfully downloaded ${spriteType}/${spriteId}`,
        path: `/sprites/${spriteType}/${spriteId}.png`
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: `Failed to download ${spriteType}/${spriteId}` 
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}