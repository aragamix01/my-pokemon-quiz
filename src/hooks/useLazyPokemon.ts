'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Pokemon, GenerationNumber } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'

const BATCH_SIZE = 20

interface UseLazyPokemonState {
  pokemon: Pokemon[]
  loading: boolean
  totalCount: number
  hasMore: boolean
  error: string | null
}

interface UseLazyPokemonOptions {
  filteredMetadata?: PokemonMetadata[]
  useMetadata?: boolean
}

export function useLazyPokemon(generation: GenerationNumber, options: UseLazyPokemonOptions = {}) {
  const { filteredMetadata, useMetadata = false } = options
  
  const [state, setState] = useState<UseLazyPokemonState>({
    pokemon: [],
    loading: false,
    totalCount: 0,
    hasMore: true,
    error: null
  })

  const loadedIndicesRef = useRef<Set<number>>(new Set())
  const pokemonMapRef = useRef<Map<number, Pokemon>>(new Map())
  const pokemonIdsRef = useRef<number[]>([])

  // Initialize Pokemon IDs based on metadata or generation
  const initializePokemonIds = useCallback(() => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      let pokemonIds: number[] = []
      
      if (useMetadata && filteredMetadata) {
        // Use filtered metadata IDs
        pokemonIds = filteredMetadata.map(p => p.id).sort((a, b) => a - b)
      } else if (pokemonMetadataService.isMetadataAvailable()) {
        // Use metadata service for generation
        pokemonIds = pokemonMetadataService.getPokemonIdsForGeneration(generation)
      } else {
        // Fallback: will initialize from API later
        pokemonIds = []
      }
      
      pokemonIdsRef.current = pokemonIds
      loadedIndicesRef.current.clear()
      pokemonMapRef.current.clear()
      
      setState(prev => ({
        ...prev,
        pokemon: [],
        totalCount: pokemonIds.length,
        loading: false,
        hasMore: pokemonIds.length > 0
      }))
    } catch (error) {
      console.error('Failed to initialize Pokemon IDs:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load Pokemon data'
      }))
    }
  }, [generation, useMetadata, filteredMetadata])

  // Fallback: Initialize from API if metadata not available
  const initializeFromAPI = useCallback(async () => {
    if (pokemonMetadataService.isMetadataAvailable()) return

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const gen = await pokemonAPI.getGeneration(generation)
      const pokemonIds = gen.pokemon_species
        .map(species => {
          const speciesId = species.url.split('/').slice(-2, -1)[0]
          return parseInt(speciesId)
        })
        .sort((a, b) => a - b)
      
      pokemonIdsRef.current = pokemonIds
      loadedIndicesRef.current.clear()
      pokemonMapRef.current.clear()
      
      setState(prev => ({
        ...prev,
        pokemon: [],
        totalCount: pokemonIds.length,
        loading: false,
        hasMore: pokemonIds.length > 0
      }))
    } catch (error) {
      console.error('Failed to initialize generation from API:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load Pokemon data'
      }))
    }
  }, [generation])

  // Load Pokemon in batches based on visible indices
  const loadPokemonBatch = useCallback(async (indices: number[]) => {
    const pokemonIds = pokemonIdsRef.current
    if (pokemonIds.length === 0) return

    // Filter indices that haven't been loaded yet
    const unloadedIndices = indices.filter(index => 
      index < pokemonIds.length && !loadedIndicesRef.current.has(index)
    )

    if (unloadedIndices.length === 0) return

    try {
      setState(prev => ({ ...prev, loading: true }))

      // Load Pokemon for unloaded indices
      const pokemonPromises = unloadedIndices.map(async (index) => {
        const pokemonId = pokemonIds[index]
        try {
          const pokemon = await pokemonAPI.getPokemon(pokemonId)
          pokemonMapRef.current.set(index, pokemon)
          loadedIndicesRef.current.add(index)
          return { index, pokemon }
        } catch (error) {
          console.error(`Failed to load Pokemon at index ${index}:`, error)
          return null
        }
      })

      await Promise.all(pokemonPromises)

      // Update state with all currently loaded Pokemon
      const loadedPokemon: Pokemon[] = []
      for (let i = 0; i < pokemonIds.length; i++) {
        const pokemon = pokemonMapRef.current.get(i)
        if (pokemon) {
          loadedPokemon.push(pokemon)
        }
      }

      setState(prev => ({
        ...prev,
        pokemon: loadedPokemon.sort((a, b) => a.id - b.id),
        loading: false
      }))
    } catch (error) {
      console.error('Failed to load Pokemon batch:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load some Pokemon'
      }))
    }
  }, [])

  // Get Pokemon at specific index (for virtual scrolling)
  const getPokemonAtIndex = useCallback((index: number): Pokemon | null => {
    return pokemonMapRef.current.get(index) || null
  }, [])

  // Check if Pokemon at index is loaded
  const isPokemonLoaded = useCallback((index: number): boolean => {
    return loadedIndicesRef.current.has(index)
  }, [])

  // Reset when dependencies change
  useEffect(() => {
    initializePokemonIds()
    if (!pokemonMetadataService.isMetadataAvailable()) {
      initializeFromAPI()
    }
  }, [initializePokemonIds, initializeFromAPI])

  return {
    ...state,
    loadPokemonBatch,
    getPokemonAtIndex,
    isPokemonLoaded,
    pokemonIds: pokemonIdsRef.current
  }
}