// Spaced-repetition progress for Learn mode, stored per browser in localStorage.
//
// Every Pokemon climbs three stages: see it with its name (intro), pick it from
// four choices (choose), then type the name from memory (type). Once a card
// reaches the type stage, a Leitner box decides when it is due again.

export type LearnStage = 0 | 1 | 2
export type LearnMode = 'intro' | 'choose' | 'type'

export interface CardProgress {
  id: number
  stage: LearnStage
  box: number
  due: number
  reps: number
  lapses: number
}

export interface LearnState {
  version: 1
  cards: Record<number, CardProgress>
  daily: { date: string; newCount: number }
  streak: { lastDate: string; count: number }
  newPerDay: number
}

export type Grade = 'again' | 'hard' | 'good'

const STORAGE_KEY = 'pokemon-learn-v1'
const MINUTE = 60 * 1000
const DAY = 24 * 60 * MINUTE

// Wait before a card is due again, indexed by box
export const BOX_INTERVALS = [0, 10 * MINUTE, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY]
export const MAX_BOX = BOX_INTERVALS.length - 1
export const MASTERED_BOX = 4
export const DEFAULT_NEW_PER_DAY = 10

export function todayKey(now: number = Date.now()): string {
  const d = new Date(now)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function emptyState(): LearnState {
  return {
    version: 1,
    cards: {},
    daily: { date: todayKey(), newCount: 0 },
    streak: { lastDate: '', count: 0 },
    newPerDay: DEFAULT_NEW_PER_DAY,
  }
}

export function loadLearnState(): LearnState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as LearnState
    if (parsed.version !== 1) return emptyState()
    return { ...emptyState(), ...parsed }
  } catch {
    return emptyState()
  }
}

export function saveLearnState(state: LearnState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full or blocked: progress stays in memory for this visit
  }
}

export function modeForStage(stage: LearnStage): LearnMode {
  return stage === 0 ? 'intro' : stage === 1 ? 'choose' : 'type'
}

export function isMastered(card: CardProgress | undefined): boolean {
  return !!card && card.stage === 2 && card.box >= MASTERED_BOX
}

export function newCardsLeftToday(state: LearnState, now: number = Date.now()): number {
  const used = state.daily.date === todayKey(now) ? state.daily.newCount : 0
  return Math.max(0, state.newPerDay - used)
}

/** Due cards first (most overdue first), then unseen Pokemon in Pokedex order up to today's new-card allowance */
export function buildQueue(
  state: LearnState,
  scopeIds: number[],
  now: number = Date.now(),
  maxReviews: number = 40
): { reviews: number[]; fresh: number[] } {
  const reviews = scopeIds
    .map(id => state.cards[id])
    .filter((c): c is CardProgress => !!c && c.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, maxReviews)
    .map(c => c.id)

  const fresh = scopeIds
    .filter(id => !state.cards[id])
    .slice(0, newCardsLeftToday(state, now))

  return { reviews, fresh }
}

/** Record that a new Pokemon was introduced today */
export function introduceCard(state: LearnState, id: number, now: number = Date.now()): LearnState {
  if (state.cards[id]) return state
  const date = todayKey(now)
  const newCount = state.daily.date === date ? state.daily.newCount + 1 : 1
  return {
    ...state,
    cards: { ...state.cards, [id]: { id, stage: 1, box: 0, due: now, reps: 0, lapses: 0 } },
    daily: { date, newCount },
  }
}

/**
 * Apply an answer. Returns the new state plus whether the card should come back
 * later in this same session (still learning) or is done for now.
 */
export function gradeCard(
  state: LearnState,
  id: number,
  grade: Grade,
  now: number = Date.now()
): { state: LearnState; repeatInSession: boolean } {
  const card = state.cards[id]
  if (!card) return { state, repeatInSession: false }

  let next: CardProgress
  let repeatInSession: boolean

  if (grade === 'again') {
    next = { ...card, box: Math.min(card.box, 1), due: now, lapses: card.lapses + 1, reps: card.reps + 1 }
    repeatInSession = true
  } else if (card.stage < 2) {
    // Correct on choose: promote to typing and keep practicing this session
    next = { ...card, stage: 2, due: now, reps: card.reps + 1 }
    repeatInSession = true
  } else {
    const box = grade === 'good' ? Math.min(MAX_BOX, card.box + 1) : Math.max(1, card.box)
    next = { ...card, box, due: now + BOX_INTERVALS[box], reps: card.reps + 1 }
    repeatInSession = false
  }

  return {
    state: { ...state, cards: { ...state.cards, [id]: next } },
    repeatInSession,
  }
}

/** Count today as a study day, extending the streak if yesterday was one too */
export function touchStreak(state: LearnState, now: number = Date.now()): LearnState {
  const today = todayKey(now)
  if (state.streak.lastDate === today) return state
  const yesterday = todayKey(now - DAY)
  const count = state.streak.lastDate === yesterday ? state.streak.count + 1 : 1
  return { ...state, streak: { lastDate: today, count } }
}

export function scopeStats(state: LearnState, scopeIds: number[], now: number = Date.now()) {
  let seen = 0
  let mastered = 0
  let due = 0
  for (let i = 0; i < scopeIds.length; i++) {
    const card = state.cards[scopeIds[i]]
    if (!card) continue
    seen++
    if (isMastered(card)) mastered++
    if (card.due <= now) due++
  }
  return { total: scopeIds.length, seen, mastered, due }
}
