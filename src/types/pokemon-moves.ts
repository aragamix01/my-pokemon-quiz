// Auto-generated Pokemon moves types
export type MoveDamageClass = 'physical' | 'special' | 'status'
export type MoveCategory = 'damage' | 'ailment' | 'net-good-stats' | 'heal' | 'damage+ailment' | 'swagger' | 'damage+lower' | 'damage+raise' | 'damage+heal' | 'ohko' | 'whole-field-effect' | 'field-effect' | 'force-switch' | 'unique'
export type MoveTarget = 'selected-pokemon' | 'all-other-pokemon' | 'user' | 'random-opponent' | 'all-opponents' | 'entire-field' | 'user-or-ally' | 'user-and-allies' | 'all-pokemon' | 'all-allies' | 'ally' | 'fainting-pokemon' | 'opponents-field' | 'selected-pokemon-me-first' | 'specific-move' | 'users-field'

export interface MoveData {
  id: number
  name: string
  type: string | null
  power: number | null
  pp: number | null
  accuracy: number | null
  priority: number
  damageClass: MoveDamageClass | null
  effectChance: number | null
  effect: string
  shortEffect: string
  generation: string | null
  contestType: string | null
  target: MoveTarget | null
  ailment: string | null
  category: MoveCategory | null
  minHits: number | null
  maxHits: number | null
  minTurns: number | null
  maxTurns: number | null
  drain: number
  healing: number
  critRate: number
  ailmentChance: number
  flinchChance: number
  statChance: number
  statChanges: Array<{
    stat: string
    change: number
  }>
  flavorText: string
  machines: Array<{
    machine: string
    version: string
  }>
}

export interface MovesDatabase {
  metadata: {
    version: string
    source: string
    description: string
    lastUpdated: string
    totalMoves: number
  }
  moves: Record<string, MoveData>
  stats: {
    byType: Record<string, number>
    byDamageClass: Record<string, number>
    byGeneration: Record<string, number>
    powerDistribution: {
      noPower: number
      low: number
      medium: number
      high: number
      extreme: number
    }
  }
}
