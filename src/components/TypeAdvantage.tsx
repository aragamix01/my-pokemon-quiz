'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TYPE_EFFECTIVENESS, getTypeIcon, PokemonTypeName } from '@/lib/type-effectiveness'

export default function TypeAdvantage() {
  const [showMode, setShowMode] = useState<'weakTo' | 'superEffectiveAgainst'>('weakTo')
  const allTypes = Object.keys(TYPE_EFFECTIVENESS) as PokemonTypeName[]

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setShowMode(showMode === 'weakTo' ? 'superEffectiveAgainst' : 'weakTo')}
        className={`floating-toggle ${showMode === 'superEffectiveAgainst' ? 'active' : ''}`}
        title={showMode === 'weakTo' ? 'Switch to Offensive View' : 'Switch to Defensive View'}
        style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px',
          zIndex: 1000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: showMode === 'weakTo' ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, #27ae60, #229954)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {showMode === 'weakTo' ? '🛡️' : '⚔️'}
      </button>

      <div className="modern-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Type {showMode === 'weakTo' ? 'Weaknesses' : 'Advantages'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {showMode === 'weakTo' ? 'What each Pokemon type is weak to' : 'What each Pokemon type is super effective against'}
          </p>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/30">
              <th className="text-left p-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Type
              </th>
              <th className="text-left p-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {showMode === 'weakTo' ? 'Weak To' : 'Super Effective Against'}
              </th>
            </tr>
          </thead>
          <tbody>
            {allTypes.map((type, index) => {
              const typeData = TYPE_EFFECTIVENESS[type]
              const displayTypes = showMode === 'weakTo' 
                ? typeData.damageRelations.weakTo 
                : typeData.damageRelations.superEffectiveAgainst

              return (
                <tr 
                  key={type} 
                  className={`${index % 2 === 0 ? 'bg-gray-800/20' : ''} hover:bg-gray-700/20 transition-colors`}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <Image
                        src={getTypeIcon(type)}
                        alt={type}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    {displayTypes.length === 0 ? (
                      <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                        {showMode === 'weakTo' ? 'No weaknesses' : '-'}
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {displayTypes.map((targetType) => (
                          <Image
                            key={targetType}
                            src={getTypeIcon(targetType)}
                            alt={targetType}
                            width={56}
                            height={56}
                            className="object-contain hover:scale-110 transition-transform duration-200"
                            title={showMode === 'weakTo' ? `Weak to ${targetType}` : `Super effective against ${targetType}`}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}