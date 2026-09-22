// Question generator for the Type Quiz, built on the local type chart

import { PokemonMetadata } from '@/types/pokemon-metadata'
import { PokemonTypeName, getDamageMultiplier, calculateDualTypeMultiplier } from '@/lib/type-effectiveness'
import { POKEMON_TYPES } from '@/lib/pokemon-metadata'
import { bothNames } from '@/lib/pokemon-names'
import { shuffle } from '@/lib/game-utils'

export type QuestionKind = 'matchup' | 'pokemon-matchup' | 'pokemon-type' | 'super-effective'

export interface QuizOption {
  value: string
  label: string
  /** Types to draw as pills instead of plain text */
  types?: string[]
}

export interface TypeQuestion {
  kind: QuestionKind
  prompt: string
  attackType?: string
  defendTypes?: string[]
  pokemon?: PokemonMetadata
  options: QuizOption[]
  answer: string
  explanation: string
}

const TYPES = POKEMON_TYPES as PokemonTypeName[]

const MULTIPLIER_LABELS: Record<string, string> = {
  '4': '×4',
  '2': '×2',
  '1': '×1',
  '0.5': '×½',
  '0.25': '×¼',
  '0': '×0',
}

const MULTIPLIER_WORDS: Record<string, string> = {
  '4': 'super effective (×4)',
  '2': 'super effective (×2)',
  '1': 'normal damage (×1)',
  '0.5': 'not very effective (×½)',
  '0.25': 'barely effective (×¼)',
  '0': 'no effect (×0)',
}

const title = (type: string) => type.charAt(0).toUpperCase() + type.slice(1)
// "an Electric attack", "a Fire attack"
const withArticle = (type: string) => `${/^[aeiou]/i.test(type) ? 'an' : 'a'} ${title(type)}`
const typeList = (types: string[]) => types.map(title).join(' / ')
const pickOne = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

function multiplierOptions(values: number[]): QuizOption[] {
  return values.map(v => ({ value: String(v), label: MULTIPLIER_LABELS[String(v)] }))
}

/** Single type vs single type. Two in three questions use a pair that isn't ×1, since those are what you need to learn */
function matchupQuestion(): TypeQuestion {
  const interesting = Math.random() < 0.67
  let attack = pickOne(TYPES)
  let defend = pickOne(TYPES)
  for (let tries = 0; interesting && tries < 50 && getDamageMultiplier(attack, defend) === 1; tries++) {
    attack = pickOne(TYPES)
    defend = pickOne(TYPES)
  }
  const m = getDamageMultiplier(attack, defend)
  return {
    kind: 'matchup',
    prompt: `How much damage does ${withArticle(attack)} attack do to ${withArticle(defend)} Pokemon?`,
    attackType: attack,
    defendTypes: [defend],
    options: multiplierOptions([2, 1, 0.5, 0]),
    answer: String(m),
    explanation: `${title(attack)} → ${title(defend)} is ${MULTIPLIER_WORDS[String(m)]}.`,
  }
}

/** Attack type vs a real (often dual-type) Pokemon, so the two multipliers combine */
function pokemonMatchupQuestion(pool: PokemonMetadata[]): TypeQuestion {
  const dual = pool.filter(p => p.types.length === 2)
  const pokemon = pickOne(dual.length ? dual : pool)
  const defend = pokemon.types as PokemonTypeName[]
  let attack = pickOne(TYPES)
  for (let tries = 0; tries < 30 && calculateDualTypeMultiplier(attack, defend) === 1; tries++) attack = pickOne(TYPES)
  const m = calculateDualTypeMultiplier(attack, defend)
  const parts = defend.map(t => `${MULTIPLIER_LABELS[String(getDamageMultiplier(attack, t))]} vs ${title(t)}`)
  return {
    kind: 'pokemon-matchup',
    prompt: `How much damage does ${withArticle(attack)} attack do to ${bothNames(pokemon)}?`,
    attackType: attack,
    defendTypes: defend,
    pokemon,
    options: multiplierOptions(defend.length === 2 ? [4, 2, 1, 0.5, 0.25, 0] : [2, 1, 0.5, 0]),
    answer: String(m),
    explanation: `${bothNames(pokemon)} is ${typeList(defend)}. ${title(attack)} does ${parts.join(', ')}, so ${MULTIPLIER_WORDS[String(m)]}.`,
  }
}

/** "What type is X?" with the real type combo and three other combos */
function pokemonTypeQuestion(pool: PokemonMetadata[]): TypeQuestion {
  const pokemon = pickOne(pool)
  // Same pair in either order is the same answer (Rock/Ground = Ground/Rock)
  const key = (types: string[]) => types.slice().sort().join('/')
  const answer = key(pokemon.types)
  const seen: Record<string, true> = { [answer]: true }
  const options: QuizOption[] = [{ value: answer, label: typeList(pokemon.types), types: pokemon.types }]

  // Prefer combos sharing one type with the answer, so it can't be guessed from one type alone
  const candidates = shuffle(pool.map(p => p.types)).concat(TYPES.map(t => [t]))
  const sharing = candidates.filter(types => types.some(t => pokemon.types.indexOf(t) !== -1))
  const others = sharing.concat(candidates)
  for (let i = 0; i < others.length && options.length < 4; i++) {
    const k = key(others[i])
    if (seen[k]) continue
    seen[k] = true
    options.push({ value: k, label: typeList(others[i]), types: others[i] })
  }
  return {
    kind: 'pokemon-type',
    prompt: `What type is ${bothNames(pokemon)}?`,
    pokemon,
    options: shuffle(options),
    answer,
    explanation: `${bothNames(pokemon)} is ${typeList(pokemon.types)}.`,
  }
}

/** "Which attack is super effective against X?" with exactly one right choice */
function superEffectiveQuestion(): TypeQuestion {
  let defend = pickOne(TYPES)
  let strong = TYPES.filter(t => getDamageMultiplier(t, defend) === 2)
  while (strong.length === 0) {
    defend = pickOne(TYPES)
    strong = TYPES.filter(t => getDamageMultiplier(t, defend) === 2)
  }
  const correct = pickOne(strong)
  const wrong = shuffle(TYPES.filter(t => getDamageMultiplier(t, defend) < 2)).slice(0, 3)
  return {
    kind: 'super-effective',
    prompt: `Which attack type is super effective against ${title(defend)}?`,
    defendTypes: [defend],
    options: shuffle([correct].concat(wrong)).map(t => ({ value: t, label: title(t), types: [t] })),
    answer: correct,
    explanation: `${strong.map(title).join(', ')} ${strong.length === 1 ? 'is' : 'are'} super effective against ${title(defend)}.`,
  }
}

export function buildTypeQuiz(pool: PokemonMetadata[], count: number): TypeQuestion[] {
  const makers = [
    () => matchupQuestion(),
    () => superEffectiveQuestion(),
    () => pokemonTypeQuestion(pool),
    () => pokemonMatchupQuestion(pool),
  ]
  const questions: TypeQuestion[] = []
  for (let i = 0; i < count; i++) questions.push(makers[i % makers.length]())
  return shuffle(questions)
}
