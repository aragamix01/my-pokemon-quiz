/**
 * Generate embeddings for all Pokemon using Transformers.js
 * This runs once at build time to pre-compute embeddings
 * Run: node scripts/generate-pokemon-embeddings.js
 */

const { pipeline } = require('@xenova/transformers');
const fs = require('fs');
const path = require('path');

// Load Pokemon metadata
const metadataPath = path.join(__dirname, '../src/data/pokemon-metadata.json');
const pokemonList = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

/**
 * Fetch Pokemon species data from PokeAPI to get flavor text descriptions
 */
async function fetchPokemonDescription(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    if (!response.ok) {
      return null;
    }
    const speciesData = await response.json();

    // Get English flavor text entries
    const flavorTexts = speciesData.flavor_text_entries
      .filter(entry => entry.language.name === 'en')
      .map(entry => entry.flavor_text.replace(/\n|\f/g, ' ').trim());

    // Get the most recent unique descriptions (limit to 3 for embedding size)
    const uniqueTexts = [...new Set(flavorTexts)].slice(0, 3);

    return {
      genus: speciesData.genera?.find(g => g.language.name === 'en')?.genus || '',
      flavorTexts: uniqueTexts,
    };
  } catch (error) {
    console.error(`Failed to fetch description for Pokemon ${pokemonId}:`, error.message);
    return null;
  }
}

/**
 * Create searchable text description for a Pokemon using REAL descriptions from PokeAPI
 */
async function createPokemonSearchText(pokemon) {
  const parts = [];

  // Name
  parts.push(pokemon.name);

  // Fetch real Pokemon description from PokeAPI
  const description = await fetchPokemonDescription(pokemon.id);

  if (description) {
    // Add genus (e.g., "Mouse Pokemon", "Flame Pokemon")
    if (description.genus) {
      parts.push(description.genus);
    }

    // Add actual Pokedex flavor text entries
    if (description.flavorTexts && description.flavorTexts.length > 0) {
      parts.push(...description.flavorTexts);
    }
  }

  // Types
  if (pokemon.types && pokemon.types.length > 0) {
    parts.push(`${pokemon.types.join(' ')} type`);
  }

  // Generation
  parts.push(`generation ${pokemon.generation}`);

  // Habitat
  if (pokemon.habitat) {
    parts.push(`lives in ${pokemon.habitat}`);
  }

  // Color
  if (pokemon.color) {
    parts.push(`${pokemon.color} colored`);
  }

  // Shape (basic shape info only - let AI understand from descriptions)
  if (pokemon.shape) {
    parts.push(`${pokemon.shape} shaped`);
  }

  // Egg groups (hints at animal types naturally)
  if (pokemon.egg_groups && pokemon.egg_groups.length > 0) {
    parts.push(`egg group: ${pokemon.egg_groups.join(', ')}`);
  }

  // Legendary/Mythical status
  if (pokemon.is_legendary) {
    parts.push('legendary Pokemon');
  }
  if (pokemon.is_mythical) {
    parts.push('mythical Pokemon');
  }

  // Stats description (basic tendencies)
  if (pokemon.stats) {
    const stats = pokemon.stats;
    const totalStats = stats.hp + stats.attack + stats.defense +
                      stats['special-attack'] + stats['special-defense'] + stats.speed;

    // Describe stat tendencies
    if (stats.attack > 100 || stats['special-attack'] > 100) {
      parts.push('high offensive stats');
    }
    if (stats.defense > 100 || stats['special-defense'] > 100) {
      parts.push('high defensive stats');
    }
    if (stats.speed > 100) {
      parts.push('fast speed');
    }
    if (stats.hp > 100) {
      parts.push('high HP');
    }
    if (totalStats > 500) {
      parts.push('strong overall stats');
    }
  }

  return parts.join('. ');
}

/**
 * Sleep function for rate limiting API calls
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateEmbeddings() {
  console.log('🚀 Starting Pokemon embeddings generation with REAL descriptions...');
  console.log(`📊 Total Pokemon: ${pokemonList.length}`);
  console.log('⚠️  This will take longer as we fetch real descriptions from PokeAPI');
  console.log('⏱️  Estimated time: ~10-15 minutes (rate-limited API calls)');

  // Initialize the embedding model
  console.log('📥 Loading embedding model (Xenova/all-MiniLM-L6-v2)...');
  const embedder = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
    { quantized: true }
  );
  console.log('✅ Model loaded!');

  // Generate embeddings for all Pokemon
  const embeddings = {};
  let processed = 0;
  const startTime = Date.now();

  for (const pokemon of pokemonList) {
    // Fetch real description and create search text
    const text = await createPokemonSearchText(pokemon);

    // Generate embedding
    const output = await embedder(text, {
      pooling: 'mean',
      normalize: true,
    });

    // Convert to regular array and store
    embeddings[pokemon.id] = Array.from(output.data);

    processed++;
    if (processed % 10 === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = processed / elapsed;
      const remaining = pokemonList.length - processed;
      const eta = Math.round(remaining / rate);
      console.log(`📈 Progress: ${processed}/${pokemonList.length} (${Math.round(processed/pokemonList.length*100)}%) - ETA: ${eta}s`);
    }

    // Rate limiting: 100ms delay between API calls to be respectful to PokeAPI
    await sleep(100);
  }

  console.log('✅ All embeddings generated!');

  // Save embeddings to file
  const outputPath = path.join(__dirname, '../src/data/pokemon-embeddings.json');
  const output = {
    metadata: {
      model: 'Xenova/all-MiniLM-L6-v2',
      dimension: embeddings[pokemonList[0].id].length,
      total_pokemon: Object.keys(embeddings).length,
      generated_at: new Date().toISOString(),
    },
    embeddings: embeddings
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`💾 Embeddings saved to: ${outputPath}`);

  // Calculate file size
  const stats = fs.statSync(outputPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`📦 File size: ${fileSizeMB} MB`);

  console.log('🎉 Done!');
}

// Run the script
generateEmbeddings().catch(console.error);
