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
