'use client'

import { useState, useMemo } from 'react'
import { PokemonSpecies } from '@/types/pokemon'
import { cn } from '@/lib/cn'
import { versionName, numberInVersion } from '@/lib/regional-pokedexes'

interface PokedexEntriesProps {
  species: PokemonSpecies
}

interface Entry {
  text: string
  versions: string[]
}

/** Official English game name ("FireRed", "Let’s Go, Pikachu!"), from the local games database */
export function versionLabel(version: string): string {
  return versionName(version) ?? version.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
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
  // Number in the Pokedex those games used, e.g. Sword -> Galar #380
  const dexNumber = numberInVersion(current.versions[0], species.id)

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
        {dexNumber && (
          <span style={{ color: 'var(--text-muted)' }}> · {dexNumber.dex.label} #{String(dexNumber.number).padStart(3, '0')}</span>
        )}
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
