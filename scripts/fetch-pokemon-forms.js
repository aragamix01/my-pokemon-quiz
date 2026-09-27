/**
 * Fetch the types of every alternate form (non-default variety) listed in the
 * Pokemon metadata, so type lists can include forms like Zacian Crowned or
 * Alolan Raichu.
 * Run with: node scripts/fetch-pokemon-forms.js
 *
 * Output (src/data/pokemon-forms.json):
 *   { forms: [ { id, speciesId, name, types } ] }
 */

const fs = require('fs')
const path = require('path')

const BATCH_SIZE = 20
const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

async function fetchJson(url, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res.json()
      console.warn(`${url} -> ${res.status} (attempt ${attempt})`)
    } catch (error) {
      console.warn(`${url} -> ${error.message} (attempt ${attempt})`)
    }
    await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
  }
  throw new Error(`Failed to fetch ${url}`)
}

async function fetchPokemonForms() {
  const metadata = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pokemon-metadata.json'), 'utf-8'))
  const variants = []
  metadata.forEach(p => {
    (p.variants || []).forEach(v => {
      if (!v.is_default) variants.push({ id: v.id, speciesId: p.id, name: v.name })
    })
  })
  console.log(`Fetching types for ${variants.length} forms...`)

  const forms = []
  for (let i = 0; i < variants.length; i += BATCH_SIZE) {
    const batch = variants.slice(i, i + BATCH_SIZE)
    const results = await Promise.all(batch.map(v => fetchJson(`https://pokeapi.co/api/v2/pokemon/${v.id}`)))
    results.forEach((data, j) => {
      forms.push({ ...batch[j], types: data.types.map(t => t.type.name) })
    })
    console.log(`  ${Math.min(i + BATCH_SIZE, variants.length)}/${variants.length}`)
  }

  forms.sort((a, b) => a.id - b.id)
  const outPath = path.join(DATA_DIR, 'pokemon-forms.json')
  fs.writeFileSync(outPath, JSON.stringify({ forms }) + '\n')
  console.log(`Saved ${forms.length} forms to ${outPath}`)
}

fetchPokemonForms().catch(error => {
  console.error('Failed to fetch Pokemon forms:', error)
  process.exit(1)
})
