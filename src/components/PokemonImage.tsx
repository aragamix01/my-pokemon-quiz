'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'

interface PokemonImageProps {
  pokemon: Pokemon
  shiny?: boolean
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  onError?: () => void
}

export default function PokemonImage({ 
  pokemon, 
  shiny = false, 
  alt, 
  width, 
  height, 
  fill = false,
  className,
  style,
  priority = false,
  onError
}: PokemonImageProps) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Get fallback URLs (all pre-downloaded local sprites)
  const fallbackUrls = pokemonAPI.getPokemonImageFallbacks(pokemon, shiny)
  const currentSrc = fallbackUrls[currentSrcIndex] || '/pokemon-placeholder.png'
  
  const handleError = useCallback(() => {
    // Try next fallback URL
    if (currentSrcIndex < fallbackUrls.length - 1) {
      console.log(`Image failed: ${currentSrc}, trying fallback ${currentSrcIndex + 1}`)
      setCurrentSrcIndex(prev => prev + 1)
    } else {
      // All fallbacks exhausted
      console.log('All image fallbacks exhausted for Pokemon', pokemon.id)
      setHasError(true)
      setIsLoading(false)
      onError?.()
    }
  }, [currentSrc, currentSrcIndex, fallbackUrls.length, pokemon.id, onError])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Reset loading state when Pokemon changes
  useEffect(() => {
    setIsLoading(true)
    setCurrentSrcIndex(0)
    setHasError(false)
  }, [pokemon.id, shiny])
  
  const displayAlt = alt || `${shiny ? 'Shiny ' : ''}${pokemon.name}`
  
  // Show error state if all fallbacks failed
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 text-xs ${className || ''}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style
        }}
      >
        <span>Image unavailable</span>
      </div>
    )
  }
  
  return (
    <div className="relative" style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}>
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-600 rounded animate-pulse ${className || ''}`}
          style={{
            opacity: 0.3,
            zIndex: 1,
            ...style
          }}
        />
      )}
      
      {/* Actual image */}
      <Image
        src={currentSrc}
        alt={displayAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
        style={style}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        draggable={false}
        key={`${pokemon.id}-${shiny}-${currentSrcIndex}`} // Force re-render on fallback
      />
    </div>
  )
}