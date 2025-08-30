'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Pokedex from '@/components/Pokedex'
import GenerationSelector from '@/components/GenerationSelector'
import TypeAdvantage from '@/components/TypeAdvantage'
import { GenerationNumber } from '@/types/pokemon'

export default function Home() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'quiz' | 'pokedex' | 'types'>('quiz')

  const startQuiz = (generation: GenerationNumber) => {
    router.push(`/quiz/${generation}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          animation: 'float 6s ease-in-out infinite'
        }}>⚪</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          animation: 'float 8s ease-in-out infinite 2s'
        }}>🔴</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          animation: 'float 7s ease-in-out infinite 4s'
        }}>🟡</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '25%',
          right: '5%',
          animation: 'float 9s ease-in-out infinite 1s'
        }}>🔵</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 game-title">
            <span className="text-yellow-400">P</span>
            <span className="text-red-500">O</span>
            <span className="text-blue-500">K</span>
            <span className="text-green-500">E</span>
            <span className="text-purple-500">M</span>
            <span className="text-pink-500">O</span>
            <span className="text-orange-500">N</span>
          </h1>
          <div className="text-lg md:text-xl gradient-text font-semibold mb-2">
            QUIZ MASTER
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            ⚡ Test your Pokemon knowledge! ⚡
          </div>
        </div>

        {/* Compact Navigation */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setActiveSection('quiz')}
            className={`compact-nav-button ${activeSection === 'quiz' ? 'active' : ''}`}
          >
            🎯 Quiz Battle
          </button>
          <button
            onClick={() => setActiveSection('pokedex')}
            className={`compact-nav-button ${activeSection === 'pokedex' ? 'active' : ''}`}
          >
            📱 Pokedex
          </button>
          <button
            onClick={() => setActiveSection('types')}
            className={`compact-nav-button ${activeSection === 'types' ? 'active' : ''}`}
          >
            ⚔️ Type Chart
          </button>
        </div>

        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <div className="quiz-selection-area">
            <GenerationSelector
              title="Choose Your Region"
              subtitle="💡 Identify Pokemon silhouettes • 10 questions per quiz • Score tracking"
              onGenerationSelect={startQuiz}
            />
          </div>
        )}

        {/* Pokedex Section */}
        {activeSection === 'pokedex' && <Pokedex />}

        {/* Type Chart Section */}
        {activeSection === 'types' && <TypeAdvantage />}
      </div>
    </div>
  )
}