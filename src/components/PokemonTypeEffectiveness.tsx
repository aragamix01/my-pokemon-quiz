'use client'

import { analyzePokemonTypes, PokemonTypeName } from '@/lib/type-effectiveness'
import { TypePill } from '@/components/ui/TypePill'

interface PokemonTypeEffectivenessProps {
  types: PokemonTypeName[]
}

/** Badge colors per multiplier; lightness differs too, so they read without color */
export const MULTIPLIER_BADGES: Array<{ multiplier: number; label: string; title: string; className: string }> = [
  { multiplier: 4, label: '4×', title: 'Takes quadruple', className: 'nx-mult x4' },
  { multiplier: 2, label: '2×', title: 'Weak to', className: 'nx-mult x2' },
  { multiplier: 0.5, label: '½×', title: 'Resists', className: 'nx-mult x05' },
  { multiplier: 0.25, label: '¼×', title: 'Strongly resists', className: 'nx-mult x025' },
  { multiplier: 0, label: '0×', title: 'Immune to', className: 'nx-mult x0' },
]

/** Damage a Pokemon takes, grouped by multiplier: a badge, then the attacking types */
export default function PokemonTypeEffectiveness({ types }: PokemonTypeEffectivenessProps) {
  const analysis = analyzePokemonTypes(types)
  const byMultiplier = (m: number): PokemonTypeName[] =>
    m === 0
      ? analysis.immunities
      : [...analysis.weaknesses, ...analysis.resistances].filter(x => x.multiplier === m).map(x => x.type)

  const groups = MULTIPLIER_BADGES.map(b => ({ ...b, types: byMultiplier(b.multiplier) })).filter(g => g.types.length > 0)

  if (groups.length === 0) {
    return (
      <div className="text-sm py-2" style={{ color: 'var(--text-muted)' }}>
        Takes normal damage from every type
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {groups.map(g => (
        <div key={g.label} className="flex items-start gap-3">
          <span className={g.className}>{g.label}</span>
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              {g.title} · {g.types.length}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.types.map(t => <TypePill key={t} type={t} />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
