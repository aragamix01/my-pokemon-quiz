'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { TypePill } from '@/components/ui/TypePill'
import { cn } from '@/lib/cn'


interface QuizCardProps {
  correctPokemon: Pokemon
  options: Pokemon[]
  questionNumber: number
  totalQuestions: number
  onAnswer: (selectedPokemon: Pokemon, isCorrect: boolean) => void
}

export default function QuizCard({ 
  correctPokemon, 
  options, 
  questionNumber, 
  totalQuestions,
  onAnswer 
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<Pokemon | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const imageUrl = pokemonAPI.getPokemonImageUrl(correctPokemon, false)

  // Reset states when Pokemon changes and preload image
  useEffect(() => {
    setSelectedAnswer(null)
    setShowAnswer(false)
    setImageLoaded(false)
    
    // Clear any lingering focus/hover states from buttons
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      if (button instanceof HTMLElement) {
        button.blur()
      }
    })
    
    // Preload the image using native HTMLImageElement
    const img = document.createElement('img')
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageLoaded(true) // Still show even if error
    img.src = imageUrl
  }, [correctPokemon.id, imageUrl])

  const handleAnswer = (selectedPokemon: Pokemon) => {
    if (showAnswer) return
    
    // Clear button focus/hover states immediately on mobile
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    
    // Also clear all button states to prevent mobile hover persistence  
    const buttons = document.querySelectorAll('.quiz-option-button')
    buttons.forEach(button => {
      if (button instanceof HTMLElement) {
        button.blur()
        // Force remove any touch/active states on mobile
        button.style.setProperty('-webkit-tap-highlight-color', 'transparent')
      }
    })
    
    setSelectedAnswer(selectedPokemon)
    setShowAnswer(true)
    const isCorrect = selectedPokemon.id === correctPokemon.id
    
    setTimeout(() => {
      onAnswer(selectedPokemon, isCorrect)
      setSelectedAnswer(null)
      setShowAnswer(false)
    }, 2000)
  }

  return (
    <div className="card max-w-2xl mx-auto p-8">
      <div className="text-center mb-6">
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          Question {questionNumber} of {totalQuestions}
        </p>
        <div
          className="w-48 h-48 mx-auto relative mb-4 flex items-center justify-center rounded-md"
          style={{ background: 'var(--color-bg)' }}
        >
          {!imageLoaded ? (
            <div className="modern-spinner">
              <div className="pokeball-line"></div>
              <div className="pokeball-center"></div>
            </div>
          ) : (
            <div className={cn('relative w-full h-full', showAnswer && 'lighten')}>
              <Image
                src={imageUrl}
                alt={showAnswer ? correctPokemon.name : "Pokemon silhouette"}
                fill
                className={`object-contain ${!showAnswer ? 'brightness-0' : ''}`}
                priority
                draggable={false}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {correctPokemon.types.map((typeInfo, index) => (
            <TypePill key={index} type={typeInfo.type.name as any} />
          ))}
        </div>
        <h3
          className="text-lg mb-2"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}
        >
          Who&apos;s that Pokemon?
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((pokemon) => {
          let buttonClass = "nx-quizopt"

          if (showAnswer) {
            if (pokemon.id === correctPokemon.id) {
              buttonClass += " correct"
            } else if (selectedAnswer?.id === pokemon.id) {
              buttonClass += " wrong"
            } else {
              buttonClass += " disabled"
            }
          }

          return (
            <button
              key={pokemon.id}
              onClick={() => handleAnswer(pokemon)}
              className={`${buttonClass} quiz-option-button`}
              disabled={showAnswer}
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              onTouchEnd={(e) => {
                // Prevent mobile hover states from persisting
                const target = e.currentTarget
                setTimeout(() => target.blur(), 100)
              }}
            >
              {pokemon.name}
            </button>
          )
        })}
      </div>

      {showAnswer && (
        <div className="mt-6 text-center">
          <p className="text-sm font-semibold" style={{
            color: selectedAnswer?.id === correctPokemon.id ? 'var(--success-gradient)' : 'var(--error-gradient)'
          }}>
            {selectedAnswer?.id === correctPokemon.id ? 'Correct!' : 'Wrong!'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-primary)' }}>
            It&apos;s {correctPokemon.name}!
          </p>
        </div>
      )}
    </div>
  )
}