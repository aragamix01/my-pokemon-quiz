'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import QuizCard from '@/components/QuizCard'
import { pokemonAPI } from '@/lib/pokemon-api'
import { Pokemon, GenerationNumber, QuizQuestion } from '@/types/pokemon'

// Fisher-Yates shuffle for better randomization
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const generation = parseInt(params.generation as string) as GenerationNumber
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [questionLoading, setQuestionLoading] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    generateQuestions()
  }, [generation])

  const generateQuestions = async () => {
    setLoading(true)
    try {
      const allPokemon = await pokemonAPI.getPokemonsByGeneration(generation)
      const quizQuestions: QuizQuestion[] = []
      
      // Create a shuffled copy of all Pokemon to avoid duplicates
      const shuffledPokemon = shuffleArray(allPokemon)
      
      // Ensure we have enough Pokemon for unique questions
      const questionsCount = Math.min(10, shuffledPokemon.length)

      for (let i = 0; i < questionsCount; i++) {
        const correctPokemon = shuffledPokemon[i] // Use sequential selection from shuffled array
        const wrongOptions = shuffleArray(
          allPokemon.filter(p => p.id !== correctPokemon.id)
        ).slice(0, 3)
        
        const options = shuffleArray([correctPokemon, ...wrongOptions])

        quizQuestions.push({
          correctPokemon,
          options,
          questionNumber: i + 1
        })
      }

      setQuestions(quizQuestions)
      setLoading(false)
    } catch (error) {
      console.error('Failed to generate questions:', error)
      setLoading(false)
    }
  }

  const handleAnswer = (selectedPokemon: Pokemon, isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setQuestionLoading(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setQuestionLoading(false)
      }, 800)
    } else {
      setGameComplete(true)
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setGameComplete(false)
    generateQuestions()
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="pixel-card">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--pixel-accent)' }}>
            Loading Gen {generation} Pokemon...
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="pixel-spinner mx-auto">
            </div>
            <div className="text-sm animate-pulse" style={{ color: 'var(--pixel-white)' }}>
              Preparing quiz questions...
            </div>
            <div className="pixel-dots justify-center">
              <div className="pixel-dot"></div>
              <div className="pixel-dot"></div>
              <div className="pixel-dot"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="text-center">
        <div className="pixel-card">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--pixel-accent)' }}>
            Quiz Complete!
          </h2>
          <div className="text-4xl mb-4">
            {percentage >= 80 ? '★★★' : percentage >= 60 ? '★★☆' : '★☆☆'}
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--pixel-white)' }}>
            Score: {score}/{questions.length}
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--pixel-gray)' }}>
            {percentage}% correct
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="pixel-button"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="pixel-button"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center">
        <div className="pixel-card">
          <h2 className="text-xl font-bold" style={{ color: 'var(--pixel-red)' }}>
            Failed to load questions
          </h2>
          <button
            onClick={() => router.push('/')}
            className="pixel-button mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="pixel-button text-xs px-3 py-2"
          >
            ← Menu
          </button>
          <div className="text-sm" style={{ color: 'var(--pixel-white)' }}>
            <span className="font-bold">Gen {generation}</span>
            <span className="mx-2">|</span>
            <span>Score: {score}/10</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {questionLoading ? (
        <div className="text-center">
          <div className="cozy-card max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-purple-600 border-t-yellow-400 rounded-full animate-spin"></div>
              </div>
              <div className="text-purple-200 animate-pulse">
                Loading next question...
              </div>
            </div>
          </div>
        </div>
      ) : (
        <QuizCard
          correctPokemon={questions[currentQuestion].correctPokemon}
          options={questions[currentQuestion].options}
          questionNumber={questions[currentQuestion].questionNumber}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}