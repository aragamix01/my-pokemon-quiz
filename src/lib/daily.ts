// Daily Challenge: the same puzzles for everyone on a given day (per generation scope),
// with results and a streak kept in this browser

import { todayKey } from '@/lib/learn-progress'

export type DailyPuzzle = 'pokedle' | 'reveal'
export const DAILY_PUZZLES: DailyPuzzle[] = ['pokedle', 'reveal']

export interface DailyResult {
  won: boolean
  /** Pokedle: guess count. Pixel Reveal: points */
  score: number
  /** Pokedle: guessed IDs, newest first, so a finished board can be shown again */
  guesses?: number[]
}

interface DailyState {
  version: 1
  // date -> "puzzle:scope" -> result
  days: Record<string, Record<string, DailyResult>>
}

const STORAGE_KEY = 'pokemon-daily-v1'
const DAY = 24 * 60 * 60 * 1000

/** 32-bit string hash (FNV-1a) */
function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Deterministic pseudo-random numbers in [0, 1) from a seed (mulberry32) */
export function seededRandom(seed: string): () => number {
  let state = hashString(seed)
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Today's pick for a puzzle; everyone with the same date and scope gets the same one */
export function dailyPick<T>(items: T[], puzzle: DailyPuzzle, scope: string, date: string = todayKey()): T {
  const random = seededRandom(`${puzzle}|${scope}|${date}`)
  return items[Math.floor(random() * items.length)]
}

function load(): DailyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DailyState
      if (parsed.version === 1) return parsed
    }
  } catch {
    // fall through to empty state
  }
  return { version: 1, days: {} }
}

export function getDailyResult(puzzle: DailyPuzzle, scope: string, date: string = todayKey()): DailyResult | null {
  return load().days[date]?.[`${puzzle}:${scope}`] ?? null
}

export function saveDailyResult(puzzle: DailyPuzzle, scope: string, result: DailyResult, date: string = todayKey()): void {
  const state = load()
  state.days[date] = { ...state.days[date], [`${puzzle}:${scope}`]: result }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // result stays unsaved when storage is blocked
  }
}

/** Consecutive days (ending today, or yesterday if today isn't played yet) with at least one daily puzzle finished */
export function dailyStreak(now: number = Date.now()): number {
  const days = load().days
  const played = (t: number) => Object.keys(days[todayKey(t)] ?? {}).length > 0
  let t = played(now) ? now : now - DAY
  let streak = 0
  while (played(t)) {
    streak++
    t -= DAY
  }
  return streak
}

export function msUntilTomorrow(now: number = Date.now()): number {
  const d = new Date(now)
  const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime()
  return midnight - now
}
