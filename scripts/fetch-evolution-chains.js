/**
 * Fetch every Pokemon evolution chain from PokeAPI into a compact JSON database
 * used by the Evolution Order game.
 * Run with: node scripts/fetch-evolution-chains.js
 *
 * Output (src/data/evolution-chains.json):
 *   { chains: [ { id, tree } ] }
 * where tree is a nested { id, evolves_to: [...] } of species IDs, so branching
 * families like Eevee keep every branch.
 */

const fs = require('fs')
const path = require('path')

const BATCH_SIZE = 20

const speciesIdFromUrl = url => parseInt(url.split('/').slice(-2, -1)[0], 10)

function toTree(link) {
  return {
    id: speciesIdFromUrl(link.species.url),
    evolves_to: link.evolves_to.map(toTree),
  }
}

async function fetchJson(url, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res.json()
      console.warn(`⚠️  ${url} -> ${res.status} (attempt ${attempt})`)
    } catch (error) {
      console.warn(`⚠️  ${url} -> ${error.message} (attempt ${attempt})`)
    }
    await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
  }
  throw new Error(`Failed to fetch ${url}`)
}

async function fetchEvolutionChains() {
  console.log('🚀 Fetching evolution chains from PokeAPI...')
  const list = await fetchJson('https://pokeapi.co/api/v2/evolution-chain?limit=10000')
  const urls = list.results.map(r => r.url)
  console.log(`📋 ${urls.length} chains`)

  const chains = []
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = await Promise.all(urls.slice(i, i + BATCH_SIZE).map(url => fetchJson(url)))
    for (const chain of batch) chains.push({ id: chain.id, tree: toTree(chain.chain) })
    console.log(`  ⏳ ${Math.min(i + BATCH_SIZE, urls.length)}/${urls.length}`)
  }

  chains.sort((a, b) => a.id - b.id)
  const outPath = path.join(__dirname, '..', 'src', 'data', 'evolution-chains.json')
  fs.writeFileSync(outPath, JSON.stringify({ chains }) + '\n')
  console.log(`✅ Saved ${chains.length} chains to ${outPath}`)
}

fetchEvolutionChains().catch(error => {
  console.error('❌ Failed to fetch evolution chains:', error)
  process.exit(1)
})
