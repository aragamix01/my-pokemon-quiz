/**
 * Fetch every regional (per-game) Pokedex from PokeAPI, plus game names, into a
 * compact JSON database.
 * Run with: node scripts/fetch-regional-pokedexes.js
 *
 * Output (src/data/regional-pokedexes.json):
 *   versions:      { "red": "Red", ... }                       English game names
 *   versionGroups: { "red-blue": { label, order, versions } }  games released together
 *   pokedexes:     [ { name, label, versionGroups, entries: [[number, speciesId], ...] } ]
 */

const fs = require('fs')
const path = require('path')

const API = 'https://pokeapi.co/api/v2'
const BATCH_SIZE = 10
// Pokedexes that are not a game's own dex (national numbers are already the default)
const SKIP_POKEDEXES = ['national', 'conquest-gallery']

const englishName = (names, fallback) => (names.find(n => n.language.name === 'en') || {}).name || fallback
const idFromUrl = url => parseInt(url.split('/').slice(-2, -1)[0], 10)

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

async function fetchAll(urls) {
  const results = []
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    results.push(...(await Promise.all(urls.slice(i, i + BATCH_SIZE).map(url => fetchJson(url)))))
  }
  return results
}

async function fetchRegionalPokedexes() {
  console.log('🚀 Fetching games and regional Pokedexes from PokeAPI...')

  const versionList = await fetchJson(`${API}/version?limit=1000`)
  const versionData = await fetchAll(versionList.results.map(r => r.url))
  const versions = {}
  versionData.forEach(v => { versions[v.name] = englishName(v.names, v.name) })
  console.log(`🎮 ${Object.keys(versions).length} game versions`)

  const groupList = await fetchJson(`${API}/version-group?limit=1000`)
  const groupData = await fetchAll(groupList.results.map(r => r.url))
  const versionGroups = {}
  groupData.forEach(g => {
    const names = g.versions.map(v => versions[v.name] || v.name)
    versionGroups[g.name] = { label: names.join(' / '), order: g.order, versions: g.versions.map(v => v.name) }
  })
  console.log(`🎮 ${Object.keys(versionGroups).length} version groups`)

  const dexList = await fetchJson(`${API}/pokedex?limit=1000`)
  const dexData = await fetchAll(
    dexList.results.filter(r => SKIP_POKEDEXES.indexOf(r.name) === -1).map(r => r.url)
  )
  const pokedexes = dexData
    .filter(d => d.pokemon_entries.length > 0)
    .map(d => ({
      name: d.name,
      label: englishName(d.names, d.name),
      versionGroups: d.version_groups.map(v => v.name),
      entries: d.pokemon_entries.map(e => [e.entry_number, idFromUrl(e.pokemon_species.url)]),
    }))
    // Oldest games first
    .sort((a, b) => {
      const order = dex => Math.min(...dex.versionGroups.map(vg => (versionGroups[vg] || { order: 999 }).order))
      // Same game: the bigger (main) dex before its island or area dexes
      return order(a) - order(b) || b.entries.length - a.entries.length || a.name.localeCompare(b.name)
    })
  console.log(`📘 ${pokedexes.length} regional Pokedexes`)

  const outPath = path.join(__dirname, '..', 'src', 'data', 'regional-pokedexes.json')
  fs.writeFileSync(outPath, JSON.stringify({ versions, versionGroups, pokedexes }) + '\n')
  console.log(`✅ Saved to ${outPath}`)
}

fetchRegionalPokedexes().catch(error => {
  console.error('❌ Failed to fetch regional Pokedexes:', error)
  process.exit(1)
})
