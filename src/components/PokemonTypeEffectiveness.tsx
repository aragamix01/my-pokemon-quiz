'use client'

import { analyzePokemonTypes, getTypeColor, PokemonTypeName, EffectivenessMultiplier } from '@/lib/type-effectiveness'

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

  const TypeChip = ({ type, multiplier }: { type: PokemonTypeName; multiplier: EffectivenessMultiplier }) => (
    <div
      className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-white min-w-[110px]"
      style={{
        backgroundColor: getTypeColor(type),
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
    >
      <span className="capitalize">{type}</span>
      {multiplier !== 0 && (
        <span className="text-base">
          {getMultiplierLabel(multiplier)}
        </span>
      )}
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Weaknesses Section */}
      {analysis.weaknesses.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Weak To:
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.weaknesses.map((weakness) => (
              <TypeChip
                key={weakness.type}
                type={weakness.type}
                multiplier={weakness.multiplier}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resistances Section */}
      {analysis.resistances.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Resistant To:
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.resistances.map((resistance) => (
              <TypeChip
                key={resistance.type}
                type={resistance.type}
                multiplier={resistance.multiplier}
              />
            ))}
          </div>
        </div>
      )}

      {/* Immunities Section */}
      {analysis.immunities.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Immune To:
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.immunities.map((immunity) => (
              <TypeChip
                key={immunity}
                type={immunity}
                multiplier={0}
              />
            ))}
          </div>
        </div>
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
