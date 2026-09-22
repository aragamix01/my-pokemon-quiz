'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GenerationSelector from '@/components/GenerationSelector'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { pokemonMetadataService } from '@/lib/pokemon-metadata'
import { LearnState, loadLearnState, scopeStats } from '@/lib/learn-progress'
import { GenerationNumber } from '@/types/pokemon'
import { Cards, MagnifyingGlass } from '@phosphor-icons/react'

const GEN_KEY = 'learn-generation'

export default function LearnMenu() {
  const router = useRouter()
  const [generation, setGeneration] = useState<GenerationNumber | null>(1)
  const [learn, setLearn] = useState<LearnState | null>(null)

  useEffect(() => {
    setLearn(loadLearnState())
    const saved = sessionStorage.getItem(GEN_KEY)
    if (saved === 'all') setGeneration(null)
    else if (saved) setGeneration(parseInt(saved, 10) as GenerationNumber)
  }, [])

  const selectGeneration = (gen: GenerationNumber | null) => {
    setGeneration(gen)
    sessionStorage.setItem(GEN_KEY, gen === null ? 'all' : String(gen))
  }

  const slug = generation === null ? 'all' : String(generation)
  const scopeIds = (generation === null
    ? pokemonMetadataService.getAllMetadata()
    : pokemonMetadataService.getMetadataByGeneration(generation)
  ).map(p => p.id)
  const progress = learn ? scopeStats(learn, scopeIds) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', color: 'var(--color-text)' }}>
          Learn Pokemon names
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Pick a generation to study. Progress is saved in this browser.
        </p>
      </div>
      <GenerationSelector
        title="Learn Pokemon names"
        onGenerationSelect={selectGeneration}
        selectedGeneration={generation}
        minimized
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card" style={{ gap: 'var(--space-4)' }}>
          <div className="flex items-center gap-2">
            <Cards size={22} color="var(--color-accent)" />
            <h3 className="card-title">Flashcards</h3>
          </div>
          <p className="card-body">
            Meet a few new Pokemon a day. Each one moves from seeing its name, to picking it from 4 choices,
            to typing it yourself. Ones you miss come back sooner.
          </p>
          {progress && (
            <ProgressBar
              value={progress.mastered}
              max={progress.total}
              label="Mastered"
              valueLabel={`${progress.mastered} / ${progress.total} · ${progress.due} due`}
            />
          )}
          <Button block onClick={() => router.push(`/learn/${slug}`)}>Study</Button>
        </div>

        <div className="card" style={{ gap: 'var(--space-4)' }}>
          <div className="flex items-center gap-2">
            <MagnifyingGlass size={22} color="var(--color-accent)" />
            <h3 className="card-title">Pokedle</h3>
          </div>
          <p className="card-body">
            Guess a hidden Pokemon in 8 tries. Each guess shows which types, generation, color, shape, height
            and weight match the answer.
          </p>
          <Button block onClick={() => router.push(`/guess/${slug}`)}>Play</Button>
        </div>
      </div>
    </div>
  )
}
