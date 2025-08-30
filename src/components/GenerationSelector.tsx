'use client'

import { GenerationNumber } from '@/types/pokemon'

const generationsData = [
  { gen: 1, name: 'Kanto', color: '#ff6b6b', emoji: '🔥' },
  { gen: 2, name: 'Johto', color: '#4ecdc4', emoji: '🌸' },
  { gen: 3, name: 'Hoenn', color: '#45b7d1', emoji: '🌊' },
  { gen: 4, name: 'Sinnoh', color: '#96ceb4', emoji: '⚡' },
  { gen: 5, name: 'Unova', color: '#ffeaa7', emoji: '❄️' },
  { gen: 6, name: 'Kalos', color: '#dda0dd', emoji: '🌟' },
  { gen: 7, name: 'Alola', color: '#ff9ff3', emoji: '🌺' },
  { gen: 8, name: 'Galar', color: '#74b9ff', emoji: '⚔️' },
  { gen: 9, name: 'Paldea', color: '#fd79a8', emoji: '🎓' }
]

interface GenerationSelectorProps {
  title: string
  subtitle?: string
  onGenerationSelect: (generation: GenerationNumber) => void
  showBackButton?: boolean
  onBack?: () => void
  selectedGeneration?: GenerationNumber
}

export default function GenerationSelector({ 
  title, 
  subtitle, 
  onGenerationSelect, 
  showBackButton = false, 
  onBack,
  selectedGeneration
}: GenerationSelectorProps) {
  return (
    <div className="modern-card">
      {showBackButton && onBack && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="modern-button text-xs px-3 py-2"
          >
            ← Back
          </button>
          <div className="w-16"></div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4 gradient-text text-center">
        {title}
      </h2>
      
      {subtitle && (
        <div className="text-sm mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </div>
      )}
      
      <div className="compact-generation-grid">
        {generationsData.map((region) => (
          <button
            key={region.gen}
            onClick={() => onGenerationSelect(region.gen as GenerationNumber)}
            className={`compact-generation-button ${
              selectedGeneration === region.gen ? 'selected' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${region.color} 0%, ${region.color}dd 100%)`,
              boxShadow: `0 2px 8px ${region.color}33`
            }}
          >
            <span className="gen-emoji-small">{region.emoji}</span>
            <div className="gen-info-compact">
              <div className="gen-number-small">Gen {region.gen}</div>
              <div className="gen-name-small">{region.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}