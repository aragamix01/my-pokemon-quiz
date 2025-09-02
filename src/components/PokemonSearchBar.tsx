'use client'

import { useState, useRef, useEffect } from 'react'

interface PokemonSearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  placeholder?: string
  totalResults?: number
}

export default function PokemonSearchBar({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Search Pokemon by name...",
  totalResults 
}: PokemonSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus management for better UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to clear search
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur()
        if (value) onClear()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, value, onClear])

  return (
    <div className="relative w-full">
      {/* Unified Search Input */}
      <div 
        className={`
          relative transition-all duration-200 w-full
          ${isFocused 
            ? 'shadow-lg border-blue-500/50' 
            : 'hover:border-blue-400/50 border-gray-600/50'
          }
          border-2 h-12 rounded-lg
        `}
        style={{
          background: 'rgba(31, 41, 55, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Search Icon - Left */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className={`
            text-lg transition-all duration-300 
            ${isFocused ? 'text-blue-400' : 'text-white'}
          `}>
            🔍
          </div>
        </div>
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full h-full pl-12 pr-12 bg-transparent outline-none
            text-sm sm:text-sm font-medium transition-all duration-300
            placeholder:text-gray-400 text-white
          `}
          style={{ 
            color: '#ffffff',
            border: 'none',
            fontSize: '16px' // Prevents zoom on iOS
          }}
          autoComplete="off"
          spellCheck={false}
        />
        
        {/* Clear Button */}
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 sm:p-1 rounded-md transition-all duration-200 hover:bg-red-500/20 text-white hover:text-red-400"
            title="Clear search (Esc)"
          >
            <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Compact Results Status */}
      {totalResults !== undefined && value && (
        <div className="mt-2 px-1">
          <div className={`
            text-xs transition-all duration-300 flex items-center gap-1
            ${totalResults === 0 ? 'text-orange-400' : 'text-green-400'}
          `}>
            {totalResults === 0 ? (
              <>
                <span>⚠️</span>
                <span>No Pokemon found</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>{totalResults.toLocaleString()} Pokemon found</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}