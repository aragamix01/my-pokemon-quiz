#!/usr/bin/env node

/**
 * Test script to verify Pokemon similarity results
 * Shows examples of confusing answer pairs that the AI will generate
 */

const fs = require('fs');
const path = require('path');

// Load embeddings
const embeddingsPath = path.join(__dirname, '../src/data/pokemon-embeddings.json');
const embeddingsData = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));

// Load metadata
const metadataPath = path.join(__dirname, '../src/data/pokemon-metadata.json');
const metadataData = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

// Cosine similarity function
function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

// Find similar Pokemon
function findSimilarPokemon(pokemonId, limit = 10) {
  const targetEmbedding = embeddingsData.embeddings[String(pokemonId)];
  if (!targetEmbedding) {
    console.error(`No embedding found for Pokemon ${pokemonId}`);
    return [];
  }

  const similarities = [];

  for (const [pokemonIdStr, embedding] of Object.entries(embeddingsData.embeddings)) {
    const id = parseInt(pokemonIdStr);
    if (id === pokemonId) continue;

    const similarity = cosineSimilarity(targetEmbedding, embedding);
    const metadata = metadataData.find(m => m.id === id);

    if (metadata) {
      similarities.push({
        id,
        name: metadata.name,
        similarity
      });
    }
  }

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
}

// Test Pokemon to showcase
const testCases = [
  { id: 6, name: 'Charizard', description: 'Orange fire/flying dragon' },
  { id: 25, name: 'Pikachu', description: 'Yellow electric mouse' },
  { id: 65, name: 'Alakazam', description: 'Humanoid psychic type' },
  { id: 248, name: 'Tyranitar', description: 'Large dragon/rock type' },
  { id: 130, name: 'Gyarados', description: 'Large water/flying dragon' },
  { id: 149, name: 'Dragonite', description: 'Dragon/flying type' },
  { id: 94, name: 'Gengar', description: 'Ghost/poison type' },
];

console.log('🎮 Pokemon AI Similarity Test Results\n');
console.log('=' .repeat(80));

testCases.forEach(testCase => {
  const { id, name, description } = testCase;
  const similar = findSimilarPokemon(id, 5);
  const testMetadata = metadataData.find(m => m.id === id);

  console.log(`\n📌 ${name} (ID: ${id}) - ${description}`);
  console.log(`   Types: ${testMetadata.types.join(', ')}`);
  console.log(`   Stats: HP=${testMetadata.stats.hp}, ATK=${testMetadata.stats.attack}, DEF=${testMetadata.stats.defense}`);
  console.log(`\n   🎯 Top 3 Confusing Answers (would be quiz wrong answers):`);

  similar.slice(0, 3).forEach((sim, index) => {
    const simMetadata = metadataData.find(m => m.id === sim.id);
    const percent = (sim.similarity * 100).toFixed(1);
    console.log(
      `      ${index + 1}. ${sim.name.padEnd(15)} (ID: ${sim.id}) - ` +
      `${percent}% similar | Types: ${simMetadata.types.join(', ')}`
    );
  });

  console.log('\n   ' + '-'.repeat(76));
});

console.log('\n' + '='.repeat(80));
console.log('\n✅ Similarity Analysis Complete!');
console.log('\nKey Observations:');
console.log('- Similar Pokemon are based on embeddings (name, shape, stats, types, etc.)');
console.log('- High similarity scores (>70%) indicate confusing pairs');
console.log('- Medium similarity (60-70%) are challenging but fair');
console.log('- Low similarity (<60%) would be too easy to eliminate\n');
