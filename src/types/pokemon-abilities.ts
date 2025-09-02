// Auto-generated Pokemon abilities types
export interface AbilityData {
  id: number
  name: string
  displayName: string
  isMainSeries: boolean
  generation: string | null
  effect: string
  shortEffect: string
  flavorText: string
  pokemon: Array<{
    name: string
    slot: number
    isHidden: boolean
  }>
  pokemonCount: number
  changes: Array<{
    version: string
    effect: string
  }>
}

export interface AbilitiesDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalAbilities: number
  }
  abilities: Record<string, AbilityData>
  stats: {
    byGeneration: Record<string, number>
    hiddenAbilities: number
    mainSeries: number
    mostCommon: Array<{
      name: string
      displayName: string
      pokemonCount: number
    }>
    rarest: Array<{
      name: string
      displayName: string
      pokemonCount: number
    }>
  }
}
