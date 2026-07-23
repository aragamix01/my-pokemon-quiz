'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pokedex from '@/components/Pokedex'
import GenerationSelector from '@/components/GenerationSelector'
import TypeAdvantage from '@/components/TypeAdvantage'
import { GenerationNumber } from '@/types/pokemon'
import { Tabs, TabItem } from '@/components/ui/Tabs'
import { DeviceMobile, Sword, Question, ShieldStar } from '@phosphor-icons/react'

const TABS: TabItem[] = [
  { id: 'pokedex', label: 'Pokedex', icon: <DeviceMobile size={16} /> },
  { id: 'types', label: 'Type Chart', icon: <Sword size={16} /> },
  { id: 'quiz', label: "Who's that Pokemon?", icon: <Question size={16} /> },
]

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'quiz' | 'pokedex' | 'types'>('pokedex')

  useEffect(() => {
    const section = searchParams.get('section')
    if (section && (section === 'quiz' || section === 'pokedex' || section === 'types')) {
      setActiveSection(section as 'quiz' | 'pokedex' | 'types')
    } else {
      // Check if we should restore active section from localStorage
      const savedActiveSection = sessionStorage.getItem('active-section')
      if (savedActiveSection && (savedActiveSection === 'quiz' || savedActiveSection === 'pokedex' || savedActiveSection === 'types')) {
        setActiveSection(savedActiveSection as 'quiz' | 'pokedex' | 'types')
      }
    }
  }, [searchParams])

  // Save active section when it changes
  useEffect(() => {
    sessionStorage.setItem('active-section', activeSection)
  }, [activeSection])

  const startQuiz = (generation: GenerationNumber | null) => {
    if (generation === null) {
      router.push('/quiz/all')
    } else {
      router.push(`/quiz/${generation}`)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 max-w-6xl mx-auto p-2 sm:p-4">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <ShieldStar size={24} color="var(--color-accent)" />
            <h1
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}
            >
              Pokemon Toolkit
            </h1>
          </div>
          <div className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
            Complete Pokemon companion tools — Pokedex, type chart, and quizzes.
          </div>
        </div>

        {/* Navigation */}
        <Tabs
          items={TABS}
          activeId={activeSection}
          onChange={(id) => setActiveSection(id as typeof activeSection)}
          className="mb-4 sm:mb-6"
        />

        {/* Pokedex Section */}
        {activeSection === 'pokedex' && <Pokedex />}

        {/* Type Chart Section */}
        {activeSection === 'types' && <TypeAdvantage />}

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
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
