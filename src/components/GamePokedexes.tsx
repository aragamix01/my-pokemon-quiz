'use client'

import { useMemo } from 'react'
import { pokedexesForSpecies, gamesLabel } from '@/lib/regional-pokedexes'

interface GamePokedexesProps {
  speciesId: number
}

/** Every game Pokedex that lists this Pokemon, with its number there */
export default function GamePokedexes({ speciesId }: GamePokedexesProps) {
  const found = useMemo(() => pokedexesForSpecies(speciesId), [speciesId])

  return (
    <div className="mb-4">
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Found in these games</h3>
      {found.length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Not listed in any game&apos;s regional Pokedex (usually event-only or national-dex-only Pokemon).
        </p>
      ) : (
        <>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Listed in {found.length} game Pokedex{found.length === 1 ? '' : 'es'}, with its number in each.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {found.map(({ dex, number }) => (
              <div
                key={dex.name}
                className="rounded-md px-2.5 py-2 min-w-0"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-neutral-800)' }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>{dex.label}</span>
                  <span className="text-xs tabular-nums flex-shrink-0" style={{ color: 'var(--color-accent-400)' }}>
                    #{String(number).padStart(3, '0')}
                  </span>
                </div>
                <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }} title={gamesLabel(dex)}>
                  {gamesLabel(dex)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
