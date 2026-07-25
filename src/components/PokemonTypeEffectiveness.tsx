'use client'

import { analyzePokemonTypes, PokemonTypeName, EffectivenessMultiplier } from '@/lib/type-effectiveness'
import { TypePill } from '@/components/ui/TypePill'

interface PokemonTypeEffectivenessProps {
  types: PokemonTypeName[]
}

export default function PokemonTypeEffectiveness({ types }: PokemonTypeEffectivenessProps) {
  const analysis = analyzePokemonTypes(types)

  const getMultiplierLabel = (multiplier: EffectivenessMultiplier): string => {
    switch (multiplier) {
      case 0: return ''
      case 0.25: return '¼×'
      case 0.5: return '½×'
      case 1: return '1×'
      case 2: return '2×'
      case 4: return '4×'
      default: return `${multiplier}×`
    }
  }

  // One row per type: pill on the left, multiplier right-aligned so every
  // multiplier in the panel lines up in a single column.
  const TypeRow = ({ type, multiplier }: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }) => (
    <div className="flex items-center justify-between gap-2 py-0.5">
      <TypePill type={type} />
      <span className="text-xs tabular-nums flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
        {multiplier === 0 ? '0×' : getMultiplierLabel(multiplier)}
      </span>
    </div>
  )

  const TypeGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h4 className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {title}
      </h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Weaknesses Section */}
      {analysis.weaknesses.length > 0 && (
        <TypeGroup title="Weak To:">
          {analysis.weaknesses.map((weakness) => (
            <TypeRow
              key={weakness.type}
              type={weakness.type}
              multiplier={weakness.multiplier}
            />
          ))}
        </TypeGroup>
      )}

      {/* Resistances Section */}
      {analysis.resistances.length > 0 && (
        <TypeGroup title="Resistant To:">
          {analysis.resistances.map((resistance) => (
            <TypeRow
              key={resistance.type}
              type={resistance.type}
              multiplier={resistance.multiplier}
            />
          ))}
        </TypeGroup>
      )}

      {/* Immunities Section */}
      {analysis.immunities.length > 0 && (
        <TypeGroup title="Immune To:">
          {analysis.immunities.map((immunity) => (
            <TypeRow
              key={immunity}
              type={immunity}
              multiplier={0}
            />
          ))}
        </TypeGroup>
      )}

      {/* Show message if no special effectiveness */}
      {analysis.weaknesses.length === 0 &&
       analysis.resistances.length === 0 &&
       analysis.immunities.length === 0 && (
        <div className="text-xs text-center py-2" style={{ color: 'var(--text-muted)' }}>
          Neutral effectiveness against all types
        </div>
      )}
    </div>
  )
}
