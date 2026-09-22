'use client'

import { useState, useEffect } from 'react'
import { artworkUrl, artworkFallbackUrl } from '@/lib/pokemon-names'
import { cn } from '@/lib/cn'

interface PokemonArtProps {
  id: number
  alt: string
  silhouette?: boolean
  className?: string
  lazy?: boolean
}

/** Official artwork from local WebP, falling back to GitHub when the local sprite is missing */
export default function PokemonArt({ id, alt, silhouette = false, className, lazy = false }: PokemonArtProps) {
  const [src, setSrc] = useState(artworkUrl(id))

  useEffect(() => {
    setSrc(artworkUrl(id))
  }, [id])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      draggable={false}
      onError={() => {
        if (src !== artworkFallbackUrl(id)) setSrc(artworkFallbackUrl(id))
      }}
      className={cn('object-contain select-none', silhouette && 'brightness-0', className)}
    />
  )
}
