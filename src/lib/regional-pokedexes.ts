// Per-game (regional) Pokedexes from the local database: each game's own list and numbering

import data from '@/data/regional-pokedexes.json'

export interface RegionalPokedex {
  name: string
  label: string
  versionGroups: string[]
  /** [regional number, national species ID], in regional order */
  entries: Array<[number, number]>
}

interface RegionalDatabase {
  versions: Record<string, string>
  versionGroups: Record<string, { label: string; order: number; versions: string[] }>
  pokedexes: RegionalPokedex[]
}

const database = data as unknown as RegionalDatabase

/** Route/scope slugs for game Pokedexes look like "dex-paldea", next to "1".."9" and "all" */
export const DEX_SCOPE_PREFIX = 'dex-'

export function getPokedexes(): RegionalPokedex[] {
  return database.pokedexes
}

export function getPokedex(name: string): RegionalPokedex | undefined {
  return database.pokedexes.find(d => d.name === name)
}

/** Games that use a Pokedex, e.g. "Scarlet / Violet" */
export function gamesLabel(dex: RegionalPokedex): string {
  // DLC version groups repeat the base game ("Sword: The Isle of Armor"), so show the first one only
  const first = dex.versionGroups.map(vg => database.versionGroups[vg]?.label).filter(Boolean)
  return first.length ? first[0] : ''
}

/** "Paldea (Scarlet / Violet)" for selectors */
export function pokedexOptionLabel(dex: RegionalPokedex): string {
  const games = gamesLabel(dex)
  return games ? `${dex.label} (${games})` : dex.label
}

export function versionName(version: string): string | undefined {
  return database.versions[version]
}

let numbersCache: Record<string, Record<number, number>> | null = null

/** Regional number of a species in each Pokedex: numbers[dexName][speciesId] */
function regionalNumbers(): Record<string, Record<number, number>> {
  if (numbersCache) return numbersCache
  const result: Record<string, Record<number, number>> = {}
  database.pokedexes.forEach(dex => {
    const map: Record<number, number> = {}
    dex.entries.forEach(([number, id]) => { map[id] = number })
    result[dex.name] = map
  })
  numbersCache = result
  return result
}

export function regionalNumber(dexName: string, speciesId: number): number | undefined {
  return regionalNumbers()[dexName]?.[speciesId]
}

/** Every game Pokedex a species appears in, with its number there */
export function pokedexesForSpecies(speciesId: number): Array<{ dex: RegionalPokedex; number: number }> {
  const numbers = regionalNumbers()
  return database.pokedexes
    .filter(dex => numbers[dex.name][speciesId] !== undefined)
    .map(dex => ({ dex, number: numbers[dex.name][speciesId] }))
}

/** The Pokedex a game version used for this species, e.g. version "sword" -> Galar #380 */
export function numberInVersion(version: string, speciesId: number): { dex: RegionalPokedex; number: number } | null {
  const groups = Object.keys(database.versionGroups).filter(vg => database.versionGroups[vg].versions.indexOf(version) !== -1)
  for (const dex of database.pokedexes) {
    if (!dex.versionGroups.some(vg => groups.indexOf(vg) !== -1)) continue
    const number = regionalNumber(dex.name, speciesId)
    if (number !== undefined) return { dex, number }
  }
  return null
}
