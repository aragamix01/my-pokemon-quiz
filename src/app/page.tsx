'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pokedex from '@/components/Pokedex'
import GenerationSelector from '@/components/GenerationSelector'
import TypeAdvantage from '@/components/TypeAdvantage'
import LearnMenu from '@/components/LearnMenu'
import { GenerationNumber } from '@/types/pokemon'

// Sections are picked from the header nav (?section=...). "quiz" is an old link, now part of Play & Learn
type Section = 'pokedex' | 'types' | 'learn'
const SECTIONS: Section[] = ['pokedex', 'types', 'learn']
const isSection = (value: string | null): value is Section => value !== null && SECTIONS.indexOf(value as Section) !== -1

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Read the section on first render too, so a ?section=types link never flashes the Pokedex first
  const [activeSection, setActiveSection] = useState<Section>(() => {
    const section = searchParams.get('section')
    return section === 'quiz' ? 'learn' : isSection(section) ? section : 'pokedex'
  })

  useEffect(() => {
    const section = searchParams.get('section')
    if (section === 'quiz') {
      setActiveSection('learn')
    } else if (isSection(section)) {
      setActiveSection(section)
    } else {
      // Plain "/": go back to the section used last in this tab, and put it in the URL so the header matches
      const saved = sessionStorage.getItem('active-section')
      if (isSection(saved) && saved !== 'pokedex') {
        router.replace(`/?section=${saved}`)
      }
    }
  }, [searchParams, router])

  useEffect(() => {
    sessionStorage.setItem('active-section', activeSection)
  }, [activeSection])

  const startQuiz = (generation: GenerationNumber | null) => {
    router.push(generation === null ? '/quiz/all' : `/quiz/${generation}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {activeSection === 'pokedex' && <Pokedex />}

      {activeSection === 'types' && (
        <>
          <SectionTitle title="Type Chart" subtitle="Attacking type on the left, defending type on top." />
          <TypeAdvantage />
        </>
      )}

      {activeSection === 'learn' && (
        <>
          <SectionTitle title="Play & Learn" subtitle="Quizzes and games to learn every name." />
          <div className="quiz-selection-area mb-6">
            <GenerationSelector
              title="Who's that Pokémon?"
              subtitle="Name the silhouette · 10 questions per quiz"
              onGenerationSelect={startQuiz}
            />
          </div>
          <LearnMenu />
        </>
      )}
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>{title}</h1>
      <p className="text-sm sm:text-base mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
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
