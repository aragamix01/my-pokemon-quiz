// Pokedle: guess a hidden Pokemon, each guess reveals which traits match

import { PokemonMetadata } from '@/types/pokemon-metadata'

export type ClueStatus = 'match' | 'partial' | 'miss'
export type ClueDirection = 'up' | 'down' | null

export interface Clue {
  key: string
  label: string
  value: string
  status: ClueStatus
  /** For numbers: whether the hidden Pokemon's value is higher (up) or lower (down) */
  direction: ClueDirection
}

export const MAX_GUESSES = 8
export const SILHOUETTE_AFTER = 4

// Numbers within this ratio of the answer count as "close"
const NEAR_RATIO = 0.25

function compareType(guess: PokemonMetadata, answer: PokemonMetadata, slot: 0 | 1): Clue {
  const value = guess.types[slot] ?? 'none'
  const target = answer.types[slot] ?? 'none'
  const status: ClueStatus =
    value === target ? 'match' : value !== 'none' && answer.types.indexOf(value) !== -1 ? 'partial' : 'miss'
  return { key: `type${slot + 1}`, label: `Type ${slot + 1}`, value, status, direction: null }
}

function compareNumber(key: string, label: string, guess: number, answer: number, display: string): Clue {
  if (guess === answer) return { key, label, value: display, status: 'match', direction: null }
  const near = Math.abs(guess - answer) <= Math.max(1, answer * NEAR_RATIO)
  return { key, label, value: display, status: near ? 'partial' : 'miss', direction: answer > guess ? 'up' : 'down' }
}

function compareText(key: string, label: string, guess: string | null, answer: string | null): Clue {
  return { key, label, value: guess ?? '—', status: guess === answer ? 'match' : 'miss', direction: null }
}

export function compareGuess(guess: PokemonMetadata, answer: PokemonMetadata): Clue[] {
  const gen = compareNumber('gen', 'Gen', guess.generation, answer.generation, String(guess.generation))
  // Generations are "close" only when exactly one apart
  if (gen.status === 'partial' && Math.abs(guess.generation - answer.generation) > 1) gen.status = 'miss'

  return [
    compareType(guess, answer, 0),
    compareType(guess, answer, 1),
    gen,
    compareText('color', 'Color', guess.color, answer.color),
    compareText('shape', 'Shape', guess.shape, answer.shape),
    compareNumber('height', 'Height', guess.height, answer.height, `${(guess.height / 10).toFixed(1)}m`),
    compareNumber('weight', 'Weight', guess.weight, answer.weight, `${(guess.weight / 10).toFixed(1)}kg`),
  ]
}

export interface GuessStats {
  played: number
  won: number
  streak: number
  bestStreak: number
}

const STATS_KEY = 'pokemon-guess-v1'

export function loadGuessStats(): GuessStats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (raw) return JSON.parse(raw) as GuessStats
  } catch {
    // fall through to fresh stats
  }
  return { played: 0, won: 0, streak: 0, bestStreak: 0 }
}

export function recordGame(stats: GuessStats, won: boolean): GuessStats {
  const streak = won ? stats.streak + 1 : 0
  const next = {
    played: stats.played + 1,
    won: stats.won + (won ? 1 : 0),
    streak,
    bestStreak: Math.max(stats.bestStreak, streak),
  }
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(next))
  } catch {
    // stats stay in memory for this visit
  }
  return next
}
