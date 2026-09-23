// Evolution chains from the local database, flattened into straight lines for the Evolution Order game

import chainsData from '@/data/evolution-chains.json'

export interface EvolutionNode {
  id: number
  evolves_to: EvolutionNode[]
}

interface ChainsDatabase {
  chains: Array<{ id: number; tree: EvolutionNode }>
}

const database = chainsData as ChainsDatabase

/**
 * Every root-to-leaf path with at least two Pokemon. Branching families give one
 * path per branch: Eevee -> Vaporeon, Eevee -> Jolteon, ...
 */
export function getEvolutionLines(): number[][] {
  const lines: number[][] = []
  const walk = (node: EvolutionNode, path: number[]) => {
    const next = path.concat(node.id)
    if (node.evolves_to.length === 0) {
      if (next.length >= 2) lines.push(next)
      return
    }
    node.evolves_to.forEach(child => walk(child, next))
  }
  database.chains.forEach(chain => walk(chain.tree, []))
  return lines
}

export type EvolutionStage = 'none' | 'first' | 'middle' | 'final'

let stageCache: Record<number, EvolutionStage> | null = null

/**
 * Where each species sits in its family: 'none' (never evolves), 'first' (base form
 * that evolves), 'middle' (evolved and evolves again) or 'final' (fully evolved)
 */
export function getEvolutionStages(): Record<number, EvolutionStage> {
  if (stageCache) return stageCache
  const stages: Record<number, EvolutionStage> = {}
  const walk = (node: EvolutionNode, depth: number) => {
    const evolves = node.evolves_to.length > 0
    stages[node.id] = depth === 0 ? (evolves ? 'first' : 'none') : evolves ? 'middle' : 'final'
    node.evolves_to.forEach(child => walk(child, depth + 1))
  }
  database.chains.forEach(chain => walk(chain.tree, 0))
  stageCache = stages
  return stages
}
