// Display names and forgiving answer matching for learning modes

const SPECIAL_NAMES: Record<string, string> = {
  'nidoran-f': 'Nidoran♀',
  'nidoran-m': 'Nidoran♂',
  'mr-mime': 'Mr. Mime',
  'mime-jr': 'Mime Jr.',
  'mr-rime': 'Mr. Rime',
  'ho-oh': 'Ho-Oh',
  'porygon-z': 'Porygon-Z',
  'type-null': 'Type: Null',
  'jangmo-o': 'Jangmo-o',
  'hakamo-o': 'Hakamo-o',
  'kommo-o': 'Kommo-o',
  'farfetchd': "Farfetch'd",
  'sirfetchd': "Sirfetch'd",
  'flabebe': 'Flabébé',
  'wo-chien': 'Wo-Chien',
  'chien-pao': 'Chien-Pao',
  'ting-lu': 'Ting-Lu',
  'chi-yu': 'Chi-Yu',
}

/** Turn a PokeAPI species slug into the name shown in games ("mr-mime" -> "Mr. Mime") */
export function formatPokemonName(slug: string): string {
  if (SPECIAL_NAMES[slug]) return SPECIAL_NAMES[slug]
  return slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/** Lowercase letters and digits only, so "Mr. Mime", "mr mime" and "mr-mime" all compare equal */
export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/♀/g, 'f')
    .replace(/♂/g, 'm')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = new Array(b.length + 1)
  for (let j = 0; j <= b.length; j++) prev[j] = j
  for (let i = 1; i <= a.length; i++) {
    const curr = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = curr
  }
  return prev[b.length]
}

export type NameMatch = 'exact' | 'close' | 'wrong'

/** Allow small typos on longer names: 0 for <5 letters, 1 for 5-7, 2 for 8+ */
export function matchName(input: string, slug: string): NameMatch {
  const guess = normalizeName(input)
  const answer = normalizeName(slug)
  if (!guess) return 'wrong'
  if (guess === answer) return 'exact'
  const allowed = answer.length >= 8 ? 2 : answer.length >= 5 ? 1 : 0
  return levenshtein(guess, answer) <= allowed ? 'close' : 'wrong'
}

interface NamedPokemon {
  species_name: string
  name_ja_roma: string | null
}

/** Japanese name in Latin letters ("Hitokage"), or null when it is the same as the English one (Pikachu) */
export function japaneseName(pokemon: NamedPokemon): string | null {
  const roma = pokemon.name_ja_roma
  if (!roma || normalizeName(roma) === normalizeName(pokemon.species_name)) return null
  return roma
}

/** "Charmander (Hitokage)", or just "Pikachu" when both names are the same */
export function bothNames(pokemon: NamedPokemon): string {
  const ja = japaneseName(pokemon)
  const en = formatPokemonName(pokemon.species_name)
  return ja ? `${en} (${ja})` : en
}

/** Check a typed answer against both the English and the Japanese name, keeping the better result */
export function matchPokemonName(input: string, pokemon: NamedPokemon): { match: NameMatch; spelled: string } {
  const en = { match: matchName(input, pokemon.species_name), spelled: formatPokemonName(pokemon.species_name) }
  const ja = japaneseName(pokemon)
  if (en.match === 'exact' || !ja) return en
  const jaResult = { match: matchName(input, ja), spelled: ja }
  const rank: Record<NameMatch, number> = { exact: 2, close: 1, wrong: 0 }
  return rank[jaResult.match] > rank[en.match] ? jaResult : en
}

export function artworkUrl(id: number): string {
  return `/sprites/optimized/pokemon-artwork/${id}.webp`
}

export function artworkFallbackUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function cryUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`
}
