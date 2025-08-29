'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Pokemon } from '@/types/pokemon'

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-500 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-500 text-black',
    grass: 'bg-green-500 text-white',
    ice: 'bg-cyan-300 text-black',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-600 text-white',
    ground: 'bg-yellow-600 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-lime-500 text-black',
    rock: 'bg-yellow-800 text-white',
    ghost: 'bg-purple-800 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-400 text-black',
    fairy: 'bg-pink-300 text-black',
  }
  return typeColors[type] || 'bg-gray-500 text-white'
}

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

  const imageUrl = correctPokemon.sprites.other['official-artwork']?.front_default || 
                   correctPokemon.sprites.front_default

  return (
    <div className="pixel-card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs mb-2" style={{ color: 'var(--pixel-gray)' }}>
          Question {questionNumber} of {totalQuestions}
        </p>
        <div className="w-48 h-48 mx-auto relative mb-4 pixel-smooth">
          <Image
            src={imageUrl}
            alt={showAnswer ? correctPokemon.name : "Pokemon silhouette"}
            fill
            className={`object-contain pixel-smooth ${!showAnswer ? 'brightness-0' : ''}`}
          />
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {correctPokemon.types.map((typeInfo, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-bold uppercase ${getTypeColor(typeInfo.type.name)}`}
              style={{ 
                border: '1px solid var(--pixel-border)',
                fontFamily: 'Press Start 2P, monospace'
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--pixel-accent)' }}>
          Who's that Pokemon?
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((pokemon) => {
          let buttonClass = "pixel-button text-center capitalize"
          
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
            color: selectedAnswer?.id === correctPokemon.id ? 'var(--pixel-green)' : 'var(--pixel-red)'
          }}>
            {selectedAnswer?.id === correctPokemon.id ? 'Correct!' : 'Wrong!'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--pixel-white)' }}>
            It's {correctPokemon.name}!
          </p>
        </div>
      )}
    </div>
  )
}