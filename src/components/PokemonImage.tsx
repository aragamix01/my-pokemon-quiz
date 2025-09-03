'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { imageStateManager } from '@/lib/image-state-manager'

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
  // Create a stable key for this image
  const imageKey = `${pokemon.id}-${shiny ? 'shiny' : 'normal'}`
  
  // Initialize state from global manager
  const globalState = imageStateManager.getImageState(imageKey)
  const [currentSrcIndex, setCurrentSrcIndex] = useState(globalState.currentSrcIndex)
  const [hasError, setHasError] = useState(globalState.hasError)
  const [isLoading, setIsLoading] = useState(!globalState.isLoaded)
  
  // Get fallback URLs (all pre-downloaded local sprites)
  const fallbackUrls = pokemonAPI.getPokemonImageFallbacks(pokemon, shiny)
  const currentSrc = fallbackUrls[currentSrcIndex] || '/pokemon-placeholder.png'
  
  const handleError = useCallback(() => {
    // Try next fallback URL
    if (currentSrcIndex < fallbackUrls.length - 1) {
      console.log(`Image failed: ${currentSrc}, trying fallback ${currentSrcIndex + 1}`)
      const newIndex = currentSrcIndex + 1
      setCurrentSrcIndex(newIndex)
      // Persist to global state
      imageStateManager.setImageState(imageKey, {
        currentSrcIndex: newIndex,
        hasError: false,
        isLoaded: false
      })
    } else {
      // All fallbacks exhausted
      console.log('All image fallbacks exhausted for Pokemon', pokemon.id)
      setHasError(true)
      setIsLoading(false)
      // Persist error state
      imageStateManager.setImageState(imageKey, {
        hasError: true,
        isLoaded: false
      })
      onError?.()
    }
  }, [currentSrc, currentSrcIndex, fallbackUrls.length, pokemon.id, onError, imageKey])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    // Persist loaded state
    imageStateManager.setImageState(imageKey, {
      isLoaded: true,
      hasError: false,
      currentSrcIndex
    })
  }, [imageKey, currentSrcIndex])

  // Only reset loading state if this image isn't already loaded in global state
  useEffect(() => {
    const globalState = imageStateManager.getImageState(imageKey)
    if (!globalState.isLoaded && !globalState.hasError) {
      setIsLoading(true)
      setCurrentSrcIndex(0)
      setHasError(false)
    } else {
      // Use cached state
      setIsLoading(!globalState.isLoaded)
      setCurrentSrcIndex(globalState.currentSrcIndex)
      setHasError(globalState.hasError)
    }
  }, [pokemon.id, shiny, imageKey])
  
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