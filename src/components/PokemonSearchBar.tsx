'use client'

import { useState, useRef, useEffect } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'

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
      <div
        className="relative w-full transition-colors"
        style={{
          border: `1px solid ${isFocused ? 'var(--color-accent)' : 'var(--color-neutral-700)'}`,
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          height: 44
        }}
      >
        {/* Search Icon - Left */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <MagnifyingGlass size={18} color={isFocused ? 'var(--color-accent)' : 'var(--color-neutral-400)'} />
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
          className="w-full h-full pl-11 pr-11 bg-transparent outline-none text-sm font-medium"
          style={{
            color: 'var(--color-text)',
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md transition-colors"
            style={{ color: 'var(--color-neutral-400)' }}
            title="Clear search (Esc)"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Compact Results Status */}
      {totalResults !== undefined && value && (
        <div className="mt-2 px-1">
          <div
            className="text-xs flex items-center gap-1.5"
            style={{ color: totalResults === 0 ? 'var(--error-gradient)' : 'var(--color-accent-300)' }}
          >
            <span>{totalResults === 0 ? 'No Pokemon found' : `${totalResults.toLocaleString()} Pokemon found`}</span>
          </div>
        </div>
      )}
    </div>
  )
}
