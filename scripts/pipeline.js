#!/usr/bin/env node
/**
 * Data pipeline orchestrator.
 *
 * One entry point for generating every local dataset and tracking upstream
 * freshness. Update detection compares the last-fetched upstream commit SHA
 * (recorded in src/data/data-manifest.json) against the live SHA of the
 * PokeAPI source repos.
 *
 * Usage:
 *   node scripts/pipeline.js check [--json]      # diff manifest vs upstream
 *   node scripts/pipeline.js data                # metadata + types + moves + abilities + evolution-items
 *   node scripts/pipeline.js sprites [strategy…] # download + optimize sprites (default: all forms-only)
 *   node scripts/pipeline.js embeddings          # regenerate AI embeddings
 *   node scripts/pipeline.js all                 # data -> embeddings -> sprites
 *
 * check exit codes: 0 = all fresh, 1 = something stale, 2 = check failed.
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const MANIFEST_PATH = path.join(ROOT, 'src/data/data-manifest.json')
const DATA_DIR = path.join(ROOT, 'src/data')
const SPRITES_DIR = path.join(ROOT, 'public/sprites/optimized')

// Upstream repos whose commits signal a data/sprite change.
const REPOS = {
  data: 'PokeAPI/api-data',
  embeddings: 'PokeAPI/api-data',
  sprites: 'PokeAPI/sprites',
}

// ── manifest helpers ──────────────────────────────────────────────────────

function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
}

function writeManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
}

/** Patch a single dataset section and persist. */
function updateDataset(name, patch) {
  const manifest = readManifest()
  manifest.datasets[name] = { ...manifest.datasets[name], ...patch }
  writeManifest(manifest)
}

// ── upstream SHA ──────────────────────────────────────────────────────────

/** Latest commit SHA of a repo's default branch. Uses GITHUB_TOKEN when set. */
async function getLiveSha(repo, branch) {
  const url = `https://api.github.com/repos/${repo}/commits/${branch}`
  const headers = {
    Accept: 'application/vnd.github.sha',
    'User-Agent': 'pokemon-toolkit-pipeline',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repo}`)
  return (await res.text()).trim()
}

// ── count helpers ─────────────────────────────────────────────────────────

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'))
}

function objectCount(obj, key) {
  return obj && obj[key] ? Object.keys(obj[key]).length : 0
}

function dataCounts() {
  const metadata = readJson('pokemon-metadata.json')
  const generations = readJson('pokemon-generations.json')
  const types = readJson('pokemon-type-effectiveness.json')
  const moves = readJson('pokemon-moves.json')
  const abilities = readJson('pokemon-abilities.json')
  const evolutionItems = readJson('evolution-items.json')
  return {
    pokemon: Array.isArray(metadata) ? metadata.length : 0,
    generations: Object.keys(generations).length,
    types: objectCount(types, 'types'),
    moves: objectCount(moves, 'moves'),
    abilities: objectCount(abilities, 'abilities'),
    evolution_items: objectCount(evolutionItems, 'items'),
  }
}

function countSpriteFiles() {
  let count = 0
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.webp')) count++
    }
  }
  if (fs.existsSync(SPRITES_DIR)) walk(SPRITES_DIR)
  return count
}

// ── script runner ─────────────────────────────────────────────────────────

function run(scriptName, args = []) {
  const scriptPath = path.join(__dirname, scriptName)
  execSync(`node "${scriptPath}" ${args.join(' ')}`.trim(), {
    stdio: 'inherit',
    cwd: ROOT,
  })
}

// ── sections ──────────────────────────────────────────────────────────────

async function runData() {
  const sha = await getLiveSha(REPOS.data, 'master')
  run('fetch-pokemon-metadata.js')
  run('fetch-types.js')
  run('fetch-moves-json.js')
  run('fetch-abilities-json.js')
  run('fetch-evolution-items.js')
  updateDataset('data', {
    upstream: { repo: REPOS.data, branch: 'master', sha },
    generated_at: new Date().toISOString(),
    counts: dataCounts(),
  })
  console.log('✅ data section done, manifest updated')
}

async function runSprites(strategies) {
  const list = strategies.length ? strategies : ['all', 'forms-only']
  const sha = await getLiveSha(REPOS.sprites, 'master')
  for (const strategy of list) {
    run('download-and-optimize-sprites.js', [strategy])
  }
  updateDataset('sprites', {
    upstream: { repo: REPOS.sprites, branch: 'master', sha },
    generated_at: new Date().toISOString(),
    strategies: list,
    file_count: countSpriteFiles(),
  })
  console.log('✅ sprites section done, manifest updated')
}

async function runEmbeddings() {
  const sha = await getLiveSha(REPOS.embeddings, 'master')
  run('generate-pokemon-embeddings.js')
  const embeddings = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'public/data/pokemon-embeddings.json'), 'utf-8')
  )
  updateDataset('embeddings', {
    upstream: { repo: REPOS.embeddings, branch: 'master', sha },
    generated_at: new Date().toISOString(),
    dimension: embeddings.metadata?.dimension ?? 384,
    count: embeddings.embeddings ? Object.keys(embeddings.embeddings).length : 0,
  })
  console.log('✅ embeddings section done, manifest updated')
}

// ── check ─────────────────────────────────────────────────────────────────

// Ordered so `auto` refresh respects data -> embeddings -> sprites dependencies.
const CHECK_ORDER = ['data', 'embeddings', 'sprites']

async function runCheck(asJson) {
  const manifest = readManifest()
  const result = {}
  const staleTargets = []

  for (const name of CHECK_ORDER) {
    const ds = manifest.datasets[name]
    const repo = ds.upstream.repo
    const branch = ds.upstream.branch || 'master'
    try {
      const live = await getLiveSha(repo, branch)
      const stored = ds.upstream.sha
      const stale = stored !== live
      result[name] = { repo, stored, live, stale }
      if (stale) staleTargets.push(name)
    } catch (err) {
      result[name] = { repo, stored: ds.upstream.sha, live: null, stale: null, error: err.message }
    }
  }

  const failed = Object.values(result).some(r => r.error)
  const output = { stale_targets: staleTargets, datasets: result }

  if (asJson) {
    console.log(JSON.stringify(output))
  } else {
    for (const name of CHECK_ORDER) {
      const r = result[name]
      const status = r.error ? `ERROR (${r.error})` : r.stale ? 'STALE' : 'fresh'
      const stored = r.stored ? r.stored.slice(0, 7) : 'none'
      const live = r.live ? r.live.slice(0, 7) : '???????'
      console.log(`${name.padEnd(11)} ${status.padEnd(16)} stored=${stored} live=${live}`)
    }
    console.log(`\nstale: ${staleTargets.length ? staleTargets.join(', ') : 'none'}`)
  }

  if (failed) return 2
  return staleTargets.length ? 1 : 0
}

// ── main ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const cmd = (args[0] || 'check').toLowerCase()
  const rest = args.slice(1).filter(a => !a.startsWith('--'))
  const asJson = args.includes('--json')

  switch (cmd) {
    case 'check':
      process.exit(await runCheck(asJson))
      break
    case 'data':
      await runData()
      break
    case 'sprites':
      await runSprites(rest)
      break
    case 'embeddings':
      await runEmbeddings()
      break
    case 'all':
      await runData()
      await runEmbeddings()
      await runSprites(rest)
      break
    default:
      console.error(`Unknown command: ${cmd}`)
      console.error('Usage: pipeline.js check|data|sprites|embeddings|all')
      process.exit(1)
  }
}

main().catch(err => {
  console.error('❌ pipeline failed:', err.message)
  process.exit(1)
})
