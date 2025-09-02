'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Pokemon } from '@/types/pokemon'
import { pokemonAPI } from '@/lib/pokemon-api'
import { getTypeIcon } from '@/lib/type-effectiveness'


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
    <div className="modern-card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          Question {questionNumber} of {totalQuestions}
        </p>
        <div className="w-48 h-48 mx-auto relative mb-4 flex items-center justify-center">
          {!imageLoaded ? (
            <div className="modern-spinner">
              <div className="pokeball-line"></div>
              <div className="pokeball-center"></div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={showAnswer ? correctPokemon.name : "Pokemon silhouette"}
              fill
              className={`object-contain ${!showAnswer ? 'brightness-0' : ''}`}
              priority
              draggable={false}
            />
          )}
        </div>
        <div className="flex justify-center gap-3 mb-4">
          {correctPokemon.types.map((typeInfo, index) => (
            <Image
              key={index}
              src={getTypeIcon(typeInfo.type.name as any)}
              alt={typeInfo.type.name}
              width={64}
              height={64}
              className="object-contain hover:scale-110 transition-transform duration-200"
              title={typeInfo.type.name}
              draggable={false}
            />
          ))}
        </div>
        <h3 className="text-lg font-bold mb-4 gradient-text">
          Who's that Pokemon?
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((pokemon) => {
          let buttonClass = "modern-button text-center capitalize"
          
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
              className={buttonClass}
              disabled={showAnswer}
            >
              {pokemon.name}
            </button>
          )
        })}
      </div>

      {showAnswer && (
        <div className="mt-6 text-center">
          <p className="text-sm font-bold" style={{ 
            color: selectedAnswer?.id === correctPokemon.id ? '#00b894' : '#fd79a8'
          }}>
            {selectedAnswer?.id === correctPokemon.id ? 'Correct!' : 'Wrong!'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-primary)' }}>
            It's {correctPokemon.name}!
          </p>
        </div>
      )}
    </div>
  )
}