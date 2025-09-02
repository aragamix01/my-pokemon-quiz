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
          className="modern-card p-2 sm:p-3 text-center relative animate-pulse"
          style={{ background: 'var(--surface-bg)' }}
        >
          {/* Pokemon ID skeleton */}
          <div className="h-3 bg-gray-600 rounded mb-2 w-8 mx-auto opacity-50"></div>
          
          {/* Pokemon image skeleton */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 bg-gray-600 rounded opacity-30"></div>
          
          {/* Pokemon name skeleton */}
          <div className="h-3 bg-gray-600 rounded mb-2 w-12 mx-auto opacity-50"></div>
          
          {/* Type badges skeleton */}
          <div className="flex gap-1 justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded opacity-30"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded opacity-20"></div>
          </div>
        </div>
      ))}
    </>
  )
}