'use client'

import { useMemo } from 'react'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { PokemonMetadata } from '@/types/pokemon-metadata'

interface StatRanksProps {
  stats: Array<{ base_stat: number; stat: { name: string } }>
}

type StatKey = keyof PokemonMetadata['stats']

const STAT_INFO: Array<{ key: StatKey; label: string; phrase: string }> = [
  { key: 'hp', label: 'HP', phrase: 'more HP than' },
  { key: 'attack', label: 'Attack', phrase: 'hits harder than' },
  { key: 'defense', label: 'Defense', phrase: 'tougher than' },
  { key: 'special-attack', label: 'Sp. Atk', phrase: 'stronger special attacks than' },
  { key: 'special-defense', label: 'Sp. Def', phrase: 'resists special attacks better than' },
  { key: 'speed', label: 'Speed', phrase: 'faster than' },
]

/** Share of Pokemon with a strictly lower value, as a whole percent */
function percentBelow(sorted: number[], value: number): number {
  let lo = 0
  let hi = sorted.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (sorted[mid] < value) lo = mid + 1
    else hi = mid
  }
  return Math.round((lo / sorted.length) * 100)
}

function rankColor(percent: number): string {
  if (percent >= 80) return 'var(--success-gradient)'
  if (percent >= 40) return 'var(--color-accent)'
  return 'var(--error-gradient)'
}

/** How each base stat compares with every Pokemon in the local database */
export default function StatRanks({ stats }: StatRanksProps) {
  const sortedByStat = useMemo(() => {
    const all = pokemonMetadataService.getAllMetadata()
    const result = {} as Record<StatKey | 'total', number[]>
    STAT_INFO.forEach(({ key }) => {
      result[key] = all.map(p => p.stats[key]).sort((a, b) => a - b)
    })
    result.total = all.map(p => p.total_stats).sort((a, b) => a - b)
    return result
  }, [])

  const value = (key: string) => stats.find(s => s.stat.name === key)?.base_stat ?? 0
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0)
  const totalPercent = percentBelow(sortedByStat.total, total)

  return (
    <div className="mt-3 space-y-2">
      <h4 className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
        Compared with all {sortedByStat.total.length} Pokemon
      </h4>
      {STAT_INFO.map(({ key, label, phrase }) => {
        const v = value(key)
        const percent = percentBelow(sortedByStat[key], v)
        return (
          <div key={key} className="text-xs">
            <div className="flex justify-between gap-2 mb-0.5">
              <span style={{ color: 'var(--text-primary)' }}>
                <span className="font-semibold">{label} {v}</span>
                <span style={{ color: 'var(--text-secondary)' }}> · {phrase} {percent}% of Pokemon</span>
              </span>
            </div>
            <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-800)' }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(2, percent)}%`, background: rankColor(percent) }} />
            </div>
          </div>
        )
      })}
      <p className="text-xs pt-1" style={{ color: 'var(--text-secondary)' }}>
        Total {total} is higher than <span className="font-semibold" style={{ color: rankColor(totalPercent) }}>{totalPercent}%</span> of all Pokemon.
      </p>
    </div>
  )
}
