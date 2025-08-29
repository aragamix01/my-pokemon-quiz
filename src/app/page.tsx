'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const startQuiz = (generation: number) => {
    router.push(`/quiz/${generation}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="pixel-card text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--pixel-accent)' }}>
          POKEMON QUIZ
        </h1>
        <div className="text-sm mb-8" style={{ color: 'var(--pixel-white)' }}>
          Choose a generation and test your knowledge!
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
            <button
              key={gen}
              onClick={() => startQuiz(gen)}
              className="pixel-button"
            >
              Gen {gen}
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-xs" style={{ color: 'var(--pixel-gray)' }}>
          Each quiz contains 10 unique questions
        </div>
      </div>
    </div>
  )
}