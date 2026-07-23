'use client'

import { GenerationNumber } from '@/types/pokemon'
import { cn } from '@/lib/cn'

const generationsData = [
  { gen: 1, name: 'Kanto', emoji: '🔥' },
  { gen: 2, name: 'Johto', emoji: '🌸' },
  { gen: 3, name: 'Hoenn', emoji: '🌊' },
  { gen: 4, name: 'Sinnoh', emoji: '⚡' },
  { gen: 5, name: 'Unova', emoji: '❄️' },
  { gen: 6, name: 'Kalos', emoji: '🌟' },
  { gen: 7, name: 'Alola', emoji: '🌺' },
  { gen: 8, name: 'Galar', emoji: '⚔️' },
  { gen: 9, name: 'Paldea', emoji: '🎓' }
]

interface GenerationSelectorProps {
  title: string
  subtitle?: string
  onGenerationSelect: (generation: GenerationNumber | null) => void
  showBackButton?: boolean
  onBack?: () => void
  selectedGeneration?: GenerationNumber | null
  minimized?: boolean
}

export default function GenerationSelector({
  title,
  subtitle,
  onGenerationSelect,
  showBackButton = false,
  onBack,
  selectedGeneration,
  minimized = false
}: GenerationSelectorProps) {
  if (minimized) {
    return (
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => onGenerationSelect(null)}
          className={cn('nx-tab', selectedGeneration === null && 'nx-tab-active')}
        >
          All
        </button>

        {generationsData.map((region) => (
          <button
            key={region.gen}
            onClick={() => onGenerationSelect(region.gen as GenerationNumber)}
            className={cn('nx-tab', selectedGeneration === region.gen && 'nx-tab-active')}
          >
            {region.gen}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="card">
      {showBackButton && onBack && (
        <div className="flex justify-between items-center mb-2">
          <button onClick={onBack} className="btn btn-ghost">
            ← Back
          </button>
          <div className="w-16"></div>
        </div>
      )}

      <h2
        className="text-2xl text-center mb-1"
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}
      >
        {title}
      </h2>

      {subtitle && (
        <div className="text-sm mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </div>
      )}

      <div className="compact-generation-grid">
        <button
          onClick={() => onGenerationSelect(null)}
          className={cn('nx-region', selectedGeneration === null && 'nx-region-active')}
        >
          <span className="text-xl flex-shrink-0">🌍</span>
          <div className="text-left">
            <div className="text-[13px] font-semibold">All</div>
            <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>Regions</div>
          </div>
        </button>

        {generationsData.map((region) => (
          <button
            key={region.gen}
            onClick={() => onGenerationSelect(region.gen as GenerationNumber)}
            className={cn('nx-region', selectedGeneration === region.gen && 'nx-region-active')}
          >
            <span className="text-xl flex-shrink-0">{region.emoji}</span>
            <div className="text-left">
              <div className="text-[13px] font-semibold">Gen {region.gen}</div>
              <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-neutral-400)' }}>{region.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
