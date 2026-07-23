'use client'

interface PokemonSkeletonProps {
  count?: number
}

export default function PokemonSkeleton({ count = 20 }: PokemonSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="nx-pokecard animate-pulse"
          style={{ cursor: 'default' }}
        >
          {/* Pokemon ID skeleton */}
          <div className="h-3 rounded mb-2 w-8 mx-auto" style={{ background: 'var(--color-neutral-800)' }}></div>

          {/* Pokemon image skeleton */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded" style={{ background: 'var(--color-neutral-800)' }}></div>

          {/* Pokemon name skeleton */}
          <div className="h-3 rounded mb-2 w-12 mx-auto" style={{ background: 'var(--color-neutral-800)' }}></div>

          {/* Type badges skeleton */}
          <div className="flex gap-1 justify-center">
            <div className="w-10 h-4 rounded-full" style={{ background: 'var(--color-neutral-800)' }}></div>
            <div className="w-10 h-4 rounded-full" style={{ background: 'var(--color-neutral-800)' }}></div>
          </div>
        </div>
      ))}
    </>
  )
}