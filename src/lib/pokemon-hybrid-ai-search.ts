/**
 * Hybrid AI search using pre-computed embeddings
 * Fast and accurate semantic search
 */

import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';
import type { PokemonMetadata } from '@/types/pokemon-metadata';

// Singleton model instance
let embeddingModel: FeatureExtractionPipeline | null = null;
let isLoading = false;

// Pre-computed embeddings
let pokemonEmbeddings: Record<number, number[]> | null = null;

/**
 * Load pre-computed embeddings from JSON
 */
async function loadPrecomputedEmbeddings(): Promise<void> {
  if (pokemonEmbeddings) return;

  try {
    const response = await fetch('/data/pokemon-embeddings.json');
    if (!response.ok) {
      throw new Error('Embeddings file not found. Run: node scripts/generate-pokemon-embeddings.js');
    }
    const data = await response.json();
    pokemonEmbeddings = data.embeddings;
    console.log('✅ Loaded pre-computed embeddings for', pokemonEmbeddings ? Object.keys(pokemonEmbeddings).length : 0, 'Pokemon');
  } catch (error) {
    console.error('Failed to load embeddings:', error);
    throw error;
  }
}

/**
 * Initialize embedding model (lazy loaded)
 */
async function getEmbeddingModel(): Promise<FeatureExtractionPipeline> {
  if (embeddingModel) return embeddingModel;

  if (isLoading) {
    // Wait for existing load
    while (!embeddingModel) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return embeddingModel!;
  }

  isLoading = true;
  try {
    embeddingModel = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
      { quantized: true }
    );
    return embeddingModel;
  } finally {
    isLoading = false;
  }
}

/**
 * Generate embedding for a query
 */
async function generateQueryEmbedding(text: string): Promise<number[]> {
  const model = await getEmbeddingModel();
  const output = await model(text, {
    pooling: 'mean',
    normalize: true,
  });
  return Array.from(output.data as Float32Array);
}

/**
 * Calculate cosine similarity
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search Pokemon using pre-computed embeddings
 */
export async function searchPokemonWithEmbeddings(
  query: string,
  pokemonList: PokemonMetadata[],
  topK: number = 20
): Promise<Array<{ pokemon: PokemonMetadata; score: number }>> {
  // Load embeddings if not loaded
  if (!pokemonEmbeddings) {
    await loadPrecomputedEmbeddings();
  }

  // Generate embedding for query
  const queryEmbedding = await generateQueryEmbedding(query);

  // Calculate similarities with pre-computed embeddings
  const results: Array<{ pokemon: PokemonMetadata; score: number }> = [];

  for (const pokemon of pokemonList) {
    const pokemonEmbedding = pokemonEmbeddings![pokemon.id];

    if (!pokemonEmbedding) {
      console.warn(`No embedding found for Pokemon ID ${pokemon.id}`);
      continue;
    }

    const score = cosineSimilarity(queryEmbedding, pokemonEmbedding);
    results.push({ pokemon, score });
  }

  // Sort by score and return top K
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Check if embeddings are loaded
 */
export function areEmbeddingsLoaded(): boolean {
  return pokemonEmbeddings !== null;
}

/**
 * Check if model is loaded
 */
export function isModelLoaded(): boolean {
  return embeddingModel !== null;
}

/**
 * Check if model is loading
 */
export function isModelLoading(): boolean {
  return isLoading;
}

/**
 * Preload everything (embeddings + model)
 */
export async function preloadHybridSearch(): Promise<void> {
  await Promise.all([
    loadPrecomputedEmbeddings(),
    getEmbeddingModel()
  ]);
}
