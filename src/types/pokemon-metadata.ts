// Auto-generated Pokemon metadata types
export interface PokemonMetadata {
  id: number
  name: string
  species_name: string
  generation: number
  types: string[]
  height: number
  weight: number
  base_experience: number
  habitat: string | null
  color: string | null
  shape: string | null
  is_legendary: boolean
  is_mythical: boolean
  capture_rate: number
  base_happiness: number
  growth_rate: string | null
  egg_groups: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    'special-attack': number
    'special-defense': number
    speed: number
  }
  total_stats: number
  has_variants: boolean
  variants: Array<{
    name: string
    is_default: boolean
    id: number
  }>
}

export interface GenerationData {
  id: number
  name: string
  pokemon_count: number
  pokemon: Array<{
    id: number
    name: string
  }>
}

export type GenerationsDatabase = Record<number, GenerationData>
