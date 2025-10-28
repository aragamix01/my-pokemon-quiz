'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import QuizCard from '@/components/QuizCard'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { generateConfusingAnswers } from '@/lib/pokemon-similarity'
import { Pokemon, GenerationNumber, QuizQuestion } from '@/types/pokemon'

// Fisher-Yates shuffle for better randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface QuizPageProps {
  params: Promise<{
    generation: string
  }>
}

export default function QuizPage({ params }: QuizPageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const generation = resolvedParams.generation === 'all' ? null : parseInt(resolvedParams.generation) as GenerationNumber
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    generateQuestions()
  }, [generation])

  const generateQuestions = () => {
    setLoading(true)
    try {
      // Get metadata based on generation (null = all generations)
      const metadata = generation === null 
        ? pokemonMetadataService.getAllMetadata()
        : pokemonMetadataService.getMetadataByGeneration(generation)
      
      if (metadata.length === 0) {
        console.error('No Pokemon metadata found')
        setLoading(false)
        return
      }

      // Convert metadata to Pokemon format for quiz
      const allPokemon: Pokemon[] = metadata.map(meta => ({
        id: meta.id,
        name: meta.name,
        types: meta.types.map((type: string) => ({
          type: { name: type, url: '' },
          slot: 1
        })),
        species: { name: meta.species_name, url: '' },
        sprites: {
          front_default: null,
          front_shiny: null,
          other: {
            'official-artwork': {
              front_default: null,
              front_shiny: null
            }
          }
        },
        height: meta.height,
        weight: meta.weight,
        base_experience: meta.base_experience,
        abilities: [],
        moves: [],
        cries: { latest: null, legacy: null },
        stats: [
          { base_stat: meta.stats.hp, effort: 0, stat: { name: 'hp', url: '' } },
          { base_stat: meta.stats.attack, effort: 0, stat: { name: 'attack', url: '' } },
          { base_stat: meta.stats.defense, effort: 0, stat: { name: 'defense', url: '' } },
          { base_stat: meta.stats['special-attack'], effort: 0, stat: { name: 'special-attack', url: '' } },
          { base_stat: meta.stats['special-defense'], effort: 0, stat: { name: 'special-defense', url: '' } },
          { base_stat: meta.stats.speed, effort: 0, stat: { name: 'speed', url: '' } }
        ]
      }))

      const quizQuestions: QuizQuestion[] = []
      
      // Create a shuffled copy of all Pokemon to avoid duplicates
      const shuffledPokemon = shuffleArray(allPokemon)
      
      // Ensure we have enough Pokemon for unique questions
      const questionsCount = Math.min(10, shuffledPokemon.length)

      for (let i = 0; i < questionsCount; i++) {
        const correctPokemon = shuffledPokemon[i]

        // Use AI-powered similarity to generate confusing answers
        const confusingAnswerIds = generateConfusingAnswers(
          correctPokemon.id,
          4, // Total options = 4
          generation || undefined // Exclude same generation if specified
        )

        // Map IDs back to Pokemon objects
        const wrongOptions = confusingAnswerIds
          .map(id => allPokemon.find(p => p.id === id))
          .filter((p): p is Pokemon => p !== undefined)

        // If we don't have enough similar Pokemon, fall back to random selection
        if (wrongOptions.length < 3) {
          const randomWrongOptions = shuffleArray(
            allPokemon.filter(p => p.id !== correctPokemon.id && !wrongOptions.some(wo => wo.id === p.id))
          ).slice(0, 3 - wrongOptions.length)
          wrongOptions.push(...randomWrongOptions)
        }

        const options = shuffleArray([correctPokemon, ...wrongOptions.slice(0, 3)])

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
      setCurrentQuestion(currentQuestion + 1)
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
        <div className="modern-card">
          <h2 className="text-xl font-bold mb-4 gradient-text">
            Loading {generation === null ? 'All Generations' : `Gen ${generation}`} Pokemon...
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="modern-spinner mx-auto">
              <div className="pokeball-line"></div>
              <div className="pokeball-center"></div>
            </div>
            <div className="text-sm animate-pulse" style={{ color: 'var(--text-primary)' }}>
              Preparing quiz questions...
            </div>
            <div className="modern-dots justify-center">
              <div className="modern-dot"></div>
              <div className="modern-dot"></div>
              <div className="modern-dot"></div>
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
        <div className="modern-card">
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            Quiz Complete!
          </h2>
          <div className="text-4xl mb-4">
            {percentage >= 80 ? '★★★' : percentage >= 60 ? '★★☆' : '★☆☆'}
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Score: {score}/{questions.length}
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {percentage}% correct
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="modern-button"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push('/?section=quiz')}
              className="modern-button"
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
        <div className="modern-card">
          <h2 className="text-xl font-bold" style={{ color: '#fd79a8' }}>
            Failed to load questions
          </h2>
          <button
            onClick={() => router.push('/?section=quiz')}
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
            onClick={() => router.push('/?section=quiz')}
            className="modern-button text-xs px-3 py-2"
          >
            ← Menu
          </button>
          <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
            <span className="font-bold">{generation === null ? 'All Generations' : `Gen ${generation}`}</span>
            <span className="mx-2">|</span>
            <span>Score: {score}/10</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <QuizCard
        correctPokemon={questions[currentQuestion].correctPokemon}
        options={questions[currentQuestion].options}
        questionNumber={questions[currentQuestion].questionNumber}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}