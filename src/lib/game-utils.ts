// Shared helpers for the Learn-tab games

import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { PokemonMetadata } from '@/types/pokemon-metadata'

export function shuffle<T>(array: T[]): T[] {
  const out = array.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export interface GameScope {
  generation: number | null
  label: string
  pool: PokemonMetadata[]
}

/** Resolve a route param ("all" or "1".."9") to the Pokemon it covers */
export function getScope(genParam: string): GameScope {
  const generation = genParam === 'all' ? null : parseInt(genParam, 10)
  return {
    generation,
    label: generation === null ? 'All Generations' : `Gen ${generation}`,
    pool: generation === null
      ? pokemonMetadataService.getAllMetadata()
      : pokemonMetadataService.getMetadataByGeneration(generation),
  }
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Best results per game and scope, kept in this browser only */
const BEST_KEY = 'pokemon-games-best-v1'

type BestScores = Record<string, number>

function loadAllBest(): BestScores {
  try {
    const raw = localStorage.getItem(BEST_KEY)
    return raw ? (JSON.parse(raw) as BestScores) : {}
  } catch {
    return {}
  }
}

export function loadBest(key: string): number | null {
  const value = loadAllBest()[key]
  return typeof value === 'number' ? value : null
}

/**
 * Save a result if it beats the stored one. `higherIsBetter` false is for
 * results like move counts or times. Returns true when it is a new best.
 */
export function saveBest(key: string, value: number, higherIsBetter: boolean = true): boolean {
  const all = loadAllBest()
  const previous = all[key]
  const better = typeof previous !== 'number' || (higherIsBetter ? value > previous : value < previous)
  if (!better) return false
  all[key] = value
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(all))
  } catch {
    // best score stays unsaved when storage is blocked
  }
  return true
}
