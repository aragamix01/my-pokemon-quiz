'use client'

import { useState } from 'react'
import { TYPE_EFFECTIVENESS, PokemonTypeName } from '@/lib/type-effectiveness'
import { TypePill } from '@/components/ui/TypePill'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, Sword } from '@phosphor-icons/react'

export default function TypeAdvantage() {
  const [showMode, setShowMode] = useState<'weakTo' | 'superEffectiveAgainst'>('weakTo')
  const allTypes = Object.keys(TYPE_EFFECTIVENESS) as PokemonTypeName[]

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        variant="icon"
        onClick={() => setShowMode(showMode === 'weakTo' ? 'superEffectiveAgainst' : 'weakTo')}
        title={showMode === 'weakTo' ? 'Switch to Offensive View' : 'Switch to Defensive View'}
        style={{ position: 'fixed', left: '20px', bottom: '20px', zIndex: 1000 }}
      >
        {showMode === 'weakTo' ? <ShieldCheck size={22} /> : <Sword size={22} />}
      </Button>

      <div className="card">
        <div className="text-center mb-4">
          <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}>
            Type {showMode === 'weakTo' ? 'Weaknesses' : 'Advantages'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {showMode === 'weakTo' ? 'What each Pokemon type is weak to' : 'What each Pokemon type is super effective against'}
          </p>
        </div>

        <div className="overflow-x-auto">
          {allTypes.map((type) => {
            const typeData = TYPE_EFFECTIVENESS[type]
            const displayTypes = showMode === 'weakTo'
              ? typeData.damageRelations.weakTo
              : typeData.damageRelations.superEffectiveAgainst

            return (
              <div
                key={type}
                className="flex items-center gap-5 py-3"
                style={{ borderBottom: '1px solid var(--color-neutral-800)' }}
              >
                <div className="w-[110px] flex-shrink-0 flex justify-center">
                  <TypePill type={type} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {displayTypes.length === 0 ? (
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {showMode === 'weakTo' ? 'No weaknesses' : '-'}
                    </span>
                  ) : (
                    displayTypes.map((targetType) => <TypePill key={targetType} type={targetType} />)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
