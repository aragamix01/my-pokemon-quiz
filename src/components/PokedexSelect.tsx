'use client'

import { getPokedexes, pokedexOptionLabel } from '@/lib/regional-pokedexes'
import { CaretDown } from '@phosphor-icons/react'

interface PokedexSelectProps {
  /** Selected game Pokedex name ("paldea"), or '' when a generation is used instead */
  value: string
  onChange: (name: string) => void
}

/** Dropdown of every game's own Pokedex, oldest games first */
export default function PokedexSelect({ value, onChange }: PokedexSelectProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <select
        value={value}
        onChange={e => { if (e.target.value) onChange(e.target.value) }}
        className="input w-full pr-10 appearance-none cursor-pointer"
        style={value ? { borderColor: 'var(--color-accent)' } : undefined}
        aria-label="Game Pokedex"
      >
        <option value="">Or pick a game&apos;s Pokedex…</option>
        {getPokedexes().map(dex => (
          <option key={dex.name} value={dex.name}>
            {pokedexOptionLabel(dex)} · {dex.entries.length}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <CaretDown size={14} color="var(--color-neutral-400)" />
      </div>
    </div>
  )
}
