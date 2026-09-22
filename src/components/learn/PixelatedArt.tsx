'use client'

import { useEffect, useRef, useState } from 'react'
import { artworkUrl, artworkFallbackUrl } from '@/lib/pokemon-names'

interface PixelatedArtProps {
  id: number
  /** Blocks across the image; 0 draws it sharp */
  blocks: number
  size?: number
}

/** Draws the artwork shrunk to `blocks` x `blocks` pixels and scaled back up without smoothing */
export default function PixelatedArt({ id, blocks, size = 240 }: PixelatedArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    let cancelled = false
    setImage(null)
    const load = (src: string, fallback?: string) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => { if (!cancelled) setImage(img) }
      img.onerror = () => { if (fallback && !cancelled) load(fallback) }
      img.src = src
    }
    load(artworkUrl(id), artworkFallbackUrl(id))
    return () => { cancelled = true }
  }, [id])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !image) return
    const scale = window.devicePixelRatio || 1
    canvas.width = size * scale
    canvas.height = size * scale
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!blocks) {
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      return
    }
    const small = document.createElement('canvas')
    small.width = blocks
    small.height = blocks
    const smallCtx = small.getContext('2d')
    if (!smallCtx) return
    smallCtx.drawImage(image, 0, 0, blocks, blocks)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(small, 0, 0, canvas.width, canvas.height)
  }, [image, blocks, size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, maxWidth: '100%', aspectRatio: '1 / 1' }}
      aria-label="Pixelated mystery Pokemon"
    />
  )
}
