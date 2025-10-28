import embeddingsData from '@/data/pokemon-embeddings.json'
import { pokemonMetadataService } from './pokemon-metadata'

export interface SimilarPokemon {
  id: number
  name: string
  similarity: number
}

// Cache for embeddings to avoid reloading
let embeddingsCache: Map<string, number[]> | null = null

/**
 * Load embeddings from the local JSON database
 */
function loadEmbeddings(): Map<string, number[]> {
  if (embeddingsCache) {
    return embeddingsCache
  }

  const embeddings = new Map<string, number[]>()
  const data = embeddingsData as any

  if (data.embeddings) {
    Object.entries(data.embeddings).forEach(([pokemonId, embedding]) => {
      embeddings.set(pokemonId, embedding as number[])
    })
  }

  embeddingsCache = embeddings
  return embeddings
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length')
  }

  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i]
    magnitudeA += vectorA[i] * vectorA[i]
    magnitudeB += vectorB[i] * vectorB[i]
  }

  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Find Pokemon most similar to the target Pokemon
 * @param targetPokemonId - The Pokemon ID to find similar Pokemon for
 * @param limit - Maximum number of similar Pokemon to return (default: 10)
 * @param excludeGeneration - Optional generation to exclude from results
 * @returns Array of similar Pokemon sorted by similarity (highest first)
 */
export function findSimilarPokemon(
  targetPokemonId: number,
  limit: number = 10,
  excludeGeneration?: number
): SimilarPokemon[] {
  try {
    const embeddings = loadEmbeddings()
    const targetEmbedding = embeddings.get(String(targetPokemonId))

    if (!targetEmbedding) {
      console.warn(`No embedding found for Pokemon ID ${targetPokemonId}`)
      return []
    }

    const similarities: SimilarPokemon[] = []
    const allMetadata = pokemonMetadataService.getAllMetadata()

    // Calculate similarity with all other Pokemon
    embeddings.forEach((embedding, pokemonIdStr) => {
      const pokemonId = parseInt(pokemonIdStr)

      // Skip the target Pokemon itself
      if (pokemonId === targetPokemonId) {
        return
      }

      // Skip if generation is specified and matches
      if (excludeGeneration !== undefined) {
        const metadata = allMetadata.find(m => m.id === pokemonId)
        if (metadata && metadata.generation === excludeGeneration) {
          return
        }
      }

      const similarity = cosineSimilarity(targetEmbedding, embedding)
      const metadata = allMetadata.find(m => m.id === pokemonId)

      if (metadata) {
        similarities.push({
          id: pokemonId,
          name: metadata.name,
          similarity
        })
      }
    })

    // Sort by similarity (highest first) and return top N
    return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, limit)
  } catch (error) {
    console.error('Error finding similar Pokemon:', error)
    return []
  }
}

/**
 * Generate confusing answer choices for quiz
 * Selects Pokemon that are semantically similar to the correct answer
 * @param correctPokemonId - The correct Pokemon ID
 * @param totalOptions - Total number of options needed (including correct answer)
 * @param excludeGeneration - Optional generation to exclude (for fairness)
 * @returns Array of Pokemon IDs for wrong answers
 */
export function generateConfusingAnswers(
  correctPokemonId: number,
  totalOptions: number = 4,
  excludeGeneration?: number
): number[] {
  const numWrongAnswers = totalOptions - 1

  // Find similar Pokemon - request more than needed to handle any filtering
  const similarPokemon = findSimilarPokemon(
    correctPokemonId,
    Math.max(numWrongAnswers * 2, 20),
    excludeGeneration
  )

  if (similarPokemon.length < numWrongAnswers) {
    console.warn(
      `Not enough similar Pokemon found for ID ${correctPokemonId}. ` +
      `Found ${similarPokemon.length}, needed ${numWrongAnswers}`
    )
  }

  // Select the top N most similar Pokemon as wrong answers
  return similarPokemon.slice(0, numWrongAnswers).map(p => p.id)
}

/**
 * Get similarity score between two Pokemon
 * Useful for displaying similarity information
 */
export function getPokemonSimilarity(pokemonIdA: number, pokemonIdB: number): number {
  try {
    const embeddings = loadEmbeddings()
    const embeddingA = embeddings.get(String(pokemonIdA))
    const embeddingB = embeddings.get(String(pokemonIdB))

    if (!embeddingA || !embeddingB) {
      return 0
    }

    return cosineSimilarity(embeddingA, embeddingB)
  } catch (error) {
    console.error('Error calculating Pokemon similarity:', error)
    return 0
  }
}

/**
 * Debug helper: Get detailed similarity scores for a Pokemon against others
 */
export function debugSimilarities(
  pokemonId: number,
  topN: number = 10
): Array<{ id: number; name: string; similarity: number }> {
  return findSimilarPokemon(pokemonId, topN)
}
