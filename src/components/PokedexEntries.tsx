'use client'

import { useState, useMemo } from 'react'
import { PokemonSpecies } from '@/types/pokemon'
import { cn } from '@/lib/cn'

interface PokedexEntriesProps {
  species: PokemonSpecies
}

interface Entry {
  text: string
  versions: string[]
}

// Short labels for game versions that read badly when just capitalized
const VERSION_LABELS: Record<string, string> = {
  firered: 'FireRed',
  leafgreen: 'LeafGreen',
  heartgold: 'HeartGold',
  soulsilver: 'SoulSilver',
  'omega-ruby': 'Omega Ruby',
  'alpha-sapphire': 'Alpha Sapphire',
  'lets-go-pikachu': "Let's Go Pikachu",
  'lets-go-eevee': "Let's Go Eevee",
  'legends-arceus': 'Legends: Arceus',
  'ultra-sun': 'Ultra Sun',
  'ultra-moon': 'Ultra Moon',
  'black-2': 'Black 2',
  'white-2': 'White 2',
}

export function versionLabel(version: string): string {
  return VERSION_LABELS[version] ?? version.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/** English Pokedex entries from every game, with games that share the same text grouped together */
export default function PokedexEntries({ species }: PokedexEntriesProps) {
  const entries = useMemo<Entry[]>(() => {
    const byText: Record<string, Entry> = {}
    const order: string[] = []
    species.flavor_text_entries
      .filter(e => e.language.name === 'en')
      .forEach(e => {
        const text = e.flavor_text.replace(/[\f\n\r­]+/g, ' ').replace(/\s+/g, ' ').trim()
        const version = e.version?.name ?? 'unknown'
        if (!byText[text]) {
          byText[text] = { text, versions: [] }
          order.push(text)
        }
        if (byText[text].versions.indexOf(version) === -1) byText[text].versions.push(version)
      })
    return order.map(t => byText[t])
  }, [species])

  // Newest games come last in PokeAPI, so start there
  const [selected, setSelected] = useState(Math.max(0, entries.length - 1))
  const current = entries[Math.min(selected, entries.length - 1)]

  if (!current) return null

  return (
    <div className="pt-3" style={{ borderTop: '1px solid var(--color-neutral-800)' }}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Pokedex entry
        </h4>
        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {selected + 1} / {entries.length}
        </span>
      </div>
      <p className="text-sm leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>{current.text}</p>
      <p className="text-[11px] mb-2" style={{ color: 'var(--color-accent-400)' }}>
        {current.versions.map(versionLabel).join(', ')}
      </p>
      {entries.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {entries.map((entry, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn('nx-tab whitespace-nowrap flex-shrink-0 text-[11px]', i === selected && 'nx-tab-active')}
              style={{ padding: '4px 10px', height: 'auto' }}
              title={entry.versions.map(versionLabel).join(', ')}
            >
              {versionLabel(entry.versions[0])}{entry.versions.length > 1 ? ` +${entry.versions.length - 1}` : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
