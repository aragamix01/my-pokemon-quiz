// Auto-generated evolution items types
export type EvolutionType = 'stone' | 'hold' | 'trade' | 'special'

export interface EvolutionItemData {
  id: number
  name: string
  displayName: string
  cost: number
  category: string | null
  attributes: string[]
  effect: string
  shortEffect: string
  flavorText: string
  sprite: string | null
  flingPower: number | null
  flingEffect: string | null
  generation: string | null
  evolutionType: EvolutionType
  machines: Array<{
    machine: string
    version: string
  }>
}

export interface EvolutionItemsDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalItems: number
  }
  items: Record<string, EvolutionItemData>
  categories: {
    stones: number
    holdItems: number
    tradeItems: number
    special: number
  }
  evolutionTypes: {
    stone: EvolutionItemData[]
    hold: EvolutionItemData[]
    trade: EvolutionItemData[]
    special: EvolutionItemData[]
  }
}
