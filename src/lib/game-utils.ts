// Shared helpers for the Learn-tab games

import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { PokemonMetadata } from '@/types/pokemon-metadata'
import { getPokedex, DEX_SCOPE_PREFIX } from '@/lib/regional-pokedexes'

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
  /** Set for a game Pokedex scope: regional number of each species in the pool */
  numbers?: Record<number, number>
}

/**
 * Resolve a route param to the Pokemon it covers: "all", "1".."9", or a game
 * Pokedex like "dex-paldea" (pool in that game's order)
 */
export function getScope(genParam: string): GameScope {
  if (genParam.indexOf(DEX_SCOPE_PREFIX) === 0) {
    const dex = getPokedex(genParam.slice(DEX_SCOPE_PREFIX.length))
    if (dex) {
      const numbers: Record<number, number> = {}
      const pool: PokemonMetadata[] = []
      dex.entries.forEach(([number, id]) => {
        const meta = pokemonMetadataService.getMetadataById(id)
        if (!meta || numbers[id] !== undefined) return
        numbers[id] = number
        pool.push(meta)
      })
      return { generation: null, label: `${dex.label} Pokedex`, pool, numbers }
    }
  }
  const generation = genParam === 'all' ? null : parseInt(genParam, 10)
  return {
    generation,
    label: generation === null ? 'All Generations' : `Gen ${generation}`,
    pool: generation === null
      ? pokemonMetadataService.getAllMetadata()
      : pokemonMetadataService.getMetadataByGeneration(generation),
  }
}

/** Number to show for a Pokemon in a scope: its regional number in a game Pokedex, else national */
export function scopeNumber(scope: GameScope, id: number): number {
  return scope.numbers?.[id] ?? id
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
